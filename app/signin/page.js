'use client';

import React, { useState, useEffect } from 'react';
import { auth, provider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '../firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import { signOut } from 'firebase/auth';

import { useRouter } from 'next/navigation';
import Chat from '../chat/page';

const SignIn = () => {
    const [authenticatedEmail, setAuthenticatedEmail] = useState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // Error message state

    const [isRegistering, setIsRegistering] = useState(false);
    const router = useRouter();


    const handleGoogleSignUp = () => {
        signInWithPopup(auth, provider).then((data) => {
            setAuthenticatedEmail(data.user.email);
            localStorage.setItem("email", data.user.email);
            
            // Route to home page after success
            router.push('/chat');
        })
        .catch((error) => {
            setErrorMessage(error.message); // Show error message to the user
        });
    };

    
    const handleEmailSignIn = (e) => {
        e.preventDefault();
        setErrorMessage(''); // Clear error message
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setAuthenticatedEmail(userCredential.user.email);
                localStorage.setItem("email", userCredential.user.email);

                // Route to chat page after success
                router.push('/chat');
            })
            .catch((error) => {
                setErrorMessage(error.message); // Show error message to the user
            });
    };

    const handleEmailRegister = (e) => {
        e.preventDefault();
        setErrorMessage(''); // Clear error message
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setAuthenticatedEmail(userCredential.user.email);
                localStorage.setItem("email", userCredential.user.email);

                // Route to chat page after success
                router.push('/chat');
            })
            .catch((error) => {
                setErrorMessage(error.message); // Show error message to the user
            });
    };

    useEffect(() => {
        setAuthenticatedEmail(localStorage.getItem("email"));
    }, [router]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 dark:bg-gray-950">
            {authenticatedEmail ? (
                <Chat />
            ) : (
                <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg dark:bg-gray-900">
                    <h1 className="text-3xl font-bold text-center text-gray-200">Assistant GPT </h1>
                    <form 
                        onSubmit={isRegistering ? handleEmailRegister : handleEmailSignIn}
                        className="space-y-4"
                    >
                        <input 
                            type="email" 
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 text-gray-200 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
                        />
                        <input 
                            type="password" 
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 text-gray-200 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
                        />
                        <button 
                            type="submit" 
                            className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {isRegistering ? "Register" : "Sign In"} 
                        </button>
                    </form>
                        
                    <button 
                        onClick={handleGoogleSignUp} 
                        className="w-full px-4 py-2 font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                            {isRegistering ? "Register with Google" : "Sign In with Google"} 
                            </button>
                    
                    <button 
                        onClick={() => setIsRegistering(!isRegistering)} 
                        className="w-full px-4 py-2 text-sm font-medium text-center text-gray-400 hover:underline dark:text-gray-300"
                    >
                        {isRegistering ? 'Already have an account? Sign in' : 'Create an account'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default SignIn;