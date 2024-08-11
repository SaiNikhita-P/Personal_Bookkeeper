

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Correctly imported
import "./styles.css";
import Input from '../Input';
import Button from '../Button';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import { auth, db } from '../../firebase';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";

function SignupSigninComponent() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loginForm, setLoginForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();

    function signupWithEmail() {
        setLoading(true);
        if (name && email && password && confirmPassword) {
            if (password === confirmPassword) {
                createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        toast.success("User Created");
                        setLoading(false);
                        setName("");
                        setPassword("");
                        setEmail("");
                        setConfirmPassword("");
                        createDoc(user); // Handle document creation
                        navigate("/dashboard");
                    })
                    .catch((error) => {
                        toast.error(error.message);
                        setLoading(false);
                    });
            } else {
                toast.error("Password and Confirm Password don't match");
                setLoading(false);
            }
        } else {
            toast.error("All fields are mandatory!");
            setLoading(false);
        }
    }

    function loginUsingEmail() {
        setLoading(true);
        if (email && password) {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    toast.success("User Logged In");
                    //console.log("User Logged In!",user);
                    setLoading(false);
                    navigate("/dashboard");
                })
                .catch((error) => {
                    setLoading(false);
                    toast.error(error.message);
                });
        } else {
            toast.error("All fields are mandatory");
            setLoading(false);
        }
    }

    async function createDoc(user) {
        setLoading(true);
        if (!user) return;

        const userRef = doc(db, "users", user.uid);
        const userData = await getDoc(userRef);

        if (!userData.exists()) {
            try {
                await setDoc(userRef, {
                    name: user.displayName || name,
                    email: user.email,
                    photoURL: user.photoURL || "",
                    createdAt: new Date(),
                });
                toast.success("Document created");
                setLoading(false);
            } catch (e) {
                toast.error(e.message);
                setLoading(false);
            }
        } else {
            // toast.error("Document already exists");
            setLoading(false);
        }
    }

    function googleAuth(){
        setLoading(true);
        try{
            signInWithPopup(auth, provider)
            .then((result) => {
              // This gives you a Google Access Token. You can use it to access the Google API.
              const credential = GoogleAuthProvider.credentialFromResult(result);
              const token = credential.accessToken;
              // The signed-in user info.
              const user = result.user;
              console.log("user>>",user);
              createDoc(user);
              setLoading(false);
              navigate("/dashboard");
              toast.success("User authenticated!");
              // IdP data available using getAdditionalUserInfo(result)
              // ...
            }).catch((error) => {
                setLoading(false);
              // Handle Errors here.
              const errorCode = error.code;
              const errorMessage = error.message;
              toast.error(errorMessage);
              })
        }catch(e){
            setLoading(false);
            toast.error(e.message);
        }
       

    }

    return (
        <>
            {loginForm ? (
                <div className="signup-wrapper">
                    <h2 className="title">
                        Login to <span style={{ color: "var(--theme)" }}>Finance Manager</span>
                    </h2>
                    <form>
                        <Input label={"Email"}
                            type="email"
                            state={email}
                            setState={setEmail}
                            placeholder={"johndoe@gmail.com"}
                        />
                        <Input label={"Password"}
                            type="password"
                            state={password}
                            setState={setPassword}
                            placeholder={"Example@123"}
                        />
                        <Button disabled={loading} text={loading ? "Loading..." : "Login Using Email and Password"} onClick={loginUsingEmail} />
                        <p className="p-login">or</p>
                        <Button onClick={googleAuth} text={loading ? "Loading..." : "Login Using Google"} blue={true} />
                        <p className="p-login" style={{ cursor: "pointer" }} onClick={() => setLoginForm(!loginForm)}>Or Don't Have an Account? Click Here</p>
                    </form>
                </div>
            ) : (
                <div className="signup-wrapper">
                    <h2 className="title">
                        Sign up on <span style={{ color: "var(--theme)" }}>Finance Manager</span>
                    </h2>
                    <form>
                        <Input label={"Full Name"}
                            state={name}
                            setState={setName}
                            placeholder={"John Doe"}
                        />
                        <Input label={"Email"}
                            type="email"
                            state={email}
                            setState={setEmail}
                            placeholder={"johndoe@gmail.com"}
                        />
                        <Input label={"Password"}
                            type="password"
                            state={password}
                            setState={setPassword}
                            placeholder={"Example@123"}
                        />
                        <Input label={"Confirm Password"}
                            type="password"
                            state={confirmPassword}
                            setState={setConfirmPassword}
                            placeholder={"Example@123"}
                        />
                        <Button className="button" disabled={loading} text={loading ? "Loading..." : "Signup Using Email and Password"} onClick={signupWithEmail} />
                        <p className="p-login">or</p>
                        <Button onClick={googleAuth} text={loading ? "Loading..." : "Signup Using Google"} blue={true} />
                        <p className="p-login" style={{ cursor: "pointer" }} onClick={() => setLoginForm(!loginForm)}>Or Have an Account Already? Click Here</p>
                    </form>
                </div>
            )}
        </>
    );
}

export default SignupSigninComponent;
