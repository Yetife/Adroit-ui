import logo from '../assets/logo.png'
import exit from '../assets/exit.svg'
import dashboard from '../assets/dashboard.svg'
import collection from '../assets/collectionIcon.svg'
import staff from '../assets/staffIcon.svg'
import admin from '../assets/adminIcon.svg'
import debt from '../assets/debtIcon.svg'
import crm from '../assets/crmIcon.svg'
import bridge from '../assets/bridgeIcon.svg'
import customer from '../assets/customer.svg'
import setup from '../assets/setupIcon.svg'
import loanApp from '../assets/document-text.svg'
import report from '../assets/reportIcon.svg'
import receipt from '../assets/receipt-edit.svg'
import arrowDown from '../assets/arrow-down.svg'
import arrowUp from '../assets/arrowUp.svg'
import Submenu from "./Submenu.jsx";
import MenuIcon from '@mui/icons-material/Menu';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import axios from "axios";
import {getUserToken} from "../services/storage/index.js";
import {useEffect, useState} from "react";
import themes from "./reusables/theme.jsx";
import {CircularProgress, ThemeProvider} from "@mui/material";

const Sidebar = ({ openSidebar, updateSidebarOpen, isExpanded, setIsExpanded}) => {
    const baseUrl = import.meta.env.VITE_APP_BASE_URL
    const token = getUserToken();
    const user = JSON.parse(sessionStorage.getItem("userData"));
    const [permissions, setPermissions] = useState(null);
    const [filteredSidebarData, setFilteredSidebarData] = useState([]);
    const [image, setImage] = useState(null)
    const [contentType, setContentType] = useState(null)

    const fetchPermissions = async () => {
        const storedPermissions = sessionStorage.getItem('userPermission');
        if (storedPermissions) {
            return JSON.parse(storedPermissions);
        }else {
            try {
                const response = await axios.get(`${baseUrl}/ApplicationPermission/get_user_application_pages_permission/${user.UserId}`, {
                    headers: {
                        'Content-Type': "application/json",
                        'Accept': "application/json",
                        'XAPIKEY': import.meta.env.VITE_APP_ENCRYPTION_KEY,
                        'authorization': `Bearer ${token}`
                    }
                });
                sessionStorage.setItem("userPermission", JSON.stringify(response.data.data));
                return response.data.data; // Adjust according to the structure of your API response
            } catch (error) {
                console.error('Error fetching permissions:', error);
                return null;
            }
        }
    };


    useEffect(() => {
        fetchCompanyLogo()
        const getPermissions = async () => {
            const perms = await fetchPermissions();
            setPermissions(perms);
        };
        getPermissions();
    }, []);

    useEffect(() => {
        if (permissions) {
            const filterSidebarData = (data, perms) => {
                return data.filter((item) => {
                    // Check if the user has permission to view the main menu item
                    const modulePermission = perms.modules.find(
                        (mod) => mod.applicationModuleName === item.ssoName
                    );
                    if (!modulePermission) return false;

                    // Check if the user has permission to view any dropdown items
                    if (item.hasDropdown) {
                        item.dropdown = item.dropdown.filter((subItem) => {
                            return modulePermission.pages.some(
                                // (page) => page.pageName === subItem.ssoPageName && page.permission?.canView
                                (page) => page.pageName === subItem.ssoPageName
                            );
                        });
                        return item.dropdown.length > 0;
                    }
                    return true;
                });
            };
            setFilteredSidebarData(filterSidebarData(sidebarData, permissions));
        }
    }, [permissions]);

    const sidebarData = [
        {
            name: 'Dashboard',
            ssoName: 'Dashboard',
            hasDropdown: false,
            href: '/dashboard',
            route: '/dashboard',
            icon: dashboard,
        },
        {
            name: 'Loan Application',
            ssoName: 'Loan Application',
            hasDropdown: true,
            icon: loanApp,
            route: '/loanApp',
            iconClosed: arrowUp,
            iconOpened: arrowDown,
            dropdown: [
                {
                    applicationPageName: 'Customer',
                    ssoPageName: 'Customer',
                    href: '/loanApp/customer',
                    route: '/customer',
                },
                {
                    applicationPageName: 'Declined',
                    ssoPageName: 'Declined',
                    href: '/loanApp/declined',
                    route: '/declined',
                },
                {
                    applicationPageName: 'Adjust',
                    ssoPageName: 'Adjust',
                    href: '/loanApp/adjust',
                    route: '/adjust',
                },
                {
                    applicationPageName: 'Loan Status',
                    ssoPageName: 'Loan Status',
                    href: '/loanApp/loanStatus',
                    route: '/loanStatus',
                },
                {
                    applicationPageName: 'Loan Restructuring',
                    ssoPageName: 'Loan Restructuring',
                    href: '/loanApp/loanRestructuring',
                    route: '/loanRestructuring',
                },{
                    applicationPageName: 'Loan Top-up',
                    ssoPageName: 'Loan Topup',
                    href: '/loanApp/loanTopUp',
                    route: '/loanTopUp',
                },
            ]
        },
        {
            name: 'Loan Underwriting',
            ssoName: 'Loan Underwriting',
            hasDropdown: true,
            icon: receipt,
            route: '/loanUnderwriting',
            iconClosed: arrowUp,
            iconOpened: arrowDown,
            dropdown: [
                {
                    applicationPageName: 'Review',
                    ssoPageName: 'Review',
                    href: '/loanUnderwriting/review',
                    route: '/review',
                },
                {
                    applicationPageName: 'Approval',
                    ssoPageName: 'Approval',
                    href: '/loanUnderwriting/approval',
                    route: '/approval',
                },
                {
                    applicationPageName: 'Disbursement',
                    ssoPageName: 'Disbursement',
                    href: '/loanUnderwriting/disbursement',
                    route: '/disbursement',
                },
                {
                    applicationPageName: 'Loan Re-assignment',
                    ssoPageName: 'Loan Reassignment',
                    href: '/loanUnderwriting/loanRe-assignment',
                    route: '/loanRe-assignment',
                }
            ]
        },
        {
            name: 'Collection',
            ssoName: 'Collection',
            hasDropdown: true,
            icon: collection,
            route: '/collection',
            iconClosed: arrowUp,
            iconOpened: arrowDown,
            dropdown: [
                {
                    applicationPageName: 'Repayment',
                    ssoPageName: 'Repayment',
                    href: '/collection/repayment',
                    route: '/repayment',
                },
                {
                    applicationPageName: 'Summary',
                    ssoPageName: 'Summary',
                    href: '/collection/summary',
                    route: '/summary',
                },
                {
                    applicationPageName: 'Report',
                    ssoPageName: 'Report',
                    href: '/collection/report',
                    route: '/report',
                },
            ]
        },
        {
            name: 'Staff',
            ssoName: 'Staff',
            hasDropdown: true,
            icon: staff,
            route: '/staff',
            iconClosed: arrowUp,
            iconOpened: arrowDown,
            dropdown: [
                {
                    applicationPageName: 'Loan',
                    ssoPageName: 'Loan',
                    href: '/staff/loan',
                    route: '/loan',
                },
            ]
        },
        {
            name: 'CRM',
            ssoName: 'CRM',
            hasDropdown: true,
            icon: crm,
            route: '/crm',
            iconClosed: arrowUp,
            iconOpened: arrowDown,
            dropdown: [
                {
                    applicationPageName: 'Add Client',
                    ssoPageName: 'Add Client',
                    href: '/crm/addClient',
                    route: '/addClient',
                },
                {
                    applicationPageName: 'Clients',
                    ssoPageName: 'Clients',
                    href: '/crm/clients',
                    route: '/clients',
                },
                // {
                //     applicationPageName: 'Notification',
                //     href: '/crm/notification',
                //     route: '/crm',
                // },
            ]
        },
        {
            name: 'Administration',
            ssoName: 'Administration',
            hasDropdown: true,
            icon: admin,
            route: '/administration',
            iconClosed: arrowUp,
            iconOpened: arrowDown,
            dropdown: [
                {
                    applicationPageName: 'Product',
                    ssoPageName: 'Product',
                    href: '/administration/product',
                    route: '/product',
                },
                {
                    applicationPageName: 'Underwriter',
                    ssoPageName: 'Underwriter',
                    href: '/administration/underwriter/level',
                    route: '/underwriter',
                    hasDropdown: true,
                    dropdown: [
                        {
                            applicationPageName: 'Level',
                            ssoPageName: 'Underwriter_Level',
                            href: '/administration/underwriter/level',
                            route: '/level',
                        },
                        {
                            applicationPageName: 'Manage',
                            ssoPageName: 'Underwriter_Manage',
                            href: '/administration/underwriter/manage',
                            route: '/manage',
                        },
                        {
                            applicationPageName: 'Regular Loan',
                            ssoPageName: 'Underwriter_Regularloan',
                            href: '/administration/underwriter/regularLoan',
                            route: '/regularLoan',
                        },
                    ]
                },
                {
                    applicationPageName: 'Staff',
                    ssoPageName: 'Staff',
                    href: '/administration/staff/staffLoan',
                    route: '/staff',
                    hasDropdown: true,
                    dropdown: [
                        {
                            applicationPageName: 'Loan',
                            ssoPageName: 'Staff_Loan',
                            href: '/administration/staff/staffLoan',
                            route: '/staffLoan',
                        },
                        {
                            applicationPageName: 'Disbursed Loan',
                            ssoPageName: 'Staff_Disbursedloan',
                            href: '/administration/staff/disbursedLoan',
                            route: '/disbursedLoan',
                        },
                        // {
                        //     applicationPageName: 'Loan Collection',
                        //     ssoPageName: 'Staff_LoanCollection',
                        //     href: '/administration/staff/loanCollection',
                        //     route: '/loanCollection',
                        // },
                    ]
                },
                {
                    applicationPageName: 'Loan Tenor',
                    ssoPageName: 'Loan_Tenor',
                    href: '/administration/loanTenor',
                    route: '/loanTenor',
                },
                {
                    applicationPageName: 'Report',
                    ssoPageName: 'Report',
                    href: '/administration/report',
                    route: '/report',
                },
            ]
        },
        {
            name: 'Debt Management',
            hasDropdown: false,
            href: '/debtManagement',
            route: '/debtManagement',
            icon: debt,
        },
        {
            name: 'Bridge Loan',
            ssoName: 'Bridge Loan',
            hasDropdown: true,
            icon: bridge,
            route: '/bridgeLoan',
            iconClosed: arrowUp,
            iconOpened: arrowDown,
            dropdown: [
                {
                    applicationPageName: 'Documentation Setup',
                    ssoPageName: 'Documentation_Setup',
                    href: '/bridgeLoan/documentationSetup',
                    route: '/setUp',
                },
                {
                    applicationPageName: 'Documentation',
                   ssoPageName: 'Documentation',
                    href: '/bridgeLoan/documentation',
                    route: '/documentation',
                },
                {
                    applicationPageName: 'Documentation Status',
                   ssoPageName: 'Documentation_Status',
                    href: '/bridgeLoan/status',
                    route: '/status',
                },
                {
                    applicationPageName: 'Disbursement',
                    ssoPageName: 'Disbursement',
                    href: '/bridgeLoan/disbursement/returned',
                    route: '/disbursement',
                    hasDropdown: true,
                    dropdown: [
                        {
                            applicationPageName: 'Returned',
                            ssoPageName: 'Disbursement_Returned',
                            href: '/bridgeLoan/disbursement/returned',
                            route: '/returned',
                        },
                        {
                            applicationPageName: 'Process',
                            ssoPageName: 'Disbursement_Process',
                            href: '/bridgeLoan/disbursement/processed',
                            route: '/processed',
                        },
                        {
                            applicationPageName: 'New',
                            ssoPageName: 'Disbursement_New',
                            href: '/bridgeLoan/disbursement/new',
                            route: '/new',
                        },
                        {
                            applicationPageName: 'Disbursed',
                            ssoPageName: 'Documentation_Disbursed',
                            href: '/bridgeLoan/disbursement/disbursed',
                            route: '/disbursed',
                        },
                    ]
                },
                // {
                //     applicationPageName: 'Report',
                //     ssoPageName: 'BridgeLoan_Report',
                //     href: '/bridgeLoan/report',
                //     route: '/bridgeLoan',
                // },
                {
                    applicationPageName: 'General Setup',
                    ssoPageName: 'General_Setup',
                    href: '/bridgeLoan/generalSetup',
                    route: '/generalSetup',
                },
            ]
        },
        {
            name: 'Customer Centric',
            ssoName: 'Customer Centric',
            hasDropdown: false,
            href: '/customerCentric/fixedDeposit',
            route: '/customerCentric',
            icon: customer,
        },
        {
            name: 'General Setup',
            ssoName: 'General Setup',
            hasDropdown: false,
            href: '/generalSetup',
            route: '/generalSetup',
            icon: setup,
        },
        {
            name: 'Reports',
            ssoName: 'Report',
            hasDropdown: false,
            href: '/report',
            route: '/report',
            icon: report,
        },

    ]

    const handleClick = () => {
        updateSidebarOpen(false)
    }

    const handleOnBlur = (val) => {
        updateSidebarOpen(false)
    }

    const handleToggleExpand = () => {
        setIsExpanded((prev) => !prev);
    };

    const fetchCompanyLogo = async () => {
        try {
            const response = await axios.get(`${baseUrl}/Adroit/Login/GetByClientId?clientId=${import.meta.env.VITE_APP_CLIENT_ID}`, {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                }
            });
            setImage(response.data.data);
            setContentType(response.data.contentType)
            console.log('Fetched img:', contentType);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const imageSrc = `data:image/${contentType};base64,${image}`;


    return (
        <div onBlur={handleOnBlur}
             className={`${isExpanded ? 'w-72' : 'w-24'} fixed inset-y-0 left-0 z-30 overflow-hidden drop-shadow-2xl overflow-y-auto transition duration-300 transform bg-white lg:translate-x-0 lg:static lg:inset-0 ${
                 openSidebar ? 'translate-x-0 ease-out block' : '-translate-x-full ease-in'
             }`}
             style={{ position: 'fixed', minWidth: isExpanded ? '18rem' : '3rem' }}>
            {
                !permissions ? <ThemeProvider theme={themes}>
                    <CircularProgress color={"waveGreen"} sx={{display: "flex", margin: "20px auto", justifyContent: "center"}}/>
                </ThemeProvider> : <div>
                    <div className="flex items-center justify-center mt-4">
                        <div className="flex justify-between items-center">
                            {isExpanded ? <div className="flex space-x-20 items-center">
                                <img
                                    src={imageSrc}
                                    alt="brand"
                                    width={109}
                                    height={32}
                                    className="cursor-pointer"
                                />
                                <SyncAltIcon onClick={handleToggleExpand} sx={{cursor: 'pointer'}}/>
                            </div> : <SyncAltIcon onClick={handleToggleExpand} sx={{cursor: 'pointer'}}/>}
                            {openSidebar && (
                                <img
                                    className="ml-8"
                                    onClick={handleClick}
                                    src={exit}
                                    alt="exit"
                                    width={30}
                                    height={30}
                                />
                            )}
                            <span
                                className="mx-2 text-2xl font-normal focus:outline-none outline-none border-none text-white">
            {/*Dashboard*/}
          </span>
                        </div>
                    </div>
                    <div className="mt-6">
                        {filteredSidebarData?.map((data, ind) => (
                            <Submenu data={data} key={ind} isExpanded={isExpanded}/>
                        ))}
                    </div>
                </div>
            }
        </div>
    );
};

export default Sidebar;