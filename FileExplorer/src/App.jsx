import { useState } from "react";
import Folder from "./components/Folder";
import explorer from "./data/folderData";
import "./App.css";
import useTraverseTree from "./hooks/use-traverse-tree";

function App() {
  const [explorerData, setExplorerData] = useState(explorer);

  const { insertNode } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    console.log("folderId, item, isFolder :>> ", folderId, item, isFolder);
    const result = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(result);
  };

  return (
    <>
      <Folder handleInsertNode={handleInsertNode} explorer={explorerData} />
    </>
  );
}

export default App;
