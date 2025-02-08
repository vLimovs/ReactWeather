import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { getWeatherInfo } from "../../store/getWeatherSlice"

const Header = ({ changeTheme }) => {
const [city, setCity] = useState('')  
const dispatch = useDispatch()
const changeWeatherHandler = (city) => {
  dispatch(getWeatherInfo(city))
}
const isMounted = useRef(false)

useEffect(() => {
  if(isMounted.current && city) {
    changeWeatherHandler(city)
  }else {
    changeWeatherHandler('Tashkent')
  }
  isMounted.current = true
}, [city])

  return (
    <header className="header">
        <a href=""><img src="logo.svg" alt="" /></a>
        <div className="header__right">
            <button onClick={() => changeTheme()}><img src="theme.svg" alt="" /></button>
            <input 
              type="text"
              placeholder="Выбрать город"
              autoFocus 
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
        </div>
    </header>
  )
}

export default Header