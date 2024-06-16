import {combineReducers, configureStore} from "@reduxjs/toolkit";
import actionReducer from '../features/actions/actionsSlice'

const rootReducer = combineReducers({
    actionReducer
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}


