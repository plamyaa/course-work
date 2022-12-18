from django.contrib import admin
from .models import Category
 
class CategoryAdmin(admin.ModelAdmin):
  list_display = ['id', 'category']
  search_fields = ['category']

admin.site.register(Category, CategoryAdmin)
