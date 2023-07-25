import './App.css';
import { useEffect, useState } from 'react';
import searchIcon from './assets/search.png';
import humidityIcon from './assets/humidity.png';
import cloudsIcon from './assets/clouds.png';
import pressureIcon from './assets/pressure.png';
import visibilityIcon from './assets/visibility.png';
import windSpeedIcon from './assets/wind.png';

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
  }, [weatherData])

  async function fetchData(e) {
    e.preventDefault();

    if(city.trim().length === 0) {
      setMessage("Enter a city name");
      return;
    }

    setMessage("Fetching data...");

    const res = await fetch(`http://localhost:8000/api/data/?city=${city.toLowerCase()}`)
    const { data, message: description } = await res.json();
    
    if(res.status === 200) {
      data.city = city;
      setWeatherData(data);
      setMessage('');
    }
    else {
      setMessage(description);
    }
  }

  function updateCity(e) {
    setCity(e.target.value);
    setMessage('');
  }

  return (
    <div className="App">
      {/* search bar */}
      <div className='form-container'>
        <form onSubmit={fetchData}>
          <input type="text" name="search" id="search" placeholder='Enter a city...' onChange={updateCity} />
          <button type="submit" className='submit-btn'>
            <img className='search-icon' src={searchIcon} alt="" />
          </button>
        </form>

        {/* display status to users */}
        <div className="message">{ message }</div>
      </div>

      {/* display the weather of the city searched */}
      <div className="data-container">
        <div className="left-container">
          <div className="location">
            { weatherData.city }
          </div>

          <div className="weather-icon">
            {
              (weatherData?.weather?.[0]?.icon && <img src={`https://openweathermap.org/img/wn/${weatherData?.weather?.[0]?.icon}@2x.png`} alt="weather icon" />) 
              ||
              ('Enter a city to see it\'s weather info')
            }
          </div>
          { weatherData?.weather?.[0].description }

          <div className="temperature">
            { (weatherData?.main?.temp || '-') + ' °C' }
          </div>
        </div>

        <div className='horizontal-line'></div>

        <div className="right-container">
          <div className="humidity">
            <div>
              <img src={humidityIcon} alt="humidity" />
              <span>Humidity</span>
            </div>
            { (weatherData?.main?.humidity || '-') + ' %'  } 
          </div>

          <div className="visibility">
            <div>
              <img src={visibilityIcon} alt="humidity" />
              <span>Visibility</span>
            </div>
            
            { (weatherData?.visibility || '-') + ' m' }
          </div>

          <div className="wind-speed">
            <div>
              <img src={windSpeedIcon} alt="humidity" />
              <span>Wind Speed</span>
            </div>
            { (weatherData?.wind?.speed || '-') + ' m/s' }
          </div>

          <div className="pressure">
            <div>
              <img src={pressureIcon} alt="humidity" />
              <span>Pressure</span>
            </div>
            { (weatherData?.main?.pressure || '-') + ' hPa'}
          </div>

          <div className="cloudiness">
            <div>
              <img src={cloudsIcon} alt="humidity" />
              <span>Cloudiness</span>
            </div>
            { (weatherData?.clouds?.all || '-') + '%'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;