# Generated by Django 4.1.4 on 2022-12-17 19:27

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='News',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('text', models.TextField()),
                ('image_src', models.CharField(max_length=255)),
                ('publish_date', models.DateTimeField(auto_now_add=True)),
                ('update_date', models.DateTimeField(null=True)),
            ],
        ),
    ]
