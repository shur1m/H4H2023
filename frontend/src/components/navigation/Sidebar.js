import { slide as Menu } from 'react-burger-menu';
import {useState} from  'react';
import {newGraph,delGraph} from '../../actions/graph';
import {shareGraph} from '../../actions/users';
import './Sidebar.css';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

function Sidebar(props) {
  let directory = props.directory;
  const setDocTitle=props.setDocTitle;
  const onFormSubmit=(event)=>{
    event.preventDefault();
    console.log(newDocumentTitle);
    newGraph(newDocumentTitle);
    console.log(props.user);
    shareGraph(newDocumentTitle,props.user)
    setDocTitle(newDocumentTitle);
    props.setDirectory([...directory,newDocumentTitle])
    setNewDocumentTitle("");
    setBut(true);
  }
  const handleDelete=(deleteTitle)=>{
    delGraph(deleteTitle);
    let newDir = directory.filter((title)=> deleteTitle !== title);
    props.setDirectory(newDir);
  }
  const [butOrText, setBut]=useState(true);
  const [newDocumentTitle,setNewDocumentTitle] =useState("");
  return (
    <Menu>
      {directory.map(title => (<div className="directory"><a className="menu-item" key={title} onClick={()=>setDocTitle(title)}>{title}</a><div className="delete-button" onClick={()=>handleDelete(title)}> <RemoveCircleIcon/>  </div></div>)) }

      {butOrText?<div onClick={()=>setBut(false)}> <NoteAddIcon/> </div>:
      (<div style={{ paddingTop:'10px', display:'flex', flexDirection:'row' }}>
        <input value={newDocumentTitle} onChange={(e)=>setNewDocumentTitle(e.target.value)} type="text"></input>
        <div style={{paddingLeft: '10px'}} onClick={(event) => onFormSubmit(event) }><NoteAddIcon/></div>
      </div>)
      }

    </Menu>

  )
}


export default Sidebar;
