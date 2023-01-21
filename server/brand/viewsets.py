from rest_framework import viewsets
from .models import Brand
from .serializers import BrandSerializer
from rest_framework import pagination


class BrandViewSet(viewsets.ModelViewSet):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    pagination.PageNumberPagination.page_size = 9