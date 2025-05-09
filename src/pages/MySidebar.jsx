// App.js or Sidebar.js
import React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FaAddressBook, FaBuilding, FaChartBar, FaHourglassEnd, FaHeart, FaFileContract, FaCheckCircle, FaHourglassHalf, FaLaptop } from 'react-icons/fa';
import { MdDashboard, MdCheckCircle } from 'react-icons/md';
import { Link } from 'react-router-dom';

const MySidebar = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  // Remove the <main> section from inside MySidebar
  return (
    <Sidebar collapsed={collapsed} className="min-h-screen bg-white shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-center gap-2 py-6 border-b border-gray-200">
        <MdDashboard className="text-3xl text-blue-600" />
        <h3 className="text-xl font-bold text-gray-800">Nisr License Manager</h3>
      </div>
  
      {/* Menu Sections */}
      <div className="px-4 pt-4 space-y-2">
        <Menu>
          <MenuItem icon={<FaChartBar className="text-gray-600" />} component={<Link to="/company-list" />}>
            <span className="text-gray-800 font-medium">Analytics Dashboard</span>
          </MenuItem>
        </Menu>
  
        <Menu>
          <MenuItem icon={<FaBuilding className="text-gray-600" />} component={<Link to="/company-list" />}>
            <span className="text-gray-800 font-medium">Companies</span>
          </MenuItem>
        </Menu>
  
        <Menu>
          <SubMenu icon={<FaAddressBook className="text-gray-600" />} label="Licenses">
            <MenuItem icon={<FaCheckCircle className="text-green-500" />} component={<Link to="/users/active" />}>
              <span className="text-gray-800">Active Licenses</span>
            </MenuItem>
            <MenuItem icon={<FaHourglassHalf className="text-yellow-500" />} component={<Link to="/users/pending" />}>
              <span className="text-gray-800">Pending Licenses</span>
            </MenuItem>
            <MenuItem icon={<FaHourglassEnd className="text-red-500" />} component={<Link to="/users/expired" />}>
              <span className="text-gray-800">Expired Licenses</span>
            </MenuItem>
          </SubMenu>
        </Menu>
  
        <Menu>
          <MenuItem icon={<FaBuilding className="text-gray-600" />} component={<Link to="/company-list" />}>
            <span className="text-gray-800 font-medium">Product</span>
          </MenuItem>
        </Menu>
      </div>
    </Sidebar>
  );
}

export default MySidebar;
