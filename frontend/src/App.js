import './App.css';
import logo from './logo.svg';
import FlowWithProvider from './components/FlowWithProvider';
import 'reactflow/dist/style.css';

function App() {

  return (
    <div style={{height:"100vh"}}>
      <div style={{height: '100%'}}>
        <FlowWithProvider/>
      </div>
    </div>
  );
}

export default App;
