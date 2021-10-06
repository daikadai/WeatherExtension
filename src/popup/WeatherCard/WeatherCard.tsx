import React, { useEffect, useState } from "react"
import { fetchOpenWeatherData, OpenWeatherdata } from '../../utils/api';
import { Box, Card, CardContent, Typography } from '@material-ui/core'

const WeatherCard: React.FC<{city: string}> = ({ city }) => {
  const [weatherData, setWeatherData] = useState<OpenWeatherdata | null>(null)

  useEffect(() => {
    fetchOpenWeatherData(city)
      .then(data => setWeatherData(data))
      .catch(err => console.log(err))
  }, [city])

  if(!weatherData) {
    return <div>Loading...</div>
  }
  
  return (
    <Box mx='4px' my='16px'>
      <Card>
      <CardContent>
        <Typography variant='h5'>{city}</Typography>
        <Typography variant='body1'>{weatherData.main.temp}</Typography>
        <Typography variant='body1'>Feel like: {weatherData.main.feels_like}</Typography>
      </CardContent>
    </Card>
    </Box>
  )
}

export default WeatherCard
