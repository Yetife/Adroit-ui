import {Avatar, Badge} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import userImg from '../assets/avatar.svg'
import {Link, NavLink, useLocation} from "react-router-dom";
import {useState} from "react";

// eslint-disable-next-line react/prop-types
const Navbar = ({openSidebar, name, email}) => {
    const location = useLocation()
    const [activeTab, setActiveTab] = useState('home');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleClick = () => {
        openSidebar(true)
    }

    return (
        <header className="flex fixed w-full z-10 items-center justify-between px-6 md:px-12 py-4 bg-[#135D54]">
            <div className="flex items-center" >
                <button onClick={handleClick} className="text-gray-500 focus:outline-none lg:hidden">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 6H20M4 12H20M4 18H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                              strokeLinejoin="round"></path>
                    </svg>
                </button>
            </div>
            {
                location.pathname.includes('customerCentric') && (
                    <div className="flex items-center justify-between">
                        {/*<Link to="/" className="text-white text-lg font-bold">Your App</Link>*/}
                        <div className="flex space-x-4">
                            <NavLink
                                to="/"
                                exact
                                className={`text-white ${activeTab === 'home' ? 'border-b-2 border-white' : ''}`}
                                onClick={() => handleTabClick('home')}
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/about"
                                className={`text-white ${activeTab === 'about' ? 'border-b-2 border-white' : ''}`}
                                onClick={() => handleTabClick('about')}
                            >
                                About
                            </NavLink>
                            {/* Dropdown */}
                            <div className="relative inline-block text-left">
                                <button className="text-white" onClick={() => handleTabClick('dropdown')}>
                                    Dropdown
                                </button>
                                <div className={`origin-top-right absolute right-0 mt-2 w-32 ${activeTab === 'dropdown' ? 'block' : 'hidden'}`}>
                                    {/* Dropdown items */}
                                    <div className="bg-white rounded-md shadow-lg py-1">
                                        <Link to="/item1" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Item 1</Link>
                                        <Link to="/item2" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Item 2</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            <div className="flex items-center">
                {/* <div className="relative mx-3 md:mx-0 px-2 border-x border-width">
                    <IconButton color="waveWhite">
                        <Badge badgeContent={4} color="secondary">
                            <NotificationsNoneIcon sx={{color: 'white'}} />
                        </Badge>
                    </IconButton>
                </div> */}

                <div className="flex relative">
                    <div className='px-2 hidden md:px-4  sm:block'>
                        <h4 className='font-semibold text-white'>{name}</h4>
                        <p className='text-xs font-extralight text-white leading-none'>{email}</p>
                    </div>

                    <Avatar src={userImg} />
                </div>
            </div>

        </header>
    );
};

export default Navbar;