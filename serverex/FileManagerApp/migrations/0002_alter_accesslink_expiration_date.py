# Generated by Django 4.2 on 2024-12-12 16:18

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('FileManagerApp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='accesslink',
            name='expiration_date',
            field=models.DateTimeField(default=datetime.datetime(2024, 12, 19, 16, 18, 43, 224628, tzinfo=datetime.timezone.utc)),
        ),
    ]
