import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth }      from "firebase/auth";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const firebaseConfig = {
  apiKey: "AIzaSyAWUXxzuVCzJXlpz7NfRtVSgF9HvylLQX0",
  authDomain: "rrmgame-7df52.firebaseapp.com",
  projectId: "rrmgame-7df52",
  storageBucket: "rrmgame-7df52.firebasestorage.app",
  messagingSenderId: "975432671213",
  appId: "1:975432671213:web:7495a65b68a80559f811e4",
  measurementId: "G-JNBJM2HTP5",
};

const app = initializeApp(firebaseConfig);
export const db   = getFirestore(app);
export const auth = getAuth(app);

let appCheck = null;
const appCheckSiteKey = import.meta.env.VITE_FIREBASE_APP_CHECK_SITE_KEY;

if (typeof window !== "undefined" && appCheckSiteKey) {
  appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(appCheckSiteKey),
    isTokenAutoRefreshEnabled: true,
  });
}

export { appCheck };
