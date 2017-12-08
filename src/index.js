import React from 'react'
import ReactDOM from 'react-dom'
import App from './routes/App'
import { Provider } from 'react-redux' 

import initialState from './store/initialState.json'
import storeFactory from './store'

import config from './config/app'

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

/**
 * Scaffold initial config
 */

window.env = (window.location.host.indexOf('localhost') > -1 || window.location.host.indexOf('ngrok') > -1) ? 'dev' : 'prod';
const app = config.get(window.env);

//Si no esta presente el path de idioma
if(app.hhtps && window.location.href.indexOf('/en') === -1 && window.location.href.indexOf('/es') === -1 && window.location.href.indexOf('/pt') === -1){
    let protocol = (app.https) ? 'https://' : 'http://';
    window.location = `${protocol}${window.location.hostname}/${app.paths[0]}`;
}
//Forzando ruta a https
if(app.hhtps && window.location.protocol !== 'https:'){
    let newUrl = window.location.href.replace(/^http:\/\//i, 'https://');
    window.location = newUrl;
}

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
    
    window.fbAsyncInit = function() {
        window.FB.init({
            appId            : app.facebook.id,
            autoLogAppEvents : true,
            xfbml            : true,
            version          : 'v2.9'
        });
        window.FB.AppEvents.logPageView();
    };
}(document, 'script', 'facebook-jssdk'));

