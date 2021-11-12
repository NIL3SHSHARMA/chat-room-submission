import {useState} from 'react'
import rightImg from './Right.svg';
import { useNavigate } from 'react-router-dom';

export default function Right(){
    const navigate = useNavigate();
    return(<>
        <div className="">
            <div className="">
            <button onClick={(e)=>navigate('/login')} style={{"border":"none","padding":"0px",outline:"none",borderRadius:"0 20px 20px 0"}}>
                <img src={rightImg} alt = "" width="550px" height="640" className="right-img" />
                </button>
            </div>
        </div>
    </>)

}