import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { loader, toast, user, addmember } from './reducers';
import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    loader: loader,
    toast: toast,
    user: user,
    addmember: addmember,
    form: formReducer
})

const middleware = [];
middleware.push(thunk);

const persistConfig = {
    //Root
    key: 'root',
    //Storage Method(React native)
    storage: AsyncStorage,
    //Whitelist (Save Specific Reducers)
    whitelist: ['user', 'addmember'],
    //Blacklist (Don't Save Specific Reducers)
    blacklist: ['loader', 'toast', 'form']
}
//Middleware: Redux persist persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);
//Redux: store 
const store = createStore(persistedReducer, applyMiddleware(...middleware));
//Middleware: Redux persist
const persistor = persistStore(store);
//Exports
export { store, persistor };