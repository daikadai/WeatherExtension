import React, { useEffect, useState } from "react"
import { fetchOpenWeatherData, OpenWeatherdata, OpenWeatherTempScale } from '../../utils/api';
import { Box, Button, Card, CardActions, CardContent, Typography } from '@material-ui/core'

const WeatherCardContainer: React.FC<{
  children: React.ReactNode,
  onDelete?: () => void
}> = ({ children, onDelete }) => {
  return (
    <Box mx='4px' my='16px'>
      <Card>
        <CardContent>{children}</CardContent> 
        <CardActions>
          { onDelete && <Button onClick={onDelete} color='secondary'>Delete</Button>}
        </CardActions>
      </Card>
    </Box>
  )
}

type WeatherCardState = "loading" | "error" | "ready"

const WeatherCard: React.FC<{
  city: string, 
  tempScale: OpenWeatherTempScale,
  onDelete?: () => void
}> = ({ city, tempScale, onDelete }) => {
  const [weatherData, setWeatherData] = useState<OpenWeatherdata | null>(null)
  const [cardState,  setCardState] = useState<WeatherCardState>("loading")

  useEffect(() => {
    fetchOpenWeatherData(city, tempScale)
      .then(data => {
        setWeatherData(data)
        setCardState('ready')
      })
      .catch(err => {
        console.log(err)
        setCardState('error')
      })
  }, [city, tempScale])

  if(cardState == 'loading' || cardState == "error") {
    return <WeatherCardContainer onDelete={onDelete}>
      <Typography variant='body1'>
        {
          cardState == 'loading' ? 'Loading' : 'Error: could not retrieve weather data for this city'
        }
      </Typography>
    </WeatherCardContainer>
  }

  return (
    <WeatherCardContainer onDelete={onDelete}>
      <Typography variant='h5'>{weatherData.name}</Typography>
      <Typography variant='body1'>{weatherData.main.temp}</Typography>
      <Typography variant='body1'>Feel like: {weatherData.main.feels_like}</Typography>
    </WeatherCardContainer>
  )
}

export default WeatherCard
