from rest_framework import routers
from news.viewsets import NewsViewSet
from collection.viewsets import CollectionViewSet
from category.viewsets import CategoryViewSet
from brand.viewsets import BrandViewSet

router = routers.DefaultRouter()
router.register(r'news', NewsViewSet)
router.register(r'collection', CollectionViewSet)
router.register(r'category', CategoryViewSet)
router.register(r'brand', BrandViewSet)