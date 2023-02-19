import logo from './logo.svg';
import FlowWithProvider from './components/FlowWithProvider';
import 'reactflow/dist/style.css';
import Sidebar from './components/navigation/Sidebar';
import Navbar from './components/navigation/Navbar';
import './App.css';
import {useEffect,useState } from 'react'
import {getDirectory} from './actions/graph';

function App() {
  const [docTitle,setDocTitle] =useState('');
  const [directory,setDirectory]=useState([]);
  useEffect(() => {
    console.log("Title Change");
    getDirectory().then(res=>setDirectory(res));//gets the directory
  }, [])
  return (
    <div style={{height:"100vh"}} id="outer-container">
      <Navbar/>
      <Sidebar setDirectory={setDirectory}setDocTitle={setDocTitle} directory={directory} />
      <div style={{height: '100%'}} id="page-wrap">
        <FlowWithProvider docTitle={docTitle}/>
      </div>
    </div>
  );
}

export default App;
