const {ActivityType} = require("discord.js");
module.exports = (client) => {
	console.log("------------------------------------------");
	console.log(`[READY] ${client.user.tag} is up and ready to go.`);
	console.log("------------------------------------------");
	client.user.setActivity({
		name: "right now!",
		type: ActivityType.Streaming,
		url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
	});
};
