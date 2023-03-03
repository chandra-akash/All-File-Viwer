import React, { useState, useEffect } from "react";
import { Logger } from "logging-library";
import FileViewer from "react-file-viewer";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { CustomErrorComponent } from "custom-error";

export default function FileViewerNew() {
  const [selectedDocs, setSelectedDocs] = useState([]);
  const onError = (e) => {
    Logger.logError(e, "error in file-viewer");
  };
  return (
    <>
      <input
        type="file"
        multiple
        onChange={(el) =>
          el.target.files?.length &&
          setSelectedDocs(Array.from(el.target.files))
        }
      />
      <DocViewer
        documents={selectedDocs.map((file) => ({
          uri: window.URL.createObjectURL(file),
          fileName: file.name,
        }))}
        pluginRenderers={DocViewerRenderers}
        errorComponent={CustomErrorComponent}
        onError={onError}
      />
    </>
  );
}
