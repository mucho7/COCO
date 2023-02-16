import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { participantsInstances } from "../../../store/sessionSlice";

const DrawDiv = styled.div`
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0);
  position: absolute;
  z-index: 50;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;


function OthersDrawLayer(props) {

  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const imageData = useSelector((state) => state.session.imageData);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawColor, setDrawColor] = useState("#ffffff");
  const [isEraseMode, setIsEraseMode] = useState(false);
  
  const userName = props.user;
  const participantsId = useSelector((state) => state.session.participantsId);
  const [participants, setParticipants] = useState({});
  const updated = useSelector((state) => state.session.updated);
  const [participant, setParticipant] = useState(null);


  useEffect(() => {
    setParticipants(participantsInstances.get(participantsId));

  }, [participantsId, updated])
  

  useEffect(() => {
    setParticipant(participants[userName]);
  }, [participants, userName])

  
  const tagId = `canvas-${userName}`;
  
  useEffect(() => {
    function initCanvas() {
      const drawDiv = document.getElementById(tagId)
      const canvas = canvasRef.current;
      canvas.width = drawDiv.clientWidth * 2;
      canvas.height = drawDiv.clientHeight * 2;
      canvas.style.width = `${drawDiv.clientWidth}px`;
      canvas.style.height = `${drawDiv.clientHeight}px`;
  
      const context = canvas.getContext("2d");
      context.scale(2, 2);
      context.lineCap = "round";
      context.strokeStyle = "#ffffff";
      context.lineWidth = 5;
      contextRef.current = context;
    }
    
    function handleResize() {
      let prevImageData = canvasRef.current.toDataURL();
      let img = new Image();
      initCanvas();
      img.src = prevImageData;
      img.onload = function() {
        contextRef.current.drawImage(img, 0, 0, canvasRef.current.clientWidth, canvasRef.current.clientHeight);
      };
    }
  
    initCanvas();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, [tagId])
  
  useEffect(() => {
    const startDrawing = (x, y) => {
      const offsetX = x;
      const offsetY = y;
      contextRef.current.beginPath();
      contextRef.current.moveTo(offsetX, offsetY);
      setIsDrawing(true);
    }
  
    const finishDrawing = () => {
      contextRef.current.closePath();
      setIsDrawing(false);
    }
  
    const draw = (x, y) => {
      if (!isDrawing) {
        return
      }
      const offsetX = x;
      const offsetY = y;
      if (isEraseMode) {
        contextRef.current.clearRect(offsetX-5, offsetY-5, 10, 10);
      } else {
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke()
      }
    }
  
  
    const eraseAll = () => {
      contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    }
  
    const erase = () => {
      setIsEraseMode(!isEraseMode);
    }
  
    const onChangeColor = (color) => {
      setDrawColor(color);
      contextRef.current.strokeStyle = drawColor;
    }

    // 다른 사용자로부터 그림판 동작 이벤트 수신
    if (imageData?.userName === userName) {
      switch (imageData?.imageData.type) {
        case "startDrawing":
          startDrawing(imageData.imageData.x, imageData.imageData.y);
          break;
        case "finishDrawing":
          finishDrawing();
          break;
        case "draw":
          draw(imageData.imageData.x, imageData.imageData.y);
          break;
        case "erase":
          erase();
          break;
        case "eraseAll":
          eraseAll();
          break;
        case "onChangeColor":
          onChangeColor(imageData.imageData.color);
          break;
        default:
          break;
      }
    }
  }, [drawColor, imageData, isDrawing, isEraseMode, userName])

  
  return (
    <DrawDiv id={tagId}>
      <canvas
        ref={canvasRef}
      />
    </DrawDiv>
  );
}

export default OthersDrawLayer;