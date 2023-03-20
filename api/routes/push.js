'use strict';

const express = require('express');
const web_push = require("web-push");

const { options } = require('../controllers');

const router = express.Router();


/*
 * Routes - Actions
 */
const vapidKeys = {
    publicKey: process.env.VAPID_PUBLIC_KEY,
    privateKey: process.env.VAPID_PRIVATE_KEY
};

const vapid_options = {
    vapidDetails: {
        subject: 'mailto:pushmaster@example.com',
        publicKey: vapidKeys.publicKey,
        privateKey: vapidKeys.privateKey,
    },
    TTL: 60,
};

// // get client subscription config from db
// const subscription = {
//     endpoint:
//         encodeURI("https://updates.push.services.mozilla.com/wpush/v2/gAAAAABkEx9xkon7SlXAgjZvYR3PR6tFCMBuBTWi9l_vqILeJjqo6CEQNBYzpTX6WIjhqnQegVXbBoA80VycShtVPWNkBE4ackuM8VrWkYvTFvqGhft9Xd3W5xlgYFseAqz7h-lJtZDF43vzTG__V9QRizne1hY0iZpU-zdhlnsH20sXxphrg20"),
//     expirationTime: null,
//     keys: {
//         auth: "Noq1ANwXCwDioNBmBx5E4g",
//         p256dh: "BD_50xKbQatarJUNwzl-XypucrcgYU5NcXQ6g3XcPmY5WfZqE7QLyJ9QpclqswMMCIewAc7MVU6Oaz3Xd86pH48"
//     }
// };

const payload = {
    "action": "baz",
    "notification": {
        "title": "New Notification!",
        "actions": [
            { "action": "foo", "title": "Open new tab" },
            { "action": "bar", "title": "Focus last" },
            { "action": "baz", "title": "Navigate last" },
            { "action": "qux", "title": "Send request in the background" },
            { "action": "other", "title": "Just notify existing clients" }
        ],
        "data": {
            "onActionClick": {
                "default": { "operation": "openWindow", "url": "http://localhost:3000/api/heroes" },
                "foo": { "operation": "openWindow", "url": "http://localhost:3000/api/heroes/id/15" },
                "bar": { "operation": "focusLastFocusedOrOpen", "url": "/detail/14" },
                "baz": { "operation": "navigateLastFocusedOrOpen", "url": "/detail/15" },
                "qux": { "operation": "sendRequest", "url": "http://localhost:3000/api/heroes/id/16" }
            }
        }
    }
};

// -- should move in controllers

function send_public_key(req, res, next) {
    console.debug("Push (send public key)");

    try {
        res.status(200).json({ VAPID_PUBLIC_KEY: process.env.VAPID_PUBLIC_KEY });
    } catch (error) {
        console.error(error);
        res.status(404).json({ error });
    }
}

const subscriptions = [];

function register(req, res, next) {
    console.debug("Push (register)");

    try {
        console.debug(req.body);
        subscriptions.push(req.body);
        res.status(201).json({ status: 201 });
    } catch (error) {
        console.error(error);
        res.status(404).json({ error });
    }
}

function send_notification(req, res, next) {
    console.debug("Push (send notification)");
    setTimeout(notification, 10000);
}

function notification(req, res, next) {
    console.debug("Push (notification)");
    console.debug("Params:", req.params);
    console.debug("Body  :", req.body);

    console.debug(JSON.stringify(payload));
    console.debug(subscriptions[0]);


    subscriptions.forEach(subscription =>
        web_push
            .sendNotification(subscription, JSON.stringify(payload), vapid_options)
            .then(rv => {
                console.debug(rv);
                res.status(201).json(rv);
            })
            .catch(error => {
                console.error(error);
                res.status(500);
            }
        )
    );
}

// -- Push Routes - /api/push

// -- 
router.get('/vapidPublicKey', send_public_key);
router.post('/register', register);
router.post('/notify', notification);


// -- options
router.options('/', options);

module.exports = router;
