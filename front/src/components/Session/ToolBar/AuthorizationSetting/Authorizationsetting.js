import styled from "styled-components";

import AuthorizationSettingTitleBar from "./AuthorizationSettingTitleBar";
import UserList from "./UserList";

const AuthorizationSettingDiv = styled.div`
  box-sizing: border-box;
  background-color: #4A4E69;
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 65px;
  right: 30%;
  width: 300px;
  height: 300px;
`;

function AuthorizationSetting(props) {
  return (
    <AuthorizationSettingDiv>
      {/* 영역 제목 바 */}
      <AuthorizationSettingTitleBar />
      {/* 사용자 권한 설정 버튼 */}
      <UserList />
    </AuthorizationSettingDiv>
  );
}

export default AuthorizationSetting;