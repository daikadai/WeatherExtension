import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { fetchOpenWeatherData } from '../utils/api'
import './popup.css'

const App: React.FC<{}> = () => {
  useEffect(() => {
    fetchOpenWeatherData('Hanoi')
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }, [])
  return (
    <div>
      <img src="icon.png" />
    </div>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
