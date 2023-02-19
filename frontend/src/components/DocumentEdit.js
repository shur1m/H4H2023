import Textarea from 'rc-textarea';
import { useState } from 'react';
import ProgressBar from './ProgressBar';

// component for editing the document
function DocumentEditBar({children}) {
    return (
        <div className='nodeEditBar'>
            { children }
        </div>
    )
}

//buttons within the menu
function DocumentEditButton({onClick, label}) {
    return (
        <button onClick= { onClick } >
            { label }
        </button>
    )
}

//handlers for documenteditwindow
function handleNodeDataChange(event, originalNode, nodes, setNodes){
    let newNodes = nodes.filter((nd) => nd.id !== originalNode.id);
    console.log(event.target.value)
    console.log(originalNode.data)
    newNodes = [...newNodes, {
        ...originalNode,
        data: {
            ...originalNode.data,
            [event.target.name] : event.target.value,
        }
    }]

    console.log(newNodes);
    setNodes(newNodes);
}

function handleAddProgressBar(pb, node, nodes, setNodes) {
    console.log('hdfss')
    pb.total = parseFloat(pb.total)
    pb.completed = parseFloat(pb.completed)
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
    console.log(newNodes);
}

function DocumentEditWindow({ nodeId, nodes, setNodes}){
    let node = nodes.filter((nd) => nd.id == nodeId)[0];
    const [isEditable, setIsEditable] = useState(false);

    const [ newPb, setNewPb ] = useState({
        label: '',
        completed: 0,
        total: 1,
    })

    if (node === undefined)
        return <div></div>
    
    //contains the name, description, and progress of the goal
    return (
        <div key={node.id} className='editWindow'>
            <button className='editWindowButton' onClick={() => setIsEditable(!isEditable)}> {isEditable ? 'Done' : 'Edit'} </button>
             {isEditable ?
                <form>
                    <p><input name="label" value={node.data.label} placeholder="Title" onChange={(e) => handleNodeDataChange(e, node, nodes, setNodes)}/></p>
                    <p><textarea name="description" value={node.data.description} cols="30" rows="10" onChange={(e) => handleNodeDataChange(e, node, nodes, setNodes)}></textarea></p>
                    
                    {/* adding progress bars */}
                    <p><input value={newPb.label} placeholder='Task Name' onChange={(e) => setNewPb({...newPb, label: e.target.value })}/></p>
                    <p><input value={newPb.completed} placeholder='# of Completed Tasks' onChange={(e) => setNewPb({...newPb, completed: e.target.value })}/></p>
                    <p><input value={newPb.total} placeholder='# of Tasks' onChange={(e) => setNewPb({...newPb, total: e.target.value })}/></p>
                    <button onClick={(e) => {e.preventDefault(); handleAddProgressBar(newPb, node, nodes, setNodes)}}> Add Task </button>
                </form> 
                
                :

                <>
                    <div> {node.data.label ?? ''} </div>
                    <div> {node.data.description ?? ''} </div>

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