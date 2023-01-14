from rest_framework import viewsets
from .models import News
from .serializers import NewsSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import PageNumberPagination

class CustomPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 1000
    page_query_param = 'p'
class NewsViewSet(viewsets.ModelViewSet):
    queryset = News.objects.all()
    pagination_class = CustomPagination
    serializer_class = NewsSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['author_id', 'brand_id', 'collection_id']
