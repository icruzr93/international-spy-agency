from django.db import models
from django.conf import settings


class Hit(models.Model):
    IN_PROGRESS = 'in_progress'
    COMPLETED = 'completed'
    FAILED = 'failed'

    HIT_STATES = (
        (IN_PROGRESS, "in_progress"),
        (COMPLETED, "completed"),
        (FAILED, "failed"),
    )

    target_name = models.CharField(max_length=100, null=False)
    assigned_to = models.CharField(max_length=100, null=False)
    state = models.CharField(choices=HIT_STATES, default='in_progress', max_length=50)

    hitman = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='hits', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['created_at', 'updated_at']
