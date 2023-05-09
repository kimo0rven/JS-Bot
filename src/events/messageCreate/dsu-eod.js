const dotenv = require("dotenv");
const {initializeApp} = require("firebase/app");
const {getFirestore, collection, doc, setDoc, updateDoc, getDocs, query, where, onSnapshot} = require("firebase/firestore");
const {Client, Message, Guild} = require("discord.js");

const {DSU_EOD_Channel} = require("../../../config.json");
let dsuEodChannelId = DSU_EOD_Channel;
dotenv.config();
//
const firebaseConfig = {
	apiKey: process.env.apiKey,
	authDomain: "discord-js-e4048.firebaseapp.com",
	databaseURL: "https://discord-js-e4048-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "discord-js-e4048",
	storageBucket: "discord-js-e4048.appspot.com",
	messagingSenderId: "964505542026",
	measurementId: "G-DQ0574RP9G",
	appId: process.env.appId,
};
/**
 *
 * @param { Client } client
 * @param { Message } message
 */

module.exports = async (client, message) => {
	initializeApp(firebaseConfig);
	const db = getFirestore();

	if (!message.inGuild() || message.author.bot) return;

	//DSU
	if (message.content.startsWith("DSU") && message.channelId == dsuEodChannelId) {
		const colRef = collection(db, "DSU");

		//query
		var dateToday = new Date(message.createdTimestamp).toDateString();
		const dateQuery = query(colRef, where("date", "==", dateToday), where("user_id", "==", message.author.id));

		var recordsList = [];
		const records = await getDocs(dateQuery);
		records.forEach((doc) => {
			recordsList.push({...doc.data(), id: doc.id});
		});

		if (recordsList.length == 0) {
			await setDoc(doc(colRef), {
				date: new Date(message.createdTimestamp).toDateString(),
				user: message.author.username,
				user_id: message.author.id,
				time: message.createdTimestamp,
				message: message.content,
				message_id: message.id,
			});
		} else {
			var dsu = [];
			await getDocs(colRef)
				.then((snapshot) => {
					snapshot.docs.forEach((doc) => {
						dsu.push({...doc.data(), id: doc.id});
					});
				})
				.catch((err) => {
					console.log(err.message);
				});

			recordID = recordsList.map((entry) => {
				return entry.id;
			});

			const docRef = doc(db, "DSU", recordID.toString());
			updateDoc(docRef, {
				message: message.content,
			});
		}
	}

	//EOD
	if (message.content.startsWith("EOD") && message.channelId == dsuEodChannelId) {
		const colRef = collection(db, "EOD");

		//query
		var dateToday = new Date(message.createdTimestamp).toDateString();
		const dateQuery = query(colRef, where("date", "==", dateToday), where("user_id", "==", message.author.id));

		var recordsList = [];
		const records = await getDocs(dateQuery);
		records.forEach((doc) => {
			recordsList.push({...doc.data(), id: doc.id});
		});

		if (recordsList.length == 0) {
			await setDoc(doc(colRef), {
				date: new Date(message.createdTimestamp).toDateString(),
				user: message.author.username,
				user_id: message.author.id,
				time: message.createdTimestamp,
				message: message.content,
				message_id: message.id,
			});
		} else {
			var eod = [];
			await getDocs(colRef)
				.then((snapshot) => {
					snapshot.docs.forEach((doc) => {
						eod.push({...doc.data(), id: doc.id});
					});
				})
				.catch((err) => {
					console.log(err.message);
				});

			recordID = recordsList.map((entry) => {
				return entry.id;
			});

			const docRef = doc(db, "EOD", recordID.toString());
			updateDoc(docRef, {
				message: message.content,
			});
		}
	}
};
