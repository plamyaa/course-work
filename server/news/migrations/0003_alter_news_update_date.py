# Generated by Django 4.1.4 on 2022-12-18 11:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('news', '0002_news_author_news_brand_id_news_collection_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='news',
            name='update_date',
            field=models.DateTimeField(auto_now=True, null=True),
        ),
    ]
