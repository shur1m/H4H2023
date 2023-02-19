import ReactFlow, { ReactFlowProvider, useReactFlow } from 'reactflow';
import 'reactflow/dist/style.css';
import Flow from './Flow';

// wrapping with ReactFlowProvider is done outside of the component
function FlowWithProvider(props) {
  return (
    <ReactFlowProvider>
      <Flow {...props} />
    </ReactFlowProvider>
  );
}

export default FlowWithProvider;