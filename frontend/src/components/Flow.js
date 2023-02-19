import ReactFlow, {
    Controls,
    applyEdgeChanges,
    applyNodeChanges,
    addEdge,
    useReactFlow,
    useOnSelectionChange,
    StepEdge
} from 'reactflow';

import { useState, useCallback, useEffect } from 'react';
import {DocumentEditBar, DocumentEditButton, DocumentEditWindow} from './DocumentEdit';
import GoalNode from './customNodes/GoalNode';

import {getDirectory,getGraph} from '../actions/graph';


//WIP should be fetched from the backend
let unusedId = 0;
const initialNodes = [
    {
        id: '1',
        position: { x: 200, y: 200 },
        data: {
            label: 'Hello',
            description: 'some description',
            progressBars: [
                {
                    completed: 3,
                    total: 10,
                    label: 'finish the ui'
                }
            ]
        },
        type: 'goalNode',
    },
    {
        id: '2',
        position: { x: 100, y: 100 },
        data: { label: 'World' },
        type: 'goalNode',
    },
    {
        id: '3',
        position: {x: 0, y: 0},
        data: {label: "I'm a genius!"},
        type: 'goalNode',
    },
  ];

const initialEdges = [
    {
        id: '1-2',
        source: '1',
        target: '2',
        type: 'step',
    }
];

//node and edge types
const nodeTypes = {
    default: GoalNode,
    goalNode: GoalNode,
}

const edgeTypes = {
    default: StepEdge,
}

// WIP add node to center of the viewport
function handleAddNode(nodes, setNodes){
    setNodes([...nodes, {
        id: `node_${unusedId++}`,
        position: { x: 0, y: 0 },
        data: { label: 'new node' },
        type: 'goalNode'
    }])
}


// WIP somehow make sure reset viewport moves center to 0,0
function handleResetViewPort(reactFlowInstance){
    reactFlowInstance.setViewport({
        x: 0,
        y: 0,
        zoom: 1,
    })
}

function handleDeleteEdgesNodes(nodes, edges, setNodes, setEdges, selectedNodes, selectedEdges){
    let newNodes = [];
    for (let node of nodes){
        let insert = true;
        for (let selectedNode of selectedNodes){
            if (selectedNode.id === node.id)
                insert = false;

            }
        if (insert)
                newNodes.push(node);
    }

    let newEdges = [];
    for (let edge of edges){
        let insert = true;
        for (let selectedEdge of selectedEdges){
            if (selectedEdge.id === edge.id)
                insert = false;

            }
        if (insert)
            newEdges.push(edge);
    }


    setNodes(newNodes);
    setEdges(newEdges);
}

function DisplayWindowOnSelect(setSelectedNodes, setSelectedEdges) {
    useOnSelectionChange({
        onChange: ({ nodes, edges }) => {
            setSelectedNodes([...nodes]);
            setSelectedEdges([...edges]);
        },
    });
}



function Flow(props) {
    // setting up reactflow
    let docTitle = props.docTitle;
    const reactFlowInstance = useReactFlow();
    
    // state for edges and nodes
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);
    const [selectedNodes, setSelectedNodes] = useState([]); // no selected nodes initially
    const [selectedEdges, setSelectedEdges] = useState([]);

    // default functions for flow chart
    const onNodesChange = useCallback( (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),[] );
    const onEdgesChange = useCallback( (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),[] );
    const onConnect = useCallback((params) => {
        setEdges((eds) => addEdge(params, eds))
    },[]);

    useEffect(() => {
        if (docTitle !== ''){
            getGraph(docTitle).then(res=>{
                setNodes(res.nodes);
                setEdges(res.edges); 
            });
        }
    }, [docTitle]);
    

    // display edit windows if node is selected
    DisplayWindowOnSelect(setSelectedNodes, setSelectedEdges);
    return (
    <>
        {/* setting up flow chart */}
        <div style={{ height: '100%' }}>
            <ReactFlow
                nodes={nodes}
                edges = {edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
            >
            <Controls />
            </ReactFlow>

        </div>

        {/* panel for editing flow chart */}
        <div className='editPanel'>
            <DocumentEditBar>
                <DocumentEditButton label='add node' onClick={() => {handleAddNode(nodes, setNodes)}}/>
                <DocumentEditButton label='save project'/>
                <DocumentEditButton label='import image'/>
                <DocumentEditButton label='reset viewport' onClick={() => handleResetViewPort(reactFlowInstance)}/>
                <DocumentEditButton label='delete' onClick={() => handleDeleteEdgesNodes(nodes, edges, setNodes, setEdges, selectedNodes, selectedEdges)}/>
            </DocumentEditBar>
            { selectedNodes.map((nd) => <DocumentEditWindow key={nd.id} nodeId = {nd.id} nodes = {nodes} setNodes = {setNodes}/>) }
        </div>
    </>
    );
}

export default Flow;