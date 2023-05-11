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
	options: [
		{
			name: "start_date",
			description: "Enter a valid date (e.g. May 1 2023)",
			required: true,
			type: ApplicationCommandOptionType.String,
		},
		{
			name: "end_date",
			description: "Enter a valid date (e.g. May 2 2023)",
			required: true,
			type: ApplicationCommandOptionType.String,
		},
	],

	callback: async (client, interaction) => {
		//await interaction.deferReply();

		initializeApp(firebaseConfig);
		const db = getFirestore();

		async function executeApiCall(token) {
			const accessmethod = "worksheet.list";
			const accessUrl = `https://sheet.zoho.com/api/v2/15vy0d864d94014f7412aacaded4cd0da1ce7?method=${accessmethod}`;
			var response = null;
			try {
				const headers = {Authorization: `Zoho-oauthtoken ${token}`};
				response = await axios.post(accessUrl, null, {headers});
				console.log(response.data);
			} catch (error) {
				console.log(error.response.data);
			}
			return response.data;
		}

		var startDate = interaction.options.get("start_date").value;
		var endDate = interaction.options.get("end_date").value;

		const dateFormat = /^(?:January|February|March|April|May|June|July|August|September|October|November|December)\s\d{1,2}\s\d{4}$/;

		const isStartDate = dateFormat.test(startDate);
		const isEndDate = dateFormat.test(endDate);

		if (!isStartDate) {
			interaction.reply("Please enter a valid Start Date format");
		} else if (!isEndDate) {
			interaction.reply("Please enter a valid End Date format");
		} else {
			interaction.reply(`${startDate} ${endDate} ${isStartDate} ${isEndDate}`);

			const docRef = doc(db, "tokens", "Zoho");
			const zohoTokens = (await getDoc(docRef)).data();

			const {Access_Token, Refresh_Token, client_id, client_secret} = zohoTokens;

			const refreshUrl = `https://accounts.zoho.com/oauth/v2/token?grant_type=refresh_token&client_id=${client_id}&client_secret=${client_secret}&refresh_token=${Refresh_Token}`;

			try {
				//Try to check if the access token is still valid
				await executeApiCall(Access_Token);
				console.log("Token is valid");
			} catch (error) {
				console.log("Token is invalid, trying to renew token");
				try {
					const generateAccessToken = await axios.post(refreshUrl);

					const docRef = doc(db, "tokens", "Zoho");
					await updateDoc(docRef, {Access_Token: generateAccessToken.data.access_token});

					await executeApiCall(generateAccessToken.data.access_token);
				} catch (error) {
					console.log(error.response.data);
				}
			}
		}
	},
};
