import React, { useEffect, useState } from "react";
import axios from 'axios';
import FileDownload from "js-file-download";
import 'bootstrap/dist/css/bootstrap.min.css';

function Uploadfile() {
  const [uploadedPics, setUploadedPics] = useState([]);
  const [fetchFromFolder, setFetchFromFolder] = useState([]);

  const fetchAvailableFiles = async (data) => {
    try {
      console.log(data.target.value);

      let result = await axios.post("/getAllFiles", { folderId: data.target.value });
      let files = result.data.data;

      console.log(files);
      setUploadedPics(files);
    } catch (error) {
      console.log(error);
    }
  }
  const downloadaFile = async (e) => {
    try {
      let result = await axios.post("/getafile", { filename: e.target.name }, { responseType: "blob" })
      FileDownload(result.data, JSON.parse(result.config.data).filename.slice(22));
    }
    catch (error) {
      console.log(error);
    }
  }

  async function allFolderData() {
    try {
      let result = await axios.get("/getallfolders");
      console.log(result.data.data);
      setFetchFromFolder(result.data.data);
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    allFolderData();
  }, [])

  return (
    <>
      <div className="center">
        <h1 className="text-center bg-dark text-white rounded-3" >Upload</h1>
        <form method="POST" action="/uploadfiles" encType="multipart/form-data" className="mt-4">
          <div className="filesTable">
            <input type="text" placeholder="... enter/create group name" name="folderName" />
            <input type="file" name="mediafile" className="btn btn-secondary btn-lg" /> <br />
          </div>
            <input type="submit" className="btn btn-primary btn-lg" />
          
        </form>
      </div>

      <br />
      <br />
      <div className="center">
        <select onChange={fetchAvailableFiles} className="btn btn-secondary btn-lg mb-3">
          <option>- select folder - </option>
          {
            fetchFromFolder.map((ele, idx) => (
              <option key={idx} value={ele._id}>{ele.folderName === "" ? "New Folder" : ele.folderName}</option>
            ))
          }
        </select>
       
        {
          uploadedPics.map((ele, idx) => (
            <div key={idx} className="filesTable mb-2">
              <input type="submit" className="btn btn-info" name={ele} onClick={downloadaFile} value={ele.slice(22)} />
            </div>
          ))
        }
      </div>

    </>
  )
}
export default Uploadfile;