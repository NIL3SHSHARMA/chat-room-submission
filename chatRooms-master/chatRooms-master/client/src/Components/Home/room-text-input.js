// transactions list
import { useState, useRef } from "react";
import { useParams } from "react-router-dom";

import { sendMessage } from "../../functions/srvc-rooms";

export default function RoomTextInputModule(props) {
  const [loading,setLoading]=useState(false);
  const [data,setData]=useState({text:'', rmid: props.rmid, usid: props.usid});


  const handleChange = async(key, val) => {
    setData({ ...data, [key]: val });
  }

  const handleSubmit = async e => {
    e.preventDefault();
  console.log(props)
  console.log(data)

    sendMessage(data,props.usid,props.rmid);  //@Params (text_room_user data)

    handleChange("text", "");

  }

  return (
  <>
    <form onSubmit={handleSubmit}>
      <div className="card rounded border-none bg-white">

          <div className="input-group" style={{bottom:"0"}}>
              <input 
                type="text"     
                className="form-control background-none border-none"
                style={{fontSize:'0.9rem'}}
                value={data.text}
                onChange={({ target }) => {handleChange("text", target.value);}}
                placeholder="enter message">
              </input>
              <button class="btn btn-outline-primary" type="submit">Send</button>
          </div>


      </div>
    </form>
  </>
  )
}