/**
 * Created by RGY on 11/16/2017.
 */
$(".dy-row").addClass("convert-content");
$("body").css("overflow-y", "hidden");
$(".dy-loader").css({
    "position": "absolute",
    "margin-top": "50px"
});
$("#id_file").change(function () {
    $("#id-convert").submit();
});
var allowedExtensions = ["mp4", "avi", "mpg", "flv", "mov", "mp3", "flac", "aac", "m4a", "3gp", "3g2", "asf", "m4v", "mkv", "ogg", "wmv", "wav", "wma", "webm"];
var maxSize = 1024 * 1024 * 1024 * 3;
function isIos() {
    var isIos = false;
    var userAgent = (navigator.userAgent || navigator.vendor || window.opera).toLowerCase();
    if (/ip(ad|hone|od)/.test(userAgent)) {
        isIos = true;
    }
    return isIos;
}
var XHR;
$(document).on('click', '.ajax-file-upload', function(e){
    if($('#upload_btn_txt').html()=="停止") {
        XHR.abort();
        $("#upload_btn_txt").html("ファイルを選択");
        $(".dy-loader").css("display", "none");
        e.preventDefault();
        $('#id_file').css("display","inherit");
        $('#id_file').val(null);
    }
});
$(document).on("submit", "form#id-convert", function (e) {
    var $file = $('#id_file'),
        $loader = $(".dy-loader");
    if($file.val()===null || $file.val()==="") return;
    var ext = $file.val().split('.').pop().toLowerCase(),
        file_name = $file.val().split('\\').pop();
    if ($.inArray(ext, allowedExtensions) === -1) {
        $loader.html(file_name + 'には対応していません。');
        $loader.css("display", "inherit");
        e.preventDefault();
        return false;
    }
    var fsize = $file[0].files[0].size;
    if (fsize > maxSize) {
        $loader.html(fsize + 'bites には対応していません。');
        $loader.css("display", "inherit");
        e.preventDefault();
        return false;
    }
    $("#upload_btn_txt").html("停止");
    $loader.html('アップロード中');
    $loader.css("display", "inherit");
    var form = $('#id-convert')[0];
    var formData = new FormData(form);
    formData.append("file", $file[0].files[0]);
    $file.css("display","none");
    XHR = $.ajax({
        url: "/mp3_convert/convert/",
        type: 'POST',
        processData: false,
        contentType: false,
        data: formData,
        success: function (data) {
            if (data.type == "S_OK") {
                $loader.html('変換中');
                convert(data.content.fileName);
            }
            else if (data.type == "FAIL") {
                $("#upload_btn_txt").html("ファイルを選択");
                $loader.html(file_name + 'には対応していません。');
                $file.css("display","inherit");
            }
        },
        error: function () {
            $("#upload_btn_txt").html("ファイルを選択");
            $loader.html(file_name + 'には対応していません。');
            $file.css("display","inherit");
        }
    });
    e.preventDefault();
    return false;
});
function convert(fileName) {
    var $form;
    var formInnerHtml = $("#csrf_token").html() + "<input type='hidden' name='file_name' value='" + fileName + "' />" +
        "<input type='hidden' name='isIos' value='" + isIos() + "' />";
    $form = $("<form id='id_file_convert'>").appendTo("body");
    $form.hide()
        .prop('method', "POST")
        .html(formInnerHtml);
    $form.submit().remove();
}
$(document).on("submit", "form#id_file_convert", function (e) {
    var $file = $('#id_file'),
        $loader = $(".dy-loader");
    var file_name = $file.val().split('\\').pop();
    if (isIos()) {
        XHR = $.ajax({
            url: "/mp3_convert/convert/",
            type: 'POST',
            data: $(this).serialize(),
            dataType: 'json',
            success: function (data) {
                if (data.type == "S_OK") {
                    $("#upload_btn_txt").html("ファイルを選択");
                    window.location.href = data.content.videoUrl;
                    $loader.css("display", "none");
                    $file.css("display","inherit");
                }
                else if (data.type == "FAIL") {
                    $("#upload_btn_txt").html("ファイルを選択");
                    $loader.html(file_name + 'には対応していません。');
                    $file.css("display","inherit");
                }

            },
            error: function () {
                $("#upload_btn_txt").html("ファイルを選択");
                $loader.html(file_name + 'には対応していません。');
                $file.css("display","inherit");
            }
        });
    }
    else {
        $.fileDownload("/mp3_convert/convert/", {
            successCallback: function (url) {
                console.log(url);
                $("#upload_btn_txt").html("ファイルを選択");
                $loader.css("display", "none");
                $file.css("display","inherit");
            },
            failCallback: function (responseHtml, url) {
                console.log(responseHtml);
                console.log(url);
                $("#upload_btn_txt").html("ファイルを選択");
                $loader.html(file_name + 'には対応していません。');
                $file.css("display","inherit");
            },
            httpMethod: "POST",
            data: $(this).serialize()
        });
    }
    e.preventDefault();
    return false;
});