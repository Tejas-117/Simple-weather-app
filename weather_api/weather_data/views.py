from rest_framework.decorators import api_view
from rest_framework.response import Response
import requests, os

# params: city (query parameter)
# response: weather data of the city in the params
@api_view(['GET'])
def get_data(request):

   # retrieve the requested city name
   city = request.query_params.get('city')

   if city is None:
      return Response(data = { "message": "Include name of the city" }, status = 400)

   # get data from external API
   api_key = os.environ.get('WEATHER_API_KEY')

   # first get the coordinates of the city mentioned
   res = requests.get(f'http://api.openweathermap.org/geo/1.0/direct?q={city}&limit=1&appid={api_key}')
   json_data = res.json()

   if len(json_data) == 0:
      return Response(data = { "message": "City not found." }, status = 400)

   lat, lon = json_data[0]['lat'], json_data[0]['lon']

   # using the coordinates get the weather data of the city
   res = requests.get(f'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=metric&appid={api_key}')

   return Response(data = { "data": res.json(), "message": "Successfully retrieved data" },status = 200)