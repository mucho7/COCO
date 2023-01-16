import { Route, Routes  } from "react-router-dom"

import  { HomePage, LoginPage, SigninPage, ProfilePage, CommuPage } from './pages'

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/community" element={<CommuPage/>}/>
          <Route path="/useri" element={<SigninPage/>}/>
          <Route path="/useri/login" element={<LoginPage/>}/>
          <Route path="/useri/user_id" element={<ProfilePage/>}/>
        </Routes> 
    </div>
  );
}

export default App;
