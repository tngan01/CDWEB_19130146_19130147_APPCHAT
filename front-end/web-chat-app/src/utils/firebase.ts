import { initializeApp } from "firebase/app";
import {getStorage, getDownloadURL , ref} from 'firebase/storage'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnB6rxu_5EWhrysccvT0NrNmrkrWwd_oM",
  authDomain: "chatapp-1a3f5.firebaseapp.com",
  projectId: "chatapp-1a3f5",
  storageBucket: "chatapp-1a3f5.appspot.com",
  messagingSenderId: "889781889632",
  appId: "1:889781889632:web:7f83f934423b694d627105"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage:any = getStorage(app)