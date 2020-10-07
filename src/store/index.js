import { applyMiddleware, createStore, combineReducers } from 'redux';
import CreateSagaMiddelware from 'redux-saga';
import {productsReducer} from "./redusers/productsReducer";
import {loginReducer} from './redusers/loginReducer';
import {sagaWatcher} from "./sagas";

const saga = CreateSagaMiddelware()

function logger({ getState }) {
    return next => action => {
        console.log('ACTION ', action)

        // Call the next dispatch method in the middleware chain.
        const returnValue = next(action)

        console.log('NEW STATE', getState())

        // This will likely be the action itself, unless
        // a middleware further in chain changed it.
        return returnValue
    }
}

export const store = createStore(
    combineReducers({products: productsReducer, login: loginReducer}),
    applyMiddleware(logger, saga)
)

saga.run(sagaWatcher)
