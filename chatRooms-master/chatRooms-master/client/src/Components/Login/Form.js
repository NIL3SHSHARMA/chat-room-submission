import {useState} from 'react'
import axios from '../../axios'
import {useNavigate} from 'react-router-dom'

export default function Form(){
    const navigate = useNavigate();

    const [emid,setEmid] = useState('');
    const [pswd,setPswd] = useState('');
    const [rmbr,setRmbr] = useState(false);
    const [eror,setEror] = useState('');

    const loginHandler = async (e) => {
        e.preventDefault();

        try {
          const {data} = await axios({
            method: 'POST',  
            url:"/api/auth/login",
            data : { emid, pswd },
        });
        console.log(data)
          localStorage.setItem("user", JSON.stringify(data.data));
    
          navigate("/");
        } catch (error) {
        if(error.response){
            console.log(error.response.data.error)
            setEror(error.response.data.error);
        }else{
            setEror("Server error 500");
        }
          
          setTimeout(() => {
            setEror("");
          }, 5000);
        }
      };
    
    return(<>
        <div className="login-form-container">
        <form onSubmit={(e)=>{loginHandler(e)}}>
        
            <h1 className="head">Sign In</h1>
            <p>Welcome, we missed you!</p>

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
                <div className="d-flex" style={{justifyContent: 'space-between'}}>
                    <div className="d-flex">
                        <input className="round" type="checkbox" value="remember"
                               onClick={(e) => {
                                e.target.checked ? setRmbr(true) : setRmbr(false)
                            }}
                        />
                        <lable for="remember">remember me</lable>
                    </div>
                    <button className="forgot-pass">forgot password?</button>
                </div>
            </div>
            
            <input className= "login-submit" type = "submit"/>
        </form>
        {eror && <span className="error-message">{eror}</span>}
        </div>
    </>)

}