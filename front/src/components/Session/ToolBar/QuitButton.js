import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Button = styled.button`
  border: 1px solid #FCA311;
  background-color: #FCA311;
  border-radius: 50%;
  height: 50px;
  width: 50px;
`;

function QuitButton(props) {
  const navigate = useNavigate();
  
  return (
    <Button onClick={() => {navigate("/room")}}>
      종료
    </Button>
  );
}

export default QuitButton;