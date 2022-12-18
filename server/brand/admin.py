from django.contrib import admin
from .models import Brand
 
class BrandAdmin(admin.ModelAdmin):
  list_display = ['id', 'brand']
  search_fields = ['brand']

admin.site.register(Brand, BrandAdmin)