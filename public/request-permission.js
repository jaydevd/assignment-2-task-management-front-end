// request-permission.ts
import { getToken } from 'firebase/messaging';
import { messaging } from './../public/firebase-config';

export const requestNotificationPermission = async () => {
    try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            const token = await getToken(messaging, {
                vapidKey: "BK10DcC3gnh2lzJMrWiZL8OcjVC9ph754GPRSakfGYanLp76pJHlW8Xq2Pb1rtlQU8NwV-XLmbsYx35vhNyIqA0",
            });
            console.log('FCM Token:', token);
            // Save this token on your server to send push messages
        } else {
            console.error('Permission not granted for notifications');
        }
    } catch (err) {
        console.error('Error getting permission or token', err);
    }
};
