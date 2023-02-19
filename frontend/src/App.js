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
    getDirectory().then(res=>setDirectory(res));//gets the directory
  }, [docTitle])
  return (
    

    <div style={{height:"100vh"}} id="outer-container">
      <Navbar/>
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      <div style={{height: '100%'}} id="page-wrap">
        <FlowWithProvider docTitle={docTitle}/>
      </div>
    </div>
  );
}

export default App;
