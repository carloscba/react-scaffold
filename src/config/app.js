//PROD
const prod = {
    appId : '',
    callback : '',
    firebase : {}    
}
//DEV
const dev = {
    appId : '274577893018994',
    callback : '/home',
    firebase : {
        apiKey: "AIzaSyAyrAm4BA3BdROJILFf11QxK9DcZ_lPrRw",
        authDomain: "react-scaffold.firebaseapp.com",
        databaseURL: "https://react-scaffold.firebaseio.com",
        projectId: "react-scaffold",
        storageBucket: "react-scaffold.appspot.com",
        messagingSenderId: "486676752234"
    }
}
  
const config = (window.env === 'dev') ?  dev : prod;
  
export default config;