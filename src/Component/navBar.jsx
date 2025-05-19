import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchNotifications } from "../Slices/notifications/Thunk";
import {
  FaRegBell,
  FaUserCircle,
  FaExclamationTriangle,
  FaChevronDown,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdMarkUnreadChatAlt, MdMarkChatRead } from "react-icons/md";
import NavbarLayout from "./navBarLayout";
import UserAuth from "../context/AuthContext";
import { logout } from "../Slices/user/user";

const NavBar = () => {
  const dispatch = useDispatch();
  const { isloading, error } = useSelector((state) => state.notifications);
  const data = useSelector((state) => state.notifications.data);
  const { user } = UserAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const [expandedMessageId, setExpandedMessageId] = useState(null);
  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  useEffect(() => {
    setNotifications(data || []);
  }, [data]);

  const location = useLocation();
  const navRef = useRef(null);

  const currentRoute =
    location.pathname === "/nisir" ? "Home" : location.pathname;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setShowNotifications(false);
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, status: "read" } : n))
    );
  };

  const handleToggleMessage = (id, isUnread) => {
    setExpandedMessageId((prev) => (prev === id ? null : id));
    if (isUnread) handleMarkAsRead(id);
  };
  if (!data)
    return (
      <nav className="text-center py-10">
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        </div>
      </nav>
    );

  return (
    <NavbarLayout>
      <nav
        ref={navRef}
        className="flex items-center justify-between h-16 w-full"
      >
        <div className="flex items-center">
          <h1 className="text-md font-medium text-emerald-900 capitalize">
            {currentRoute}
          </h1>
        </div>

        {user && (
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-1 text-gray-600 hover:text-gray-900 focus:outline-none relative"
              >
                <FaRegBell className="h-5 w-5" />
                {notifications?.some((n) => n.status === "unread") && (
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-96 bg-gray-50 rounded-sm ring-1 ring-gray-300 ring-opacity-5 z-50">
                  <div className="py-1 h-max overflow-y-auto p-2">
                    <h2 className="px-4 py-2 text-xl font-bold  text-emerald-800">
                      Notifications
                    </h2>
                    {isloading.notifications ? (
                      <div className="px-4 py-3 text-sm text-gray-500">
                        Loading...
                      </div>
                    ) : error ? (
                      <div className="px-4 py-3 text-sm text-red-500">
                        <FaExclamationTriangle className="inline mr-2" />
                        Error loading notifications
                      </div>
                    ) : notifications.length === 0 ? (
                      <div className="px-4 py-3 text-sm text-gray-500">
                        No notifications
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification._id}
                          className={`px-4 py-3  bg-gray-100 hover:bg-gray-200 cursor-pointer ${
                            notification.status === "unread"
                              ? "bg-blue-500"
                              : ""
                          }`}
                          onClick={() =>
                            handleToggleMessage(
                              notification._id,
                              notification.status === "unread"
                            )
                          }
                        >
                          <div className="flex justify-between">
                            <p className="text-lg font-medium text-emerald-800">
                              {notification.title}
                            </p>
                            {notification.status === "unread" ? (
                              <MdMarkUnreadChatAlt className="h-4 w-4 text-blue-600" />
                            ) : (
                              <MdMarkChatRead className="h-4 w-4 text-gray-400" />
                            )}
                          </div>
                          {expandedMessageId === notification._id && (
                            <div className="mt-1">
                              <p className="text-xs text-gray-500">
                                {notification.message}
                              </p>
                              {notification.createdAt && (
                                <p className="mt-1 text-xs text-gray-400">
                                  {new Date(
                                    notification.createdAt
                                  ).toLocaleString()}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center space-x-1 focus:outline-none"
              >
                {user && <FaUserCircle className="h-4 w-4 text-gray-600" />}
                <FaChevronDown className="h-3 w-3 text-gray-500" />
              </button>

              {showProfile && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-gray-100 ring-opacity-5 z-50">
                  <div className="py-1">
                    <div className="px-4 py-2">
                      <p className="text-sm font-medium text-emerald-900">
                        {user.name}
                      </p>
                      <p className="text-xs text-emerald-950 truncate">
                        {user.email}
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm font-bold bg-red-500 text-white rounded hover:bg-red-600 flex items-center"
                    >
                      <FaSignOutAlt className="mr-2" />
                      log out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </NavbarLayout>
  );
};

export default NavBar;
