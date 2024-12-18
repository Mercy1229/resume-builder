import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import GenerateForm from "./components/generateForm";
import TextEditor from "./components/TextEditor";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<GenerateForm />} />
          <Route path="/text-editor" element={<TextEditor />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
