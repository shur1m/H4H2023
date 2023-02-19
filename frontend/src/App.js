import logo from './logo.svg';
import FlowWithProvider from './components/FlowWithProvider';
import 'reactflow/dist/style.css';
import './App.css';
import {useEffect,useState } from 'react'
import {getDirectory} from './actions/graph';

function App() {
  const [docTitle,setDocTitle] =useState("newGraph");
  const [directory,setDirectory]=useState([]);
  useEffect(() => {
    getDirectory().then(res=>setDirectory(res));//gets the directory
  }, [docTitle])
  return (
    

    <div style={{height:"100vh"}}>
      <div style={{height: '100%'}}>
        <FlowWithProvider docTitle={docTitle}/>
      </div>
    </div>
  );
}

export default App;
