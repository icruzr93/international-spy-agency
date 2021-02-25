from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.conf import settings

from hitmen.managers import UserManager

DEFAULT_MANAGER = 1

class User(AbstractBaseUser, PermissionsMixin):
    BOSS = 'boss'
    MANAGER = 'manager'
    HITMAN = 'hitman'

    HITMAN_TYPES = (
        (BOSS, "boss"),
        (MANAGER, "manager"),
        (HITMAN, "hitman"),
    )

    email = models.EmailField(max_length=255, null=False, unique=True)
    first_name = models.CharField(max_length=255, null=False)
    last_name = models.CharField(max_length=255, null=False)
    hitman_type = models.CharField(choices=HITMAN_TYPES, default="hitman", max_length=50, null=False)
    manager = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='hitmen', on_delete=models.CASCADE, default=DEFAULT_MANAGER, null=True)
    is_active = models.BooleanField(default=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []


    def get_full_name(self):
        full_name = '%s %s' % (self.first_name, self.last_name)
        return full_name.strip()

    def get_short_name(self):
        return self.first_name


