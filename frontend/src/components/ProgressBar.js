import AddIcon from '@mui/icons-material/Add';

function handleDeleteProgressBar(pb, node, nodes, setNodes) {
    let newNodes = nodes.filter((n) => n.id !== node.id);
    let newProgressBars = node.data.progressBars.filter((p) => p.id !== pb.id);
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

function handleIncrementCompleted(pb, node, nodes, setNodes){
    let newNodes = nodes.filter((n) => n.id !== node.id);
    let newProgressBars = node.data.progressBars.filter((p) => p.id !== pb.id);

    pb = {
        ...pb,
        completed: pb.completed < pb.total ? pb.completed + 1 : pb.completed, 
    }

    newNodes = [...newNodes,
        {
            ...node,
            data: {
                ...node.data,
                progressBars: [...newProgressBars, pb],
            }
        }
    ]
    setNodes(newNodes);
}

function ProgressBar({ node, nodes, setNodes, pb, isEditable}) {
    const percent = (pb.completed / pb.total) * 100;
    return (
        <>
            <div className="progressBarText"> {pb.label} </div>
            <div className="progressBarContainer">
                <div className="progressBar background">
                    <div className="progressBar foreground" style={{width: percent + '%'}}></div>
                </div>
                <div style={{padding: '10px'}}> {pb.completed}/{pb.total}</div>
                {!isEditable ? <div onClick={() => handleIncrementCompleted(pb, node, nodes, setNodes)}> <AddIcon/> </div> : null }
                {isEditable ? <button onClick={() => handleDeleteProgressBar(pb, node, nodes, setNodes)}>delete</button> : null}
            </div>
        </>
    );
}

export default ProgressBar;