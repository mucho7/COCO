import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { participantsInstances } from "../../../../store/sessionSlice";
import UserListItem from "./UserListItem";
import { setUpdated } from "../../../../store/sessionSlice";


const UserListDiv = styled.div`
  flex: 8;
  background-color: #4A4E69;
  color: white;
`

function UserList() {
  const participantsId = useSelector((state) => state.session.participantsId);
  const [participants, setParticipants] = useState(participantsInstances.get(participantsId));
  const updated = useSelector((state) => state.session.updated);
  const dispatch = useDispatch();

  
  useEffect(() => {
    if (updated) {
      setParticipants(participantsInstances.get(participantsId));
      dispatch(setUpdated(false));
    }
  }, [dispatch, participantsId, updated])


  return (
    <UserListDiv>
      <p>유저 권한 목록</p>
      {Object.values(participants).map((participant, index) => {
        return (
          <UserListItem participant={participant} key={index} />
        )
      })}
    </UserListDiv>
  )
}

export default UserList;