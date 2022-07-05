"""
WSGI config for dj_mp3 project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.11/howto/deployment/wsgi/
"""

import os

import sys
from django.core.wsgi import get_wsgi_application

import site
site.addsitedir('/home/user02/www/dj_mp3down/venv/lib/python2.7/site-packages')

path = os.path.abspath(__file__+'/../..')
if path not in sys.path:
    sys.path.append(path)

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "dj_mp3cvt.settings")

application = get_wsgi_application()
