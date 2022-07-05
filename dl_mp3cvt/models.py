# -*- coding: utf-8 -*-
from __future__ import unicode_literals

# Create your models here.
from django.db import models
from django.contrib.auth.models import User

class AccessInfo(models.Model):
    login = models.IntegerField(default=0)
    regist = models.IntegerField(default=0)
