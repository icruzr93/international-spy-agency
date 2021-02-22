# Generated by Django 3.1.6 on 2021-02-22 02:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('hitmen', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Hit',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('target_name', models.CharField(max_length=100)),
                ('assigned_to', models.CharField(max_length=100)),
                ('state', models.CharField(choices=[('in_progress', 'in_progress'), ('completed', 'completed'), ('failed', 'failed')], default='in_progress', max_length=50)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('hitman', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='hits', to='hitmen.hitman')),
            ],
            options={
                'db_table': 'hits',
                'ordering': ['created_at', 'updated_at'],
            },
        ),
    ]
