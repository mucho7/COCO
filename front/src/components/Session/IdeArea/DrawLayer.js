import styled from "styled-components";
import { useEffect, useRef, useState } from "react";

const DrawDiv = styled.div`
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0);
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;


function DrawLayer(props) {

  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const drawDiv = document.querySelector("#canvas")
    const canvas = canvasRef.current;
    canvas.width = drawDiv.clientWidth * 2;
    canvas.height = drawDiv.clientHeight * 2;
    canvas.style.width = `${drawDiv.clientWidth}px`;
    canvas.style.height = `${drawDiv.clientHeight}px`;

    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = "yellow";
    context.lineWidth = 5;
    contextRef.current = context;
  }, [])

  const startDrawing = ({nativeEvent}) => {
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  }

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  }

  const draw = ({nativeEvent}) => {
    console.log(nativeEvent)
    if (!isDrawing) {
      return
    }
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke()
  }

  
  const key = (e) => {
    console.log(e)
    if (e.key === 'Backspace') {
      contextRef.clearRect(0, 0, canvasRef.width, canvasRef.height);
    }
  }

  return (
    <DrawDiv id="canvas">
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        onKeyDown={key}
        ref={canvasRef}
      />
    </DrawDiv>
  );
}

export default DrawLayer;