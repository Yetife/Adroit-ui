import {Avatar, Badge} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import userImg from '../assets/avatar.svg'
import {Link, NavLink, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

// eslint-disable-next-line react/prop-types
const Navbar = ({openSidebar, name, email}) => {
    const location = useLocation()
    const [activeTab, setActiveTab] = useState('fixed');

    useEffect(() => {
        // Extract the tab name from the current URL and set it in the state
        const tabName = location.pathname.split('/').pop();
        setActiveTab(tabName || 'fixed'); // Default to 'fixed' if no tab name in the URL
    }, [location.pathname]);
    const handleTabClick = (tab) => {
        console.log(activeTab)
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
                        <div className="flex space-x-12">
                            <NavLink
                                to="/customerCentric/fixedDeposit"
                                exact
                                className={`text-white ${activeTab === 'fixedDeposit' ? 'border-b-2 border-white' : ''}`}
                            >
                                Fixed Deposit
                            </NavLink>
                            <NavLink
                                to="/customerCentric/savings"
                                className={`text-white ${activeTab === 'savings' ? 'border-b-2 border-white' : ''}`}
                            >
                                Savings
                            </NavLink>
                            <NavLink
                                to="/customerCentric/billsPayment"
                                className={`text-white ${activeTab === 'billsPayment' ? 'border-b-2 border-white' : ''}`}
                            >
                                Bills Payment
                            </NavLink>
                            {/* Dropdown */}
                            <div className="relative inline-block text-left">
                                <button className="text-white" onClick={() => handleTabClick('others')}>
                                    Others
                                </button>
                                <div className={`origin-top-right absolute right-0 mt-2 w-40 ${activeTab === 'others' ? 'block' : 'hidden'}`}>
                                    {/* Dropdown items */}
                                    <div className="bg-white rounded-md shadow-lg py-1">
                                        <Link to="/customerCentric/transfer" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Transfer</Link>
                                        <Link to="/customerCentric/airtime" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Airtime</Link>
                                        <Link to="/customerCentric/data" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Data</Link>
                                        <Link to="/customerCentric/loanRepayment" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Loan Repayment</Link>
                                        <Link to="/customerCentric/escrow" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Escrow</Link>
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