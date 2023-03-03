import React, { useState, useEffect } from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { Logger } from "logging-library";
import FileViewer from "react-file-viewer";
import { CustomErrorComponent } from "custom-error";

export default function FileViewerNew() {
  const [file, setFile] = useState(null);
  const [ext, setExt] = useState(null);
  const [selectedDocs, setSelectedDocs] = useState([]);
  const [view, setView] = useState(false);

  const handleChange = (event) => {
    setView(false);
    const selectedFile = event.target.files[0];
    const filename = selectedFile.name;
    setExt(filename.split(".").pop());
    setFile(selectedFile);
    event.target.files?.length &&
      setSelectedDocs(Array.from(event.target.files));
  };

  const onError = (e) => {
    Logger.logError(e, "error in file-viewer");
  };

  useEffect(() => {
    setView(true);
  }, [handleChange]);
  return (
    <>
      <input type="file" onChange={handleChange} />
      {view &&
        file &&
        (ext == "mp4" || ext == "mp3" ? (
          <FileViewer
            fileType={ext}
            filePath={URL.createObjectURL(file)}
            errorComponent={CustomErrorComponent}
            onError={onError}
          />
        ) : (
          <DocViewer
            documents={selectedDocs.map((file) => ({
              uri: window.URL.createObjectURL(file),
              fileName: file.name,
            }))}
            pluginRenderers={DocViewerRenderers}
          />
        ))}
    </>
  );
}
