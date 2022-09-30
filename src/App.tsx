import { useState } from "react";
import "./App.css";
import {AllowedExtension} from "./types/allowedExtension";
import {convertCSVtoObject, UserDomains} from "./utils/util";
import Papa from "papaparse";
import {Team} from "./api/agent";

async function getFileContent(file: File | undefined) {
  if (!file) return;
  return await file.text();
}
function App() {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [isFilePicked, setIsFilePicked] = useState<boolean>(false);
  const [error, setError] = useState<string>("")
  const [users, setUsers] = useState<UserDomains>({});
  const [header, setHeader] = useState(false)

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {files} = e.target;
    setError("")
    if (files && files.length > 0) {
      const file = files[0]
      const extensionForFile = file.type.split("/")[1]
      if (extensionForFile != AllowedExtension.CSV) {
        setError(`Only ${AllowedExtension.CSV} files allowed`)
        return
      }
      setSelectedFile(file);
      setIsFilePicked(true);

    }
  };
  const handleSubmission = async () => {
    // use fetch
    // console.log(await selectedFile?.text());
    if (!selectedFile) return setError("Valid file Required");

    const reader = new FileReader();
    let json: UserDomains = {}

    reader.onload = async ({target}) => {
      const csvData = Papa.parse(target?.result, {header: false})
      const data = csvData?.data;

      json = {...convertCSVtoObject(data, true)};
      setUsers(json)
    }
    await reader.readAsText(selectedFile);

    const users = await Team.getTeamInfo("ahojnowski+demo@getguru.com", 'cc0b9270-d76f-4f9a-ae91-bd8072651ae9')
    console.log("USERS", users)
  };

  return (
    <div>
      <div className="App">
        <div style={{"display": "flex", "marginBottom": "1rem"}}>
          <input type="checkbox" name="header" value="header?" onChange={() => {
            setHeader(!header)
          }}/>
          <span>Has Headers?</span>
        </div>
        <input type="file" name="file" onChange={changeHandler} />
      </div>

      {isFilePicked ? (
        <>
          <div>
            <p>Filename: {selectedFile?.name}</p>
            <p>FileType: {selectedFile?.type}</p>
            <p>Size: {selectedFile?.size}</p>
          </div>
        </>
      ) : (
        <p>Select file to show details you</p>
      )}
      <div>
        <button disabled={!isFilePicked}onClick={handleSubmission}>Submit</button>
      </div>
      <div>
        {error ? error : ""}
      </div>
      <div>{users && Object.keys(users).map(key => <p>{key}:{users[key]}</p>)}</div>
    </div>
  );
}

export default App;
