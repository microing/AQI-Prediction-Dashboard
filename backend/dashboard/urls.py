from django.urls import path
from .views import (
    hello,
    get_city_aqi,
    get_history,
    get_all_capitals_aqi
)

urlpatterns = [
    path('hello/', hello),
    path('aqi/<str:city>/', get_city_aqi),
    path('history/', get_history),
    path('all-capitals/', get_all_capitals_aqi),
]