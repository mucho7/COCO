import { useState } from "react";
import Editor from "@monaco-editor/react";
import { onChangeCode } from "../../../store/compileSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import * as Y from 'yjs'
import { WebrtcProvider } from 'y-webrtc'
import { MonacoBinding } from 'y-monaco'


function Ide(props) {
  const [userCode, setUserCode] = useState(``);
  const [userLanguage, setUserLanguage] = useState("java");
  const [userTheme, setUserTheme] = useState("vs-dark");
  
  const [editorRef, setEditorRef] = useState(null);

  const handleEditorDidMount = (editor) => {
    setEditorRef(editor);
  }

  const dispatch = useDispatch();

  // function handleChangeCode(event) {
  //   setUserCode(event.target.value);
  //   dispatch(onChangeCode(event.target.value));
  // }

  useEffect(() => {
    if (editorRef) {
      const ydoc = new Y.Doc();
      let provider = null;
      try {
        provider = new WebrtcProvider("monaco", ydoc, {
          signaling: [
            "wss://signaling.yjs.dev",
            'wss://y-webrtc-signaling-eu.herokuapp.com', 
            'wss://y-webrtc-signaling-us.herokuapp.com'
          ]
        });

        const yText = ydoc.getText("monaco");
        const yUndoManager = new Y.UndoManager(yText);
        const awareness = provider.awareness;
        awareness.setLocalStateField("user", {
          name: "User1",
          color: "#ffffff",
        });

        const getBinding = new MonacoBinding(yText, editorRef, awareness, {
          yUndoManager,
        });
      } catch (error) {
        alert("error");
      }

      return () => {
        if (provider) {
          provider.disconnect();
          ydoc.destroy();
        }
      };
    }
  }, [editorRef])

  // awareness.on("change", changes => {
  //   // Whenever somebody updates their awareness information,
  //   // we log all awareness information from all users.
  //   console.log(Array.from(awareness.getStates().values()))
  // })

  // awareness.setLocalStateField('user', {
  //   // Define a print name that should be displayed
  //   name: 'Emmanuelle Charpentier',
  //   // Define a color that should be associated to the user:
  //   color: '#ffb61e' // should be a hex color
  // })

  return (
    <Editor 
      id="editor"
      options={{fontSize: 20}}
      height="100%"
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
      onDidCreateEditor={(editor) => {
        handleEditorDidMount(editor);
      }}
    />
  );
}

export default Ide;