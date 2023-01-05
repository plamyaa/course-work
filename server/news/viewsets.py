from rest_framework import viewsets
from .models import News
from .serializers import NewsSerializer
from django_filters.rest_framework import DjangoFilterBackend
class NewsViewSet(viewsets.ModelViewSet):
    queryset = News.objects.all()
    serializer_class = NewsSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['author_id', 'brand_id', 'collection_id']