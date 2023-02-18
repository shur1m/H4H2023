import ReactFlow, {
    Controls,
    Background,
    applyEdgeChanges,
    applyNodeChanges,
    addEdge,
    useReactFlow,
    useOnSelectionChange
} from 'reactflow';

import { useState, useCallback } from 'react';
import {DocumentEditBar, DocumentEditButton} from './DocumentEdit';

//WIP should be fetched from the backend
let unusedId = 0;
const initialNodes = [
    {
        id: '1',
        position: { x: 0, y: 0 },
        data: { label: 'Hello', description: 'some description'},
        type: 'input',
    },
    {
        id: '2',
        position: { x: 100, y: 100 },
        data: { label: 'World' },
    },
    {
        id: '3',
        position: {x: 200, y: 200},
        data: {label: "I'm a genius!"},
    },
  ];
  
const initialEdges = [
    {
        id: '1-2',
        source: '1',
        target: '2',
        label: 'to the',
        type: 'step',
    }
];

// WIP add node to center of the viewport
function handleAddNode(nodes, setNodes){
    setNodes([...nodes, {
        id: `node_${unusedId++}`,
        position: { x: 0, y: 0 },
        data: { label: 'new node' },
        type: 'input'
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

function DisplayWindowOnSelect(setSelectedNodes) {
    useOnSelectionChange({
        onChange: ({ nodes, _ }) => {
            setSelectedNodes([...nodes]);
        },
    });
}

function Flow() {
    // setting up reactflow
    const reactFlowInstance = useReactFlow();
    
    // state for edges and nodes
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);
    const [selectedNodes, setSelectedNodes] = useState([]); // no selected nodes initially
    
    // default functions for flow chart
    const onNodesChange = useCallback( (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),[] );
    const onEdgesChange = useCallback( (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),[] );
    const onConnect = useCallback((params) => {
        setEdges((eds) => addEdge(params, eds))
    },[]);

    // display edit windows if node is selected
    DisplayWindowOnSelect(setSelectedNodes);
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
            >
            <Background />
            <Controls />
            </ReactFlow>

            { selectedNodes.map((nd) => <div key={nd.id} class='editWindow'> {nd.data.label ?? ''}  </div>) }
        </div>

        {/* bar for editing nodes */}
        <DocumentEditBar>
            <DocumentEditButton label='add node' onClick={() => {handleAddNode(nodes, setNodes)}}/>
            <DocumentEditButton label='save project'/>
            <DocumentEditButton label='import image'/>
            <DocumentEditButton label='reset viewport' onClick={() => handleResetViewPort(reactFlowInstance)}/>
        </DocumentEditBar>

        {/* edit node windows */}
    </>
    );
}

export default Flow;