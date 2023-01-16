import styled from "styled-components";

const Button = styled.button`
  border: 1px solid purple;
  border-radius: 50%;
  height: 50px;
  width: 50px;
`;

function TestCompileButton(props) {
  return (
    <Button>
      1
    </Button>
  );
}

export default TestCompileButton;