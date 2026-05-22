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
  const {
    user,
    loading,
  } = useContext(
    AuthContext
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#52606d] font-semibold">
        Loading...
      </div>
    );
  }

  if (
    !allowedRoles.includes(
      user?.role
    )
  ) {
    return (
      <Navigate
        to="/inventory"
        replace
      />
    );
  }

  return children;
}

export default RoleProtected;