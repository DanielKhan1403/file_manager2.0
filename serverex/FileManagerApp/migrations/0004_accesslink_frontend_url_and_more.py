# Generated by Django 5.1.2 on 2024-12-18 20:26

import datetime
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('FileManagerApp', '0003_alter_accesslink_expiration_date'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='accesslink',
            name='frontend_url',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='accesslink',
            name='expiration_date',
            field=models.DateTimeField(default=datetime.datetime(2024, 12, 25, 20, 26, 15, 769774, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='file',
            name='directory',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='files', to='FileManagerApp.directory'),
        ),
        migrations.AlterField(
            model_name='file',
            name='file',
            field=models.FileField(upload_to='files/'),
        ),
        migrations.AlterField(
            model_name='file',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='files', to=settings.AUTH_USER_MODEL),
        ),
    ]