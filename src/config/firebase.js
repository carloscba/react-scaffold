//PROD
const firebaseConfigProd = {}
//DEV
const firebaseConfigDev = {
  apiKey: "AIzaSyAyrAm4BA3BdROJILFf11QxK9DcZ_lPrRw",
  authDomain: "react-scaffold.firebaseapp.com",
  databaseURL: "https://react-scaffold.firebaseio.com",
  projectId: "react-scaffold",
  storageBucket: "react-scaffold.appspot.com",
  messagingSenderId: "486676752234"
}
  
const firebaseConfig = (window.env === 'dev') ?  firebaseConfigDev : firebaseConfigProd;
  
export default firebaseConfig;