# Generated by Django 4.0.4 on 2022-07-07 04:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('homepage', '0003_remove_homepage_completed_homepage_status'),
    ]

    operations = [
        migrations.RenameField(
            model_name='homepage',
            old_name='status',
            new_name='progress',
        ),
    ]
