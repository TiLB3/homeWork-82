import {toast} from "react-toastify";
import {Navigate} from "react-router-dom";

interface Props extends React.PropsWithChildren {
  isAllowed: boolean | null;
}

const ProtectedRouter: React.FC<Props> = ({isAllowed, children}) => {
  if (!isAllowed) {
    toast.error("You are not allowed,pls logged in");
    return <Navigate to={"/"} />
  }

  return children;
};

export default ProtectedRouter;