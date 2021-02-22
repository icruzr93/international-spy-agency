from django.db import models
from django.contrib.auth.models import AbstractUser

HITMAN_TYPES = (
    ("boss", "boss"),
    ("manager", "manager"),
    ("hitman", "hitman"),
)

class User(AbstractUser):
    first_name = models.CharField(max_length=255, null=False)
    last_name = models.CharField(max_length=255, null=False)
    email = models.EmailField(max_length=255, null=False)
    type = models.CharField(choices=HITMAN_TYPES, default='hitman', max_length=50)
    manager = models.ForeignKey('self', related_name='hitmen', on_delete=models.CASCADE)

