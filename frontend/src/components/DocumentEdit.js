import { useState } from 'react';
import ProgressBar from './ProgressBar';
import { v4 as uuidv4 } from 'uuid';
import EditIcon from '@mui/icons-material/Edit';
import EditOffIcon from '@mui/icons-material/EditOff';

// component for editing the document
function DocumentEditBar({children}) {
    return (
        <div className='nodeEditBar'>
            { children }
        </div>
    )
}

//buttons within the menu
function DocumentEditButton({onClick, label, children}) {
    return (
        <div class='documentEditButton' onClick= { onClick } >
            { children }
        </div>
    )
}

//handlers for documenteditwindow
function handleNodeDataChange(event, originalNode, nodes, setNodes){
    let newNodes = nodes.filter((nd) => nd.id !== originalNode.id);
    
    newNodes = [...newNodes, {
        ...originalNode,
        data: {
            ...originalNode.data,
            [event.target.name] : event.target.value,
        }
    }]

    
    setNodes(newNodes);
}

function handleAddProgressBar(pb, node, nodes, setNodes) {
    pb.total = parseFloat(pb.total);
    pb.completed = parseFloat(pb.completed);
    if (pb.total == NaN || pb.completed == NaN)
        return;
    
    let newNodes = nodes.filter((n) => n.id !== node.id);
    let newProgressBars = [...node.data.progressBars, pb];
    newNodes = [...newNodes,
        {
            ...node,
            data: {
                ...node.data,
                progressBars: newProgressBars,
            }
        }
    ]
    setNodes(newNodes);
    
}

function DocumentEditWindow({ nodeId, nodes, setNodes}){
    let node = nodes.filter((nd) => nd.id == nodeId)[0];
    const [isEditable, setIsEditable] = useState(false);
    const [imageLink, setImageLink] = useState('');

    
    const [ newPb, setNewPb ] = useState({
        id: uuidv4(),
        label: '',
        completed: '',
        total: '',
    })

    if (node === undefined)
        return <div></div>
    
    //contains the name, description, and progress of the goal
    return (
        <div key={node.id} className='editWindow'>
            { node.imageLink === undefined ? null : <img className='nodeImage' src={node.imageLink} alt={node.imageLink} /> }

            <div className='editWindowButton' onClick={() => setIsEditable(!isEditable)}> {isEditable ? <EditOffIcon/> : <EditIcon/>} </div>
             {isEditable ?
                <form>
                    <p><input name="label" value={node.data.label} placeholder="Title" onChange={(e) => handleNodeDataChange(e, node, nodes, setNodes)}/></p>
                    <p><textarea name="description" placeholder='Description' value={node.data.description} cols="30" rows="4" onChange={(e) => handleNodeDataChange(e, node, nodes, setNodes)}></textarea></p>
                    
                    {/* adding progress bars */}
                    <p><input value={newPb.label} placeholder='Task Name' onChange={(e) => setNewPb({...newPb, label: e.target.value })}/></p>
                    <p><input value={newPb.completed} placeholder='# of Completed Tasks' onChange={(e) => setNewPb({...newPb, completed: e.target.value })}/></p>
                    <p><input value={newPb.total} placeholder='# of Tasks' onChange={(e) => setNewPb({...newPb, total: e.target.value })}/></p>
                    <button onClick={(e) => {
                        e.preventDefault();
                        setNewPb({ ...newPb, id: uuidv4() });
                        handleAddProgressBar(newPb, node, nodes, setNodes)}}>
                            Add Task
                    </button>

                    <p><input value={imageLink} placeholder='image link' onChange={(e) => setImageLink(e.target.value)} /></p>

                    <p><button onClick={(e) => {e.preventDefault(); setNodes([ ...(nodes.filter((n) => n.id !== node.id)), {...node, imageLink: imageLink}])} }> Add Picture </button></p>
                    
                </form> 
                
                :

                <>
                    <div className='nodeTitle'> {node.data.label ?? ''} </div>
                    <div className='nodeDescription'> {node.data.description ?? ''} </div>

                    {/* progress bars */}
                </>}
            
                { node.data.progressBars !== undefined ? node.data.progressBars.map((pb) => <ProgressBar
                    node={node}
                    nodes={nodes}
                    setNodes={setNodes}
                    key={nodeId + pb.label} pb={ pb }
                    isEditable={isEditable}/>) : null}
            

        </div>
    )
}

export { DocumentEditBar, DocumentEditButton, DocumentEditWindow };