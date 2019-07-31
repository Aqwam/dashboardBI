const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

const createNotification = notification => {
    return admin
        .firestore()
        .collection("notifications")
        .add(notification)
        .then(doc => console.log("notification added", doc));
};
exports.productCreated = functions.firestore
    .document("products/{productId}")
    .onCreate(doc => {
        const product = doc.data();
        const notification = {
            content: "added",
            user: `${product.productName}`,
            time: admin.firestore.FieldValue.serverTimestamp()
        };
        return createNotification(notification);
    });

exports.newEmployee = functions.auth.user().onCreate(user => {
    return admin
        .firestore()
        .collection("users")
        .doc(user.uid)
        .get()
        .then(doc => {
            const newUser = doc.data();
            const notification = {
                content: "registered",
                user: newUser.employeeName,
                time: admin.firestore.FieldValue.serverTimestamp()
            };
            return createNotification(notification);
        });
});

exports.deleteProduct = functions.firestore
    .document("products/{productId}")
    .onDelete(doc => {
        const product = doc.data();
        const notification = {
            content: "deleted",
            user: `${product.productName}`,
            time: admin.firestore.FieldValue.serverTimestamp()
        };
        return createNotification(notification);
    });
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
