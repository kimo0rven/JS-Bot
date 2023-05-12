module.exports = {
	name: "ping",
	description: "Pong",
	// devOnly: Boolean,
	//testOnly: true,
	// options: Object[],
	// deleted: Boolean,

	callback: async (client, interaction) => {
		await interaction.deferReply();

		const reply = await interaction.fetchReply();

		const ping = reply.createdTimestamp - interaction.createdTimestamp;

		interaction.editReply(`Pong! \n**Client:** ${ping}ms\n**Websocket:** ${client.ws.ping}ms `);
	},
};
