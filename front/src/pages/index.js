import NormalSession from "./NormalSessionPage";
import RelaySession from "./RelaySessionPage";

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: '/',
    element: <NormalSession />,
  },
  {
    path: '/relay',
    element: <RelaySession />,
  },
]);

export default router;