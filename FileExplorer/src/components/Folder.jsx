import React, { useState } from "react";

const Folder = ({ explorer, handleInsertNode }) => {
  const [expland, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: true,
  });

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();

    setExpand(true);

    setShowInput({ visible: true, isFolder: isFolder });
  };

  const onAddFolder = (e) => {
    console.log(e.keyCode);
    console.log("e.target :>> ", e.target.value);
    if (e.keyCode == 13 && e.target.value) {
      // login to add file or folder
      console.log("onAddFolder", explorer);

      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  if (explorer?.isFolder) {
    return (
      <div style={{ marginTop: 5 }}>
        <div className="folder" onClick={() => setExpand(!expland)}>
          <span>📁 {explorer.name}</span>

          <div>
            <button onClick={(e) => handleNewFolder(e, true)}>Folder +</button>
            <button onClick={(e) => handleNewFolder(e, false)}>File +</button>
          </div>
        </div>

        <div style={{ display: expland ? "block" : "none", paddingLeft: 25 }}>
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "📁" : "📄"}</span>
              <input
                type="text"
                className="inputContainer__input"
                autoFocus
                onKeyDown={onAddFolder}
                onBlur={() => setShowInput({ ...showInput, visible: false })}
              />
            </div>
          )}
          {explorer.items.map((exp) => {
            return (
              <Folder
                explorer={exp}
                key={exp.id}
                handleInsertNode={handleInsertNode}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return <span className="file">📄 {explorer?.name}</span>;
  }
};

export default Folder;
