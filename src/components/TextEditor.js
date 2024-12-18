import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation } from "react-router-dom";
import "../App.css";
import { parseLatexToReadableText } from "./ParsedLatext";

const TextEditor = () => {
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const location = useLocation();
  const file = location.state?.file;
  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const latexContent = event.target.result;
        const parsedContent = parseLatexToReadableText(latexContent);
        setContent(parsedContent);
      };

      reader.onerror = (err) => {
        console.error("Error reading file:", err);
        setError(err.message);
      };
      reader.readAsText(file);
    }
  }, [file]);

  const handleSave = () => {
    const updatedContent = content;
    const blob = new Blob([updatedContent], { type: "application/x-tex" });
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = "UpdatedResume.tex";
    downloadLink.click();
    alert("File saved successfully!");
  };
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        ["link", "image"],
        ["clean"],
      ],
    },
  };
  return (
    <div className="app-container">
      <h1 className="text-4xl font-bold text-center mb-4">Resume Editor</h1>

      {error ? (
        <p className="text-red-500 text-center">Error: {error}</p>
      ) : (
        <div className="editor-wrapper">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            modules={modules}
            className="quill-editor"
          />
          <button
            onClick={handleSave}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default TextEditor;
