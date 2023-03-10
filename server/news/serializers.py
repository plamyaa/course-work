from rest_framework import serializers
from .models import News

class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = ['id', 'title', 'text', 'image_src', 'publish_date', 'update_date', 'author_id', 'brand_id', 'collection_id']