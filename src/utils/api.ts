const OPEN_WEATHER_API_KEY = 'b786e38d414c016a8383aafdbe2eb3c5'

export interface OpenWeatherdata {
  name: string,
  main: {
    temp: number,
    feels_like: number,
    humidity: number,
    pressure: number,
    temp_max: number,
    temp_min: number
  }
  weather: {
    description: string,
    icon: string,
    id: number,
    main: string
  }[]
  wind: {
    deg: number,
    speed: number
  }
}

export async function fetchOpenWeatherData(city: string): Promise<OpenWeatherdata> {
  const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${OPEN_WEATHER_API_KEY}`)
  if(!res.ok) {
    throw new Error('City not found')
  }

  const data: OpenWeatherdata = await res.json()

  return data
}