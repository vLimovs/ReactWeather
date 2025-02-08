import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Skeleton from "./Skeleton"

const Current = () => {
  const weatherInfo = useSelector((state) => state.weather.data?.weatherData)
  const [current, setCurrent] = useState(null)
  const [names, setNames] = useState(null)
  const [daily, setDaily] = useState(null)
  useEffect(() => {
    if (weatherInfo) {
      setCurrent(weatherInfo.current)
      setNames(weatherInfo.names)
      setDaily(weatherInfo.daily)
      console.log(weatherInfo);
      
    }
  }, [weatherInfo])

  const getPressLvl = (press) => {
    if (press < 1000) return 'Низкое'
    else if (press >= 1013 && press < 1025) return 'Нормальное'
    else return 'Высокое'
  }

  const getWindDir = (deg) => {
    const directions = [
      "северный", "северо-восточный", "восточный", "юго-восточный",
      "южный", "юго-западный", "западный", "северо-западный"
    ];
    const index = Math.round(deg / 45) % 8;
    return directions[index];
  }
  
  const getWindStr = (speed) => {
    if(speed < 5.5) return 'слабый'
    else if(speed < 10.1) return 'средний'
    else return 'сильный'
  }

  const weekDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
  const getDate = (offset) => {
    const date = new Date(new Date().getTime() + offset * 1000)
    const hours   = ('0' + date.getUTCHours()).slice(-2)
    const minutes = ('0' + date.getUTCMinutes()).slice(-2)
    return `${hours}:${minutes}`
  }
  
  return (
    <>
      {current && names && daily ? (
        <>
          <div className="current">
            <div className="current__left">
              <h1>{Math.round(current.temp)}°</h1>
              <h2>Сегодня</h2>
              <p>Время: {getDate(weatherInfo?.timezone_offset)}</p>
              <p>Город: {names.ru ?? names.en}</p>
              <img src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@4x.png`} alt="" />
            </div>
            <div className="current__right">
              <ul className="current__right-list">
                <li>
                  <div><img src="temp.svg" alt="" /></div>
                  <h3>Температура</h3>
                  <p>{Math.round(current.temp)}° - ощущается как {Math.round(current.feels_like)}°</p>
                </li>
                <li>
                  <div><img src="pressure.svg" alt="" /></div>
                  <h3>Давление</h3>
                  <p>{(current.pressure * 0.75006375541921).toFixed(1)} мм ртутного столба - {getPressLvl(current.pressure)}</p>
                </li>
                <li>
                  <div><img src="precip.svg" alt="" /></div>
                  <h3>Осадки</h3>
                  <p>{current.humidity ? current.humidity + '%' : 'Без осадков'}</p>
                </li>
                <li>
                  <div><img src="wind.svg" alt="" /></div>
                  <h3>Ветер</h3>
                  <p>{Math.round(current.wind_speed)} м/с {getWindDir(current.wind_deg)} - {getWindStr(current.wind_speed)} ветер</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="weekly">
            <h2>На неделю</h2>
            <div className="weekly__content">
              {daily.map((day, idx) => (
                <div className="weekly__content-day" key={idx}>
                  <h3>{idx === 0 ? 'Сегодня' : idx === 1 ? 'Завтра' : weekDays[new Date(day.dt * 1000).getDay()]}</h3>
                  <p>{new Date(day.dt * 1000).toLocaleDateString('ru-Ru', {
                    day: "2-digit",
                    month: "short"
                  })}</p>
                  <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt="" />
                  <span>{Math.round(day.temp.max)}°</span>
                  <span>{Math.round(day.temp.min)}°</span>
                  <p>{day.weather[0].description}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (<Skeleton/>)}
    </>
  )
}

export default Current