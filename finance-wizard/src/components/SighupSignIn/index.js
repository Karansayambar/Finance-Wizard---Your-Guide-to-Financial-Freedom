import { useState } from "react";
import Input from "../input";
import Button from "../Button";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { auth, db, provider } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider } from "firebase/auth/cordova";
import "./style.css";
// import firebase from "firebase/compat/app";

const SignupSignin = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(true);
  const navigate = useNavigate();

  function signUpWithEmail() {
    setLoading("true");
    console.log("name = " + name);
    console.log("email =" + email);
    console.log("password = " + password);
    console.log("conferm password= " + confirmPassword);

    // Authenticate a user OR create a account using Email and Password
    if (name != "" && email != "" && password != "" && confirmPassword != "") {
      if (password === confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            console.log(user);
            createDoc(user);
            toast.success("user created");
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading("false");
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            navigate("/dashbord");
            // ..create document as a user id as a following id
          });
      } else {
        toast.error("password and conferm password should be match");
        setLoading("false");
      }
    } else {
      toast.error("All field are mandetory");
      setLoading("false");
    }
  }
  function loginUsingEmail() {
    setLoading(true);
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          setLoading(false);
          toast.success("User Login Successfully");
          navigate("/dashbord");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
        });
    } else {
      toast.error("All fields are mandetory");
    }
  }
  async function createDoc(user) {
    setLoading("true");
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);
    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", "user.uid"), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        toast.success("doc created");
        setLoading("false");
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } else {
      toast.error("doc alredy exist");
    }
  }
  function googleAuth() {
    setLoading(true);
    try {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          createDoc(user);
          navigate("/dashbord");
          setLoading(false);
          toast.success("user authenticated");
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    } catch (error) {
      toast.error(error);
    }
  }
  return (
    <div className="container">
      {loginForm ? (
        <div className="signup-wrapper">
          <p className="title">
            Login on{" "}
            <span style={{ color: "var(--theme" }}>
              Finance Wizard<span style={{ fontSize: "20px" }}>🪙</span>
            </span>
          </p>
          <form>
            <Input
              type={"email"}
              label={"email"}
              state={email}
              setState={setEmail}
              placeholder={"jonedeo@gmail.com"}
            />
            <Input
              type={"password"}
              label={"password"}
              state={password}
              setState={setPassword}
              placeholder={"Example@123"}
            />

            <Button
              onclick={loginUsingEmail}
              text={loading ? "loading..." : "Login using Email and Passwor"}
            />
            <p className="p-login">OR</p>
            <Button
              onclick={googleAuth}
              disabled={loading}
              text={loading ? "loading..." : "Login using Google"}
              blue={true}
            />
            <p className="p-login" onClick={() => setLoginForm(!loginForm)}>
              Dont have an accound ? click here
            </p>
          </form>
        </div>
      ) : (
        <div className="signup-wrapper">
          <p className="title">
            Sign Up on{" "}
            <span style={{ color: "var(--theme" }}>
              Finance Wizard<span style={{ fontSize: "20px" }}>🪙</span>
            </span>
          </p>
          <form>
            <Input
              type={"text"}
              label={"Full name"}
              state={name}
              setState={setName}
              placeholder={"Jone Deo"}
            />
            <Input
              type={"email"}
              label={"email"}
              state={email}
              setState={setEmail}
              placeholder={"jonedeo@gmail.com"}
            />
            <Input
              type={"password"}
              label={"password"}
              state={password}
              setState={setPassword}
              placeholder={"Example@123"}
            />
            <Input
              type={"password"}
              label={"Confirm Password"}
              state={confirmPassword}
              setState={setConfirmPassword}
              placeholder={"Example@123"}
            />
            <Button
              onclick={signUpWithEmail}
              text={"SignUp using Email and Password"}
            />
            <p className="p-login" onClick={() => setLoginForm(!loginForm)}>
              OR
            </p>
            <Button
              disabled={loading}
              text={loading ? "loading..." : "SignUp using Google"}
              blue={true}
            />
            <p className="p-login" onClick={() => setLoginForm(!loginForm)}>
              OR Have an account alredy
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default SignupSignin;
