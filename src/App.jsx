import { useEffect } from "react"
import Current from "./components/Current/Current"
import Header from "./components/Header/Header"

const App = () => {
  useEffect(() => {
    let body = document.querySelector('body')
    body.classList.add(localStorage.theme ? JSON.parse(localStorage.theme) : 'light')
  }, [])
  
  const changeTheme = () => {
    let body = document.querySelector('body')
    localStorage.setItem('theme', JSON.stringify(body.className))
    let isDark = JSON.parse(localStorage.theme)
    if(isDark === 'light'){
      body.classList.remove('light')
      body.classList.add('dark')
      localStorage.theme = JSON.stringify('dark')
    }else{
      body.classList.remove('dark')
      body.classList.add('light')
      localStorage.theme = JSON.stringify('light')
    }
  }
  
  return (
    <div className="container">
      <Header changeTheme={changeTheme}/>
      <Current/>
    </div>
  )
}

export default App