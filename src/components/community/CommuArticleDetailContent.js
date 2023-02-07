import { useState, useEffect } from "react";

import styled from "styled-components";
import { Typography,  } from "@mui/material";

function CommuArticleDetailContent(params) {
    const [ hoverTarget, setHoverTarget ] = useState(0)
    const [ target, setTarget ] = useState(0)
    const content = (params.content.content)
    const code = (params.content.code)
    
    // 비동기 이슈로 인해서 hoverTarget이 set되기 전에 렌더링이 끝나버림
    const onMouseEnterHandler = (event) => {
        if (event.target.parentElement.id !== "-1"){
            setHoverTarget(event.target.parentElement.id)

        } else {
            setHoverTarget(0)
        }
    }
    const onMouseLeaveHandler = () => {
        setHoverTarget(0)
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
                        <StyeldCard onClick={onContentBlockClickHandler} onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler} isTarget={item.index == target} isHovering={item.index == hoverTarget} id={item.index} key={uniqueKey}>
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
                        <StyeldCard onClick={onContentBlockClickHandler} onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler} isTarget={item.index == target} isHovering={item.index == hoverTarget} id={item.index} key={uniqueKey}>
                            {item.content.map((string, uniqueKey) => {
                                return(
                                    <Typography key={uniqueKey}>{string}</Typography>
                                )
                            })}                        
                        </StyeldCard>
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
    background-color: ${props => {if (props.isHovering) {return 'blue'} else if (props.isTarget) {return 'red'} else { return 'white'} }};
`

export default CommuArticleDetailContent