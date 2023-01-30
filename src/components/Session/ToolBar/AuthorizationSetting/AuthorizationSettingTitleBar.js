import styled from "styled-components";


const AuthorizationSettingTitleBarDiv = styled.div`
  height: 35px;
  background-color: #14213D;
  color: white;
`

function AuthorizationSettingTitleBar() {
  return (
    <AuthorizationSettingTitleBarDiv>
      <p>권한 설정</p>
    </AuthorizationSettingTitleBarDiv>
  )
}

export default AuthorizationSettingTitleBar;