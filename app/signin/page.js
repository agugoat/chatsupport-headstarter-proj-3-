'use client';

import React, { useState, useEffect } from 'react';
import { auth, provider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '../firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Chat from '../chat/page'

const SignIn = () => {
    const [authenticatedEmail, setAuthenticatedEmail] = useState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const router = useRouter();

    const handleGoogleSignUp = () => {
        signInWithPopup(auth, provider).then((data) => {
            setAuthenticatedEmail(data.user.email);
            localStorage.setItem("email", data.user.email);
            
            // Route to home page after success
            router.push('/home');
        });
    };

    const handleEmailSignIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setAuthenticatedEmail(userCredential.user.email);
                localStorage.setItem("email", userCredential.user.email);

                // Route to home page after success
                router.push('/home');
            })
            .catch((error) => {
                console.error("Error signing in:", error);
            });
    };

    const handleEmailRegister = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setAuthenticatedEmail(userCredential.user.email);
                localStorage.setItem("email", userCredential.user.email);

                // Route to home page after success
                router.push('/home');
            })
            .catch((error) => {
                console.error("Error during registering:", error);
            });
    };

    useEffect(() => {
        setAuthenticatedEmail(localStorage.getItem("email"));
    }, [router]);

    return (
        <div className="relative flex flex-col">
            {authenticatedEmail ? (
                <Chat />
            ) : (
                <div>
                    <h1>AI Assistant App</h1>
                    <form onSubmit={isRegistering ? handleEmailRegister : handleEmailSignIn}>
                        <input 
                            type="email" 
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input 
                            type="password" 
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit">
                            {isRegistering ? "Register" : "Sign In" } 
                        </button>
                    </form>
                        
                    <button onClick={handleGoogleSignUp}>Sign in with Google</button>
                    
                    <button onClick={() => setIsRegistering(!isRegistering)}>
                        {isRegistering ? 'Already have an account? Sign in' : 'Create an account'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default SignIn;