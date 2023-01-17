import styled from "styled-components";

const Button = styled.button`
  border: 1px solid #FCA311;
  background-color: #FCA311;
  border-radius: 50%;
  height: 50px;
  width: 50px;
`;

function QuitButton(props) {
  return (
    <Button>
      종료
    </Button>
  );
}

export default QuitButton;