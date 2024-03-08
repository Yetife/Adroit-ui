import {useState} from 'react';
import {useLocation, useNavigate, Link} from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Submenu = ({data, isExpanded}) => {
    const router = useNavigate()
    const location = useLocation()
    const currentRoute = '/' + location.pathname.split('/')[1]
    const [showDropdown, setShowDropdown] = useState(currentRoute === data.route);
    const [showSubDropdown, setShowSubDropdown] = useState(currentRoute === data.route);


    const handleShowDropdown = () => {
        setShowDropdown((initValue) => !initValue)
    };
    const handleShowSubDropdown = () => {
        setShowSubDropdown((initValue) => !initValue);
    };

    const isHighlighted = (route) => {
        return (
            currentRoute === route || location.pathname.includes(route.slice(1))
        );
    };

    return (
        <div>
            <div className={`flex flex-col min-w-64 py-2 mt-4`}>
                <div className={`${currentRoute.includes(data.route) && 'border-x-4 border-[#00C795] py-3 bg-[#EAFFFA]'} cursor-pointer flex justify-between`} onClick={handleShowDropdown}>
                    <div className='flex items-center px-6 text-gray-100 bg-white bg-opacity-25' onClick={()=>router(data.href)}>
                        <img alt={`${data.name?.toLowerCase()}_icon`} src={`${data.icon}`} width={20} height={20} />
                        {isExpanded && <span
                            className="mx-3 text-sm font-normal focus:outline-none outline-none border-none text-[#072320]">{data.name}</span>}
                    </div>
                    {/*{data.hasDropdown && showDropdown ? <img src={data.iconClosed} alt={'arrowDown'} className='pl-2 mr-10' width={20} height={20}/> : data.hasDropdown ? <img src={data.iconOpened} alt={'arrowDown'} className='pl-2 mr-10' width={20} height={20}/> : null}*/}
                    {(data.hasDropdown && isExpanded) && <img src={ showDropdown ?data.iconClosed : data.iconOpened} alt={'arrowDown'} className='pl-2 mr-10' width={20} height={20}/> }
                </div>
                {
                    data.hasDropdown && showDropdown && (
                        <div>
                            {data.dropdown?.map((each, ind) => (
                                    <div key={ind}>
                                        <div className="flex cursor-pointer" onClick={handleShowSubDropdown}>
                                            <div className="flex font-bold items-center px-12 py-1  text-gray-100 bg-white bg-opacity-25" onClick={()=>router(each.href)} >
                                                <span className={` mx-3 text-sm ${ isHighlighted(each.route) ? 'text-[#135D54] font-bold' : 'text-[#6F8B84] font-medium'}`}>{each.applicationPageName}</span>
                                            </div>
                                            {each.hasDropdown &&  <img src={showSubDropdown ? data.iconClosed : data.iconOpened} alt={'arrowDown'} className='pl-2 mr-10' width={20} height={20}/>}
                                        </div>
                                        {
                                            each.hasDropdown && showSubDropdown && (
                                                each.dropdown?.map((sub, index) => (
                                                    <div key={index} className="flex">
                                                        <div className="flex font-bold items-center px-12 py-1  text-gray-100 bg-white bg-opacity-25" onClick={()=>router(sub.href)}>
                                                            <span className={`${ isHighlighted(sub.route) && 'medium'} mx-3 text-sm cursor-pointer ${ isHighlighted(sub.route) ? 'text-[#0C3A35] font-medium' : 'text-[#6F8B84] font-normal'}`}> - {sub.applicationPageName}</span>
                                                        </div>
                                                    </div>
                                                ))
                                            )
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Submenu;