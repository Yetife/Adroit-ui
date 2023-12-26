import Layout from "../Layout.jsx";
import Search from "../../components/reusables/Search.jsx";
import {Link as ReactLink, useNavigate} from "react-router-dom";
import {Button, Text} from "@chakra-ui/react";
import bankIcon from "../../assets/bankIcon.svg";
import educationIcon from "../../assets/educationIcon.svg";
import employIcon from "../../assets/employIcon.svg";
import sectorIcon from "../../assets/sectorIcon.svg";
import lgaIcon from "../../assets/lgaIcon.svg";
import statusIcon from "../../assets/statusIcon.svg";
import genderIcon from "../../assets/genderIcon.svg";
import dependentIcon from "../../assets/dependentIcon.svg";
import residentIcon from "../../assets/residentIcon.svg";
import orgIcon from "../../assets/orgIcon.svg";
import paymentIcon from "../../assets/paymentIcon.svg";
import salaryIcon from "../../assets/salaryIcon.svg";
import stateIcon from "../../assets/stateIcon.svg";
import titleIcon from "../../assets/titleIcon.svg";
import residentialIcon from "../../assets/residentialIcon.svg";

const GeneralSetup = () => {
    const router = useNavigate()
    const items = [
        {
            name: "Bank",
            icon: bankIcon,
            path: "/generalSetup/bank"
        },
        {
            name: "Educational Level",
            icon: educationIcon,
            path: "/generalSetup/educationalLevel"
        },
        {
            name: "Employment Type",
            icon: employIcon,
            path: "/generalSetup/employmentType"
        },
        {
            name: "Employment Sector",
            icon: sectorIcon,
            path: "/generalSetup/employmentSector"
        },
        {
            name: "Gender",
            icon: genderIcon,
            path: "/generalSetup/gender"
        },
        {
            name: "L.G.A",
            icon: lgaIcon,
            path: "/generalSetup/L.G.A"
        },
        {
            name: "Marital Status",
            icon: statusIcon,
            path: "/generalSetup/maritalStatus"
        },{
            name: "No. of Dependent",
            icon: dependentIcon,
            path: "/generalSetup/noOfDependent"
        },{
            name: "No. of Years at Resident",
            icon: residentIcon,
            path: "/generalSetup/noOfYearsAtResident"
        },{
            name: "Organization/Employer",
            icon: orgIcon,
            path: "/generalSetup/organization"
        },{
            name: "Residential Status",
            icon: residentialIcon,
            path: "/generalSetup/residentialStatus"
        },{
            name: "Salary Range",
            icon: salaryIcon,
            path: "/generalSetup/salaryRange"
        },{
            name: "Salary Payment Day ",
            icon: paymentIcon,
            path: "/generalSetup/salaryPaymentDay"
        },{
            name: "State",
            icon: stateIcon,
            path: "/generalSetup/state"
        },{
            name: "Title",
            icon: titleIcon,
            path: "/generalSetup/title"
        },
        {
            name: "Country",
            icon: stateIcon,
            path: "/generalSetup/country"
        },
        {
            name: "Fixed Deposit Status",
            icon: titleIcon,
            path: "/generalSetup/fixedDepositStatus"
        },{
            name: "Fixed Deposit Tenor",
            icon: titleIcon,
            path: "/generalSetup/fixedDepositTenor"
        },{
            name: "Fixed Deposit Range",
            icon: titleIcon,
            path: "/generalSetup/fixedDepositAmountRange"
        },{
            name: "Fixed Deposit Preliquidation Charges",
            icon: titleIcon,
            path: "/generalSetup/fixedDepositPreliquidationCharges"
        },{
            name: "Regular Loan Interest Rate",
            icon: stateIcon,
            path: "/generalSetup/regularLoanInterestRate"
        },{
            name: "Fixed Deposit Interest Rate",
            icon: stateIcon,
            path: "/generalSetup/fixedDepositInterestRate"
        },
        {
            name: "Regular Loan Charges",
            icon: stateIcon,
            path: "/generalSetup/regularLoanCharges"
        }, {
            name: "Late Fee Type",
            icon: stateIcon,
            path: "/generalSetup/lateFeeType"
        }, {
            name: "Late Fee Principal",
            icon: stateIcon,
            path: "/generalSetup/lateFeePrincipal"
        }, {
            name: "Fee Frequency",
            icon: stateIcon,
            path: "/generalSetup/feeFrequency"
        },
    ]

    return (
        <Layout>
            <div className="px-2">
                <div className="flex justify-between px-0 py-4  pb-2 md:pt-3">
                    <Search />
                </div>
                <div className="flex flex-wrap mt-12">
                    {
                        items.map((item, index)=>(
                            <div key={index} style={{boxShadow: "0px 0px 16px 0px rgba(0, 0, 0, 0.15)", boxSizing: 'border-box', borderRadius: '8px', position:"relative", marginBottom:"20px", backgroundColor:"white", cursor: "pointer"}}
                                 className="ml-[20px]" onClick={()=>router(item.path)}>
                                <div className="flex items-center md:pr-20 pr-10 md:pl-8 pl-4 py-8">
                                    <img src={item.icon} />
                                    <p className="text-[#4A5D58] text-[16px] pl-4 font-medium">{item.name}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </Layout>
    );
};

export default GeneralSetup;