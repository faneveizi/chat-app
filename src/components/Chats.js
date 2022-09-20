/*import React, {useRef, useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios'

export default function Chats() {
    const history = useHistory();
    const { user } = useAuth();
    const [loading,setLoading] = useState(true);
    const handleLogout = async () => {
        await auth.signOut();
        history.push("/");
    }
    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data], "userPhoto.jpg", {type : 'image/jpeg'});
    }

    useEffect(() => {
        if(!user) {
            history.push("/");
            return;
        }
        axios.get("https://chatengine.io/users/me", {
            headers : { 
                "project-id" : "6f767736-d391-4733-9b45-267b11cc6a41",
                "user-name" : user.email,
                "user-secret" : user.uid,

            }
        })
        .then(() => {
            setLoading(false);
        })
        .catch(() => {
            let formdata = new FormData();
            formdata.append('email' , user.email);
            formdata.append('username' , user.displayName);
            formdata.append('secret' , user.uid);
            getFile(user.photoURL)
            .then((avatar) => {
                formdata.append('avatar' , avatar, avatar.name);

                axios.post("https://chatengine.io/users", formdata,
                {headers : {
                    "private-key" : "01b86862-68d2-4880-9590-cf10fe76a84c",
                }})
                .then(() => setLoading(false))
                .catch((error) => console.log(error))
            })
        })
    }, [user, history]);

    if(!user || loading) return 'Loading...'; 
    return (
        <div className='chats-page'>
            <div className='nav-bar'>
                <div className='logo-tab'>
                    Sport Chat
                </div>
                <div onClick={handleLogout} className='logout-tab'>
                    Logout
                </div>


            </div>
            <ChatEngine 
                height= "calc(100vh - 66px)"
                projectID = "6f767736-d391-4733-9b45-267b11cc6a41"
                userName = "."
                userSecret = "."
            />

        </div>
    )
}
*/
import React,{useRef,useEffect,useState} from "react";
import { useHistory } from "react-router-dom";
import {ChatEngine} from 'react-chat-engine';
import { auth } from "../firebase";
import {useAuth} from '../contexts/AuthContext';
import axios from "axios";
import {FiLogOut} from "react-icons/fi";
const Chats = () => {

const history = useHistory();
const {user}= useAuth();
const[loading,setLoading]=useState(true);

const getFile =async (url) =>{
    const response = await fetch(url);
    const data =await response.blob();

    return new File([data],"userPhoto.jpg",{type:"image/jpeg"})
}
    
useEffect(()=>{
    if(!user){
        history.push('/')
        return;
    }
    axios.get('https://api.chatengine.io/users/me',{
        headers:{
            "project-id":process.env.REACT_APP_CHAT_PUBLIC_KEY,
            "user-name":user.email,
            "user-secret":user.uid
        }
    })
    .then(()=>{
       setLoading(false);
    })
    .catch(()=>{
        let formdata=new FormData();
        formdata.append('email',user.email);
        formdata.append('username',user.email);
        formdata.append('secret',user.uid);

        getFile(user.photoURL)
        .then((avatar)=>{
            formdata.append('avatar',avatar,avatar.name)

            axios.post('https://api.chatengine.io/users/',
            formdata,
            {headers:{"private-key":process.env.REACT_APP_CHAT_ENGINE_KEY}}
            ).then(()=>setLoading(false))
            .catch(error => console.log(error))
        })
    })
  },[user,history])

    const LogoutHandler =async()=>{
       await auth.signOut();
        history.push('/');
    }
    if(!user || loading) return "Loading..."

  return (
    <div className="chat-page">
      <div className="nav-bar">
        <img src="./Sport-chat.png" alt="bug" height={40} style={{paddingTop: 12,paddingLeft: 20, 
                                              paddingBottom: 12, paddingRight: 20}}/>
        <div className="logout-tab" onClick={LogoutHandler}><FiLogOut/></div>
      </div>
    <ChatEngine
        height="calc(100vh-66px)"
        projectID={process.env.REACT_APP_CHAT_PUBLIC_KEY}
        userName={user.email}
        userSecret={user.uid}
    />
    </div>
  );
};

export default Chats;