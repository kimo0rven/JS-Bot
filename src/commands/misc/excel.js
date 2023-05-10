const axios  = require('axios');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
	name: "generate",
	description: "Generate an Zoho Sheet for DSU/EOD",
	// devOnly: Boolean,
	//testOnly: true,
	// options: Object[],
	// deleted: Boolean,

	callback: async (client, interaction) => {
		await interaction.deferReply();

		const reply = await interaction.fetchReply();

			
		var headers = {
			'Authorization': 'Zoho-oauthtoken 1004.9fb5c2ca9ef5d2edbfc04f779d07a9dd.02483ff3b2f8699081e287ca57a10878'
		};
		axios.post('https://sheet.zoho.com/api/v2/15vy0d864d94014f7412aacaded4cd0da1ce7?method=worksheet.list', null, {headers})
		.then(response => {
			console.log(response.data);
		})
		.catch(function (error) {
			console.log("ERROR NI SIYA")
			axios.post("https://accounts.zoho.com/oauth/v3/device/code?client_id=1004.BEUNCBTR7QRSMC697A7OAWEYC119WD&scope=ZohoSheet.dataAPI.UPDATE,ZohoSheet.dataAPI.READ&grant_type=device_request&access_type=offline&")
			.then(response => {
			console.log(response.data);
		})
			.catch(function (error) {
			
		});
			// console.error(error);
		});
	interaction.editReply("test")
	},
}

