from django.db import models

class AQIRecord(models.Model):
    city = models.CharField(max_length=100)
    aqi = models.IntegerField()
    pm25 = models.FloatField()
    pm10 = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.city} - AQI {self.aqi}"