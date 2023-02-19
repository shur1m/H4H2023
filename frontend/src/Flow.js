import ReactFlow, {
    Controls,
    Background,
    applyEdgeChanges,
    applyNodeChanges,
    addEdge,
} from 'reactflow';
import { useState, useCallback } from 'react';
import 'reactflow/dist/style.css';

const initialNodes = [
    {
        id: '1',
        position: { x: 0, y: 0 },
        data: { label: 'Hello' },
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

function Flow() {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const onNodesChange = useCallback( (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),[] );
    const onEdgesChange = useCallback( (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),[] );
    const onConnect = useCallback((params) => {
        setEdges((eds) => addEdge(params, eds))
    },[]);

    return (
    <div style={{ height: '100%' }}>
        <ReactFlow
            nodes={nodes}
            edges = {edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            // i found it bois onInit
        >
        <Background />
        <Controls />
        </ReactFlow>
    </div>
    );
}

export default Flow;