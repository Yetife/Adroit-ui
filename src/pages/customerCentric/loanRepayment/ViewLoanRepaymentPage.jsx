import {Link as ReactLink, useNavigate} from "react-router-dom";
import {useState} from "react";
import Layout from "../../Layout.jsx";
import {Button, Text} from "@chakra-ui/react";
import {TableHeader} from "../fixedDeposit/ViewFixedDepositPage.jsx";
import dayjs from "dayjs";
import SavingsHistoryModal from "../../../components/customerCentric/savings/SavingsHistoryModal.jsx";
import LoanRepaymentModal from "../../../components/customerCentric/loanRepayment/LoanRepaymentModal.jsx";

const ViewLoanRepaymentPage = () => {
    const router = useNavigate();
    const [open, setOpen] = useState(false)

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
                    <p className="text-[20px] leading-5 text-[#4A5D58] font-[600]">Savings</p>
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
                                    details.deposit.map((item, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <span
                                                    className="text-[16px] leading-5 text-[#4A5D58] font-medium">{index + 1}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <span
                                                    className="text-[16px] leading-5 text-[#4A5D58] font-medium">{item.amount}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <span
                                                    className="text-[16px] leading-5 text-[#4A5D58] font-medium">{item.tenor}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <span
                                                    className="text-[16px] leading-5 text-[#4A5D58] font-medium">{item.status}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <span
                                                    className="text-[16px] leading-5 text-[#4A5D58] font-medium">{item.debit}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <span
                                                    className="text-[16px] leading-5 text-[#4A5D58] font-medium">{item.startDate}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <span
                                                    className="text-[16px] leading-5 text-[#4A5D58] font-medium">{item.endDate}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <span
                                                    className="text-[16px] leading-5 text-[#4A5D58] font-medium">{dayjs(item.transDate).format("YYYY/MM/DD")}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <span onClick={() => setOpen(true)}
                                                      className={`text-[16px] leading-5 font-[inter] ${item.status === "Failed" || item.status === "Overdue" ? 'text-[#007BEC] cursor-pointer' : 'text-[#4A5D58] italic font-[300]'}  font-medium`}>{item.status === "Failed" || item.status === "Overdue"  ? "View" : "No action"}</span>
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
            <LoanRepaymentModal open={open} setOpen={setOpen}/>
        </Layout>
    )
};

export default ViewLoanRepaymentPage;