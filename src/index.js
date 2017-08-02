import React from 'react'
import ReactDOM from 'react-dom'
import App from './routes/App'
import { Provider } from 'react-redux' 

import initialState from './store/initialState.json'
import storeFactory from './store'

const sessionState = (sessionStorage.getItem('store')) ? 
    JSON.parse(sessionStorage.getItem('store')) :
    initialState

const saveState = () => {
    sessionStorage.setItem('store', JSON.stringify(store.getState()));
}

const store = storeFactory(sessionState);
store.subscribe(()=>{
    saveState();
})

ReactDOM.render(    
    <Provider store={ store }><App /></Provider>, 
    document.getElementById('root')
);