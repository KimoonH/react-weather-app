import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useEffect, useState } from "react";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
import ClipLoader from "react-spinners/ClipLoader";

// 1. 앱이 실행되자마자 현재 위치기반 날씨 정보.
// 2. 날씨 정보에는 도시, 섭씨, 화씨, 날씨 상태
// 3, 5개의 버튼 (현재 지역, 4개의 도시)
// 4, 도시 버튼을 클릭 할 때마다 도시별 날시가 나온다
// 5. 현재 위치 버튼을 누르면, 다시 현재 위치 기반 날씨 정보가 나온다.
// 6. 데이터 들고 오는 동안 로딩 스피너.

function App() {

  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('')
  const cities = ['paris', 'new york', 'tokyo', 'seoul']
  const [loading, setLoading] = useState(false)

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon)
    });
  }
  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=726d97ec75de043571f7cdbe861a3956&units=metric`
    setLoading(true);
    let response = await fetch(url)
    let data = await response.json();
    setWeather(data);
    setLoading(false);
  }

  const getWeatherByCity = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=726d97ec75de043571f7cdbe861a3956&units=metric`
    setLoading(true);
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data)
    setLoading(false);
  }

  useEffect(() => {
    if (city == '') {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }

  }, [city])


  return (
    <div>
      {loading ? <div className="container"> (<ClipLoader
        color="#f88c6b"
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />)</div> : (<div className="container">
        <WeatherBox weather={weather} />
        <WeatherButton cities={cities} setCity={setCity} />
      </div>)}
    </div>
  );
}

export default App;
