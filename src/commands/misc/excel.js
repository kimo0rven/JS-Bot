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

		const ping = reply.createdTimestamp - interaction.createdTimestamp;

		interaction.editReply(`Pong! \n**Client:** ${ping}ms\n**Websocket:** ${client.ws.ping}ms `);
		var array = [];
		let channels = client.console.log(channels);
		for (const channel of channels) {
			array.push(channel.id);
			console.log(channel.id);
		}
	},
};
