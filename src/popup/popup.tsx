import React, { useState } from "react";
import ReactDOM from "react-dom";
import "fontsource-roboto";
import "./popup.css";
import WeatherCard from "./WeatherCard";
import { IconButton, InputBase, Paper, Box, Grid } from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>(["Hanoi", "Saigon", "Error"]);
  const [cityInput, setCityInput] = useState<string>('')

  const handleCityButtonClick = () => {
    if(cityInput === '') {
      return
    }
    setCities([...cities, cityInput])
    setCityInput('')
  }

  const handleDeleteButtonClick = (index: number) => {
    cities.splice(index,1)
    setCities([...cities])
  }

  return (
    <Box mx="8px" my="16px">
      <Grid container>
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
      </Grid>
      {cities.map((city, index) => (
        <WeatherCard city={city} key={index} onDelete={() => handleDeleteButtonClick(index)} />
      ))}
      <Box height='16px'/>
    </Box>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
