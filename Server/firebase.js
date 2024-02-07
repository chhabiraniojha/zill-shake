const firebaseAdmin = require('firebase-admin');

const serviceAccount = require('./firebase-adminsdk.json');

firebaseAdmin.initializeApp({
	apiKey: "AIzaSyCmMosnnOPUnt-aFq3DJQmMS0-jt394PcU",
	authDomain: "egmi-9f3c8.firebaseapp.com",
	projectId: "egmi-9f3c8",
	storageBucket: "egmi-9f3c8.appspot.com",
	messagingSenderId: "639614839771",
	appId: "1:639614839771:web:a5234689e8a09baa9d15fe",
});

module.exports = firebaseAdmin;