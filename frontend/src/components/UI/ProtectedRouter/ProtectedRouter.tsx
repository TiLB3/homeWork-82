import {toast} from "react-toastify";
import {Navigate} from "react-router-dom";

interface Props extends React.PropsWithChildren {
  isAllowed: boolean | null;
  isNeedRedirect?: boolean;
}

const ProtectedRouter: React.FC<Props> = ({
                                            isAllowed,
                                            children,
                                            isNeedRedirect = false,
                                          }) => {
  if (!isAllowed && isNeedRedirect) {
    toast.error("You are not allowed,pls logged in");
    return <Navigate to={"/"} />
  }

  if(!isAllowed) {
    return null;
  }

  return children;
};

export default ProtectedRouter;