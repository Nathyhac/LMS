// App.js or Sidebar.js
import React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { FaAddressBook, FaBuilding, FaChartBar, FaHourglassEnd, FaHeart, FaFileContract, FaCheckCircle, FaHourglassHalf, FaLaptop } from 'react-icons/fa';
import { MdDashboard, MdCheckCircle } from 'react-icons/md';
import { Link } from 'react-router-dom';

const MySidebar = () => {
  const [collapsed, setCollapsed] = React.useState(false);
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
          <MenuItem icon={<FaChartBar />}> Anaytics dashboard </MenuItem>
          <MenuItem icon={<FaBuilding />}> Companies </MenuItem>
          <MenuItem icon={<FaLaptop />}> Products </MenuItem>
          <SubMenu label="Licenses" icon={<FaFileContract />}>
            <MenuItem icon={<MdCheckCircle />}>
              Active
            </MenuItem>
            <MenuItem icon={<FaHourglassHalf />}>
              Pending
            </MenuItem>
            <MenuItem icon={<FaHourglassEnd />}>
              expired
            </MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>;
      <main style={{ padding: 40, flex: 1 }}>
        <h1 className='text-red-500'>This is license management system</h1>
      </main>
    </div>
  );
};

export default MySidebar;
