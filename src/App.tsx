import { useState } from "react";
import "./App.css";

async function getFileContent(file: File | undefined) {
  if (!file) return;
  return await file.text();
}
function App() {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [isFilePicked, setIsFilePicked] = useState<boolean>(false);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      setIsFilePicked(true);
    }
  };
  const handleSumbission = async () => {
    // use fetch
    console.log(await selectedFile?.text());
  };

  return (
    <div className="App">
      <input type="file" name="file" onChange={changeHandler} />
      {isFilePicked ? (
        <>
          <div>
            <p>Filename: {selectedFile?.name}</p>
            <p>FileType: {selectedFile?.type}</p>
            <p>Size: {selectedFile?.size}</p>
          </div>
        </>
      ) : (
        <p>Select file to show detailsyou</p>
      )}
      <div>
        <button onClick={handleSumbission}>Submit</button>
      </div>
    </div>
  );
}

export default App;
