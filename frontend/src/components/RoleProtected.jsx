import {
  useContext,
} from "react";

import {
  Navigate,
} from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

function RoleProtected({
  children,
  allowedRoles,
}) {
  const { user } =
    useContext(
      AuthContext
    );

  if (
    !allowedRoles.includes(
      user?.role
    )
  ) {
    return (
      <Navigate
        to="/inventory"
      />
    );
  }

  return children;
}

export default RoleProtected;