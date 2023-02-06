import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

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


function DrawLayer(props) {

  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  // const imageData = useState()
  const imageData = useSelector((state) => state.session.imageData);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawColor, setDrawColor] = useState("#ffffff");
  const [isEraseMode, setIsEraseMode] = useState(false);
  const userName = props.userName;
  console.log(userName)

  
  function initCanvas() {
    const drawDiv = document.querySelector("#canvas")
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
  
  useEffect(() => {
    initCanvas();
  }, [])

  // useEffect(() => {
  //   if (imageData) {
  //     let binaryData = window.atob(imageData);
  //     let uint8ArrayData = new Uint8Array(binaryData.length);
  //     for (var i = 0; i < binaryData.length; i++) {
  //       uint8ArrayData[i] = binaryData.charCodeAt(i);
  //     }
  //     let blob = new Blob([uint8ArrayData], { type: 'image/png' })
  //     let url = URL.createObjectURL(blob);
  //     let img = new Image();
  //     img.src = url
  //     img.onload = function() {
  //       contextRef.current.drawImage(img, 0, 0, canvasRef.current.clientWidth, canvasRef.current.clientHeight);
  //     }
  //   }
  // }, [imageData])


  useEffect(() => {
    function handleResize() {
      let prevImageData = canvasRef.current.toDataURL();
      let img = new Image();
      // console.log(imageData)
      // // console.log(img)
      initCanvas();
      img.src = prevImageData;
      img.onload = function() {
        contextRef.current.drawImage(img, 0, 0, canvasRef.current.clientWidth, canvasRef.current.clientHeight);
      };
      // console.log(imageData)
      // console.log(typeof imageData)
      // console.log(canvasRef.current.width)
      // console.log(canvasRef.current)
      // let image = contextRef.current.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height)
      // initCanvas();
      // contextRef.current.putImageData(image, 0, 0)
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, [])


  
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
      // console.log(nativeEvent)
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
    
    if (imageData && imageData?.userName === userName) {
      switch (imageData.imageData.type) {
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
    <DrawDiv id="canvas">
      <canvas
        ref={canvasRef}
      />
    </DrawDiv>
  );
}

export default DrawLayer;