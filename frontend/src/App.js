import './App.css';
import logo from './logo.svg';
import FlowWithProvider from './components/FlowWithProvider';
import 'reactflow/dist/style.css';
import Sidebar from './components/Sidebar';

function App() {

  return (
    <div style={{height:"100vh"}} id="outer-container">
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      <div style={{height: '100%'}} id="page-wrap">
        <FlowWithProvider/>
      </div>
    </div>
  );
}

export default App;
