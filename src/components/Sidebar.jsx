import logo from '../assets/logo.svg'
import exit from '../assets/exit.svg'
import dashboard from '../assets/dashboard.svg'
import loanApp from '../assets/document-text.svg'
import receipt from '../assets/receipt-edit.svg'
import arrowDown from '../assets/arrow-down.svg'
import arrowUp from '../assets/arrowUp.svg'
import Submenu from "./Submenu.jsx";

const Sidebar = ({ openSidebar, updateSidebarOpen}) => {

    const sidebarData = [
        {
            name: 'Dashboard',
            hasDropdown: false,
            href: '/dashboard',
            route: '/dashboard',
            icon: dashboard,
        },
        {
            name: 'Loan Application',
            hasDropdown: true,
            icon: loanApp,
            route: '/loanApp',
            iconClosed: arrowUp,
            iconOpened: arrowDown,
            dropdown: [
                {
                    applicationPageName: 'Customer',
                    href: '/loanApp/customer',
                    route: '/loanApp',
                },
                {
                    applicationPageName: 'Declined',
                    href: '/loanApp/declined',
                    route: '/loanApp',
                },
                {
                    applicationPageName: 'Adjust',
                    href: '/loanApp/adjust',
                    route: '/loanApp',
                },
                {
                    applicationPageName: 'Loan Status',
                    href: '/loanApp/loanStatus',
                    route: '/loanApp',
                },
                {
                    applicationPageName: 'Loan Restructuring',
                    href: '/loanApp/loanRestructuring',
                    route: '/loanApp',
                },{
                    applicationPageName: 'Loan Top-up',
                    href: '/loanApp/loanTopUp',
                    route: '/loanApp',
                },
            ]
        },
        {
            name: 'Loan Underwriting',
            hasDropdown: true,
            icon: receipt,
            route: '/loanUnderwriting',
            iconClosed: arrowUp,
            iconOpened: arrowDown,
            dropdown: [
                {
                    applicationPageName: 'Review',
                    href: '/loanUnderwriting/review',
                    route: '/underwriting',
                },
                {
                    applicationPageName: 'Approval',
                    href: '/loanUnderwriting/approval',
                    route: '/underwriting',
                },
                {
                    applicationPageName: 'Disbursement',
                    href: '/loanUnderwriting/disbursement',
                    route: '/underwriting',
                },
                {
                    applicationPageName: 'Loan Re-assignment',
                    href: '/loanUnderwriting/loanRe-assignment',
                    route: '/underwriting',
                }
            ]
        },
        {
            name: 'Collection',
            hasDropdown: true,
            icon: receipt,
            route: '/collection',
            iconClosed: arrowUp,
            iconOpened: arrowDown,
            dropdown: [
                {
                    applicationPageName: 'Repayment',
                    href: '/collection/repayment',
                    route: '/collection',
                },
                {
                    applicationPageName: 'Summary',
                    href: '/collection/summary',
                    route: '/collection',
                },
                {
                    applicationPageName: 'Report',
                    href: '/collection/report',
                    route: '/collection',
                },
            ]
        },
        {
            name: 'Staff',
            hasDropdown: true,
            icon: receipt,
            route: '/staff',
            iconClosed: arrowUp,
            iconOpened: arrowDown,
            dropdown: [
                {
                    applicationPageName: 'Loan',
                    href: '/staff/loan',
                    route: '/staff',
                },
            ]
        },
        {
            name: 'CRM',
            hasDropdown: true,
            icon: receipt,
            route: '/crm',
            iconClosed: arrowUp,
            iconOpened: arrowDown,
            dropdown: [
                {
                    applicationPageName: 'Add Client',
                    href: '/crm/addClient',
                    route: '/crm',
                },
                {
                    applicationPageName: 'Clients',
                    href: '/crm/clients',
                    route: '/crm',
                },
                {
                    applicationPageName: 'Notification',
                    href: '/crm/notification',
                    route: '/crm',
                },
            ]
        },
        {
            name: 'Administration',
            hasDropdown: true,
            icon: receipt,
            route: '/administration',
            iconClosed: arrowUp,
            iconOpened: arrowDown,
            dropdown: [
                {
                    applicationPageName: 'Product',
                    href: '/administration',
                    route: '/administration',
                },
                {
                    applicationPageName: 'Underwriter',
                    href: '/administration/underwriter/level',
                    route: '/administration',
                    hasDropdown: true,
                    dropdown: [
                        {
                            applicationPageName: 'Level',
                            href: '/administration/underwriter/level',
                            route: '/administration',
                        },
                        {
                            applicationPageName: 'Manage',
                            href: '/administration/underwriter/manage',
                            route: '/administration',
                        },
                        {
                            applicationPageName: 'Regular Loan',
                            href: '/administration/underwriter/regularLoan',
                            route: '/administration',
                        },
                    ]
                },
                {
                    applicationPageName: 'Staff',
                    href: '/administration/staff/loan',
                    route: '/administration',
                    hasDropdown: true,
                    dropdown: [
                        {
                            applicationPageName: 'Loan',
                            href: '/administration/staff/loan',
                            route: '/administration',
                        },
                        {
                            applicationPageName: 'Disbursed Loan',
                            href: '/administration/staff/disbursedLoan',
                            route: '/administration',
                        },
                        {
                            applicationPageName: 'Loan Collection',
                            href: '/administration/staff/loanCollection',
                            route: '/administration',
                        },
                    ]
                },
                {
                    applicationPageName: 'Loan Tenor',
                    href: '/administration/loanTenor',
                    route: '/administration',
                },
                {
                    applicationPageName: 'Report',
                    href: '/administration/report',
                    route: '/administration',
                },
            ]
        },
        {
            name: 'Debt Management',
            hasDropdown: false,
            href: '/debtManagement',
            route: '/debtManagement',
            icon: dashboard,
        },
        {
            name: 'Bridge Loan',
            hasDropdown: true,
            icon: receipt,
            route: '/bridgeLoan',
            iconClosed: arrowUp,
            iconOpened: arrowDown,
            dropdown: [
                {
                    applicationPageName: 'Documentation Setup',
                    href: '/bridgeLoan',
                    route: '/bridgeLoan',
                },
                {
                    applicationPageName: 'Documentation',
                    href: '/bridgeLoan/documentation',
                    route: '/bridgeLoan',
                },
                {
                    applicationPageName: 'Documentation Status',
                    href: '/bridgeLoan/documentationStatus',
                    route: '/bridgeLoan',
                },
                {
                    applicationPageName: 'Disbursement',
                    href: '/bridgeLoan/disbursement/returned',
                    route: '/bridgeLoan',
                    hasDropdown: true,
                    dropdown: [
                        {
                            applicationPageName: 'Returned',
                            href: '/bridgeLoan/disbursement/returned',
                            route: '/bridgeLoan',
                        },
                        {
                            applicationPageName: 'Process',
                            href: '/bridgeLoan/disbursement/processed',
                            route: '/bridgeLoan',
                        },
                        {
                            applicationPageName: 'New',
                            href: '/bridgeLoan/disbursement/new',
                            route: '/bridgeLoan',
                        },
                        {
                            applicationPageName: 'Disbursed',
                            href: '/bridgeLoan/disbursement/disbursed',
                            route: '/bridgeLoan',
                        },
                    ]
                },
                {
                    applicationPageName: 'Report',
                    href: '/bridgeLoan/report',
                    route: '/bridgeLoan',
                },
                {
                    applicationPageName: 'General Setup',
                    href: '/bridgeLoan/generalSetup',
                    route: '/bridgeLoan',
                },
            ]
        },
        {
            name: 'Customer Centric',
            hasDropdown: false,
            href: '/customerCentric/fixedDeposit',
            route: '/customerCentric',
            icon: dashboard,
        },
        {
            name: 'General Setup',
            hasDropdown: false,
            href: '/generalSetup',
            route: '/generalSetup',
            icon: dashboard,
        },
        {
            name: 'Report',
            hasDropdown: false,
            href: '/report',
            route: '/report',
            icon: dashboard,
        },

    ]

    const handleClick = () => {
        updateSidebarOpen(false)
    }

    const handleOnBlur = (val) => {
        updateSidebarOpen(false)
    }

    return (
        <div onBlur={ handleOnBlur } className={`fixed inset-y-0 left-0 z-30 overflow-hidden w-72 drop-shadow-2xl overflow-y-auto transition duration-300 transform bg-white lg:translate-x-0 lg:static lg:inset-0 ${openSidebar ? 'translate-x-0 ease-out block ' : '-translate-x-full ease-in'} `} style={{position: 'fixed'}}>
            <div className="flex items-center justify-center mt-6">
                <div className="flex justify-between  items-center ml-8">
                    <img src={logo} alt="brand" width={109} height={32} className="cursor-pointer" />
                    { openSidebar && <img className='ml-8' onClick={ handleClick } src={exit} alt="exit" width={30} height={30} /> }
                    <span className="mx-2 text-2xl font-normal focus:outline-none outline-none border-none text-white">Dashboard</span>
                </div>
            </div>
            <div className="mt-12">
                {sidebarData?.map((data, ind) => (
                    <Submenu data={data} key={ind}/>
                ))}
            {/*    <div className={currentRoute === '/dashboard' && 'border-l-4 border-[#00C795] py-3 bg-[#EAFFFA]'}>*/}
            {/*        <a className='flex items-center px-6  text-gray-100 bg-white bg-opacity-25' href={'/dashboard'}>*/}
            {/*            <img alt={'Dashboard_icon'} src={dashboard} width={20} height={20}/>*/}
            {/*            <span className={"mx-3 text-sm font-normal focus:outline-none outline-none border-none text-[#072320]"}>Dashboard</span>*/}
            {/*        </a>*/}
            {/*    </div>*/}
            {/*    <div className="mt-8">*/}
            {/*        <div className={currentRoute === '/loanApp' && 'border-l-4 border-[#00C795] py-3 bg-[#EAFFFA]'}>*/}
            {/*            <a className='flex items-center px-6  text-gray-100 bg-white bg-opacity-25' href={'/loanApp'}>*/}
            {/*                <img alt={'Dashboard_icon'} src={receipt} width={20} height={20}/>*/}
            {/*                <span className={"mx-3 text-sm font-normal focus:outline-none outline-none border-none text-[#072320]"}>StaffLoan Application</span>*/}
            {/*            </a>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div className="mt-8">*/}
            {/*        <div>*/}
            {/*            <div*/}
            {/*                onClick={handleShowDropdown}*/}
            {/*                className={currentRoute === '/underwriting' && 'border-l-4 border-[#00C795] py-3 bg-[#EAFFFA]'}*/}
            {/*                style={{display: 'flex', justifyContent: 'space-between'}}*/}
            {/*            >*/}
            {/*                <a className='flex items-center px-6  text-gray-100 bg-white bg-opacity-25' href={'/underwriting'}>*/}
            {/*                    <img alt={`application_icon`} src={receipt} width={20} height={20}/>*/}
            {/*                    <span*/}
            {/*                        className="mx-3 text-sm font-normal focus:outline-none outline-none border-none text-[#072320]">StaffLoan Underwriting</span>*/}
            {/*                </a>*/}
            {/*                <img*/}
            {/*                    className='pl-2 mr-10'*/}
            {/*                    alt={`application_icon`}*/}
            {/*                    src={showDropdown ? arrowUp : arrowDown}*/}
            {/*                    width={20}*/}
            {/*                    height={20}*/}
            {/*                />*/}
            {/*            </div>*/}
            {/*            {showDropdown &&*/}
            {/*                <div className='flex flex-col items-left px-6 py-1 mt-4 text-gray-100 bg-white bg-opacity-25'>*/}
            {/*                    <div>*/}
            {/*                         <a className="flex font-bold items-center px-6 py-2  text-gray-100 bg-white bg-opacity-25"*/}
            {/*                                                            href={'/application/manage'}>*/}
            {/*                            <span className={`${ location.pathname === '/application/manage' && 'medium'} mx-3 text-sm font-normal ${ location.pathname === '/application/manage' ? 'text-[#0C3A35]' : 'text-[#6F8B84]'}`}>Review</span>*/}
            {/*                        </a>*/}
            {/*                        <a className="flex font-bold items-center px-6 py-2  text-gray-100 bg-white bg-opacity-25"*/}
            {/*                                                           href={'/application/module'}>*/}
            {/*                            <span className={`mx-3 text-sm font-normal text-[#0C3A35]`}>Repayment</span>*/}
            {/*                        </a>*/}
            {/*                        <a className="flex font-bold items-center px-6 py-2  text-gray-100 bg-white bg-opacity-25"*/}
            {/*                                                          href={'/application/roles'}>*/}
            {/*                            <span className={`mx-3 text-sm font-normal text-[#0C3A35]`}>Summary</span>*/}
            {/*                        </a>*/}
            {/*                       <a className="flex font-bold items-center px-6 py-2  text-gray-100 bg-white bg-opacity-25"*/}
            {/*                                                               href={'/application/permission'}>*/}
            {/*                            <span className={`mx-3 text-sm font-normal text-[#0C3A35]`}>StaffLoan Re-assignment</span>*/}
            {/*                        </a>*/}
            {/*                    </div>*/}
            {/*                </div>}*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div className="mt-8">*/}
            {/*        <div>*/}
            {/*            <div*/}
            {/*                onClick={handleShowDropdown}*/}
            {/*                className={currentRoute === '/collection' && 'border-l-4 border-[#00C795] py-3 bg-[#EAFFFA]'}*/}
            {/*                style={{display: 'flex', justifyContent: 'space-between'}}*/}
            {/*            >*/}
            {/*                <a className='flex items-center px-6  text-gray-100 bg-white bg-opacity-25' href={'/collection'}>*/}
            {/*                    <img alt={`application_icon`} src={receipt} width={20} height={20}/>*/}
            {/*                    <span*/}
            {/*                        className="mx-3 text-sm font-normal focus:outline-none outline-none border-none text-[#072320]">Collection</span>*/}
            {/*                </a>*/}
            {/*                <img*/}
            {/*                    className='pl-2 mr-10'*/}
            {/*                    alt={`application_icon`}*/}
            {/*                    src={showDropdown ? arrowUp : arrowDown}*/}
            {/*                    width={20}*/}
            {/*                    height={20}*/}
            {/*                />*/}
            {/*            </div>*/}
            {/*            {showDropdown &&*/}
            {/*                <div className='flex flex-col items-left px-6 py-1 mt-4 text-gray-100 bg-white bg-opacity-25'>*/}
            {/*                    <div>*/}
            {/*                        <a className="flex font-bold items-center px-6 py-2  text-gray-100 bg-white bg-opacity-25"*/}
            {/*                           href={'/collection/approval'}>*/}
            {/*                            <span className={`${ location.pathname === '/collection' && 'medium'} mx-3 text-sm font-normal ${ location.pathname === '/collection' ? 'text-[#0C3A35]' : 'text-[#6F8B84]'}`}>Approval</span>*/}
            {/*                        </a>*/}
            {/*                        <a className="flex font-bold items-center px-6 py-2  text-gray-100 bg-white bg-opacity-25"*/}
            {/*                           href={'/collection/disbursement'}>*/}
            {/*                            <span className={`${ location.pathname === '/collection/disbursement' && 'medium'} mx-3 text-sm font-normal ${ location.pathname === '/collection/disbursement' ? 'text-[#0C3A35]' : 'text-[#6F8B84]'}`}>Disbursement</span>*/}
            {/*                        </a>*/}
            {/*                        <a className="flex font-bold items-center px-6 py-2  text-gray-100 bg-white bg-opacity-25"*/}
            {/*                           href={'/collection/re-assignment'}>*/}
            {/*                            <span className={`${ location.pathname === '/collection/re-assignment' && 'medium'} mx-3 text-sm font-normal ${ location.pathname === '/collection/re-assignment' ? 'text-[#0C3A35]' : 'text-[#6F8B84]'}`}>StaffLoan Re-assignment</span>*/}
            {/*                        </a>*/}
            {/*                    </div>*/}
            {/*                </div>}*/}
            {/*        </div>*/}
            {/*    </div>*/}

            {/*</div>*/}
        </div>
        </div>
    );
};

export default Sidebar;