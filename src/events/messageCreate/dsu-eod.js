const dotenv = require("dotenv");
const {Client, Message} = require("discord.js");
const {initializeApp} = require("firebase/app");
const {getFirestore, collection, doc, setDoc, updateDoc, getDoc, getDocs, query, where} = require("firebase/firestore");
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

	const docRef = doc(db, "tokens", "Zoho");
	const zohoTokens = (await getDoc(docRef)).data();
	const {Access_Token, Refresh_Token, client_id, client_secret} = zohoTokens;

	async function formatDate(msTime) {
		let date = new Date(msTime);
		var options = {
			year: "numeric",
			month: "long",
			day: "numeric",
		};

		return date.toLocaleDateString("en-US", options);
	}

	async function createRecordInFireBase(type) {
		const colRef = collection(db, type);

		//query
		console.log("query");
		var dateToday = await formatDate(message.createdTimestamp);
		const dateQuery = query(colRef, where("date", "==", dateToday), where("user_id", "==", message.author.id));
		console.log("try");
		var recordsList = [];
		const records = await getDocs(dateQuery);
		records.forEach((doc) => {
			recordsList.push({...doc.data(), id: doc.id});
		});

		if (recordsList.length == 0) {
			response = await setDoc(doc(colRef), {
				date: dateToday,
				user: message.author.username,
				user_id: message.author.id,
				time: message.createdTimestamp,
				message: message.content,
				message_id: message.id,
			});
			consolog.log("Create");
			console.log(response);
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
			const response = await updateDoc(docRef, {
				message: message.content,
			});
			console.log("Update");
			console.log(response);
		}

		//return response;
	}

	async function renewAccessToken(client_id, client_secret, Refresh_Token, docRef) {
		const refreshUrl = `https://accounts.zoho.com/oauth/v2/token?grant_type=refresh_token&client_id=${client_id}&client_secret=${client_secret}&refresh_token=${Refresh_Token}`;

		const generateAccessToken = await axios.post(refreshUrl);
		await updateDoc(docRef, {Access_Token: generateAccessToken.data.access_token});

		return generateAccessToken.data.access_token;
	}

	// async function invokeZohoSheetAPI(token, dsuOrEod) {
	// 	let response;
	// 	try {

	// 	}

	// 	return response;
	// }

	//DSU
	if (message.content.startsWith("DSU") && message.channelId == DSU_EOD_Channel) {
		test = await createRecordInFireBase("DSU");
		// const test = await invokeZohoSheetAPI(Access_Token, "DSU");

		//query

		// var dateToday = await formatDate(message.createdTimestamp);
		// const dateQuery = query(colRef, where("date", "==", dateToday), where("user_id", "==", message.author.id));
		{
		}
	}

	if (message.content.startsWith("EOD") && message.channelId == DSU_EOD_Channel) {
		await createRecordInFireBase("EOD");
	}
};
