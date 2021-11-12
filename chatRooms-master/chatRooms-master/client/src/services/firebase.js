import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvhJpAR1qgkyTf3ePybOdvcrE3EiIOzg4",
  authDomain: "posist-submission.firebaseapp.com",
  projectId: "posist-submission",
  storageBucket: "posist-submission.appspot.com",
  messagingSenderId: "661213923348",
  appId: "1:661213923348:web:7d737d088c80b8a6b67f01"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export default firebase