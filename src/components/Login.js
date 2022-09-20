import React from "react"

import { GoogleOutlined } from '@ant-design/icons'

import firebase from "firebase/app"

import { auth } from "../firebase"

export default function Login() {
  return (
    <div id="background-image">
      <img src="./Background1.svg" alt="idk" height={655} width={1396} style={{position: "absolute", objectFit:"cover"}} />
        <div id='login-page'>
          <div id='login-card'>
            <img src="top.jpg" alt="top" class="top" />
            <h2>Welcome to SportChat!</h2>

            <div

              className='login-button google'
              onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}
            >
              <GoogleOutlined /> Sign In with Google
          </div>
        </div>
      </div>
    </div>
  )
}