
# Description

This is a simple web app with a single end point in the api to retrieve weather data from external [API](https://openweathermap.org/api). The front-end consists of a single page to display the information based on the user input in the search bar.

###### Technologies used 
ReactJS, Django, DjangoRestFramework

# Live site URL

[Weather App](https://simple-weather-app-3f6x.vercel.app/)

# Installation

Fork the repository or clone it locally using the command  `git clone https://github.com/Tejas-117/Simple-weather-app` and then `cd Simple-weather-app`

## Frontend

##### Requirements
[Node.js](https://nodejs.org/en/download) and npm should be installed locally

##### Commands 
1. `cd client` -> move into the client directory in the terminal.
2. `npm install` -> installs the necessary packages
3. `npm run start` -> starts the app in development mode at [http://localhost:3000](http://localhost:3000)

## Backend

#### Requirements
[Python](https://www.python.org/downloads/) and pip should be installed in the system.

#### Commands
1. `cd` to the root directory of the project.
2. create a python virtual environment by running `python -m venv myenv`.
3. activate the virtual environment using `source myenv/bin/activate`.
4. move into the django project by `cd weather_api` and install the necessary packages using `pip install -r requirements.txt`.
5. create a `.env` file and add the fields present in `example.env`.
6. run `python manage.py migrate` to reflect database migrations in sqlite database
7. start the local server by using `python manage.py runserver`, the server will be started at [http://localhost:8000](http://localhost:8000/)