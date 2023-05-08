require('dotenv').config();
//const mongoose = required('mongoose');
const { Client, IntentsBitField } = require('discord.js');
const eventHandler = require('./handlers/eventHandler');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});


  eventHandler(client);



client.login('MTEwNDk4MjA2Mjg4NjMwOTkyMA.G5fX0U.tRi4BjzVcLlnbqIn4hxB1XR6BaupPYDK8MNMUU');
//