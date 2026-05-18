import {
  LayoutDashboard,
  Package,
  Upload,
  LogOut,
} from "lucide-react";

import {
  NavLink,
} from "react-router-dom";

import {
  useContext,
} from "react";

import { AuthContext } from "../context/AuthContext";

import logo from "../assets/logo.png";

function Topbar() {
  const {
    user,
    logout,
  } = useContext(
    AuthContext
  );

  const links = [
    {
      name: "Dashboard",
      path: "/",
      icon:
        LayoutDashboard,
    },

    {
      name: "Inventory",
      path: "/inventory",
      icon: Package,
    },

    ...(user?.role ===
    "ADMIN"
      ? [
          {
            name: "Import",
            path:
              "/add-item",
            icon: Upload,
          },
        ]
      : []),
  ];

  return (
    <div className="sticky top-0 z-50 bg-[#31475a] backdrop-blur-xl border-b border-[#41586d]">
      <div className="flex items-center justify-between px-3 md:px-6 py-3 gap-2 md:gap-4">
        {/* LEFT */}

        <div className="flex items-center gap-2 md:gap-3 min-w-fit">
          <img
            src={logo}
            alt="Logo"
            className="h-9 w-9 md:h-11 md:w-11 rounded-2xl object-cover border border-[#52697d]"
          />

          <div className="hidden lg:block">
            <h1 className="text-lg md:text-xl font-black text-white leading-none whitespace-nowrap">
              Exquisite Color Kraft Pvt Ltd
            </h1>

            <p className="text-[10px] md:text-[11px] text-[#c6d2dc] mt-1 tracking-wide">
              Jewellery ERP
            </p>
          </div>
        </div>

        {/* NAVIGATION */}

        <div className="flex items-center gap-1 md:gap-2 overflow-hidden bg-white/10 border border-white/10 rounded-[16px] p-1 backdrop-blur-sm max-w-full">
          {links.map((link) => {
            const Icon =
              link.icon;

            return (
              <NavLink
                key={
                  link.name
                }
                to={link.path}
                className={({
                  isActive,
                }) =>
                  `flex items-center justify-center gap-2 px-3 md:px-5 py-2 md:py-2.5 rounded-[14px] whitespace-nowrap transition-all duration-200 text-sm font-semibold min-w-fit
                    
                    ${
                      isActive
                        ? "bg-white text-[#31475a] shadow-sm"

                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    }
                  `
                }
              >
                <Icon
                  size={17}
                />

                <span className="hidden sm:block">
                  {
                    link.name
                  }
                </span>
              </NavLink>
            );
          })}
        </div>

        {/* PROFILE */}

        <div className="flex items-center gap-2">
          {/* ROLE */}

          <div className="hidden md:flex items-center px-3 py-2 rounded-[14px] bg-white/10 border border-white/10 text-white text-xs font-bold tracking-wide">
            {user?.role}
          </div>

          {/* USER */}

          <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white text-[#31475a] flex items-center justify-center font-black text-sm shadow-sm min-w-fit">
            {user?.name?.charAt(
              0
            )}
          </div>

          {/* LOGOUT */}

          <button
            onClick={() => {
              logout();

              window.location.href =
                "/login";
            }}
            className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-sm transition-all"
          >
            <LogOut
              size={16}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Topbar;