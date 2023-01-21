from django.db import models
from simple_history.models import HistoricalRecords
class Collection(models.Model):
  collection = models.CharField(max_length=255);
  history = HistoricalRecords()

  def __str__(self):
    return self.collection
