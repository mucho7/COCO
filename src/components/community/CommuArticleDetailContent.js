/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import MonacoEditor from "@monaco-editor/react"


import styled from "styled-components";
import { Typography,  } from "@mui/material";

import myInlineDecoration from "./CommuArticleDetailContent.css";
import { CookieSharp } from "@mui/icons-material";

function CommuArticleDetailContent(params) {
    const [ hoverTarget, setHoverTarget ] = useState([-1, -1])
    const [ target, setTarget ] = useState({isActive: false, key:-2, startIndex: -2, endIndex: -2})
    const editorRef = useRef(null)

    const content = (params.content.content)
    const code = (params.content.code)
    
    const onMouseEnterHandler = (startIndex, endIndex, uniqueKey) => {
        if (startIndex === -1){
            setHoverTarget({isActive: false, key:uniqueKey, startIndex: startIndex, endIndex: endIndex})
        } else {
            setHoverTarget({isActive: true, key: uniqueKey, startIndex: startIndex, endIndex: endIndex})
        }
    }
    const onMouseLeaveHandler = (startIndex, endIndex, uniqueKey) => {
        setHoverTarget({isActive: false, key:uniqueKey, startIndex: startIndex, endIndex: endIndex})
    }
    
    const onContentBlockClickHandler = (startIndex, endIndex, uniqueKey) => {
        if (startIndex === -1){
            setTarget({...target, isActive: false, key:uniqueKey})
        } else {
            setTarget({isActive: true, key: uniqueKey, startIndex: startIndex, endIndex: endIndex})
        }
    }
    
    useEffect(() => {
        if (target.key === -2) return
        const editor = monaco.editor.getModels()[0];
        if (target.isActive) {
            editor.deltaDecorations([], [{
                range: new monaco.Range(target.startIndex, 0, target.endIndex, 0),
                options: {
                    isWholeLine: true,
                    inlineClassName: 'myInlineDecoration'
                }
            }]);
        } else {
            console.log(monaco.editor.getModels()[0].deltaDecorations)
            editor.removeAllDecorationsWithOwnerId()
        }
    }, [target])

    return (
        <>
            <ContentSection >
                {content.map((item, uniqueKey) => {
                    return(
                        <StyeldCard 
                        onClick={() => onContentBlockClickHandler(item.startIndex, item.endIndex, uniqueKey)} onMouseEnter={() => onMouseEnterHandler(item.startIndex, item.endIndex, uniqueKey)} onMouseLeave={onMouseLeaveHandler} 
                        istarget={target.isActive && uniqueKey == target.key} ishovering={uniqueKey == hoverTarget.key && hoverTarget.isActive} key={uniqueKey}>
                            {item.content.map((string, uniqueKey) => {
                                return(
                                    <Typography key={uniqueKey} >{string}</Typography>
                                    )
                                })}
                        </StyeldCard>
                    )
                })}
            </ContentSection>
            <Vr/>
            <CodeSection>
                <MonacoEditor
                    language="javascript"
                    value={params.content.rawContent}
                    lineNumbers="on"
                    options={{ readOnly: true }}
                    theme="vs"
                />;
                {/* {code.map((item, uniqueKey) => {    
                    return(
                        <StyeldCodeBox istarget={(target.isActive && target.startIndex <= uniqueKey && target.endIndex >= uniqueKey)} ishovering={(hoverTarget.isActive && hoverTarget.startIndex <= uniqueKey && hoverTarget.endIndex >= uniqueKey)} 
                        id={item.index} key={uniqueKey}>
                            {item}
                        </StyeldCodeBox>
                    )
                })} */}
            </CodeSection>
        </>
    )
}

const ArticleContent = `
    width: 45%;
    height: 500px;
    overflow-wrap: break-word; 
`
const ContentSection = styled.section`
    ${ArticleContent}
    overflow-y: scroll;

`
const CodeSection = styled.section`
    ${ArticleContent}   
    margin-top: 15px;
`
const Vr = styled.div`
    width: 1px;
    height: 100%;

    background: gray;
`

const StyeldCard = styled.div`
    margin: 15px 0 0 0;
    padding-left: 10px;
    border-radius: 10px;
    background-color: ${props => {if (props.ishovering) {return 'blue'} else if (props.istarget) {return 'red'} else { return 'white'} }};
`

const StyeldCodeBox = styled.div`
    margin: 15px 0 0 0;
    padding-left: 10px;
    border-radius: 10px;
    background-color: ${props => {if (props.ishovering) {return 'blue'} else if (props.istarget) {return 'red'} else { return 'white'} }};
`

export default CommuArticleDetailContent