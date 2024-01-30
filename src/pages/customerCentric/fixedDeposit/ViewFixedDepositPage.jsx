import {Button, Text} from "@chakra-ui/react";
import {Link as ReactLink, useNavigate} from "react-router-dom";
import Layout from "../../Layout.jsx";

const ViewFixedDepositPage = () => {
    const router = useNavigate();

    const details = {
        name: "Adekunle Adebona Samuel",
        emailAddress: "adekunle.adebona@creditwaveng.com.",
        dob: "09/03/1991",
        bvn: "109031991",
        phoneNumber: "081 123 45678",
        deposit: [
            {
                amount: "20,000.00",
                status: "Active",
                interest: "20,000.00",
                tenor: 365,
                dateSubmitted: "July 21, 2023",
                transDate: "July 21, 2023"
            },{
                amount: "20,000.00",
                status: "Pending",
                interest: "20,000.00",
                tenor: 365,
                dateSubmitted: "July 21, 2023",
                transDate: "July 21, 2023"
            },{
                amount: "20,000.00",
                status: "Closed",
                interest: "20,000.00",
                tenor: 365,
                dateSubmitted: "July 21, 2023",
                transDate: "July 21, 2023"
            },
        ]
    }

    return (
        <Layout>
            <div className="flex justify-between px-0 py-4  pb-2 md:pt-3 overflow-auto">
                <div></div>
                <div>
                    <Button variant="primary" onClick={() => router(-1)} bgColor="#00C795" borderRadius="4px"
                            height="37px" size='md' as={ReactLink} w={'109px'}>
                        <Text color="white">Back</Text>
                    </Button>
                </div>
            </div>
            <div className="custom-scroll-bar min-w-full align-middle h-[630px] c-border w-full shadow-xl overflow-auto sm:rounded-lg mt-4 px-6">
                <div>
                    <p className="text-[20px] leading-5 text-[#4A5D58] font-[600]">Customer Details</p>
                    <div className="rounded-[5px] my-6 p-8 scroll-container" style={{border: "1px solid #C9D4D1", background: "#FFF"}}>
                        <div className="flex space-x-4">
                            <div>
                                <p className="text-[15px] font-[inter] leading-5 text-[#4A5D58] font-[600]">Name</p>
                                <p className="text-[15px] font-[inter] leading-5 text-[#4A5D58] font-[500]">{details.name}</p>
                            </div>
                            <div>
                                <p className="text-[15px] font-[inter] leading-5 text-[#4A5D58] font-[600]">DOB</p>
                                <p className="text-[15px] font-[inter] leading-5 text-[#4A5D58] font-[500]">{details.dob}</p>
                            </div>
                            <div>
                                <p className="text-[15px] font-[inter] leading-5 text-[#4A5D58] font-[600]">Email Address:</p>
                                <p className="text-[15px] font-[inter] leading-5 text-[#4A5D58] font-[500] truncate">{details.emailAddress}</p>
                            </div>
                            <div>
                                <p className="text-[15px] font-[inter] leading-5 text-[#4A5D58] font-[600]">Phone number:</p>
                                <p className="text-[15px] font-[inter] leading-5 text-[#4A5D58] font-[500]">{details.phoneNumber}</p>
                            </div>
                            <div>
                                <p className="text-[15px] font-[inter] leading-5 text-[#4A5D58] font-[600]">BVN</p>
                                <p className="text-[15px] font-[inter] leading-5 text-[#4A5D58] font-[500]">{details.bvn}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
    </Layout>
)
    ;
};

export default ViewFixedDepositPage;