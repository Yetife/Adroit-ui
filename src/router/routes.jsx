import Login from "../pages/auth/Login.jsx";
import Otp from "../pages/auth/Otp.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import LoanUnderwriting from "../pages/LoanUnderwriting.jsx";
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
        ]
    },
    {
        path: "/bridgeLoan",
        exact: true,
        children:[
            {
                path: "documentationSetup",
                key: "DOCUMENTATION SETUP",
                exact: true,
                element: <DocumentationSetup />,
            },
            {
                path: "documentationStatus",
                key: "DOCUMENTATION STATUS",
                exact: true,
                element: <DocumentationStatus />,
            }, {
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