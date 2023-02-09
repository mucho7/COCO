/* eslint-disable */
import { useState, useEffect } from "react";

import styled from "styled-components";
import { Typography,  } from "@mui/material";

function CommuArticleDetailContent(params) {
    const [ hoverTarget, setHoverTarget ] = useState([-1, -1])
    const [ target, setTarget ] = useState(-2)
    const content = (params.content.content)
    const code = (params.content.code)

    console.log(params)

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
    
    const onContentBlockClickHandler = (event) => {
        if (event.target.parentElement.id !== "-1"){
            setTarget(event.target.parentElement.id)
        } else {
            setTarget(0)
        }
    }

    useEffect(() => {
        // console.log(target)
        // console.log(hoverTarget)
    }, [ target, hoverTarget ])

    return (
        <>
            <ContentSection >
                {content.map((item, uniqueKey) => {
                    return(
                        <StyeldCard 
                        onClick={() => onContentBlockClickHandler(item.startIndex, item.endIndex, uniqueKey)} onMouseEnter={() => onMouseEnterHandler(item.startIndex, item.endIndex, uniqueKey)} onMouseLeave={onMouseLeaveHandler} 
                        istarget={uniqueKey == target.key} ishovering={uniqueKey == hoverTarget.key && hoverTarget.isActive} key={uniqueKey}>
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
                {code.map((item, uniqueKey) => {
                    return(
                        <StyeldCodeBox istarget={(item.index == target)} ishovering={(hoverTarget.isActive && hoverTarget.startIndex <= uniqueKey && hoverTarget.endIndex >= uniqueKey)} 
                        id={item.index} key={uniqueKey}>
                            {item}
                        </StyeldCodeBox>
                    )
                })}
            </CodeSection>
        </>
    )
}

const ArticleContent = `
    width: 45%;
    height: 500px;
    overflow-wrap: break-word; 
    overflow-y: scroll;
`
const ContentSection = styled.section`
    ${ArticleContent}
`
const CodeSection = styled.section`
    ${ArticleContent}   
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