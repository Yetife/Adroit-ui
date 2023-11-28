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
            path: "/generalSetup/bank"
        },
        {
            name: "Employment Type",
            icon: employIcon,
            path: "/generalSetup/bank"
        },
        {
            name: "Employment Sector",
            icon: sectorIcon,
            path: "/generalSetup/bank"
        },
        {
            name: "Gender",
            icon: genderIcon,
            path: "/generalSetup/bank"
        },
        {
            name: "L.G.A",
            icon: lgaIcon,
            path: "/generalSetup/bank"
        },
        {
            name: "Marital Status",
            icon: statusIcon,
            path: "/generalSetup/bank"
        },{
            name: "No. of Dependent",
            icon: dependentIcon,
            path: "/generalSetup/bank"
        },{
            name: "No. of Years at Resident",
            icon: residentIcon,
            path: "/generalSetup/bank"
        },{
            name: "Organization/Employer",
            icon: orgIcon,
            path: "/generalSetup/bank"
        },{
            name: "Residential Status",
            icon: residentialIcon,
            path: "/generalSetup/bank"
        },{
            name: "Salary Range",
            icon: salaryIcon,
            path: "/generalSetup/bank"
        },{
            name: "Salary Payment Day ",
            icon: paymentIcon,
            path: "/generalSetup/bank"
        },{
            name: "State",
            icon: stateIcon,
            path: "/generalSetup/bank"
        },{
            name: "Title",
            icon: titleIcon,
            path: "/generalSetup/bank"
        },{
            name: "Fixed Deposit Status",
            icon: titleIcon,
            path: "/generalSetup/bank"
        },
    ]

    return (
        <Layout>
            <div className="flex justify-between px-0 py-4  pb-2 md:pt-3">
                <Search />
                <Button variant="primary" bgColor="#00C795" borderRadius="4px" height="37px" size='md' as={ReactLink} w={'109px'}>
                    <Text color="white">Add</Text>
                </Button>
            </div>
            <div className="flex flex-wrap mt-14">
                {
                    items.map((item, index)=>(
                        <div key={index} style={{boxShadow: "0px 0px 16px 0px rgba(0, 0, 0, 0.15)", boxSizing: 'border-box', borderRadius: '8px', position:"relative", marginBottom:"20px", backgroundColor:"white", cursor: "pointer"}}
                             className="md:ml-[25px] ml-[20px]" onClick={()=>router(item.path)}>
                            <div className="flex items-center pr-20 pl-8 py-8">
                                <img src={item.icon} />
                                <p className="text-[#4A5D58] text-[16px] pl-4 font-medium">{item.name}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </Layout>
    );
};

export default GeneralSetup;