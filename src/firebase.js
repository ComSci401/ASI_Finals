import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
    apiKey: "AIzaSyASX8lWHpvcEHPm3Z0ce3leRCAb9mnujrc",
    authDomain: "asi-crud.firebaseapp.com",
    databaseURL: "https://asi-crud-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "asi-crud",
    storageBucket: "asi-crud.appspot.com",
    messagingSenderId: "396877649579",
    appId: "1:396877649579:web:cecdad83fa478c766a09ee",
    measurementId: "G-ZKLQSCM0VM"
  };

  const fireDb = firebase.initializeApp(firebaseConfig);
  export default fireDb.database().ref();
