const dotenv = require("dotenv");
dotenv.config();

const firebaseConfig = {
	apiKey: process.env.apiKey,
	authDomain: "discord-js-e4048.firebaseapp.com",
	databaseURL: "https://discord-js-e4048-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "discord-js-e4048",
	storageBucket: "discord-js-e4048.appspot.com",
	messagingSenderId: "964505542026",
	measurementId: "G-DQ0574RP9G",
	appId: "1:964505542026:web:2221717ff76aa8ed46fc73",
};

module.exports = {firebaseConfig};
