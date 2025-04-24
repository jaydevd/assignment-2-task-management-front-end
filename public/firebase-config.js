import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyBtTZxVIg3DoLTF1eqWpzeLNhYun8dQrG8",
    authDomain: "push-notification-1874a.firebaseapp.com",
    projectId: "push-notification-1874a",
    storageBucket: "push-notification-1874a.firebasestorage.app",
    messagingSenderId: "914824646317",
    appId: "1:914824646317:web:2d9b7323e5de919a2e8024"
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);