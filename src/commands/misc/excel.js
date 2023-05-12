const axios = require("axios");
const dotenv = require("dotenv");
const {initializeApp} = require("firebase/app");
const {getFirestore, doc, getDoc, updateDoc} = require("firebase/firestore");
const {firebaseConfig} = require("../../configs/config");
const {ApplicationCommandOptionType} = require("discord.js");
dotenv.config();

module.exports = {
	name: "generate",
	description: "Generate a Zoho Sheet for DSU/EOD",
	// options: [
	// 	{
	// 		name: "start_date",
	// 		description: "Enter a valid date (e.g. May 1, 2023)",
	// 		required: true,
	// 		type: ApplicationCommandOptionType.String,
	// 	},
	// 	{
	// 		name: "end_date",
	// 		description: "Enter a valid date (e.g. May 2, 2023)",
	// 		required: true,
	// 		type: ApplicationCommandOptionType.String,
	// 	},
	// ],

	callback: async (client, interaction) => {
		//await interaction.deferReply();

		initializeApp(firebaseConfig);
		const db = getFirestore();

		// const startDate = interaction.options.get("start_date").value;
		// const endDate = interaction.options.get("end_date").value;
		const docRef = doc(db, "tokens", "Zoho");
		const zohoTokens = (await getDoc(docRef)).data();
		const {Access_Token, Refresh_Token, client_id, client_secret} = zohoTokens;
		// async function isInputValidDateFormat(datetoCheckForValidFormat) {
		// 	const dateRegex = /^(?:January|February|March|April|May|June|July|August|September|October|November|December)\s\d{1,2},\s\d{4}$/;

		// 	return dateRegex.test(datetoCheckForValidFormat);
		// }

		async function renewAccessToken(client_id, client_secret, Refresh_Token, docRef) {
			const refreshUrl = `https://accounts.zoho.com/oauth/v2/token?grant_type=refresh_token&client_id=${client_id}&client_secret=${client_secret}&refresh_token=${Refresh_Token}`;

			const generateAccessToken = await axios.post(refreshUrl);
			await updateDoc(docRef, {Access_Token: generateAccessToken.data.access_token});

			return generateAccessToken.data.access_token;
		}

		// async function formatDateToISO(dateToFormat) {
		// 	const date = new Date(dateToFormat);
		// 	const year = date.getFullYear();
		// 	const month = ("0" + (date.getMonth() + 1)).slice(-2);
		// 	const day = ("0" + date.getDate()).slice(-2);

		// 	const formattedDate = year + "-" + month + "-" + day;

		// 	return formattedDate;
		// }

		// async function formatDateToDayMonthYear(dateToFormat) {
		// 	const date = new Date(dateToFormat);

		// 	const options = {
		// 		year: "numeric",
		// 		month: "long",
		// 		day: "numeric",
		// 	};
		// 	const formattedDate = date.toLocaleDateString("en-US", options);

		// 	return formattedDate;
		// }

		// async function getDatesBetweenISOFormat(startDate, endDate) {
		// 	for (var arr = [], dt = new Date(startDate); dt <= new Date(endDate); dt.setDate(dt.getDate() + 1)) {
		// 		arr.push(await formatDateToDayMonthYear(new Date(dt)));
		// 	}
		// 	return arr;
		// }

		// async function createZohoSheetFromDateList(token, dateList) {
		// 	try {
		// 		const method = "worksheet.insert";
		// 		newWorksheets = dateList.forEach((element) => {
		// 			let worksheetName = element;
		// 			apiUrl = `https://sheet.zoho.com/api/v2/15vy0d864d94014f7412aacaded4cd0da1ce7?method=${method}&worksheet_name=${worksheetName}`;
		// 			const headers = {Authorization: `Zoho-oauthtoken ${token}`};
		// 			response = axios.post(apiUrl, null, {headers});
		// 		});
		// 	} catch (error) {
		// 		//
		// 	}
		// }
		async function invokeZohoSheetAPI(token) {
			let response;
			// const datesBetweenTwoDates = await getDatesBetweenISOFormat(await formatDateToISO(startDate), await formatDateToISO(endDate));
			// const test = await createZohoSheetFromDateList(token, datesBetweenTwoDates);

			// try {
			// 	const method = "worksheet.list";
			// 	apiUrl = `https://sheet.zoho.com/api/v2/15vy0d864d94014f7412aacaded4cd0da1ce7?method=${method}`;
			// 	const headers = {Authorization: `Zoho-oauthtoken ${token}`};
			// 	response = await axios.post(apiUrl, null, {headers});
			// } catch {
			// 	console.log("Generating new Access Token");
			// 	const newAccessToken = await renewAccessToken(client_id, client_secret, Refresh_Token, docRef);
			// 	response = await invokeZohoSheetAPI(newAccessToken, startDate, endDate);
			// }

			return response;
		}

		// if (!(await isInputValidDateFormat(startDate))) {
		// 	interaction.reply("Please enter a valid Start Date format");
		// } else if (!(await isInputValidDateFormat(endDate))) {
		// 	interaction.reply("Please enter a valid End Date format");
		// } else {
		// 	interaction.reply("test");

		// isoFormatStartDate = await formatDateToISO(startDate);
		// isoFormatEndDate = await formatDateToISO(endDate);

		//console.log(await getDatesBetweenISOFormat(isoFormatStartDate, isoFormatEndDate));
		response = await invokeZohoSheetAPI(Access_Token);

		console.log(response.data);
		// }
	},
};
