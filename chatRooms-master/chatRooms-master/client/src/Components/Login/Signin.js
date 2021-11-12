import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Form from './Form'
import Right from './Right'
import './Signin.css'

export default function Signin(){
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("user")) {
          navigate("/");
        }
      }, [navigate]);

    return(<>
        <div className="container">
            <div className="login-container d-flex">
                <Form/>
                <Right/>
            </div>
        </div>
    </>)

}