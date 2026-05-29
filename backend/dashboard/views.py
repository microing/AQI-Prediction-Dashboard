from django.http import JsonResponse
from .services import get_aqi_data
from .models import AQIRecord

CITY_COORDS = {
    "delhi": (28.6139, 77.2090),
    "mumbai": (19.0760, 72.8777),
    "chennai": (13.0827, 80.2707),
    "bengaluru": (12.9716, 77.5946),
    "hyderabad": (17.3850, 78.4867),
    "kolkata": (22.5726, 88.3639),
    "jaipur": (26.9124, 75.7873),
    "lucknow": (26.8467, 80.9462),
    "bhopal": (23.2599, 77.4126),
    "patna": (25.5941, 85.1376),
    "ranchi": (23.3441, 85.3096),
    "raipur": (21.2514, 81.6296),
    "chandigarh": (30.7333, 76.7794),
    "dehradun": (30.3165, 78.0322),
    "shimla": (31.1048, 77.1734),
    "gangtok": (27.3389, 88.6065),
    "itanagar": (27.0844, 93.6053),
    "dispur": (26.1433, 91.7898),
    "agartala": (23.8315, 91.2868),
    "imphal": (24.8170, 93.9368),
    "kohima": (25.6751, 94.1086),
    "aizawl": (23.7271, 92.7176),
    "shillong": (25.5788, 91.8933),
    "bhubaneswar": (20.2961, 85.8245),
    "panaji": (15.4909, 73.8278),
    "thiruvananthapuram": (8.5241, 76.9366),
    "amaravati": (16.5062, 80.6480),
    "gandhinagar": (23.2156, 72.6369),
    "srinagar": (34.0837, 74.7973),
}


def hello(request):
    return JsonResponse({
        "message": "AQI Dashboard API is working!"
    })


def get_city_aqi(request, city):

    city = city.lower()

    if city not in CITY_COORDS:
        return JsonResponse({
            "error": "City not found"
        }, status=404)

    lat, lon = CITY_COORDS[city]

    data = get_aqi_data(lat, lon)

    aqi_info = data["list"][0]

    AQIRecord.objects.create(
        city=city.title(),
        aqi=aqi_info["main"]["aqi"],
        pm25=aqi_info["components"]["pm2_5"],
        pm10=aqi_info["components"]["pm10"]
    )

    return JsonResponse({
        "city": city.title(),
        "aqi": aqi_info["main"]["aqi"],
        "pm25": aqi_info["components"]["pm2_5"],
        "pm10": aqi_info["components"]["pm10"],
        "co": aqi_info["components"]["co"],
        "no2": aqi_info["components"]["no2"]
    })


def get_history(request):

    records = AQIRecord.objects.order_by('-created_at')[:10]

    data = []

    for record in records:
        data.append({
            "city": record.city,
            "aqi": record.aqi,
            "pm25": record.pm25,
            "pm10": record.pm10,
            "created_at": record.created_at.strftime("%Y-%m-%d %H:%M:%S")
        })

    return JsonResponse(data, safe=False)


def get_all_capitals_aqi(request):

    results = []

    for city, (lat, lon) in CITY_COORDS.items():

        data = get_aqi_data(lat, lon)

        aqi_info = data["list"][0]

        results.append({
            "city": city.title(),
            "aqi": aqi_info["main"]["aqi"],
            "pm25": aqi_info["components"]["pm2_5"],
            "pm10": aqi_info["components"]["pm10"]
        })

    return JsonResponse(results, safe=False)