from brand.models import Brand
from collection.models import Collection
from django.db import models
from datetime import *
from django.contrib.auth.models import User

class News(models.Model):
  title = models.CharField(max_length=100)
  text = models.TextField()
  image_src = models.CharField(max_length=255)
  publish_date = models.DateTimeField(auto_now_add=True)
  update_date = models.DateTimeField(auto_now=True, null=True)
  brand = models.ForeignKey(Brand, on_delete=models.SET_NULL, blank=True, null=True)
  collection = models.ForeignKey(Collection, on_delete=models.SET_NULL, blank=True, null=True)
  author = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True) 

  def __str__(self):
    return self.title
