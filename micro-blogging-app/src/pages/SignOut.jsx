import React from 'react'
import { auth } from '../config/FirebaseController'

function SignOut() {
    return (
        <div className='nav'>
            <button onClick={() => auth.signOut()}>Sign Out</button>
        </div>
    )
}

export default SignOut;