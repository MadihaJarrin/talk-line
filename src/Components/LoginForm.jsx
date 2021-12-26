import axios from 'axios';
import React, { useState } from 'react';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const authObject = { 'project-ID': "de03c57f-e660-4cf6-8ada-9200eaa9dc41", 'User-Name': username, 'User-Secret': password };
        try {
            //username / password => chatengine => give message
            axios.get('https://api.chatengine.io/chats', { headers: authObject });

            localStorage.setItem('username', username)
            localStorage.setItem('password', password)
            //works out -> logged in

            window.location.reload();
        } catch (eror) {
            setError("opps!! incorect credentials.try with new username")
            //error -> try with new username
        }

    }

    return (
        <div className='wrapper'>
            <div className='form'>
                <h1 className='title'>
                    Chat App
                </h1>

                <form onSubmit={handleSubmit}>
                    <input type='text' valule={username} onChange={(e) => setUsername(e.target.value)} className='input' placeholder='Username' required />
                    <input type='password' valule={password} onChange={(e) => setPassword(e.target.value)} className='input' placeholder='Password' required />
                    <div align="center">
                        <button type='submit' className='button'>
                            <span>Start Chatting</span>
                        </button>
                    </div>
                    <h2 className='error'> {error}</h2>
                </form>
            </div>

        </div>
    );
};

export default LoginForm;