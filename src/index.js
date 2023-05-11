const dotenv = require("dotenv");
const {Client, IntentsBitField} = require("discord.js");
const {initializeApp} = require("firebase/app");
const {getFirestore, doc, getDoc} = require("firebase/firestore");
const {firebaseConfig} = require("../src/configs/config");

dotenv.config();

const client = new Client({
	intents: [
		IntentsBitField.Flags.Guilds,
		IntentsBitField.Flags.GuildMembers,
		IntentsBitField.Flags.GuildMessages,
		IntentsBitField.Flags.MessageContent,
	],
});

const eventHandler = require("./handlers/eventHandler");
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function fetchTokens() {
	const docRef = doc(db, "tokens", "Discord");
	const docSnap = await getDoc(docRef);
	return docSnap.data().TOKEN;
}

(async () => {
	const tokens = await fetchTokens();
	client.login(tokens);
})();

eventHandler(client);
