from django.db import models
from datetime import *

class News(models.Model):
  title = models.CharField(max_length=100)
  text = models.TextField()
  image_src = models.CharField(max_length=255)
  publish_date = models.DateTimeField(auto_now_add=True)
  update_date = models.DateTimeField(null=True)
  # author = models.ForeignKey(User, on_delete=models.CASCADE) 

