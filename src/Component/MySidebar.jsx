import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {
  FaAddressBook,
  FaBuilding,
  FaChartBar,
  FaHourglassEnd,
  FaHeart,
  FaFileContract,
  FaCheckCircle,
  FaHourglassHalf,
  FaLaptop,
} from "react-icons/fa";
import { MdDashboard, MdCheckCircle } from "react-icons/md";
import { Link } from "react-router-dom";

const MySidebar = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  // Remove the <main> section from inside MySidebar
  return (
    <div className="hidden md:block w-[380px]">
      <Sidebar
        collapsed={collapsed}
        width={380}
        breakPoint="md"
        className=" mt-4 h-screen bg-gray-100 shadow-2xl border hover:border-blue-500"
      >
        {/* Header */}
        <div className="mt-4 flex items-center justify-center gap-2 py-6 border-b border-gray-200">
          <MdDashboard className="text-3xl text-blue-600" />
          <h3 className="text-xl font-bold text-emerald-900">
            Nisr License Manager
          </h3>
        </div>

        {/* Menu Sections */}
        <div className="px-4 pt-4 space-y-2 w-64">
          <Menu>
            <MenuItem
              icon={<FaChartBar className="text-gray-600" />}
              component={<Link to="/nisir" />}
            >
              <span className="text-emerald-900 font-medium">
                Analytics Dashboard
              </span>
            </MenuItem>
          </Menu>

          <Menu>
            <MenuItem
              icon={<FaBuilding className="text-gray-600" />}
              component={<Link to="/nisir/companies" />}
            >
              <span className="text-emerald-900 font-medium">Companies</span>
            </MenuItem>
          </Menu>

          <Menu>
            <SubMenu
              icon={<FaAddressBook className="text-gray-600" />}
              label="Licenses"
              component={<Link to="/nisir/licenses" />}
            >
              <MenuItem
                icon={<FaCheckCircle className="text-green-500" />}
                component={<Link to="/nisir/activelicenses" />}
              >
                <span className="text-emerald-900">Active Licenses</span>
              </MenuItem>
              <MenuItem
                icon={<FaHourglassHalf className="text-yellow-500" />}
                component={<Link to="/nisir/pendinglicenses" />}
              >
                <span className="text-emerald-900">Pending Licenses</span>
              </MenuItem>
              <MenuItem
                icon={<FaHourglassEnd className="text-red-500" />}
                component={<Link to="/nisir/expiredlicenses" />}
              >
                <span className="text-emerald-900">Expired Licenses</span>
              </MenuItem>
            </SubMenu>
          </Menu>

          <Menu>
            <MenuItem
              icon={<FaBuilding className="text-gray-600" />}
              component={<Link to="/nisir/products" />}
            >
              <span className="text-emerald-900 font-medium">Product</span>
            </MenuItem>
          </Menu>
        </div>
      </Sidebar>
    </div>
  );
};

export default MySidebar;
