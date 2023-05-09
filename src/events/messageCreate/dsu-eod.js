
const dotenv = require('dotenv');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, setDoc, updateDoc, getDocs, query, where, onSnapshot} = require('firebase/firestore');
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
    
    //Checks if the author is a bot
    if (!message.inGuild() || message.author.bot) return;

    //DSU
    if (message.content.startsWith('DSU') && (message.channelId == dsuEodChannelId)) {

        const colRef = await collection(db, 'DSU');
        
        //query
        var dateToday = new Date(message.createdTimestamp).toDateString();
        const dateQuery = await query(colRef, where("date", "==", dateToday), where("user_id", "==", message.author.id))
        
        console.log(1)
        // var records = []
        // onSnapshot(dateQuery, (snapshot) => {
            
        //     snapshot.docs.forEach(doc => {
        //       records.push({ ...doc.data(), id: doc.id })
        //       //console.log(records)
        //     })
        //   })
        // let records = []
        //     await getDocs(colRef)
        //     .then((snapshot) => {
                
        //         snapshot.docs.forEach((doc) => {
        //             dsu.push({ ...doc.data(), id: doc.id })
        //         })
        //     })
        //     .catch( err => {
        //         console.log(err.message)
        //     })
        if (records.length == 0) {

            setDoc(doc(colRef), {
                date: new Date(message.createdTimestamp).toDateString(),
                user: message.author.username,
                user_id: message.author.id,
                time: message.createdTimestamp,
                message: message.content,
            });

        }
        else {
            
            let dsu = []
            await getDocs(colRef)
            .then((snapshot) => {
                
                snapshot.docs.forEach((doc) => {
                    dsu.push({ ...doc.data(), id: doc.id })
                })
            })
            .catch( err => {
                console.log(err.message)
            })
            console.log(typeof records.toString())
            recordID = records.map((entry) => {
                console.log(entry.id)
                return entry.id
            })

            const docRef = doc(db, 'DSU', recordID.toString())
            updateDoc (docRef, {
                message: message.content
            })
            console.log("Update Record")
        }
        let dsu = []
        getDocs(colRef)
        .then((snapshot) => {
            
            snapshot.docs.forEach((doc) => {
                dsu.push({ ...doc.data(), id: doc.id })
            })
            //console.log(dsu)
        })
        .catch( err => {
            console.log(err.message)
        })


        
        // if (dateChecker) {
            // setDoc(doc(colRef), {
            //     date: new Date(message.createdTimestamp).toDateString(),
            //     user: message.author.username,
            //     user_id: message.author.id,
            //     time: message.createdTimestamp,
            //     message: message.content,
            // });
        // }
        // else {
        //     const docRef = doc(db, 'DSU', message.author.id)
        //     updateDoc (docRef, {
        //         message: message.content
        //     })
        // }

        //fetch
        // getDocs(colRef)
        // .then((snapshot) => {
        //     let dsu = []
        //     snapshot.docs.forEach((doc) => {
        //         dsu.push({ ...doc.data(), id: doc.id })
        //     })
        //     console.log(dsu)
        // })
        // .catch( err => {
        //     console.log(err.message)
        // })
       
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
  