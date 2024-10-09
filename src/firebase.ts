import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDWgQ-aghXIprmQm5NqOYC_mqOlMPNaUWI",
  authDomain: "letsgooo-bf21d.firebaseapp.com",
  databaseURL: "https://letsgooo-bf21d-default-rtdb.firebaseio.com",
  projectId: "letsgooo-bf21d",
  storageBucket: "letsgooo-bf21d.appspot.com",
  messagingSenderId: "461408922932",
  appId: "1:461408922932:web:86488db7e86ff53faac961",
  measurementId: "G-FMDXTGTDMN"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Enable offline persistence
enableIndexedDbPersistence(db).catch((err) => {
    if (err.code == 'failed-precondition') {
        console.warn('Multiple tabs open, persistence can only be enabled in one tab at a a time.');
    } else if (err.code == 'unimplemented') {
        console.warn('The current browser does not support all of the features required to enable persistence');
    }
});