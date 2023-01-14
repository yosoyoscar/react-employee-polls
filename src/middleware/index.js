import thunk from "redux-thunk";
import logger from "./logger";
import { applyMiddleware } from "redux";

// TODO: activate logger
//export default applyMiddleware(thunk, logger);
export default applyMiddleware(thunk);
