import { combineReducers } from "redux";
import WeatherReducer from "./reducer_weather";
import ProcessReducer from "./reducer_processes";

const rootReducer = combineReducers({
  weather: WeatherReducer,
  processes: ProcessReducer
});

export default rootReducer;
