import {Avatar, Badge} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import userImg from '../assets/avatar.svg'

// eslint-disable-next-line react/prop-types
const Navbar = ({openSidebar, name, email}) => {
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