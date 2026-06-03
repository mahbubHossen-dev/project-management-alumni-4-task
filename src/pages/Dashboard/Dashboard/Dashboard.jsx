import React from 'react';
import DashboardMenus from '../Dashboard Menus/DashboardMenus';

const Dashboard = () => {
    return (
        <div className='grid grid-cols-12'>
            {/* Left Menus */}
            <div className='col-span-4'>
                <DashboardMenus></DashboardMenus>
            </div>

            {/* Content */}
            <div className='col-span-8'>
                
            </div>
        </div>
    );
};

export default Dashboard;