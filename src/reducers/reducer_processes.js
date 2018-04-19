import { FETCH_PROCESSES } from "../actions/index";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_PROCESSES:
    {
      return [action.payload, ...state];
    }
  }
  return state;
}
