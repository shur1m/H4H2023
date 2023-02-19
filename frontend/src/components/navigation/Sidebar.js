import { slide as Menu } from 'react-burger-menu';
import {useState} from  'react';
import {newGraph,delGraph} from '../../actions/graph';
import {shareGraph} from '../../actions/users';
import './Sidebar.css';


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
      {directory.map(title => (<a className="menu-item" key={title} onClick={()=>setDocTitle(title)}>{title}<button className="delete-button" onClick={()=>handleDelete(title)}>X</button></a>)) }

      {butOrText?<button onClick={()=>setBut(false)}> New Document</button>:
      (<form>
        <input value={newDocumentTitle} onChange={(e)=>setNewDocumentTitle(e.target.value)} type="text"></input>
        <button onClick={(event) => onFormSubmit(event) }>Create Document</button>
      </form>)
      }

    </Menu>

  )
}


export default Sidebar;
