import Box from '@mui/material/Box';
import Container from "@mui/material/Container";
import styled from 'styled-components';

import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getSessionList } from '../../api/session';
import SessionListItem from './SessionListItem';
import axios from 'axios';

function SessionList() {
  // const sessionList = useSelector((state) => state.sessionList.sessionList);
  // const navigate = useNavigate();

  // function goToDetail(id) {
  //   navigate(`/room/${id}`);
  // }

  const samples = [
    {
      roomId: "1",
      hostId: "A",
      title: "AAAAAAAAA",
      content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto officiis corrupti saepe, repellat consequuntur accusantium molestias laboriosam sequi ratione aliquid fuga. Dicta maiores eos ad tempora, tenetur eveniet labore praesentium.",
      mode: "study"
    },
    {
      roomId: "2",
      hostId: "B",
      title: "BBBBBBBBBBBBBB",
      content: "asdfdsgdjgwoefwe",
      mode: "study"
    }
  ]
  const [sessionList, setSessionList] = useState(samples);

  useMemo(() => {
    const enterSessionList = async () => {
      await getSessionList(
        "study",
        (data) => {return data.data},
        (err) => console.log(err)
      ).then((data) => {
        setSessionList(data);
      })
    }
    enterSessionList();
  }, [])

  return (
    <SessionListBox>
      <SessionListItem sessionList={sessionList} />
    </SessionListBox>
  )
}


const SessionListBox = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    width: 80%;
`

export default SessionList;