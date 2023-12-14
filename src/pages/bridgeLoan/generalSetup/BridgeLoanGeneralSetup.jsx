import Search from "../../../components/reusables/Search.jsx";
import Layout from "../../Layout.jsx";
import {useNavigate} from "react-router-dom";

const BridgeLoanGeneralSetup = () => {
    const router = useNavigate()
    const items = [
        {
            name: "Tenor",
            path: "/bridgeLoan/generalSetup/tenor"
        },
        {
            name: "Facility Type",
            path: "/bridgeLoan/generalSetup/facilityType"
        },
        {
            name: "Documentation Stages",
            path: "/bridgeLoan/generalSetup/documentStages"
        },
        {
            name: "Disbursement Status",
            path: "/bridgeLoan/generalSetup/disbursementStatus"
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
                            <div key={index} style={{boxShadow: "0px 0px 16px 0px rgba(0, 0, 0, 0.15)", boxSizing: 'border-box', borderRadius: '8px',
                                position:"relative", marginBottom:"20px", backgroundColor:"white", cursor: "pointer"}}
                                 className="ml-[20px]" onClick={()=>router(item.path)}>
                                <div className="flex items-center md:pr-20 pr-10 md:pl-8 pl-4 py-8">
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

export default BridgeLoanGeneralSetup;