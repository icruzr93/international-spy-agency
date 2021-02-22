from django.db import models

HIT_STATES = (
    ("in_progress", "in_progress"),
    ("completed", "completed"),
    ("failed", "failed"),
)

class Hit(models.Model):
    target_name = models.CharField(max_length=100, null=False)
    assigned_to = models.CharField(max_length=100, null=False)
    state = models.CharField(choices=HIT_STATES, default='in_progress', max_length=50)

    hitman = models.ForeignKey('hitmen.Hitman', related_name='hits', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'hits'
        ordering = ['created_at', 'updated_at']
