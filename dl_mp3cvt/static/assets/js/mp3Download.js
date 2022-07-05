/**
 * Created by RGY on 10/25/2017.
 */
function validateForm(x) {
    var isYoutube = x.indexOf("youtube.com"),
        isNico = x.indexOf("nicovideo.jp"),
        isSound = x.indexOf("soundcloud.com");
    if (isYoutube === -1 && isNico === -1 && isSound === -1) {
        //alert("無効なURL!");
        return false;
    }
    return true;
}

function isIos() {
    var isIos = false;
    var userAgent = (navigator.userAgent || navigator.vendor || window.opera).toLowerCase();
    if (/ip(ad|hone|od)/.test(userAgent)) {
        $("#dyid-isIos").val("true");
        isIos = true;
    } else {
        $("#dyid-isIos").val("false");
    }
    return isIos;
}
$(document).on("submit", "form#id-url-reg-form", function (e) {
    var video_url = $("#id-url-select").val();
    if (!validateForm(video_url)) {
        e.preventDefault();
        return false;
    }
    $(".dy-loader").html('ダウンロード準備中');
    $(".dy-loader").css("display", "inherit");
    if (isIos()) {
        $.ajax({
            url: "/mp3_convert/download/",
            type: 'POST',
            data: {
                'url': video_url,
                'formatid': $("#dyid-setformatid").val(),
                'isIos': 'true'
            },
            dataType: 'json',
            success: function (data) {
                if (data.type == "S_OK") {
                    window.location.href = data.content.videoUrl;
                }
                else if (data.type == "FAIL") {

                }
                $(".dy-loader").css("display", "none");
            },
            error: function () {
                $(".dy-loader").css("display", "none");
                alert("URL解析エラー");
            }
        });
    }
    else {
        $.fileDownload('/mp3_convert/download/', {
            successCallback: function (url) {
                console.log(url);
                $(".dy-loader").css("display", "none");
            },
            failCallback: function (responseHtml, url) {
                console.log(responseHtml);
                console.log(url);
                $(".dy-loader").css("display", "none");
                alert("URL解析エラー")
            },
            httpMethod: "POST",
            data: $(this).serialize()
        });
    }
    e.preventDefault();
    return false;
});
