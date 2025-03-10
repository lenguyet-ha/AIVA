// third-party
import { combineReducers } from "redux";
import userState from "./userState";
import navigation from "./navigation";
import tableDetail from "./tableDetail";
import snackbar from "./snackbar";
import onboarding from "./onboarding";
import taskadd from "./taskAdd";
// project import

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  userState,
  navigation,
  tableDetail,
  snackbar,
  onboarding,
  taskadd,
});

export default reducers;
