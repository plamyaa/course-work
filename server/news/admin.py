from django.contrib import admin
from .models import News
 
class NewsAdmin(admin.ModelAdmin):
  list_display = ['id', 'title', 'publish_date', 'update_date']
  search_fields = ['title']

admin.site.register(News, NewsAdmin)
