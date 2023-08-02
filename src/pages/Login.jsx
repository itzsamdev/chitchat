import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate()
    const [err, setErr] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(e.target)

        const email = e.target[0].value
        const password = e.target[1].value

        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate("/")
        } catch (err) {
            setErr(true);
        }
    }
    return (
        <div className='formContainer'>
            <div className="formWrapper">
                <span className="logo">ChitChat</span>
                <span className="title">Login</span>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder='Email' />
                    <input type="password" placeholder='Password' />

                    <button>Sign in</button>
                </form>
                {err && <span> Something went wrong</span>}
                <p>Don't have an account? <Link to="/register">Register</Link></p>
            </div>
        </div>
    )
}

export default Login