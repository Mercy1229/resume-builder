import axios from "axios";
import { useState } from "react";

export default function GenerateForm() {
  const [job_description, setJob_description] = useState('');
  const [section, setSection] = useState('');
  const [uploaded_file, setUploaded_file] = useState(null);
  const handleClick = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('job_description', job_description);
    formData.append('sections', section);
    formData.append('uploaded_file', uploaded_file);
  
    try {
      const response = await axios.post(
        'http://13.127.236.24:5000/generate_resume',
        formData,
      );
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error.response || error.message);
    }
  };
  
  return (
    <div className="flex flex-col ld:w-1/2 md:w-1/2 m-5 mx-auto sm:w-full">
      <form className="w-full leading-8">
        <div className="w-full flex flex-col my-2">       
        <label className="text-start font-bold text-xl">
          Job Description:
          </label> 
          <textarea
            value={job_description}
            onChange={(e) => setJob_description(e.target.value)}
            className="border p-2"
          />
        </div>
        <div className="w-full flex flex-col my-2">
        <label className="text-start font-bold text-xl">Section:</label>
          <textarea
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className="border p-2"
          />
        </div>
        <div className="w-full flex flex-col my-2">
        <label className="text-start font-bold text-xl">
          Upload File: </label>
          <input
            type="file"
            onChange={(e) => setUploaded_file(e.target.files[0])}
            className="border p-2"
          />
        </div>
      </form>
      <button
        type="button"
        className="p-2 border bg-blue-800 text-white"
        onClick={handleClick}
      >
        Submit
      </button>
    </div>
  );
}
