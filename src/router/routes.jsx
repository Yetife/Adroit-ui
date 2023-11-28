import Login from "../pages/Login.jsx";
import Otp from "../pages/Otp.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import LoanUnderwriting from "../pages/LoanUnderwriting.jsx";
import Collection from "../pages/Collection.jsx";
import Customer from "../pages/LoanApplication/Customer.jsx";
import AdjustApplication from "../pages/LoanApplication/AdjustApplication.jsx";
import DeclinedApplication from "../pages/LoanApplication/DeclinedApplication.jsx";
import LoanStatus from "../pages/LoanApplication/LoanStatus.jsx";
import GeneralSetup from "../pages/generalSetup/index.jsx";

const ROUTES = [
    {
        path: "/",
        key: "LOGIN",
        exact: true,
        element: <Login />,
    },
    {
        path: "/verify",
        key: "OTP",
        exact: true,
        element: <Otp />,
    },
    {
        path: "/dashboard",
        key: "DASHBOARD",
        exact: true,
        element: <Dashboard />,
    },
    {
        path: "/loanApp",
        key: "LOAN APPLICATION",
        exact: true,
        children: [
            {
                path: "",
                exact: true,
                element: <Customer />
            },
            {
                path: "/loanApp/adjust",
                exact: true,
                element: <AdjustApplication />
            },
            {
                path: "/loanApp/declined",
                exact: true,
                element: <DeclinedApplication />
            },
            {
                path: "/loanApp/loanStatus",
                exact: true,
                element: <LoanStatus />
            },

        ]
    },
    {
        path: "/underwriting",
        key: "LOAN UNDERWRITING",
        exact: true,
        element: <LoanUnderwriting />,
    },
    {
        path: "/collection",
        key: "COLLECTION",
        exact: true,
        element: <Collection />,
    },
    {
        path: "/generalsetup",
        key: "GENERAL SETUP",
        exact: true,
        element: <GeneralSetup />,
    },
]
export default ROUTES;