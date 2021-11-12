// part 1 methods
// create new user in firebase
// create new room
// add remove person in room
//* send and recieve messages in a room
//* add a file in room

import { getFirestore, collection, addDoc } from "firebase/firestore";
import firebase from "../services/firebase";
import { v4 as uuidv4 } from 'uuid';

const db = getFirestore(firebase);


const sendMessage = async (data,usid,rmid)=>{
    data.form="text";
    data.crts= new Date();
    data.usid = usid;
    data.rmid = rmid;
    try{
        const textRef = await addDoc(collection(db,'texts'),data);
        return textRef.id;
    }catch(e){
        console.error("Error adding data: ",e);
    }
}

const createRoom = async (roomName)=>{
    let data={};
    data.crts= new Date();
    data.name=roomName;
    data.rmid= uuidv4();
    try{
        const textRef = await addDoc(collection(db,'rooms'),data);
        return textRef.id;
    }catch(e){
        console.error("Error adding data: ",e);
    }
}



export {sendMessage ,createRoom}