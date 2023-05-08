
const dotenv = require('dotenv');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, setDoc} = require('firebase/firestore');
const { Client, Message, Guild} = require('discord.js')

let dsuEodChannelId = 1104981946888617987;
dotenv.config();
//
const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: "discord-js-e4048.firebaseapp.com",
    databaseURL: "https://discord-js-e4048-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "discord-js-e4048",
    storageBucket: "discord-js-e4048.appspot.com",
    messagingSenderId: "964505542026",
    measurementId: "G-DQ0574RP9G",
    appId: process.env.appId
  };
/**
 * 
 * @param { Client } client 
 * @param { Message } message 
 */

module.exports = async (client, message) => {

    initializeApp(firebaseConfig)
    const db = getFirestore()
    

    
    if (!message.inGuild() || message.author.bot) return;

    //DSU
    if (message.content.startsWith('DSU') && (message.channelId == dsuEodChannelId)) {
        const colRef = collection(db, 'DSU');
        //fetch
        getDocs(colRef)
        .then((snapshot) => {
            let dsu = []
            snapshot.docs.forEach((doc) => {
                dsu.push({ ...doc.data(), id: doc.id })
            })
            console.log(dsu)
        })
        .catch( err => {
            console.log(err.message)
        })
       
        
        setDoc(doc(colRef), {
            user: message.author.username,
            user_id: message.author.id,
            time: message.createdTimestamp,
            message: message.content,
          });
    }

    //EOD
    if (message.content.startsWith('EOD') && (message.channelId == dsuEodChannelId)) {

        const colRef = collection(db, 'EOD');
        setDoc(doc(colRef), {
            user: message.author.username,
            user_id: message.author.id,
            time: message.createdTimestamp,
            message: message.content,
          });
    }
    
  };
  