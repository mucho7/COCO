import NormalSession from "./NormalSessionPage";
import RelaySession from "./RelaySessionPage";
import CreateSession from "./CreateSessionPage";

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: '/normal',
    element: <NormalSession />,
  },
  {
    path: '/relay',
    element: <RelaySession />,
  },
  {
    path: '/create-session',
    element: <CreateSession />,
  },
]);

export default router;