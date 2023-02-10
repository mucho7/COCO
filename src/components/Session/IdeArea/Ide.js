import { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { onChangeCode } from "../../../store/compileSlice";
import { useDispatch } from "react-redux";

import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'
import { MonacoBinding } from 'y-monaco'
import { useParams } from "react-router-dom";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


function Ide(props) {
  const [userCode, setUserCode] = useState(``);
  const [userLanguage, setUserLanguage] = useState("java");
  const [userTheme, setUserTheme] = useState("vs-dark");
  
  const dispatch = useDispatch();
  const participant = props.participant;
  
    
  // WebRTC
  const editorRef = useRef(null);
  const { roomId } = useParams();
  
  useEffect(() => {
    function setEditorWebrtc(editor) {
      editorRef.current = editor;
      const ydoc = new Y.Doc();
      const provider = new WebrtcProvider(`monaco-${roomId}`, ydoc);
      const yText = ydoc.getText("monaco");
  
      const monacoBinding = new MonacoBinding(
        yText,
        editorRef.current.getModel(),
        new Set([editorRef.current]),
        provider.awareness
      );
    }
    setEditorWebrtc();
  }, [roomId])


  const languageSelector = (
    <Box sx={{ minWidth: 120, height: 30 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Language</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={userLanguage}
          label="userLanguage"
          onChange={setUserLanguage}
        >
          <MenuItem value={"java"}>JAVA</MenuItem>
          <MenuItem value={"python"}>PYTHON</MenuItem>
          <MenuItem value={"javascript"}>JAVASCRIPT</MenuItem>
          <MenuItem value={"c"}>C</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )

  return (
    <div>
      {/* {participant.isHost && languageSelector} */}
      {languageSelector}
      <Editor 
        id="editor"
        options={{fontSize: 16, minimap: { enabled: false }, scrollbar: { vertical: "auto", horizontal: "auto" }}}
        height="auto"
        width="100%"
        language={userLanguage}
        theme={userTheme}
        defaultValue="# 코드를 입력하세요."
        value={userCode}
        onChange={(value) => {
          setUserCode(value)
          dispatch(onChangeCode(value))
        }}
        sx={{m: 0}}
        // onMount={handleEditorDidMount}
      />
    </div>
  );
}

export default Ide;