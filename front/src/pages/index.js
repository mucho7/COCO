import NormalSession from "./NormalSessionPage";
import RelaySession from "./RelaySessionPage";
import CreateSession from "./CreateSessionPage";
import SessionList from "./SessionListPage";
import SessionDetail from "./SessionDetailPage";

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/normal",
    element: <NormalSession />,
  },
  {
    path: "/relay",
    element: <RelaySession />,
  },
  {
    path: "/create-session",
    element: <CreateSession />,
  },
  {
    path: "/session/:sessionId",
    element: <SessionDetail />,
  },
  {
    path: "/sessionlist",
    element: <SessionList />,
  },
]);

export default router;