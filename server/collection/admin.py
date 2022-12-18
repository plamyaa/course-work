from django.contrib import admin
from .models import Collection
 
class CollectionAdmin(admin.ModelAdmin):
  list_display = ['id', 'collection']
  search_fields = ['collection']

admin.site.register(Collection, CollectionAdmin)
