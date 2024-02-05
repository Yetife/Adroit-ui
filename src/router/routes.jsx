import Login from "../pages/auth/Login.jsx";
import Otp from "../pages/auth/Otp.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Collection from "../pages/Collection.jsx";
import Customer from "../pages/LoanApplication/Customer.jsx";
import AdjustApplication from "../pages/LoanApplication/AdjustApplication.jsx";
import DeclinedApplication from "../pages/LoanApplication/DeclinedApplication.jsx";
import LoanStatus from "../pages/LoanApplication/LoanStatus.jsx";
import GeneralSetup from "../pages/generalSetup/index.jsx";
import Bank from "../pages/generalSetup/Bank.jsx";
import EducationalLevel from "../pages/generalSetup/EducationalLevel.jsx";
import EmploymentType from "../pages/generalSetup/EmploymentType.jsx";
import EmploymentSector from "../pages/generalSetup/EmploymentSector.jsx";
import Gender from "../pages/generalSetup/Gender.jsx";
import Lga from "../pages/generalSetup/Lga.jsx";
import MaritalStatus from "../pages/generalSetup/MaritalStatus.jsx";
import Dependents from "../pages/generalSetup/Dependents.jsx";
import Residency from "../pages/generalSetup/Residency.jsx";
import Organization from "../pages/generalSetup/Organization.jsx";
import ResidentialStatus from "../pages/generalSetup/ResidentialStatus.jsx";
import SalaryRange from "../pages/generalSetup/SalaryRange.jsx";
import SalaryPaymentDay from "../pages/generalSetup/SalaryPaymentDay.jsx";
import State from "../pages/generalSetup/State.jsx";
import Title from "../pages/generalSetup/Title.jsx";
import Country from "../pages/generalSetup/Country.jsx";
import FixedDepositStatus from "../pages/generalSetup/FixedDepositStatus.jsx";
import FixedDepositTenor from "../pages/generalSetup/FixedDepositTenor.jsx";
import FixedDepositAmountRange from "../pages/generalSetup/FixedDepositAmountRange.jsx";
import FixedDepositPreliquidationCharges from "../pages/generalSetup/FixedDepositPreliquidationCharges.jsx";
import FixedDepositInterestRate from "../pages/generalSetup/FixedDepositInterestRate.jsx";
import RegularLoanInterestRate from "../pages/generalSetup/RegularLoanInterestRate.jsx";
import RegularLoanCharges from "../pages/generalSetup/RegularLoanCharges.jsx";
import DocumentationSetup from "../pages/bridgeLoan/DocumentationSetup.jsx";
import DocumentationStatus from "../pages/bridgeLoan/DocumentationStatus.jsx";
import BridgeLoanGeneralSetup from "../pages/bridgeLoan/generalSetup/BridgeLoanGeneralSetup.jsx";
import FacilityType from "../pages/bridgeLoan/generalSetup/FacilityType.jsx";
import Tenor from "../pages/bridgeLoan/generalSetup/Tenor.jsx";
import DocumentStages from "../pages/bridgeLoan/generalSetup/DocumentStages.jsx";
import DisbursementStatus from "../pages/bridgeLoan/generalSetup/DisbursementStatus.jsx";
import Documentation from "../pages/bridgeLoan/Documentation.jsx";
import Returned from "../pages/bridgeLoan/disbursement/Returned.jsx";
import New from "../pages/bridgeLoan/disbursement/New.jsx";
import AddNewPage from "../components/bridgeLoan/disbursement/new/AddNewPage.jsx";
import Processed from "../pages/bridgeLoan/disbursement/Processed.jsx";
import Disbursed from "../pages/bridgeLoan/disbursement/Disbursed.jsx";
import Product from "../pages/administration/Product.jsx";
import LateFeeType from "../pages/generalSetup/LateFeeType.jsx";
import LateFeePrincipal from "../pages/generalSetup/LateFeePrincipal.jsx";
import FeeFrequency from "../pages/generalSetup/FeeFrequency.jsx";
import LoanTenor from "../pages/administration/LoanTenor.jsx";
import Level from "../pages/administration/underwritter/Level.jsx";
import Manage from "../pages/administration/underwritter/Manage.jsx";
import RegularLoan from "../pages/administration/underwritter/RegularLoan.jsx";
import Loan from "../pages/administration/staff/Loan.jsx";
import DisbursedLoan from "../pages/administration/staff/DisbursedLoan.jsx";
import LoanCollection from "../pages/administration/staff/LoanCollection.jsx";
import ViewStaffPage from "../pages/administration/staff/ViewStaffPage.jsx";
import LoanRestructuring from "../pages/LoanApplication/LoanRestructuring.jsx";
import LoanTopUp from "../pages/LoanApplication/LoanTopUp.jsx";
import ViewLoanApplicationPage from "../pages/LoanApplication/ViewLoanApplicationPage.jsx";
import ViewLoanRestructuringPage from "../pages/LoanApplication/ViewLoanRestructuringPage.jsx";
import ViewLoanTopUpPage from "../pages/LoanApplication/ViewLoanTopUpPage.jsx";
import Review from "../pages/loanUnderwriting/Review.jsx";
import LoanReassignment from "../pages/loanUnderwriting/LoanReassignment.jsx";
import Disbursement from "../pages/loanUnderwriting/Disbursement.jsx";
import Approval from "../pages/loanUnderwriting/Approval.jsx";
import ViewLoanUnderwritingPage from "../pages/loanUnderwriting/ViewLoanUnderwritingPage.jsx";
import StaffLoan from "../pages/staff/StaffLoan.jsx";
import ViewAdjustLoanPage from "../pages/LoanApplication/ViewAdjustLoanPage.jsx";
import ReassignedLoan from "../pages/loanUnderwriting/ReassignedLoan.jsx";
import ViewApprovalLoanPage from "../pages/loanUnderwriting/ViewApprovalLoanPage.jsx";
import NewClient from "../pages/crm/NewClient.jsx";
import AddNewClientLayout from "../pages/crm/AddNewClientLayout.jsx";
import ClientPage from "../pages/crm/ClientPage.jsx";
import ViewPage from "../pages/crm/ViewPage.jsx";
import Notification from "../pages/crm/Notification.jsx";
import CustomerFixedDeposit from "../pages/customerCentric/fixedDeposit/CustomerFixedDeposit.jsx";
import CustomerSavings from "../pages/customerCentric/savings/CustomerSavings.jsx";
import CustomerBillPayment from "../pages/customerCentric/billsPayment/CustomerBillPayment.jsx";
import CustomerTransfer from "../pages/customerCentric/transfer/CustomerTransfer.jsx";
import CustomerData from "../pages/customerCentric/data/CustomerData.jsx";
import CustomerAirtime from "../pages/customerCentric/airtime/CustomerAirtime.jsx";
import CustomerLoanRepayment from "../pages/customerCentric/loanRepayment/CustomerLoanRepayment.jsx";
import CustomerEscrow from "../pages/customerCentric/CustomerEscrow.jsx";
import ViewFixedDepositPage from "../pages/customerCentric/fixedDeposit/ViewFixedDepositPage.jsx";
import ViewLoanDisbursementPage from "../pages/loanUnderwriting/ViewLoanDisbursementPage.jsx";
import ViewSavingsPage from "../pages/customerCentric/savings/ViewSavingsPage.jsx";
import ViewBillPaymentPage from "../pages/customerCentric/billsPayment/ViewBillPaymentPage.jsx";
import ViewTransfersPage from "../pages/customerCentric/transfer/ViewTransfersPage.jsx";
import ViewAirtimePage from "../pages/customerCentric/airtime/ViewAirtimePage.jsx";
import ViewDataPage from "../pages/customerCentric/data/ViewDataPage.jsx";
import ViewLoanRepaymentPage from "../pages/customerCentric/loanRepayment/ViewLoanRepaymentPage.jsx";
import LoanBidding from "../pages/customerCentric/LoanBidding.jsx";
import P2P from "../pages/customerCentric/P2P.jsx";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {getUserToken} from "../services/storage/index.js";
import Repayment from "../pages/collection/Repayment.jsx";

export const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const token = getUserToken();

    useEffect(() => {
        // Check if there is no token, then navigate to the home page
        if (!token) {
            navigate('/');
        }
    }, [token, navigate]);
    // Return children only if the user has a valid token
    return token ? children : null;
};

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
        element: <ProtectedRoute>
            <Dashboard />
        </ProtectedRoute>,
    },
    {
        path: "/loanApp",
        exact: true,
        children: [
            {
                path: "customer",
                exact: true,
                element: <ProtectedRoute>
                    <Customer />
                </ProtectedRoute>
            },
            {
                path: "adjust",
                exact: true,
                element: <ProtectedRoute>
                    <AdjustApplication />
                </ProtectedRoute>
            },
            {
                path: "declined",
                exact: true,
                element: <ProtectedRoute>
                    <DeclinedApplication />
                </ProtectedRoute>
            },
            {
                path: "loanStatus",
                exact: true,
                element: <ProtectedRoute>
                    <LoanStatus />
                </ProtectedRoute>
            },
            {
                path: "loanRestructuring",
                exact: true,
                element: <ProtectedRoute>
                    <LoanRestructuring />
                </ProtectedRoute>
            },{
                path: "loanTopUp",
                exact: true,
                element: <ProtectedRoute>
                    <LoanTopUp />
                </ProtectedRoute>
            },
            {
                path: "customerDetails",
                key: "viewLoan",
                exact: true,
                element: <ProtectedRoute>
                    <ViewLoanApplicationPage />,
                </ProtectedRoute>
            },
            {
                path: "adjust/customerDetails",
                key: "viewLoanAdjust",
                exact: true,
                element: <ProtectedRoute>
                    <ViewAdjustLoanPage />,
                </ProtectedRoute>
            },
            {
                path: "loanRestructuring/view",
                exact: true,
                element: <ProtectedRoute>
                    <ViewLoanRestructuringPage />
                </ProtectedRoute>
            },
            {
                path: "loanRestructuring/edit",
                exact: true,
                element: <ProtectedRoute>
                    <ViewLoanRestructuringPage />
                </ProtectedRoute>
            },
            {
                path: "loanTopUp/view",
                exact: true,
                element: <ProtectedRoute>
                    <ViewLoanTopUpPage />
                </ProtectedRoute>
            },
            {
                path: "loanTopUp/edit",
                exact: true,
                element: <ProtectedRoute>
                    <ViewLoanTopUpPage />
                </ProtectedRoute>
            },

        ]
    },
    {
        path: "/loanUnderwriting",
        exact: true,
        children: [
            {
                path: "review",
                exact: true,
                element: <ProtectedRoute>
                    <Review />,
                </ProtectedRoute>
            },
            {
                path: "approval",
                exact: true,
                element: <ProtectedRoute>
                    <Approval />,
                </ProtectedRoute>
            }, {
                path: "disbursement",
                exact: true,
                element: <ProtectedRoute>
                    <Disbursement />,
                </ProtectedRoute>
            },
            {
                path: "loanRe-assignment",
                exact: true,
                element: <ProtectedRoute>
                    <LoanReassignment />,
                </ProtectedRoute>
            },
            {
                path: "reassignedLoan",
                exact: true,
                element: <ProtectedRoute>
                    <ReassignedLoan />,
                </ProtectedRoute>
            },
            {
                path: "customerDetails",
                exact: true,
                element: <ProtectedRoute>
                    <ViewLoanUnderwritingPage />,
                </ProtectedRoute>
            },
            {
                path: "approval/customerDetails",
                exact: true,
                element: <ProtectedRoute>
                    <ViewApprovalLoanPage/>,
                </ProtectedRoute>
            },
            {
                path: "disbursement/customerDetails",
                exact: true,
                element: <ProtectedRoute>
                    <ViewLoanDisbursementPage/>,
                </ProtectedRoute>
            },
        ]
    },
    {
        path: "/collection",
        exact: true,
        children: [
            {
                path: "repayment",
                exact: true,
                element: <ProtectedRoute>
                    <Repayment />,
                </ProtectedRoute>
            },
        ]
    },
    {
        path: "/customerCentric",
        exact: true,
       children: [
           {
               path: "fixedDeposit",
               exact: true,
               element: <ProtectedRoute>
                   <CustomerFixedDeposit />,
               </ProtectedRoute>
           }, {
               path: "savings",
               exact: true,
               element: <ProtectedRoute>
                   <CustomerSavings />,
               </ProtectedRoute>
           }, {
               path: "billsPayment",
               exact: true,
               element: <ProtectedRoute>
                   <CustomerBillPayment />,
               </ProtectedRoute>
           }, {
               path: "transfer",
               exact: true,
               element: <ProtectedRoute>
                   <CustomerTransfer />,
               </ProtectedRoute>
           }, {
               path: "data",
               exact: true,
               element: <ProtectedRoute>
                   <CustomerData />,
               </ProtectedRoute>
           }, {
               path: "airtime",
               exact: true,
               element: <ProtectedRoute>
                   <CustomerAirtime />,
               </ProtectedRoute>
           }, {
               path: "loanRepayment",
               exact: true,
               element: <ProtectedRoute>
                   <CustomerLoanRepayment />,
               </ProtectedRoute>
           },{
               path: "escrow",
               exact: true,
               element: <ProtectedRoute>
                   <CustomerEscrow/>,
               </ProtectedRoute>
           },
           {
               path: "loanBidding",
               exact: true,
               element: <ProtectedRoute>
                   <LoanBidding/>,
               </ProtectedRoute>
           },
           {
               path: "p2PLoan",
               exact: true,
               element: <ProtectedRoute>
                   <P2P/>,
               </ProtectedRoute>
           },
           {
               path: "fixedDeposit/customerDetails",
               exact: true,
               element: <ProtectedRoute>
                   <ViewFixedDepositPage />,
               </ProtectedRoute>
           },
           {
               path: "savings/customerDetails",
               exact: true,
               element: <ProtectedRoute>
                   <ViewSavingsPage />,
               </ProtectedRoute>
           },
           {
               path: "billsPayment/customerDetails",
               exact: true,
               element: <ProtectedRoute>
                   <ViewBillPaymentPage/>,
               </ProtectedRoute>
           },
           {
               path: "transfer/customerDetails",
               exact: true,
               element: <ProtectedRoute>
                   <ViewTransfersPage/>,
               </ProtectedRoute>
           },
           {
               path: "airtime/customerDetails",
               exact: true,
               element: <ProtectedRoute>
                   <ViewAirtimePage/>,
               </ProtectedRoute>
           },
           {
               path: "data/customerDetails",
               exact: true,
               element: <ProtectedRoute>
                   <ViewDataPage/>,
               </ProtectedRoute>
           },
           {
               path: "loanRepayment/customerDetails",
               exact: true,
               element: <ProtectedRoute>
                   <ViewLoanRepaymentPage />,
               </ProtectedRoute>
           },
       ]
    },
    {
        path: "/crm",
        exact: true,
        children: [
            {
                path: "addClient",
                exact: true,
                element: <ProtectedRoute>
                    <NewClient />,
                </ProtectedRoute>
            },
            {
                path: "addNewClient",
                exact: true,
                element: <ProtectedRoute>
                    <AddNewClientLayout />,
                </ProtectedRoute>
            },
            {
                path: "clients",
                exact: true,
                element: <ProtectedRoute>
                    <ClientPage />,
                </ProtectedRoute>
            },
            {
                path: "clients/view",
                exact: true,
                element: <ProtectedRoute>
                    <ViewPage />,
                </ProtectedRoute>
            },
            {
                path: "notification",
                exact: true,
                element: <ProtectedRoute>
                    <Notification />,
                </ProtectedRoute>
            },
        ]
    },
    {
        path: "/staff/loan",
        key: "Staff",
        exact: true,
        element: <ProtectedRoute>
            <StaffLoan />,
        </ProtectedRoute>
    },
    {
        path: "/generalSetup",
        exact: true,
        children: [
            {
                path: "",
                key: "GENERAL SETUP",
                exact: true,
                element: <ProtectedRoute>
                    <GeneralSetup />,
                </ProtectedRoute>
            },
            {
                path: "bank",
                key: "bank",
                exact: true,
                element: <ProtectedRoute>
                    <Bank />,
                </ProtectedRoute>
            },
            {
                path: "educationalLevel",
                key: "educationLevel",
                exact: true,
                element: <ProtectedRoute>
                    <EducationalLevel />,
                </ProtectedRoute>
            },
            {
                path: "employmentType",
                key: "employmentType",
                exact: true,
                element: <ProtectedRoute>
                    <EmploymentType />,
                </ProtectedRoute>
            },
            {
                path: "employmentSector",
                key: "employmentSector",
                exact: true,
                element: <ProtectedRoute>
                    <EmploymentSector />,
                </ProtectedRoute>
            },
            {
                path: "gender",
                key: "gender",
                exact: true,
                element: <ProtectedRoute>
                    <Gender />,
                </ProtectedRoute>
            },
            {
                path: "L.G.A",
                key: "lga",
                exact: true,
                element: <ProtectedRoute>
                    <Lga />,
                </ProtectedRoute>
            },
            {
                path: "maritalStatus",
                key: "maritalStatus",
                exact: true,
                element: <ProtectedRoute>
                    <MaritalStatus />,
                </ProtectedRoute>
            },
            {
                path: "noOfDependent",
                key: "noOfDependent",
                exact: true,
                element: <ProtectedRoute>
                    <Dependents />,
                </ProtectedRoute>
            },
            {
                path: "noOfYearsAtResident",
                key: "noOfYearsAtResident",
                exact: true,
                element: <ProtectedRoute>
                    <Residency />,
                </ProtectedRoute>
            },
            {
                path: "organization",
                key: "organization",
                exact: true,
                element: <ProtectedRoute>
                    <Organization />,
                </ProtectedRoute>
            },
            {
                path: "residentialStatus",
                key: "residentialStatus",
                exact: true,
                element: <ProtectedRoute>
                    <ResidentialStatus />,
                </ProtectedRoute>
            },
            {
                path: "salaryRange",
                key: "salaryRange",
                exact: true,
                element: <ProtectedRoute>
                    <SalaryRange />,
                </ProtectedRoute>
            },
            {
                path: "salaryPaymentDay",
                key: "salaryPaymentDay",
                exact: true,
                element: <ProtectedRoute>
                    <SalaryPaymentDay />,
                </ProtectedRoute>
            },
            {
                path: "state",
                key: "state",
                exact: true,
                element: <ProtectedRoute>
                    <State />,
                </ProtectedRoute>
            },
            {
                path: "title",
                key: "title",
                exact: true,
                element: <ProtectedRoute>
                    <Title />,
                </ProtectedRoute>
            },
            {
                path: "country",
                key: "country",
                exact: true,
                element: <ProtectedRoute>
                    <Country />,
                </ProtectedRoute>
            },
            {
                path: "fixedDepositStatus",
                key: "fixedDepositStatus",
                exact: true,
                element: <ProtectedRoute>
                    <FixedDepositStatus />,
                </ProtectedRoute>
            },
            {
                path: "fixedDepositTenor",
                key: "fixedDepositTenor",
                exact: true,
                element: <ProtectedRoute>
                    <FixedDepositTenor />,
                </ProtectedRoute>
            },
            {
                path: "fixedDepositAmountRange",
                key: "fixedDepositAmountRange",
                exact: true,
                element: <ProtectedRoute>
                    <FixedDepositAmountRange />,
                </ProtectedRoute>
            },
            {
                path: "fixedDepositPreliquidationCharges",
                key: "fixedDepositPreliquidationCharges",
                exact: true,
                element: <ProtectedRoute>
                    <FixedDepositPreliquidationCharges />,
                </ProtectedRoute>
            },
            {
                path: "fixedDepositInterestRate",
                key: "fixedDepositInterestRate",
                exact: true,
                element: <ProtectedRoute>
                    <FixedDepositInterestRate />,
                </ProtectedRoute>
            },
            {
                path: "regularLoanInterestRate",
                key: "regularLoanInterestRate",
                exact: true,
                element: <ProtectedRoute>
                    <RegularLoanInterestRate />,
                </ProtectedRoute>
            },

            {
                path: "regularLoanCharges",
                key: "regularLoanCharges",
                exact: true,
                element: <ProtectedRoute>
                    <RegularLoanCharges />,
                </ProtectedRoute>
            },
            {
                path: "lateFeeType",
                key: "lateFeeType",
                exact: true,
                element: <ProtectedRoute>
                    <LateFeeType />,
                </ProtectedRoute>
            },
            {
                path: "lateFeePrincipal",
                key: "lateFeePrincipal",
                exact: true,
                element: <ProtectedRoute>
                    <LateFeePrincipal/>,
                </ProtectedRoute>
            },
            {
                path: "feeFrequency",
                key: "feeFrequency",
                exact: true,
                element: <ProtectedRoute>
                    <FeeFrequency/>,
                </ProtectedRoute>
            },
        ]
    },
    {
        path: "/administration",
        exact: true,
        children: [
            {
                path: "",
                key: "PRODUCT",
                exact: true,
                element: <ProtectedRoute>
                    <Product />,
                </ProtectedRoute>
            },
            {
                path: "loanTenor",
                key: "loanTenor",
                exact: true,
                element: <ProtectedRoute>
                    <LoanTenor />,
                </ProtectedRoute>
            },
            {
                path: "underwriter",
                exact: true,
                children: [
                    {
                        path: "level",
                        key: "level",
                        exact: true,
                        element: <ProtectedRoute>
                            <Level />,
                        </ProtectedRoute>
                    },
                    {
                        path: "manage",
                        key: "manage",
                        exact: true,
                        element: <ProtectedRoute>
                            <Manage/>,
                        </ProtectedRoute>
                    },
                    {
                        path: "regularLoan",
                        key: "regularLoan",
                        exact: true,
                        element: <ProtectedRoute>
                            <RegularLoan />,
                        </ProtectedRoute>
                    },
                ]
            },
            {
                path: "staff",
                exact: true,
                children: [
                    {
                        path: "loan",
                        key: "loan",
                        exact: true,
                        element: <ProtectedRoute>
                            <Loan />,
                        </ProtectedRoute>
                    },
                    {
                        path: "disbursedLoan",
                        key: "disbursedLoan",
                        exact: true,
                        element: <ProtectedRoute>
                            <DisbursedLoan />,
                        </ProtectedRoute>
                    },
                    {
                        path: "loanCollection",
                        key: "loanCollection",
                        exact: true,
                        element: <ProtectedRoute>
                            <LoanCollection />,
                        </ProtectedRoute>
                    },
                    {
                        path: "view",
                        key: "viewStaff",
                        exact: true,
                        element: <ProtectedRoute>
                            <ViewStaffPage />,
                        </ProtectedRoute>
                    },
                ]
            },
        ]
    },
    {
        path: "/bridgeLoan",
        exact: true,
        children:[
            {
                path: "",
                key: "DOCUMENTATION SETUP",
                exact: true,
                element: <ProtectedRoute>
                    <DocumentationSetup />,
                </ProtectedRoute>
            },
            {
                path: "documentation",
                key: "DOCUMENTATION",
                exact: true,
                element: <ProtectedRoute>
                    <Documentation />,
                </ProtectedRoute>
            },
            {
                path: "documentationStatus",
                key: "DOCUMENTATION STATUS",
                exact: true,
                element: <ProtectedRoute>
                    <DocumentationStatus />,
                </ProtectedRoute>
            },
            {
                path: "disbursement",
                exact: true,
                children: [
                    {
                        path: "returned",
                        key: "RETURNED",
                        exact: true,
                        element: <ProtectedRoute>
                            <Returned />,
                        </ProtectedRoute>
                    },
                    {
                        path: "new",
                        key: "NEW",
                        exact: true,
                        element: <ProtectedRoute>
                            <New />,
                        </ProtectedRoute>
                    },
                    {
                        path: "processed",
                        key: "PROCESSED",
                        exact: true,
                        element: <ProtectedRoute>
                            <Processed />,
                        </ProtectedRoute>
                    },
                    {
                        path: "disbursed",
                        key: "DISBURSED",
                        exact: true,
                        element: <ProtectedRoute>
                            <Disbursed/>,
                        </ProtectedRoute>
                    },
                    {
                        path: "new/add",
                        key: "NEW ADD",
                        exact: true,
                        element: <ProtectedRoute>
                            <AddNewPage />,
                        </ProtectedRoute>
                    },
                ]
            },
            {
                path: "generalSetup",
                exact: true,
                children: [
                    {
                        path: "",
                        key: "GENERAL SETUP",
                        exact: true,
                        element: <ProtectedRoute>
                            <BridgeLoanGeneralSetup />,
                        </ProtectedRoute>
                    },
                    {
                        path: "tenor",
                        key: "TENOR",
                        exact: true,
                        element: <ProtectedRoute>
                            <Tenor />,
                        </ProtectedRoute>
                    },
                    {
                        path: "facilityType",
                        key: "FACILITY TYPE",
                        exact: true,
                        element: <ProtectedRoute>
                            <FacilityType />,
                        </ProtectedRoute>
                    },
                    {
                        path: "documentStages",
                        key: "DOCUMENT STAGES",
                        exact: true,
                        element: <ProtectedRoute>
                            <DocumentStages />,
                        </ProtectedRoute>
                    },
                    {
                        path: "disbursementStatus",
                        key: "DISBURSEMENT STATUS",
                        exact: true,
                        element: <ProtectedRoute>
                            <DisbursementStatus />,
                        </ProtectedRoute>
                    },
                ]
            },
        ]
    },
]
export default ROUTES;