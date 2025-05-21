// App.js or Sidebar.js
import React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import {FaSignOutAlt, FaAddressBook, FaBuilding, FaChartBar, FaHourglassEnd, FaHeart, FaFileContract, FaCheckCircle, FaHourglassHalf, FaLaptop } from 'react-icons/fa';
import { MdDashboard, MdCheckCircle } from 'react-icons/md';
import { Link, NavLink } from 'react-router-dom';
import SidebarLink from './SidebarLink';

const MySidebar = () => {
  // const [collapsed, setCollapsed] = React.useState(false);
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar>
        <div className='flex items-center justify-center h-16 bg-gray-800 text-white text-lg font-bold'>
          <div className='flex items-center justify-center mr-2'>
            <MdDashboard />
          </div>
          Nisr License Manager
        </div>
        <Menu>
          <MenuItem icon={<FaChartBar />} component={<SidebarLink to='dashboard' />} > Anaytics dashboard </MenuItem>
          <MenuItem icon={<FaBuilding />} component={<SidebarLink to='compony' />}> Companies </MenuItem>
          <MenuItem icon={<FaLaptop />} component={<SidebarLink to='Product' />}> Products </MenuItem>
          <SubMenu label="Licenses" icon={<FaFileContract />}>
            <MenuItem icon={<MdCheckCircle />} component={<SidebarLink to='activelicense' />}>
              Active
            </MenuItem>
            <MenuItem icon={<FaHourglassHalf />} component={<SidebarLink to='pendinglicense' />}>
              Pending
            </MenuItem>
            <MenuItem icon={<FaHourglassEnd />} component={<SidebarLink to='expiredlicense' />}>
              expired
            </MenuItem>
          </SubMenu>
          <MenuItem
             icon={<FaSignOutAlt />} // <-- Use a sign out icon from react-icons/fa
             component={<SidebarLink to="login" />} // <-- Adjust the path or use a click handler
          >
            Sign Out
          </MenuItem>

        </Menu>
      </Sidebar>;
      <main style={{ padding: 40, flex: 1 }}>
        <h1 className='text-red-500'>This is license management system</h1>
      </main>
    </div>
  );
};

export default MySidebar;
