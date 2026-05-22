import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import {
  useContext,
} from "react";

import { Toaster } from "react-hot-toast";

import Dashboard from "./pages/Dashboard";

import Inventory from "./pages/Inventory";

import AddItem from "./pages/AddItem";

import ImportData from "./pages/ImportData";

import Login from "./pages/Login";

import ProtectedRoute from "./components/ProtectedRoute";

import { AuthContext } from "./context/AuthContext";

import RoleProtected from "./components/RoleProtected";

function App() {
  const { user } =
    useContext(
      AuthContext
    );

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,

          style: {
            background:
              "#ffffff",

            color:
              "#1f2933",

            border:
              "1px solid #dfe5ea",

            borderRadius:
              "16px",

            padding:
              "16px 18px",

            fontWeight:
              "600",

            boxShadow:
              "0 4px 14px rgba(0,0,0,0.08)",
          },

          success: {
            iconTheme: {
              primary:
                "#16a34a",

              secondary:
                "#ffffff",
            },
          },

          error: {
            iconTheme: {
              primary:
                "#dc2626",

              secondary:
                "#ffffff",
            },
          },
        }}
      />

      <BrowserRouter>
        <Routes>
          {/* LOGIN */}

          <Route
            path="/login"
            element={
              user ? (
                <Navigate
                  to="/"
                />
              ) : (
                <Login />
              )
            }
          />

          {/* DASHBOARD */}

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* INVENTORY */}

          <Route
            path="/inventory"
            element={
              <ProtectedRoute>
                <Inventory />
              </ProtectedRoute>
            }
          />

          {/* ADD ITEM - ADMIN ONLY */}

          <Route
            path="/add-item"
            element={
              <ProtectedRoute>
                <RoleProtected
                  allowedRoles={[
                    "ADMIN",
                  ]}
                >
                  <AddItem />
                </RoleProtected>
              </ProtectedRoute>
            }
          />

          {/* IMPORT DATA - ADMIN ONLY */}

          <Route
            path="/import-data"
            element={
              <ProtectedRoute>
                <RoleProtected
                  allowedRoles={[
                    "ADMIN",
                  ]}
                >
                  <ImportData />
                </RoleProtected>
              </ProtectedRoute>
            }
          />

          {/* FALLBACK */}

          <Route
            path="*"
            element={
              <Navigate
                to={
                  user
                    ? "/"
                    : "/login"
                }
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;