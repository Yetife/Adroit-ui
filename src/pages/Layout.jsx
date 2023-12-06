import {useState} from 'react';
import Sidebar from "../components/Sidebar.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import {ChevronRight} from "react-feather";

const Layout = ({children}) => {
    const [ menuOpen, setMenuOpen ] = useState(false);
    const router = useNavigate();
    const location = useLocation();
    const currentRoute = location.pathname.split('/')

    const updateSidebarOpen = (val) => {
        setMenuOpen(val)
    }
    const transformString = (str) => {
        // Use a regular expression to split the camelCase string
        // and then join it with spaces
        return str?.replace(/([a-z])([A-Z])/g, '$1 $2');
    };

    return (
        <div className={` flex bg-gray-200`}>
            <div className={`fixed z-20 transition-opacity bg-black lg:hidden ${ menuOpen ? 'opacity-50 block' : 'opacity-0'} `} ></div>
            <Sidebar  openSidebar={menuOpen} updateSidebarOpen={updateSidebarOpen} />
            <div className="flex flex-col flex-1 overflow-hidden">
                <Navbar openSidebar={updateSidebarOpen} name='Adekunle Adetona' email='adekunle.adetona@gmail.com' />
                <main className="flex-1 bg-white md:pl-20 md:pr-8 w-full">
                    <div className="px-6 py-6 pt-28 mx-auto w-full">
                        {location.pathname !== '/dashboard' && <h3 className="flex text-xs md:ml-[15rem] font-medium">{currentRoute.map(((breadcrumb, ind) => (
                            <span key={ind} className='flex flex-row'>
                             <span className='px-2 capitalize text-[16px] text-[#4A5D58] capitalize'> {transformString(currentRoute[ind + 1])}</span>
                                {currentRoute[ind + 2] &&
                                    <ChevronRight style={{color: "#00C796", height: "17px"}} />}
                            </span>
                        )))}

                        </h3>}
                        <div className='w-full pt-2 lg:w-[calc(100%) - 18rem] lg:pl-60'>
                            { children }
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;