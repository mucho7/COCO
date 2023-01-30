import styled from "styled-components";


const UserListDiv = styled.div`
  flex: 8;
  background-color: #4A4E69;
  color: white;
`

function UserList() {
  return (
    <UserListDiv>
      <p>유저 권한 목록</p>
    </UserListDiv>
  )
}

export default UserList;