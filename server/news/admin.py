from django.contrib import admin
from .models import News
from import_export.admin import ImportExportModelAdmin
class NewsAdmin(ImportExportModelAdmin, admin.ModelAdmin):
  list_display = ['id', 'title', 'publish_date', 'update_date']
  search_fields = ['title']
  list_display_links = ('id', 'title')
  search_fields = ('id', 'title', 'text')
  # list_editable = ['text', 'image_src']

admin.site.register(News, NewsAdmin)
