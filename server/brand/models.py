from django.db import models

class Brand(models.Model):
  brand = models.CharField(max_length=255);

  def __str__(self):
    return self.brand
