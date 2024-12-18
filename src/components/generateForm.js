import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ResumeGenerator = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [sections, setSections] = useState("");
  const [style, setStyle] = useState("");
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleFileChange = (e) => {
    setUploadedFile(e.target.files[0]);
  };

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    if (name === "job_description") {
      setJobDescription(value);
    } else if (name === "sections") {
      setSections(value);
    } else if (name === "style") {
      setStyle(value);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (!uploadedFile) {
      alert("Please upload a resume.");
      return;
    }
    setLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append("uploaded_file", uploadedFile);
    formDataToSend.append("job_description", jobDescription);
    formDataToSend.append("sections", sections);
    formDataToSend.append("style", style);

    try {
      const response = await axios.post(
        "http://65.2.137.104:5000/generate_resume",
        formDataToSend,
        { responseType: "blob" }
      );
      const file = new File([response.data], "GeneratedResume.tex", {
        type: "application/x-tex",
      });
      setLoading(false);
      navigate("/text-editor", { state: { file } });
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      alert("Error connecting to the API.");
    }
  };

  return (
    <div className="flex flex-col w-1/2 mx-auto p-5">
      <h2 className="text-2xl text-orange-700 font-bold mx-auto">
        Resume Generator
      </h2>
      <form>
        <div className="flex flex-col">
          <label
            htmlFor="jobDescription"
            className="text-md font-bold text-left my-2"
          >
            Job Description:
          </label>
          <textarea
            id="jobDescription"
            name="job_description"
            value={jobDescription}
            onChange={handleTextChange}
            rows="4"
            placeholder="Enter job description here"
            className="min-h-24 border border-blue-500 rounded-sm p-2"
            required
          ></textarea>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="sections"
            className="text-md font-bold text-left my-2"
          >
            Sections:
          </label>
          <textarea
            id="sections"
            name="sections"
            value={sections}
            onChange={handleTextChange}
            rows="4"
            placeholder="Enter sections here (e.g., Personal Details, Skills, Experience) in JSON format"
            className="min-h-24 border border-blue-500 rounded-sm p-2"
            required
          ></textarea>
        </div>
        <div className="flex flex-col">
          <label htmlFor="resume" className="text-md font-bold text-left my-2">
            Upload Resume:
          </label>
          <input
            type="file"
            id="resume"
            name="uploaded_file"
            onChange={handleFileChange}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-md font-bold text-left my-2">Style:</label>
          <textarea
            type="text"
            id="resume"
            name="style"
            onChange={handleTextChange}
            className="min-h-24 border border-blue-500 rounded-sm p-2"
            required
          />
        </div>
        <button
          type="submit"
          onClick={handleClick}
          disabled={isLoading}
          className={`w-1/2 p-2 mx-auto text-white bg-blue-900 mt-5 ${
            isLoading ? "cursor-not-allowed bg-gray-500" : "hover:bg-blue-700"
          }`}
        >
          {isLoading ? "Generating..." : "Generate"}
        </button>
      </form>
    </div>
  );
};

export default ResumeGenerator;
