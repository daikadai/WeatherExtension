import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "fontsource-roboto";
import "./popup.css";
import WeatherCard from "./WeatherCard";
import { IconButton, InputBase, Paper, Box, Grid } from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import { getStoredCities, setStoredCities, getStoredOption, LocalStorageOptions, setStoredOption } from '../utils/storage';

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [cityInput, setCityInput] = useState<string>('')
  const [options, setOptions] = useState<LocalStorageOptions | null>(null)

  useEffect(() => {
    getStoredCities().then(cities => setCities(cities))
    getStoredOption().then(options => setOptions(options))
  }, [])

  const handleCityButtonClick = () => {
    if(cityInput === '') {
      return
    }
    const updatedCitites = [...cities, cityInput]
    setStoredCities(updatedCitites)
      .then(() => {
        setCities([...cities, cityInput])
        setCityInput('')
      })
  }

  const handleDeleteButtonClick = (index: number) => {
    cities.splice(index,1)
    const updateCties = [...cities]
    setStoredCities(updateCties)
      .then(() => {
        setCities([...cities])
      })
  }

  const handleTempScaleButtonClick = () => {
    const updateOptions: LocalStorageOptions = {
      ...options,
      tempScale: options.tempScale === 'metric' ? 'imperial' : 'metric'
    }

    setStoredOption(updateOptions)
      .then(() => {
        setOptions(updateOptions)
      })
  }

  if(!options) return null

  return (
    <Box mx="8px" my="16px">
      <Grid container justifyContent='space-evenly'>
        <Grid item>
          <Paper>
            <Box px="15px" py="5px">
              <InputBase placeholder='Add a city name' value={cityInput} onChange={(e) => setCityInput(e.target.value)}/>
              <IconButton onClick={handleCityButtonClick}>
                <AddIcon />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
        <Grid item>
          <Paper>
            <Box py='4px'>
              <IconButton onClick={handleTempScaleButtonClick}>
                {options.tempScale === 'metric' ? '\u2103' : '\u2109'}
              </IconButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      {cities.map((city, index) => (
        <WeatherCard tempScale={options.tempScale} city={city} key={index} onDelete={() => handleDeleteButtonClick(index)} />
      ))}
      <Box height='16px'/>
    </Box>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
