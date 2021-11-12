import {useState,useEffect} from 'react'

import {useNavigate} from 'react-router-dom'
import axios from '../../axios'
import RoomTextInputModule from './room-text-input'

import { getFirestore, collection, onSnapshot, query, orderBy } from "firebase/firestore";
import {createRoom} from '../../functions/srvc-rooms'
import './Home.css'

export default function Home(){
    const navigate = useNavigate();
    const db = getFirestore();

    const [usid,setUsid] = useState('');
    const [users,setUsers] = useState([]);
    const [rmid,setRmid] = useState('');
    const [data,setData] = useState([]);
    const [rooms,setRooms] = useState([]);
    const [roomName,setRoomName] = useState([]);
   
    useEffect(() => {
        if(!localStorage.getItem('user')){
            navigate('/login');
        }else{
            const userdata = JSON.parse(localStorage.getItem('user'))
            setUsid(userdata.usid);
        }
        const url = window.location.href;
        const id = url.substr(url.lastIndexOf('/')+1,url.length);
        console.log(id);
        setRmid(id);
    }, [rmid])

    useEffect(()=>{
        async function fetchFirebaseApi(){
          if(usid){
                const unsubscribe = onSnapshot(query(collection(db, "rooms"),orderBy("crts")), (snapshot) => {      
                    snapshot.docChanges().forEach(async(change)=>{
                        if(change.type==="added"){
                          const ISODate =change.doc.data().crts.toDate().toLocaleString() 
                          const item = change.doc.data();
                          item.crts=ISODate;
                          item.rmid= change.doc.data().rmid;
                            console.log(item)
                            setRooms(data=>[...data,item])
                          
                        //   if(autoScroll.current)
                            // autoScroll.current.scrollIntoView({ behavior: 'smooth' ,block: "end"});
                        }
                    }); 
                },(error)=>{
                    console.log(error)
                });
 
                return()=> unsubscribe();
            }
        }
    
        fetchFirebaseApi()
      },[rmid])

    useEffect(()=>{
        async function fetchFirebaseApi(){
          if(usid){
                const unsubscribe = onSnapshot(query(collection(db, "texts"),orderBy("crts")), (snapshot) => {      
                    snapshot.docChanges().forEach(async(change)=>{
                        if(change.type==="added"){
                          const ISODate =change.doc.data().crts.toDate().toLocaleString() 
                          const item = change.doc.data();
                          item.crts=ISODate;
                          item.name= change.doc.data().name;
                        
                          if(rmid===item.rmid){
                            setData(data=>[...data,item])
                          }
                        //   if(autoScroll.current)
                            // autoScroll.current.scrollIntoView({ behavior: 'smooth' ,block: "end"});
                        }
                    }); 
                },(error)=>{
                    console.log(error)
                });
 
                return()=> unsubscribe();
            }
        }
    
        fetchFirebaseApi()
      },[usid,rmid])
  

    const handleLogout=(e)=>{
        e.preventDefault();
        localStorage.removeItem('user')
        navigate('login')
    }

    return(<>
       
            <button className="logout"
                onClick={(e)=>{
                    handleLogout(e)
                }}
            >Logout</button>
        <div className="container-md" style={{height:"100vh"}}>
            <h1>Hello {usid}!</h1>
            <div className="row" >
                <div className="col-6 border" style={{maxHeight:"90%"}}>
                    rooms
                    <div className="d-flex">
                    <button className="btn btn-warning rounded-pill" onClick={()=>{createRoom(roomName)}}>create</button>
                    <input className="border" type="text" onChange={(e)=>{setRoomName(e.target.value)}}></input>
                    </div>
                    <div className="">

                        {rooms && rooms.length > 0 && rooms.map((item, i) => (
                           
                           <div className="mb-3 border" key={i}>
                            
                                <button className="btn "
                                    onClick={(e)=>{
                                        navigate(`/room/${rooms[i].rmid}`)
                                        console.log(rooms[i].rmid)
                                    }}
                                >
                                    {item.name}
                                </button>
    
                            </div>
                        ))}

                    </div>

                </div>
                <div className="col-6 border" style={{maxHeight:"90%"}}>
                    chat
                    <div className="">

                        {data && data.length > 0 && data.map((item, i) => (
                            <div className="mb-3" key={i}>
                                <p className=" m-0 p-0">
                                    <small className="fw-bold">{item.usid}{', '}</small>
                                    <small>{item.crts.substr(0,10)}{' - '}{item.crts.substr(11,5)}</small>
                                </p>
                       
                                    <p className="m-0 p-0">{item.text}</p> 
                                
                            </div>
                        ))}

                    </div>
                    <div className="text-input" style={{position:"fixed",bottom:"0"}}>
                        <RoomTextInputModule usid={usid} rmid={rmid} />
                    </div>
                </div>
            </div>
        </div>
    </>)

}