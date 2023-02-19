import { slide as Menu } from 'react-burger-menu';
import './Sidebar.css';


function Sidebar(props) {
  let directory = props.directory;
  const setDocTitle=props.setDocTitle;
  return (
    <Menu>
      {directory.map(title => (<a className="menu-item" key={title} onClick={()=>setDocTitle(title)}>{title}</a>)) }
    </Menu>
    
  )
}


export default Sidebar;
