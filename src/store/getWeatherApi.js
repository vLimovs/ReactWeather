import axios from "axios";
const API_GEO_URL     = 'https://api.openweathermap.org/geo/1.0/direct?'
const API_WEATHER_URL = 'https://api.openweathermap.org/data/2.8/onecall?'
const API_KEY         = 'fc59ec0ddc4cf16e8b62eab581ff4387'


export const getWeatherData = async (city) => {
    try {
        const geoResponse = await axios.get(
            `${API_GEO_URL}q=${city}&appid=${API_KEY}`
        )
        const {lat, lon, local_names:names} = geoResponse.data?.[0]
        
        const weatherResponse = await axios.get(
            `${API_WEATHER_URL}lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&lang=ru&appid=${API_KEY}`
        )
        const allData = {...weatherResponse.data, names}
        return {
            geoData: geoResponse.data,
            weatherData: allData
        }
    } catch (error) {
        console.error(error)
    }
}
