// firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "AIzaSyBtTZxVIg3DoLTF1eqWpzeLNhYun8dQrG8",
    authDomain: "push-notification-1874a.firebaseapp.com",
    projectId: "push-notification-1874a",
    messagingSenderId: "914824646317",
    appId: "1:914824646317:web:2d9b7323e5de919a2e8024"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log("Received background message: ", payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: "/firebase-logo.png", // optional
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
