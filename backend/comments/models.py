from django.db import models
from django.utils import timezone

class Comment(models.Model):
    author = models.CharField(max_length=50)
    text = models.TextField()
    date = models.DateTimeField(default=timezone.localtime)
    likes = models.IntegerField(default=0)
    image = models.URLField(blank=True, null=True)

    class Meta:
        ordering = ['-date']