import React, { useState, useEffect } from "react";
import { Logger } from "logging-library";
import FileViewer from "react-file-viewer";
import { CustomErrorComponent } from "custom-error";

export default function FileViewerOld() {
  const [file, setFile] = useState(null);
  const [ext, setExt] = useState(null);
  const [view, setView] = useState(false);

  const handleChange = (event) => {
    setView(false)
    const selectedFile = event.target.files[0];
    console.log("handleChange==> ", selectedFile);
    const filename = selectedFile.name;
    setExt(filename.split(".").pop());
    setFile(selectedFile);
  };

  const onError = (e) => {
    Logger.logError(e, "error in file-viewer");
  };

  useEffect(() => {
    setView(true)
  }, [handleChange]);

  return (
    <div>
      <h1>Demo: React File Viewer</h1>
      <hr />
      <input type="file" onChange={handleChange} />
      {view && file && (
        <FileViewer
          fileType={ext}
          filePath={URL.createObjectURL(file)}
          errorComponent={CustomErrorComponent}
          onError={onError}
        />
      )}
    </div>
  );
}
