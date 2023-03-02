import logo from "./logo.svg";
import "./App.css";
import FileViewerOld from "./components/AllFilesViwer";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="App-body">

      <FileViewerOld />
      </div>
    </div>
  );
}

export default App;
