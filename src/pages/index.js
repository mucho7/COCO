import NormalSession from "./NormalSessionPage";
import RelaySession from "./RelaySessionPage";
import CreateSession from "./CreateSessionPage";
import SessionList from "./SessionListPage";
import SessionDetail from "./SessionDetailPage";
import HomePage from "./HomePage";
import CommuPage from "./CommuPage";
import SigninPage from "./SigninPage";
import LoginPage from "./LoginPage";
import ProfilePage from "./ProfilePage";
import LogoutPage from "./LogoutPage";
import ArticleDetail from "./ArticleDetail";

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  // 일반 페이지 관련
  {
    path: "/",
    element: <HomePage/>,
  },
  {
    path: "/community",
    element: <CommuPage/>,
  },
  {
    path: "/community/:articlePk",
    element: <ArticleDetail/>,
  },
  {
    path: "/useri",
    element: <SigninPage/>,
  },
  {
    path: "/useri/login",
    element: <LoginPage/>,
  },
  {
    path: "/useri/logout",
    element: <LogoutPage/>,
  },
  {
    path: "/useri/:user_id",
    element: <ProfilePage/>,
  },
  // Session 관련
  {
    path: "/normal",
    element: <NormalSession />,
  },
  {
    path: "/relay",
    element: <RelaySession />,
  },
  {
    path: "/room/create",
    element: <CreateSession />,
  },
  {
    path: "/room/:roomId",
    element: <SessionDetail />,
  },
  {
    path: "/room",
    element: <SessionList />,
  },
]);

export default router;