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
import CustomerSavings from "../pages/customerCentric/CustomerSavings.jsx";
import CustomerBillPayment from "../pages/customerCentric/CustomerBillPayment.jsx";
import CustomerTransfer from "../pages/customerCentric/CustomerTransfer.jsx";
import CustomerData from "../pages/customerCentric/CustomerData.jsx";
import CustomerAirtime from "../pages/customerCentric/CustomerAirtime.jsx";
import CustomerLoanRepayment from "../pages/customerCentric/CustomerLoanRepayment.jsx";
import CustomerEscrow from "../pages/customerCentric/CustomerEscrow.jsx";
import ViewFixedDepositPage from "../pages/customerCentric/fixedDeposit/ViewFixedDepositPage.jsx";

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
        exact: true,
        children: [
            {
                path: "customer",
                exact: true,
                element: <Customer />
            },
            {
                path: "adjust",
                exact: true,
                element: <AdjustApplication />
            },
            {
                path: "declined",
                exact: true,
                element: <DeclinedApplication />
            },
            {
                path: "loanStatus",
                exact: true,
                element: <LoanStatus />
            },
            {
                path: "loanRestructuring",
                exact: true,
                element: <LoanRestructuring />
            },{
                path: "loanTopUp",
                exact: true,
                element: <LoanTopUp />
            },
            {
                path: "customerDetails",
                key: "viewLoan",
                exact: true,
                element: <ViewLoanApplicationPage />,
            },
            {
                path: "adjust/customerDetails",
                key: "viewLoanAdjust",
                exact: true,
                element: <ViewAdjustLoanPage />,
            },
            {
                path: "loanRestructuring/view",
                exact: true,
                element: <ViewLoanRestructuringPage />
            },
            {
                path: "loanRestructuring/edit",
                exact: true,
                element: <ViewLoanRestructuringPage />
            },
            {
                path: "loanTopUp/view",
                exact: true,
                element: <ViewLoanTopUpPage />
            },
            {
                path: "loanTopUp/edit",
                exact: true,
                element: <ViewLoanTopUpPage />
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
                element: <Review />,
            },
            {
                path: "approval",
                exact: true,
                element: <Approval />,
            }, {
                path: "disbursement",
                exact: true,
                element: <Disbursement />,
            },
            {
                path: "loanRe-assignment",
                exact: true,
                element: <LoanReassignment />,
            },
            {
                path: "reassignedLoan",
                exact: true,
                element: <ReassignedLoan />,
            },
            {
                path: "customerDetails",
                exact: true,
                element: <ViewLoanUnderwritingPage />,
            },
            {
                path: "approval/customerDetails",
                exact: true,
                element: <ViewApprovalLoanPage/>,
            },
        ]
    },
    {
        path: "/collection",
        key: "COLLECTION",
        exact: true,
        element: <Collection />,
    },
    {
        path: "/customerCentric",
        exact: true,
       children: [
           {
               path: "fixedDeposit",
               exact: true,
               element: <CustomerFixedDeposit />,
           }, {
               path: "savings",
               exact: true,
               element: <CustomerSavings />,
           }, {
               path: "billsPayment",
               exact: true,
               element: <CustomerBillPayment />,
           }, {
               path: "transfer",
               exact: true,
               element: <CustomerTransfer />,
           }, {
               path: "data",
               exact: true,
               element: <CustomerData />,
           }, {
               path: "airtime",
               exact: true,
               element: <CustomerAirtime />,
           }, {
               path: "loanRepayment",
               exact: true,
               element: <CustomerLoanRepayment />,
           },{
               path: "escrow",
               exact: true,
               element: <CustomerEscrow/>,
           },
           {
               path: "fixedDeposit/customerDetails",
               exact: true,
               element: <ViewFixedDepositPage />,
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
                element: <NewClient />,
            },
            {
                path: "addNewClient",
                exact: true,
                element: <AddNewClientLayout />,
            },
            {
                path: "clients",
                exact: true,
                element: <ClientPage />,
            },
            {
                path: "clients/view",
                exact: true,
                element: <ViewPage />,
            },
            {
                path: "notification",
                exact: true,
                element: <Notification />,
            },
        ]
    },
    {
        path: "/staff/loan",
        key: "Staff",
        exact: true,
        element: <StaffLoan />,
    },
    {
        path: "/generalSetup",
        exact: true,
        children: [
            {
                path: "",
                key: "GENERAL SETUP",
                exact: true,
                element: <GeneralSetup />,
            },
            {
                path: "bank",
                key: "bank",
                exact: true,
                element: <Bank />,
            },
            {
                path: "educationalLevel",
                key: "educationLevel",
                exact: true,
                element: <EducationalLevel />,
            },
            {
                path: "employmentType",
                key: "employmentType",
                exact: true,
                element: <EmploymentType />,
            },
            {
                path: "employmentSector",
                key: "employmentSector",
                exact: true,
                element: <EmploymentSector />,
            },
            {
                path: "gender",
                key: "gender",
                exact: true,
                element: <Gender />,
            },
            {
                path: "L.G.A",
                key: "lga",
                exact: true,
                element: <Lga />,
            },
            {
                path: "maritalStatus",
                key: "maritalStatus",
                exact: true,
                element: <MaritalStatus />,
            },
            {
                path: "noOfDependent",
                key: "noOfDependent",
                exact: true,
                element: <Dependents />,
            },
            {
                path: "noOfYearsAtResident",
                key: "noOfYearsAtResident",
                exact: true,
                element: <Residency />,
            },
            {
                path: "organization",
                key: "organization",
                exact: true,
                element: <Organization />,
            },
            {
                path: "residentialStatus",
                key: "residentialStatus",
                exact: true,
                element: <ResidentialStatus />,
            },
            {
                path: "salaryRange",
                key: "salaryRange",
                exact: true,
                element: <SalaryRange />,
            },
            {
                path: "salaryPaymentDay",
                key: "salaryPaymentDay",
                exact: true,
                element: <SalaryPaymentDay />,
            },
            {
                path: "state",
                key: "state",
                exact: true,
                element: <State />,
            },
            {
                path: "title",
                key: "title",
                exact: true,
                element: <Title />,
            },
            {
                path: "country",
                key: "country",
                exact: true,
                element: <Country />,
            },
            {
                path: "fixedDepositStatus",
                key: "fixedDepositStatus",
                exact: true,
                element: <FixedDepositStatus />,
            },
            {
                path: "fixedDepositTenor",
                key: "fixedDepositTenor",
                exact: true,
                element: <FixedDepositTenor />,
            },
            {
                path: "fixedDepositAmountRange",
                key: "fixedDepositAmountRange",
                exact: true,
                element: <FixedDepositAmountRange />,
            },
            {
                path: "fixedDepositPreliquidationCharges",
                key: "fixedDepositPreliquidationCharges",
                exact: true,
                element: <FixedDepositPreliquidationCharges />,
            },
            {
                path: "fixedDepositInterestRate",
                key: "fixedDepositInterestRate",
                exact: true,
                element: <FixedDepositInterestRate />,
            },
            {
                path: "regularLoanInterestRate",
                key: "regularLoanInterestRate",
                exact: true,
                element: <RegularLoanInterestRate />,
            },

            {
                path: "regularLoanCharges",
                key: "regularLoanCharges",
                exact: true,
                element: <RegularLoanCharges />,
            },
            {
                path: "lateFeeType",
                key: "lateFeeType",
                exact: true,
                element: <LateFeeType
                />,
            },
            {
                path: "lateFeePrincipal",
                key: "lateFeePrincipal",
                exact: true,
                element: <LateFeePrincipal/>,
            },
            {
                path: "feeFrequency",
                key: "feeFrequency",
                exact: true,
                element: <FeeFrequency/>,
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
                element: <Product />,
            },
            {
                path: "loanTenor",
                key: "loanTenor",
                exact: true,
                element: <LoanTenor />,
            },
            {
                path: "underwriter",
                exact: true,
                children: [
                    {
                        path: "level",
                        key: "level",
                        exact: true,
                        element: <Level />,
                    },
                    {
                        path: "manage",
                        key: "manage",
                        exact: true,
                        element: <Manage/>,
                    },
                    {
                        path: "regularLoan",
                        key: "regularLoan",
                        exact: true,
                        element: <RegularLoan />,
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
                        element: <Loan />,
                    },
                    {
                        path: "disbursedLoan",
                        key: "disbursedLoan",
                        exact: true,
                        element: <DisbursedLoan />,
                    },
                    {
                        path: "loanCollection",
                        key: "loanCollection",
                        exact: true,
                        element: <LoanCollection />,
                    },
                    {
                        path: "view",
                        key: "viewStaff",
                        exact: true,
                        element: <ViewStaffPage />,
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
                element: <DocumentationSetup />,
            },
            {
                path: "documentation",
                key: "DOCUMENTATION",
                exact: true,
                element: <Documentation />,
            },
            {
                path: "documentationStatus",
                key: "DOCUMENTATION STATUS",
                exact: true,
                element: <DocumentationStatus />,
            },
            {
                path: "disbursement",
                exact: true,
                children: [
                    {
                        path: "returned",
                        key: "RETURNED",
                        exact: true,
                        element: <Returned />,
                    },
                    {
                        path: "new",
                        key: "NEW",
                        exact: true,
                        element: <New />,
                    },
                    {
                        path: "processed",
                        key: "PROCESSED",
                        exact: true,
                        element: <Processed />,
                    },
                    {
                        path: "disbursed",
                        key: "DISBURSED",
                        exact: true,
                        element: <Disbursed/>,
                    },
                    {
                        path: "new/add",
                        key: "NEW ADD",
                        exact: true,
                        element: <AddNewPage />,
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
                        element: <BridgeLoanGeneralSetup />,
                    },
                    {
                        path: "tenor",
                        key: "TENOR",
                        exact: true,
                        element: <Tenor />,
                    },
                    {
                        path: "facilityType",
                        key: "FACILITY TYPE",
                        exact: true,
                        element: <FacilityType />,
                    },
                    {
                        path: "documentStages",
                        key: "DOCUMENT STAGES",
                        exact: true,
                        element: <DocumentStages />,
                    },
                    {
                        path: "disbursementStatus",
                        key: "DISBURSEMENT STATUS",
                        exact: true,
                        element: <DisbursementStatus />,
                    },
                ]
            },
        ]
    },
]
export default ROUTES;