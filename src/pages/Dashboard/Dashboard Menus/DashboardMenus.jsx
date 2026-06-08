
import { NavLink } from 'react-router';
import useRole from '../../../hooks/useRole';

const DashboardMenus = () => {

    const { role } = useRole()
    // console.log(role)

    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                {/* <div className="drawer-content flex flex-col items-center justify-center">
                    
                    <label htmlFor="my-drawer-3" className="btn drawer-button lg:hidden">
                        Open drawer
                    </label>
                </div> */}
                <div className="drawer-side">
                    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 min-h-full w-80 p-4">
                        {/* Sidebar content here */}
                        {role === 'Admin' && <>

                            <li><NavLink to={'/dashboard/insights'}>Insights</NavLink></li>
                            <li><NavLink to={'/dashboard/workloadSummery'}>Workload Summery</NavLink></li>
                            <li><NavLink to={'/dashboard/dashboardAnalytics'}>Dashboard Analytics</NavLink></li>
                            <li><NavLink to={'/dashboard/addProjects'}>Add Projects</NavLink></li>
                            <li><NavLink to={'/dashboard/allProjects'}>All Projects</NavLink></li>


                        </>}
                        {role === 'Project Manager' && <>
                            <li><NavLink to={'/dashboard/addProjects'}>Add Projects</NavLink></li>
                            <li><NavLink to={'/dashboard/taskManagement'}>Task Management</NavLink></li>
                            <li><NavLink to={'/dashboard/allProjects'}>All Projects</NavLink></li>
                        </>}

                        {
                            (role === 'Admin' || role === 'member') && (
                                <>
                                    <li>
                                        <NavLink to="/dashboard/taskManagement">
                                            Task Management
                                        </NavLink>
                                    </li>
                                </>
                            )
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardMenus;