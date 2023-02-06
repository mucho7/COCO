import { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { onChangeCode } from "../../../store/compileSlice";
import { useDispatch } from "react-redux";

import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'
import { MonacoBinding } from 'y-monaco'


function Ide(props) {
  const [userCode, setUserCode] = useState(``);
  const [userLanguage, setUserLanguage] = useState("java");
  const [userTheme, setUserTheme] = useState("vs-dark");
  
  const dispatch = useDispatch();
  
  // function handleChangeCode(event) {
    //   setUserCode(event.target.value);
    //   dispatch(onChangeCode(event.target.value));
    // }
  
    
  // WebRTC
  const editorRef = useRef(null);
  
  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    const ydoc = new Y.Doc();
    const provider = new WebrtcProvider("monaco", ydoc);
    const yText = ydoc.getText("monaco");

    const monacoBinding = new MonacoBinding(
      yText,
      editorRef.current.getModel(),
      new Set([editorRef.current]),
      provider.awareness
    );
  }


  return (
    <Editor 
      id="editor"
      options={{fontSize: 16, minimap: { enabled: false }, scrollbar: { vertical: "auto", horizontal: "auto" }}}
      // height="100%"
      // width="100%"
      language={userLanguage}
      theme={userTheme}
      defaultValue="# 코드를 입력하세요."
      value={userCode}
      onChange={(value) => {
        setUserCode(value)
        dispatch(onChangeCode(value))
      }}
      sx={{m: 0}}
      onMount={handleEditorDidMount}
    />
  );
}

export default Ide;