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
		var accessTokenResponse = null

		const url = "https://sheet.zoho.com/api/v2/15vy0d864d94014f7412aacaded4cd0da1ce7?method=worksheet.insert&worksheet_name=test 3"

		const headers = {
			'Authorization': 'Zoho-oauthtoken ' + process.env.access_token 
		}

		axios.post("https://accounts.zoho.com/oauth/v3/device/setCode?devcode=T1RUTi05MTg2")
			.then( response => {
				console.log(response.data)
			})
			.catch ( error => {
				console.log(error)
			})
		// axios.post(url, null, {headers})
		// 	.then( response => {
		// 		accessTokenResponse = response.data
		// 		console.log(response.data)
		// 	})
		// 	.catch(error => {
		// 		console.log(error)
		// 		axios.post("https://accounts.zoho.com/oauth/v3/device/token?client_id=1004.2UHN26P51ESYSZY3YT57MBIRUJCFBH&grant_type=device_token&client_secret=7f11e3ffe3cbcbca567555bd35acad03c3d9bda8a2&code=1004.dee0a2971c3bc4407e1c50c782cca58c.02f36a148a68f6db873a8e680fe6cad2")
		// 			.then( response => {
		// 				console.log(response)
		// 			})
		// 	})
	interaction.editReply(process.env.refresh_token)
	},
}

