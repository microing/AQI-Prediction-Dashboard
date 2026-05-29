import requests

API_KEY = "09a5cd89a6b145508fe6dff88a6b2157"

def get_aqi_data(lat, lon):
    url = f"https://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={API_KEY}"

    response = requests.get(url)

    return response.json()