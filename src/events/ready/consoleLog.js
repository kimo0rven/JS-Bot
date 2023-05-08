
const { ActivityType } = require('discord.js');
module.exports = (client) => {
  console.log(`${client.user.tag} is online.`);
  client.user.setActivity({
    name: 'right now!',
    type: ActivityType.Streaming,
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  })
};


// const catalyst = require('zcatalyst-sdk-node');
// const { Client, IntentsBitField } = require('discord.js');
// const eventHandler = require('./handlers/eventHandler');

// module.exports = (cronDetails, context) => {
//   const app = catalyst.initialize(context);
//   let datastore = app.datastore();
//   let datastoreTables = datastore.getTableDetails("8912000000063012");

//   datastoreTables.then((table) => {
//   console.log(table);
// })
// }