import logo from './logo.svg';
import FlowWithProvider from './components/FlowWithProvider';
import 'reactflow/dist/style.css';
import Sidebar from './components/navigation/Sidebar';
import Navbar from './components/navigation/Navbar';
import './App.css';
import {useEffect,useState } from 'react'
import {getDirectory} from './actions/graph';
import {getUserDirectory,newUser} from './actions/users';

//
import {signInWithPopup,getAuth,GoogleAuthProvider} from 'firebase/auth';
import { initializeApp } from "firebase/app";


// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: "test-app2-177a1.firebaseapp.com",
    databaseURL:"https://test-app2-177a1-default-rtdb.firebaseio.com/",
    projectId: "test-app2-177a1",
    storageBucket: "test-app2-177a1.appspot.com",
    messagingSenderId: "723263322838",
    appId: "1:723263322838:web:5fe544292366c32637e777",
    measurementId: "G-C1CJMC9092"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);


function App() {
  const [photo,setPhoto]=useState("");

  const [docTitle,setDocTitle] =useState('');
  const [directory,setDirectory]=useState([]);
  const [user,setUser]=useState("");

  const provider= new GoogleAuthProvider();
  const googleLogin = async () =>{
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    await signInWithPopup(auth, provider)
        .then(async (result) => {
          console.log(result);
          const uid =result.user.uid;
          setPhoto(result.user.photoURL);
          setUser(uid);
          newUser(uid);
        })
  }

  useEffect(() => {
    console.log("Title Change");
    if(user){
      getUserDirectory(user).then(res=>{
        delete res.uid;
        setDirectory(Object.values(res))
      })
    }
    else{
      getDirectory().then(res=>setDirectory(res));//gets the directory
    }
  }, [user])
  return (
    <div style={{height:"100vh"}} id="outer-container">
      <Navbar user={user} setUser={setUser} />
      <Sidebar user={user} setDirectory={setDirectory} setDocTitle={setDocTitle} directory={directory} />
      <div style={{height: '100%'}} id="page-wrap">
        <FlowWithProvider docTitle={docTitle}/>
      </div>
      {photo?<img src={photo} referrerPolicy="no-referrer" alt="" width="30" height="30" style={{ position: 'absolute', right: '20px',top:'10px'}} ></img>:<button type="button" className="login-with-google-btn" onClick={googleLogin}>Login with Google</button>}
    </div>
  );
}

export default App;
