from django.db import models
from hits.models import Hit

HITMAN_TYPES = (
    ("boss", "boss"),
    ("manager", "manager"),
    ("hitman", "hitman"),
)

class Hitman(models.Model):
    first_name = models.CharField(max_length=255, null=False)
    last_name = models.CharField(max_length=255, null=False)
    email = models.EmailField(max_length=255, null=False)
    type = models.CharField(choices=HITMAN_TYPES, default='hitman', max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    manager = models.ForeignKey('auth.User', related_name='hitmen', on_delete=models.CASCADE)

    class Meta:
        db_table = 'hitmen'
        ordering = ['created_at', 'updated_at']
