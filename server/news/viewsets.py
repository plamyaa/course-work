from rest_framework import viewsets
from server.pagination import CustomPagination
from .models import News
from .serializers import NewsSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
class NewsViewSet(viewsets.ModelViewSet):
    queryset = News.objects.all()
    pagination_class = CustomPagination
    serializer_class = NewsSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['author_id', 'brand_id', 'collection_id']
    
    @action(methods=['GET'], detail= False,url_path="news_list")
    def get_news(self):
        news = News.objects.all()
        serializer = NewsSerializer(news, many=True).data
        return Response(serializer)

    @action(methods=['POST'],detail= False, url_path="add_news", permission_classes=[IsAuthenticated])
    def add_news(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'message':'added'})

class FilterBackend(NewsViewSet):
    def get_queryset(self):
        qnews = News.objects.filter(Q(title__startswith='A'))
        return qnews

