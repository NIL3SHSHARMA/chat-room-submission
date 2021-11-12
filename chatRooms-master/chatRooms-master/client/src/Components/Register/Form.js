import {useState} from 'react'
import axios from '../../axios'
import {useNavigate} from 'react-router-dom'

export default function Form(){
    const navigate = useNavigate();

    const [emid,setEmid] = useState('');
    const [usid,setUsid] = useState('');
    const [cpsw,setCpsw] = useState('');
    const [pswd,setPswd] = useState('');
    const [eror,setEror] = useState('');

    const handleSubmit = async (e)=>{
        e.preventDefault();

        if(pswd!==cpsw){
            setPswd("");
            setCpsw("");
            setTimeout(()=>{ //removes error after 5 sec
                setEror("")
            },5000)
            return setEror("Password do not match");
        }

        try{
            const {data}=await axios({
                method: 'POST',
                url: "/api/auth/register",
                data :  {
                    usid,
                    emid,
                    pswd
                }
            });

            localStorage.setItem("authToken",JSON.stringify(data));
            navigate('/login');

        }catch(error){
            console.log(error.response.data.error)
            setEror(error.response.data.error)
            setTimeout(()=>{ //removes error after 5 sec
                setEror("")
            },5000)
        }
    }
    return(<>
        <div className="register-form-container">
    
        <form onSubmit={(e)=>{handleSubmit(e)}}>
        
            <h1 className="head">Sign Up</h1>
            <p>Don't have an account?</p>

            <div className="input-container">
                <span>Full Name</span>
                <input type="text" value={usid} placeholder = "Enter Your Name" 
                    onChange={(e)=>{
                                setUsid(e.target.value)
                                    }
                             } 
                    ></input>
            </div>

            <div className="input-container">
                <span>Your Email</span>
                <input type="text" value={emid} placeholder = "Enter Your Email" 
                    onChange={(e)=>{
                                setEmid(e.target.value)
                            
                                    }
                             } 
                    ></input>
            </div>

            <div className="input-container">
                <span>Password</span>
                <input type="password" value={pswd} placeholder = "Enter Your Password" onChange={(e)=>setPswd(e.target.value)}></input>
            </div>

            <div className="input-container">
                <span>Repeat Password</span>
                <input type="password" value={cpsw} placeholder = "Enter Your Password" onChange={(e)=>setCpsw(e.target.value)}></input>
            </div>
            <input className="register-submit" type = "submit"/>
        </form>
        {eror && <span className="error-message">{eror}</span>}

        </div>
    </>)

}