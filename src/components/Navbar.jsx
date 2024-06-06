import {Avatar, Badge} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import userImg from '../assets/avatar.svg'
import {Link, NavLink, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {ChevronDown} from "react-feather";
import {useDispatch} from "react-redux";
import {updateSnackbar} from "../store/snackbar/reducer.js";

// eslint-disable-next-line react/prop-types
const Navbar = ({openSidebar, name, email}) => {
    const router = useNavigate()
    const location = useLocation()
    const [activeTab, setActiveTab] = useState('fixed');
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
        // Extract the tab name from the current URL and set it in the state
        const tabName = location.pathname.split('/').pop();
        setActiveTab(tabName || 'fixed'); // Default to 'fixed' if no tab name in the URL
    }, [location.pathname]);
    const handleTabClick = (tab) => {
        console.log(activeTab)
        setActiveTab(tab);
    };

    const handleOpen = () => {
        setOpen(!open)
    }
    const clearToken = () => {
        sessionStorage.removeItem('token');
        sessionStorage.clear();
        dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: "Logout successful",success:true}));
        window.history.pushState(null, '', '/');
        window.location.replace('/');
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
                                className={`${activeTab === 'fixedDeposit' ? 'border-b-2 border-[#00C795] text-[#00C795]' : 'text-white'}`}
                            >
                                Fixed Deposit
                            </NavLink>
                            <NavLink
                                to="/customerCentric/savings"
                                className={`${activeTab === 'savings' ? 'border-b-2 border-[#00C795] text-[#00C795]' : 'text-white'}`}
                            >
                                Savings
                            </NavLink>
                            <NavLink
                                to="/customerCentric/billsPayment"
                                className={`${activeTab === 'billsPayment' ? 'border-b-2 border-[#00C795] text-[#00C795]' : 'text-white'}`}
                            >
                                Bills Payment
                            </NavLink>
                            {/* Dropdown */}
                            <div className="relative inline-block text-left">
                                    <div className="flex items-center space-x-1 cursor-pointer" onClick={() => handleTabClick('others')}>
                                    <button className="text-white">
                                        Others
                                    </button>
                                    <ChevronDown style={{color: "white", paddingTop: "2px"}}/>
                                </div>
                                <div
                                    className={`origin-top-right absolute right-0 mt-2 w-40 ${activeTab === 'others' ? 'block' : 'hidden'}`}>
                                    <div className="bg-white rounded-md shadow-lg py-1 cursor-pointer">
                                        <Link to="/customerCentric/transfer" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Transfer</Link>
                                        <Link to="/customerCentric/airtime" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Buy Airtime</Link>
                                        <Link to="/customerCentric/data" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Buy Data</Link>
                                        <Link to="/customerCentric/loanRepayment" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Loan Repayment</Link>
                                        <Link to="/customerCentric/escrow" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Escrow</Link>
                                        <Link to="/customerCentric/loanBidding" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Loan Bidding</Link>
                                        <Link to="/customerCentric/p2PLoan" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">P2P Loan</Link>
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
                <div>
                    <div className="flex items-center space-x-2">
                        <div className="flex relative">
                            <div className='px-2 hidden md:px-4  sm:block'>
                                <h4 className='font-semibold text-white'>{name}</h4>
                                <p className='text-xs font-extralight text-white leading-none'>{email}</p>
                            </div>

                            <Avatar src={userImg}/>
                        </div>
                        <ChevronDown style={{color: "white", paddingTop: "2px", cursor: "pointer"}} size={"40px"} onClick={handleOpen}/>
                    </div>
                    <div
                        className={`origin-top-right absolute right-0 mt-2 w-28 ${open ? 'block' : 'hidden'}`}>
                        <div className="bg-white rounded-md shadow-lg py-1 cursor-pointer">
                            <div className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</div>
                            <div className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Setting</div>
                            <div className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={clearToken}>Log Out</div>
                        </div>
                    </div>
                </div>
            </div>

        </header>
    );
};

export default Navbar;