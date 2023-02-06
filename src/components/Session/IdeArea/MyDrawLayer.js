import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { websocketInstances } from "../../../store/sessionSlice";

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
  const [drawColor, setDrawColor] = useState("#ffffff");
  const [isEraseMode, setIsEraseMode] = useState(false);
  const isDrawButtonOn = useSelector((state) => state.toolBarAction.isDrawButtonOn);
  const userName = useSelector((state) => state.session.userName);
  const websocketId = useSelector((state) => state.session.websocketId);
  const ws = websocketInstances.get(websocketId);
  
  
  function initCanvas() {
    const drawDiv = document.querySelector("#canvas");
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
  
  // 리사이즈시 다시 지정 크기로 리사이즈 시킴
  // 리사이즈시 캔버스 크기 조정하고, 그 위에 기존에 그려졌던 정보 다시 그리기
  useEffect(() => {
    initCanvas();
    // setScaleWidth(canvasRef.current.clientWidth);
    // setScaleHeight(canvasRef.current.clientHeight);
    // window.addEventListener("resize", initCanvas);
    // window.addEventListener("resize", () => {
    //   setClientWidth(DrawDiv.clientWidth);
    //   setClientHeight(DrawDiv.clientHeight);

    //   let imageData = canvasRef.current.toDataURL();
    //   let img = new Image();
    //   // // console.log(imageData)
    //   // // console.log(img)
    //   initCanvas();
    //   img.src = imageData;
    //   img.onload = function() {
    //     contextRef.drawImage(img, 0, 0, clientWidth, clientHeight);
    //   };
    //   // let image = contextRef.current.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height)
    //   // initCanvas();
    //   // contextRef.current.putImageData(image, 0, 0)
    // });
    // return () => {
    //   window.removeEventListener("resize", initCanvas);
    // }
  }, []);

  
  useEffect(() => {
    function handleResize() {
      let imageData = canvasRef.current.toDataURL();
      let img = new Image();
      // console.log(imageData)
      // // console.log(img)
      initCanvas();
      img.src = imageData;
      img.onload = function() {
        contextRef.current.drawImage(img, 0, 0, canvasRef.current.clientWidth, canvasRef.current.clientHeight);
      };
      console.log(imageData)
      console.log(typeof imageData)
      console.log(img)
      console.log(canvasRef.current.width)
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

  // useEffect(() => {
  //   function sendImageData() {
  //     let imageData = canvasRef.current.toDataURL();
  
  //     const message = {
  //       id: "sendImageData",
  //       userName: userName,
  //       imageData: imageData
  //     };
  
  //     ws.send(JSON.stringify(message));
  //     // console.log("Send Image")
  //   }

  //   if (isDrawing) {
  //     sendImageData();
  //   }
  // }, [isDrawing, userName, ws])

  function sendImageData(type, data) {
    // let imageDataURL = canvasRef.current.toDataURL();
    // let base64Data = imageDataURL.split(",")[1];
    // let binaryData = window.atob(base64Data);
    // let uint8ArrayData = new Uint8Array(binaryData.length);
    // for (let i = 0; i < binaryData.length; i++) {
    //   uint8ArrayData[i] = binaryData.charCodeAt(i);
    // }
    
    // let base64EncodedData =  window.btoa(String.fromCharCode.apply(null, uint8ArrayData));

    // const byteSize = (str) => new Blob([str]).size;
    // const size = byteSize(base64EncodedData)
    // console.log("SIZE: ", size)
    // const urlMessage = {
    //   id: "sendImageData",
    //   userName: userName,
    //   imageData: base64EncodedData
    // };

    // ws.send(JSON.stringify(message));

    // console.log(base64EncodedData)
    // console.log(base64Data)

    let imageData;

    switch (type) {
      case "startDrawing":
        imageData = { type, x: data.x, y: data.y };
        break;
      case "finishDrawing":
        imageData = { type };
        break;
      case "draw":
        imageData = { type, x: data.x, y: data.y };
        break;
      case "erase":
        imageData = { type };
        break;
      case "eraseAll":
        imageData = { type };
        break;
      case "onChangeColor":
        imageData = { type, color: data.color };
        break;
      default:
        break;
    }
    const message = {
      id: "sendImageData",
      userName: userName,
      imageData: imageData
    }
    ws.send(JSON.stringify(message));
    console.log("Send Image")
  }


  const startDrawing = ({nativeEvent}) => {
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
    sendImageData("startDrawing", {x: offsetX, y: offsetY});
  }

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
    sendImageData("finishDrawing", {});
  }

  const draw = ({nativeEvent}) => {
    // console.log(nativeEvent)
    if (!isDrawing) {
      return
    }
    const {offsetX, offsetY} = nativeEvent;
    if (isEraseMode) {
      contextRef.current.clearRect(offsetX-5, offsetY-5, 10, 10);
    } else {
      contextRef.current.lineTo(offsetX, offsetY);
      contextRef.current.stroke()
    }
    sendImageData("draw", {x: offsetX, y: offsetY});
  }


  const eraseAll = () => {
    contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    sendImageData("eraseAll", {});
  }

  const erase = () => {
    setIsEraseMode(!isEraseMode);
    sendImageData("erase", {});
  }

  const onChangeColor = (event) => {
    setDrawColor(event.target.value);
    contextRef.current.strokeStyle = drawColor;
    sendImageData("onChangeColor", {color: event.target.value});
  }

  return (
    <DrawDiv id="canvas">
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
      <button onClick={eraseAll}>전부 지우기</button>
      <button onClick={erase}>{ isEraseMode ? "그리기" : "지우개" }</button>
      <input type="color" id="color" onInput={onChangeColor} />
    </DrawDiv>
  );
}

export default DrawLayer;