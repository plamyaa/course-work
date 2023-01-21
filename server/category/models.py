from django.db import models
from simple_history.models import HistoricalRecords
class Category(models.Model):
  category = models.CharField(max_length=255);
  history = HistoricalRecords()

  def __str__(self):
    return self.category