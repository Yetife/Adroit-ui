import {Link as ReactLink, useNavigate} from "react-router-dom";
import {useState} from "react";
import Layout from "../../Layout.jsx";
import {Button, Text} from "@chakra-ui/react";
import {TableHeader} from "../fixedDeposit/ViewFixedDepositPage.jsx";
import dayjs from "dayjs";
import {
    useGetLoanRepaymentByIdQuery
} from "../../../store/features/customerCentric/api.js";
import {formatRepayment} from "../../../components/reusables/formatAmount.js";
import RepaymentScheduleModal from "./RepaymentScheduleModal.jsx";

const ViewLoanRepaymentPage = () => {
    const router = useNavigate();
    const [open, setOpen] = useState(false)
    const queryParams = new URLSearchParams(location.search);
    const custId = queryParams.get("id");
    const [id, setId] = useState(null)
    const [loanId, setLoanId] = useState(null)
    const {data, isFetching, error} =  useGetLoanRepaymentByIdQuery(custId)

    const handleOpen = (id, loanId) =>{
        setId(id)
        setLoanId(loanId)
        setOpen(true)
    }

    const details = {
        name: "Adekunle Adebona Samuel",
        emailAddress: "adekunle.adebona@creditwaveng.com.",
        dob: "09/03/1991",
        bvn: "109031991",
        phoneNumber: "081 123 45678",
        deposit: [
            {
                debit: "True",
                startDate: "09/03/1991",
                endDate: "09/03/1991",
                amount: "20,000.00",
                status: "Failed",
                tenor: 36,
                transDate: "July 21, 2023"
            },{
                debit: "True",
                startDate: "09/03/1991",
                endDate: "09/03/1991",
                amount: "20,000.00",
                status: "Success",
                tenor: 6,
                transDate: "July 21, 2023"
            },{
                debit: "False",
                startDate: "09/03/1991",
                endDate: "09/03/1991",
                amount: "20,000.00",
                status: "Reversed",
                tenor: 12,
                transDate: "July 21, 2023"
            },{
                debit: "True",
                startDate: "09/03/1991",
                endDate: "09/03/1991",
                amount: "20,000.00",
                status: "Overdue",
                tenor: 3,
                transDate: "July 21, 2023"
            },
        ]
    }

    const header = ['S/N', 'Loan Amount', 'Tenor', 'Status', 'Isbank Debit', 'Start Date', 'End Date', 'Transaction Date', 'Actions' ]

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
                    <p className="text-[20px] leading-5 text-[#4A5D58] font-[600]">Loan Repayment</p>
                    <div className="rounded-[5px] my-6 p-8 scroll-container"
                         style={{border: "1px solid #C9D4D1", background: "#FFF"}}>
                        <div className="flex space-x-12">
                            <div>
                                <p className="text-[15px] font-[inter] leading-5 text-[#4A5D58] font-[600]">Name</p>
                                <p className="text-[15px] font-[inter] leading-5 text-[#4A5D58] font-[500] capitalize">{data?.data.fullName}</p>
                            </div>
                            <div>
                                <p className="text-[15px] font-[inter] leading-5 text-[#4A5D58] font-[600]">DOB</p>
                                <p className="text-[15px] font-[inter] leading-5 text-[#4A5D58] font-[500]">{data?.data.dateOfBirth}</p>
                            </div>
                            <div>
                                <p className="text-[15px] font-[inter] leading-5 text-[#4A5D58] font-[600]">Email
                                    Address:</p>
                                <p className="text-[15px] font-[inter] leading-5 text-[#4A5D58] font-[500] truncate">{data?.data.emailAddress}</p>
                            </div>
                            <div>
                                <p className="text-[15px] font-[inter] leading-5 text-[#4A5D58] font-[600]">Phone
                                    number:</p>
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
                    <p className="text-[20px] leading-5 text-[#4A5D58] font-[600]">Loan Repayment</p>
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
                                                <span
                                                    className="text-[16px] leading-5 text-[#4A5D58] font-medium">{index + 1}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <span
                                                    className="text-[16px] leading-5 text-[#4A5D58] font-medium">&#8358;{formatRepayment(item.loanAmount)}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <span
                                                    className="text-[16px] leading-5 text-[#4A5D58] font-medium">{item.tenor}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <span
                                                    className="text-[16px] leading-5 text-[#4A5D58] font-medium">{item.status.toString()}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <span
                                                    className="text-[16px] leading-5 text-[#4A5D58] font-medium">{item.isBankDebit.toString()}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <span
                                                    className="text-[16px] leading-5 text-[#4A5D58] font-medium">{dayjs(item.startDate).format("YYYY/MM/DD")}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <span
                                                    className="text-[16px] leading-5 text-[#4A5D58] font-medium">{dayjs(item.endDate).format("YYYY/MM/DD")}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <span
                                                    className="text-[16px] leading-5 text-[#4A5D58] font-medium">{dayjs(data?.data?.cusDetail?.transactionDate).format("YYYY/MM/DD")}</span>
                                            </td>
                                            {/*<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">*/}
                                            {/*    <span onClick={() => handleOpen(item.loanRepaymentId, item.loanApplicationId)}*/}
                                            {/*          className={`text-[16px] leading-5 font-[inter] truncate ${item.status === "Failed" || item.status === "Overdue" ? 'text-[#007BEC] cursor-pointer' : 'text-[#4A5D58] italic font-[300]'}  font-medium`}>{item.status === "Failed" || item.status === "Overdue"  ? "View" : "No action"}</span>*/}
                                            {/*</td>*/}
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                {!item.status && <span
                                                    onClick={() => handleOpen(item.loanRepaymentId, item.loanApplicationId)}
                                                    className="text-[16px] leading-5 font-[inter] text-[#00C795] truncate cursor-pointer">View</span>}
                                                {item.status && <span
                                                    className="text-[16px] leading-5 font-[inter] truncate cursor-pointer italic">No action</span>}
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
            <RepaymentScheduleModal open={open} setOpen={setOpen} id={id} loanId={loanId} name={data?.data.fullName}/>
        </Layout>
    )
};

export default ViewLoanRepaymentPage;