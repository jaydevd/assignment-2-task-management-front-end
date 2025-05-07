import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyBtTZxVIg3DoLTF1eqWpzeLNhYun8dQrG8",
    authDomain: "push-notification-1874a.firebaseapp.com",
    projectId: "push-notification-1874a",
    storageBucket: "push-notification-1874a.firebasestorage.app",
    messagingSenderId: "914824646317",
    appId: "1:914824646317:web:2d9b7323e5de919a2e8024"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestFirebaseNotificationPermission = async () => {
    try {
        // await deleteToken(messaging);
        const token = await getToken(messaging, {
            vapidKey: "BK10DcC3gnh2lzJMrWiZL8OcjVC9ph754GPRSakfGYanLp76pJHlW8Xq2Pb1rtlQU8NwV-XLmbsYx35vhNyIqA0",
        });
        console.log("FCM Token:", token);
        return token;
    } catch (err) {
        console.error("Permission denied", err);
        return null;
    }
};
export const onMessageListener = () =>
    new Promise(resolve => {
        onMessage(messaging, payload => {
            resolve(payload);
        });
    });
