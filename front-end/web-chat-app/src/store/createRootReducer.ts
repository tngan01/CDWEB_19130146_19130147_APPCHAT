import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { combineReducers, Reducer } from 'redux';
import auth from 'providers/AuthProvider/slice';
import general from 'providers/GeneralProvider/slice';
import messages from 'providers/MessengerProvider/slice'


const createRootReducer = (history: History): Reducer =>
  combineReducers({
    router: connectRouter(history),
    auth,
    general,
    messages
  });
export default createRootReducer;
