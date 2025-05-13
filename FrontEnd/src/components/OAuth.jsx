import { Button } from 'flowbite-react'
import React, { useState } from 'react'
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice'
import { app } from '../firebase.js'
import { useNavigate } from 'react-router-dom'

const OAuth = () => {
    const [loading, setLoading] = useState(false);
    const auth = getAuth(app);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
        setLoading(true);
        const provider = new GoogleAuthProvider();
        
        try {
            console.log('Starting Google sign-in process');
            const resultsFromGoogle = await signInWithPopup(auth, provider);
            console.log('Google sign-in successful:', resultsFromGoogle.user.email);
            
            // Check if we have the required user information
            if (!resultsFromGoogle.user.displayName || !resultsFromGoogle.user.email) {
                console.error('Missing user information from Google');
                setLoading(false);
                return;
            }
            
            const userData = {
                name: resultsFromGoogle.user.displayName,
                email: resultsFromGoogle.user.email
            };
            console.log('Sending to backend:', userData);
            
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/google`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include', // Important for cookies
                    body: JSON.stringify(userData),
                });
                
                console.log('Backend response status:', res.status);
                
                if (!res.ok) {
                    console.error('Backend response not OK:', res.status);
                    const errorData = await res.text();
                    console.error('Error response:', errorData);
                    setLoading(false);
                    return;
                }
                
                const data = await res.json();
                console.log('Backend response data:', data);
                
                dispatch(signInSuccess(data));
                navigate('/dashboard');
            } catch (fetchError) {
                console.error('Fetch error:', fetchError);
            }
        } catch (error) {
            console.error('Google authentication error:', error);
            console.error('Error code:', error.code);
            console.error('Error message:', error.message);
        }
        
        setLoading(false);
    }

    return (
        <Button 
            type='button' 
            className='border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 w-full transition-colors duration-200'
            onClick={handleGoogleClick}
            disabled={loading}
        >
            {loading ? 'Processing...' : 'Continue with Google'}
        </Button>
    )
}

export default OAuth
