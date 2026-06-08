import React from 'react';
import DashboardMenus from '../Dashboard Menus/DashboardMenus';
import { Outlet } from 'react-router';
import Navbar from '../../../shared/Navbar'

const Dashboard = () => {
    return (
        <div>
            <Navbar />
            <div className='grid grid-cols-12'>
            {/* Left Menus */}
            <div className='col-span-4'>
                <DashboardMenus></DashboardMenus>
            </div>

            {/* Content */}
            <div className='col-span-8'>
                <Outlet/>
            </div>
        </div>

        
        </div>
    );
};

export default Dashboard;