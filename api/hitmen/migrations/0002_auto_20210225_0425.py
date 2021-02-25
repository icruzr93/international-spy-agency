# Generated by Django 3.1.7 on 2021-02-25 04:25

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('hitmen', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='manager',
            field=models.ForeignKey(default=1, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='hitmen', to=settings.AUTH_USER_MODEL),
        ),
    ]
