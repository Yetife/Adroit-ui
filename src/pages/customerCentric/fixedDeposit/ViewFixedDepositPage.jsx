import {Button, Text} from "@chakra-ui/react";
import {Link as ReactLink, useNavigate} from "react-router-dom";
import Layout from "../../Layout.jsx";
import dayjs from "dayjs";
import ApproveDepositModal from "../../../components/customerCentric/fixedDeposit/ApproveDepositModal.jsx";
import {useState} from "react";
import {useGetFixedDepositByIdQuery} from "../../../store/features/customerCentric/api.js";
const ViewFixedDepositPage = () => {
    const router = useNavigate();
    const [open, setOpen] = useState(false)
    const queryParams = new URLSearchParams(location.search);
    const custId = queryParams.get("id");
    const {data, isFetching, error} =  useGetFixedDepositByIdQuery(custId)


    const header = ['S/N', 'Amount', 'Status', 'Interest', 'Tenor', 'Date Submitted', 'Transaction Date', 'Actions' ]

    return (
        <Layout>
            <div className="flex justify-between px-0 py-4  pb-2 md:pt-3 overflow-auto">
                <div></div>
                <div>
                    <Button variant="outline" borderColor="#00C795" marginRight="10px"
                            border={"2px solid #00C795"} borderRadius="4px" onClick={() => router(-1)}
                            height="37px" size='md' as={ReactLink} w={'109px'}>
                        <Text color="#00C795">Back</Text>
                    </Button>
                </div>
            </div>
            <div className="custom-scroll-bar min-w-full align-middle c-border w-full shadow-xl overflow-auto sm:rounded-lg mt-4 px-6">
                <div>
                    <p className="text-[20px] leading-5 text-[#4A5D58] font-[600]">Customer Details</p>
                    <div className="rounded-[5px] my-6 p-8 scroll-container" style={{border: "1px solid #C9D4D1", background: "#FFF"}}>
                        <div className="flex space-x-6">
                            <div>
                                <p className="text-[15px] font-[inter] leading-5 text-[#4A5D58] font-[600]">Name</p>
                                <p className="text-[15px] font-[inter] leading-5 text-[#4A5D58] font-[500] capitalize">{data?.data.fullName}</p>
                            </div>
                            <div>
                                <p className="text-[15px] font-[inter] leading-5 text-[#4A5D58] font-[600]">DOB</p>
                                <p className="text-[15px] font-[inter] leading-5 text-[#4A5D58] font-[500]">{data?.data.dateOfBirth}</p>
                            </div>
                            <div>
                                <p className="text-[15px] font-[inter] leading-5 text-[#4A5D58] font-[600]">Email Address:</p>
                                <p className="text-[15px] font-[inter] leading-5 text-[#4A5D58] font-[500] truncate">{data?.data.emailAddress}</p>
                            </div>
                            <div>
                                <p className="text-[15px] font-[inter] leading-5 text-[#4A5D58] font-[600]">Phone number:</p>
                                <p className="text-[15px] font-[inter] leading-5 text-[#4A5D58] font-[500]">{data?.data.phoneNumber}</p>
                            </div>
                            <div>
                                <p className="text-[15px] font-[inter] leading-5 text-[#4A5D58] font-[600]">BVN</p>
                                <p className="text-[15px] font-[inter] leading-5 text-[#4A5D58] font-[500]">{data?.data.bvn}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mb-12">
                    <p className="text-[20px] leading-5 text-[#4A5D58] font-[600]">Fixed Deposit</p>
                    <div className="scroll-container rounded-[10px] my-3" style={{
                        border: "1px solid #C9D4D1",
                        background: "#FFF",
                        boxShadow: "0px 6px 19px 0px rgba(0, 0, 0, 0.15)"
                    }}>
                        <div>
                            <table className="table-auto md:w-full px-20">
                                <thead>
                                <tr>
                                    {header?.map((val, ind) => <TableHeader key={ind + val} name={val}/>)}
                                </tr>
                                </thead>
                                <tbody className="bg-white">
                                {
                                    data?.data.listItem.map((item, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{index + 1}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{item.depositAmount}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{item.status}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{item.interestRate}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{item.fixedDepositTenorId}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{dayjs(item.maturityDate).format("YYYY/MM/DD")}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{dayjs(item.dateCreated).format("YYYY/MM/DD")}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <span onClick={()=>setOpen(true)} className={`text-[16px] leading-5 font-[inter] truncate ${item.status === "Pending" ? 'text-[#00C795] cursor-pointer' : 'text-[#4A5D58] italic font-[300]'}  font-medium`}>{item.status === "Pending" ? "Approve Now" : "No action"}</span>
                                            </td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <ApproveDepositModal open={open} setOpen={setOpen}/>
        </Layout>
    )
        ;
};

export default ViewFixedDepositPage;

export function TableHeader({name}) {
    return (
        <th className="px-6 py-3 text-[16px] font-medium leading-4 truncate text-[#4A5D58] text-left border-b bg-gray-50">
            {name}
        </th>
    )
}