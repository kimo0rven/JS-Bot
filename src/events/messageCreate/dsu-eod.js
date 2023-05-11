const dotenv = require("dotenv");
const {Client, Message} = require("discord.js");
const {initializeApp} = require("firebase/app");
const {getFirestore, collection, doc, setDoc, updateDoc, getDocs, query, where} = require("firebase/firestore");
const {firebaseConfig} = require("../../configs/config");
const {DSU_EOD_Channel} = require("../../configs/config.json");

dotenv.config();
initializeApp(firebaseConfig);
const db = getFirestore();
//
/**
 *
 * @param { Client } client
 * @param { Message } message
 */

module.exports = async (client, message) => {
	if (!message.inGuild() || message.author.bot) return;

	function formatDate(date) {
		const dateFormatted = new Date(date).toDateString();
		var newDateFormatted = dateFormatted.substring(4, dateFormatted.length);
		return newDateFormatted;
	}

	async function createRecordInFireBase(type) {
		const colRef = collection(db, type);

		//query
		var dateToday = formatDate(message.createdTimestamp);
		const dateQuery = query(colRef, where("date", "==", dateToday), where("user_id", "==", message.author.id));

		var recordsList = [];
		const records = await getDocs(dateQuery);
		records.forEach((doc) => {
			recordsList.push({...doc.data(), id: doc.id});
		});

		if (recordsList.length == 0) {
			const dateFormatted = new Date(message.createdTimestamp).toDateString();
			var newDateFormatted = dateFormatted.substring(4, dateFormatted.length);
			console.log(dateToday + " " + newDateFormatted);
			console.log(formatDate(message.createdTimestamp));
			await setDoc(doc(colRef), {
				date: formatDate(message.createdTimestamp),
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

			const docRef = doc(db, type, recordID.toString());
			updateDoc(docRef, {
				message: message.content,
			});
		}
	}

	//DSU
	if (message.content.startsWith("DSU") && message.channelId == DSU_EOD_Channel) {
		await createRecordInFireBase("DSU");
	}

	if (message.content.startsWith("EOD") && message.channelId == DSU_EOD_Channel) {
		await createRecordInFireBase("EOD");
	}
};
