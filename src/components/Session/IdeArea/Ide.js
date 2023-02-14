import { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { onChangeCode, onChangeLanguage } from "../../../store/compileSlice";
import { useDispatch, useSelector } from "react-redux";
import Compiler from "./Compiler";

import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'
import { MonacoBinding } from 'y-monaco'
import { useParams } from "react-router-dom";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect } from "react";
import { participantsInstances, setUpdated } from "../../../store/sessionSlice";


function Ide(props) {
  const [userCode, setUserCode] = useState(``);
  const [userLanguage, setUserLanguage] = useState("java");
  const [userTheme, setUserTheme] = useState("vs-dark");
  const participantsId = useSelector((state) => state.session.participantsId);
  const [participants, setParticipants] = useState({});
  const updated = useSelector((state) => state.session.updated);
  const userId = localStorage.getItem("userId");
  const isCompileButtonOn = useSelector((state) => state.toolBarAction.isCompileButtonOn);
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (participantsId) {
      setParticipants(participantsInstances.get(participantsId));
    }
    
    if (updated) {
      setParticipants(participantsInstances.get(participantsId));
      dispatch(setUpdated(false));
    }
  }, [participantsId, updated, dispatch])
  
    
  // WebRTC
  const editorRef = useRef(null);
  const { roomId } = useParams();
  
  function handleEditorDidMount(editor, monaco) {
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

  const languageSelector = (
    <Box sx={{ minWidth: 120, height: 60, bgcolor: "white" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Language</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={userLanguage}
          label="userLanguage"
          onChange={(e) => {
            setUserLanguage(e.target.value)
            dispatch(onChangeLanguage(e.target.value))
          }}
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
    <Box sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
      {participants[userId]?.isHost && languageSelector}
      {/* {languageSelector} */}
      <Editor 
        id="editor"
        options={{fontSize: 16, minimap: { enabled: false }, scrollbar: { vertical: "auto", horizontal: "auto" }}}
        width="100%"
        language={userLanguage}
        theme={userTheme}
        defaultValue="# 코드를 입력하세요."
        value={userCode}
        onChange={(value) => {
          setUserCode(value)
          dispatch(onChangeCode(value))
        }}
        sx={{ m: 0, flexGrow: 1 }}
        onMount={handleEditorDidMount}
      />
      <Compiler />
    </Box>
  );
}

export default Ide;