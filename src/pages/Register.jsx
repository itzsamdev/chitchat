import React, { useState } from 'react'
import Add from "../img/addAvatar.png"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from 'react-router-dom';


const Register = () => {
    const [err, setErr] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(e.target)
        const displayName = e.target[0].value.trim()
        const email = e.target[1].value.trim()
        const password = e.target[2].value
        const file = e.target[3].files[0]


        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)

            //referrance - name for img
            const storageRef = ref(storage, displayName);

            await uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        //Update profile
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        });
                        //create user on firestore
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL,
                        });

                        //create empty user chats on firestore
                        await setDoc(doc(db, "userChats", res.user.uid), {});
                        navigate("/");
                    } catch (err) {
                        // console.log(err);
                        setErr(true);
                        // setLoading(false);
                    }

                });
            });
        } catch (err) {
            setErr(true);
            console.log(err)
        }

    }
    return (
        <div className='formContainer'>
            <div className="formWrapper">
                <span className="logo">ChitChat</span>
                <span className="title">Register</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='Enter Name' />
                    <input type="email" placeholder='Email' />
                    <input type="password" placeholder='Password' />
                    <input style={{ display: "none" }} type="file" id='file' />
                    <label htmlFor="file">
                        <img src={Add} alt="" />
                        <span>Add an avatar</span>
                    </label>
                    <button>Sign up</button>
                    {err && <span> Something went wrong</span>}
                </form>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    )
}

export default Register