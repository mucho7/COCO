import  { Navbar } from './components/navbar';
import { Route, Routes  } from "react-router-dom"
import styled from "styled-components";

import  { HomePage, LoginPage, SigninPage, ProfilePage, CommuPage, ProfileUpdatePage } from './pages'

function App() {
  return (
    <SidePaddingBox className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/community" element={<CommuPage/>}/>
        <Route path="/useri" element={<SigninPage/>}/>
        <Route path="/useri/login" element={<LoginPage/>}/>
        <Route path="/useri/user_id" element={<ProfilePage/>}/>
        <Route path="/useri/user_id/update" element={<ProfileUpdatePage/>}/>
      </Routes> 
    </SidePaddingBox>
  );
}

const SidePaddingBox = styled.div`
  padding-left: 10%;
  padding-right: 10%;

`


export default App;
