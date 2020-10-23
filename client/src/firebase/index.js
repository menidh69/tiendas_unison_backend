import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCZaotWZ2BLiFfqi6AL2aedToh4VFO3iUo",
  authDomain: "tiendas-unison.firebaseapp.com",
  databaseURL: "https://tiendas-unison.firebaseio.com",
  projectId: "tiendas-unison",
  storageBucket: "tiendas-unison.appspot.com",
  messagingSenderId: "858069233922",
  appId: "1:858069233922:web:87453b828ab16d9d32921b",
  measurementId: "G-R12NY2YB84"
};

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage();

export {storage, firebase as default } ;
