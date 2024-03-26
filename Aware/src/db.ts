import { initializeApp } from "firebase/app";
import { Database, getDatabase } from "firebase/database";


let exportDB: Database
const startDB = () => {
    // TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    // ...
    // The value of `databaseURL` depends on the location of the database
    databaseURL: "https://awaredb-3cfbb-default-rtdb.firebaseio.com/",
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  
  
  // Initialize Realtime Database and get a reference to the service
  const database = getDatabase(app);
  exportDB = database
}

export { startDB, exportDB as db }