import axios from "axios";

const API_KEY = "6a78596d062df78380eff5944c4e5567";
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

export const FETCH_WEATHER = "FETCH_WEATHER";
export const FETCH_PROCESSES = "FETCH_PROCESSES";

export function fetchWeather(city) {
  const url = `${ROOT_URL}&q=${city},us`;
  const request = axios.get(url);

  return {
    type: FETCH_WEATHER,
    payload: request
  };
}

export function fetchProcesses() {
  return {
    type: FETCH_PROCESSES,
    payload: processesData
  };
}

export function selectProcess() {
  return {
    type: SELECT_PROCESS,
    payload: process
  };
}

// this is the json we get from the server:

var processesData = {
  "earliest_hour": 2,
  "latest_hour": 10,
  "processesList": [
		{
			"name": "RunAndClean",
			"id": 1,
			"start_hour": 2,
      "end_hour": 4,
      "childProcesses": [
        {
          "name": "perfGenWF_1",
          "id": 11,
          "profile_id": 20,
			    "start_hour": 2,
          "end_hour": 3
        },
        {
          "name": "perfGenWF_2",
          "id": 12,
          "profile_id": 4563,
			    "start_hour": 3,
          "end_hour": 4
        }
      ]
		},
		{
			"name": "RunAndClean",
			"id": 2,
			"start_hour": 4,
			"end_hour": 8,
      "childProcesses": [
        {
          "name": "perfGenWF_1",
          "id": 21,
          "profile_id": 20,
			    "start_hour": 4,
          "end_hour": 7
        },
        {
          "name": "perfGenWF_2",
          "id": 22,
          "profile_id": 4563,
			    "start_hour": 5,
          "end_hour": 7
        }
      ]
		},
		{
			"name": "RunAndClean",
			"id": 3,
			"start_hour": 8,
			"end_hour": 10,
    },
    {
			"name": "BDS",
			"id": 4,
			"start_hour": 3,
			"end_hour": 8,
      "childProcesses": [
        {
          "name": "download",
			    "id": 41,
			    "start_hour": 2,
          "end_hour": 3
        },
        {
          "name": "upload",
			    "id": 42,
			    "start_hour": 3,
          "end_hour": 4
        }
      ]
		}
	]
}
