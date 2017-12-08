const PROD = {
    https : false,
    checkPath : true,
    callback : '/home',
    facebook : {
        id : 11111111111
    },
    paths : ['en', 'es', 'pt'],
    firebase : {
        apiKey: "AIzaSyAyrAm4BA3BdROJILFf11QxK9DcZ_lPrRw",
        authDomain: "react-scaffold.firebaseapp.com",
        databaseURL: "https://react-scaffold.firebaseio.com",
        projectId: "react-scaffold",
        storageBucket: "react-scaffold.appspot.com",
        messagingSenderId: "486676752234"
    }
}

const DEV = {
    https : false,
    checkPath : true,
    callback : '/home',
    paths : ['en', 'es', 'pt'],
    facebook : {
        id : 11111111111
    },
    firebase : {
        apiKey: "AIzaSyAyrAm4BA3BdROJILFf11QxK9DcZ_lPrRw",
        authDomain: "react-scaffold.firebaseapp.com",
        databaseURL: "https://react-scaffold.firebaseio.com",
        projectId: "react-scaffold",
        storageBucket: "react-scaffold.appspot.com",
        messagingSenderId: "486676752234"
    }
}

module.exports.get = (env) => (env === 'dev') ?  DEV : PROD;