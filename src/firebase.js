import * as firebase from 'firebase';


// const settings = { timestampsInSnapshots: true };

const config = {
    apiKey: "AIzaSyBzNkvKll_FGXo7flWkJo9-KfsH-6OxHEk",
    authDomain: "encuesta-c3627.firebaseapp.com",
    databaseURL: "https://encuesta-c3627.firebaseio.com",
    projectId: "encuesta-c3627",
    storageBucket: "encuesta-c3627.appspot.com",
    messagingSenderId: "265367626073",
    appId: "1:265367626073:web:0b53340dbfd5bc4fbd6c48",
    measurementId: "G-36S4JVD01P"
};
firebase.initializeApp(config);
firebase.firestore();

export default firebase;

