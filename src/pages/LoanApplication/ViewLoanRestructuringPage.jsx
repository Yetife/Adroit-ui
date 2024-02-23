import {useEffect, useState} from "react";
import {useGetStaffLoanByIdQuery} from "../../store/features/administration/api.js";
import {Link as ReactLink, useNavigate} from "react-router-dom";
import Layout from "../Layout.jsx";
import {Button, Text} from "@chakra-ui/react";
import dayjs from "dayjs";
import ApproveLoanModal from "../../components/loanApplication/loanRestructuring/ApproveLoanModal.jsx";
import DeclineModal from "../../components/loanApplication/loanRestructuring/DeclineModal.jsx";

const ViewLoanRestructuringPage = () => {
    const [open, setOpen] = useState(false)
    const [openDec, setOpenDec] = useState(false)
    const queryParams = new URLSearchParams(location.search);
    const staffId = queryParams.get("id");
    const [totalRepaymentAmount, setTotalRepaymentAmount] = useState(0);
    const {data, isFetching, error} = useGetStaffLoanByIdQuery(staffId)
    const router = useNavigate()
    const status = queryParams.get("status");
    const [comment, setComment] = useState("")

    const handleChange = (e) => {
        setComment(e.target.value)
    };

    const handleOpen = () => {
        setOpen(true)
    }

    const staff = {
        staffDetails: {
            name: "Adekunle Samuel Adebona",
            personalEmail: "adekunle.adebona@gmail.com",
            officialEmail: "adekunle.adebona@gmail.com",
            unit: "Recovery / Recovery Officer 1",
            phoneNumber: "081 123 45678",
            amount: "N30,000,000.00",
            dateOfBirth: "Aug 2, 2003",
            bvn: "012345678",
            initialTenor: 6,
            newTenor: 3,
            dateSubmitted: "01/08/2023"
        },
        repaymentSchedule: [
            {
                date: "Aug 2, 2023",
                amount: "N50,000.00"
            },{
                date: "Aug 2, 2023",
                amount: "N50,000.00"
            },{
                date: "Aug 2, 2023",
                amount: "N50,000.00"
            },
        ],
        purpose: "Lorem ipsum dolor sit amet consectetur. Eu volutpat pharetra lobortis viverra." +
            "Lorem ipsum dolor sit amet consectetur. Eu volutpat pharetra lobortis viverra.Lorem ipsum dolor sit amet consectetur. " +
            "Eu volutpat pharetra lobortis viverra."
    }
    const calculateTotal = (amountArray) => {
        const total = amountArray.reduce((acc, amount) => acc + amount, 0);
        return total;
    };

    useEffect(() => {
        if (data && data.data.repaymentSchedule) {
            const total = calculateTotal(
                data.data.repaymentSchedule.map(item => {
                    const amountString = String(item.amount); // Ensure it's a string
                    const amountValue = parseFloat(amountString.replace("N", "").replace(/,/g, ""));
                    return isNaN(amountValue) ? 0 : amountValue; // Handle non-numeric values
                })
            );
            setTotalRepaymentAmount(total);
        }
    }, [data]);

    return (
        <Layout>
            <div className="flex justify-between px-0 py-4  pb-2 md:pt-3 overflow-auto">
                <div></div>
                <div>
                    <Button variant="primary" onClick={() => router('/loanApp/loanRestructuring')} bgColor="#00C795" borderRadius="4px"
                            height="37px" size='md' as={ReactLink} w={'109px'}>
                        <Text color="white">Back</Text>
                    </Button>
                </div>
            </div>
            <div className="custom-scroll-bar min-w-full align-middle h-[630px] c-border w-full shadow-xl overflow-auto sm:rounded-lg mt-4 px-20">
                <div className="flex">
                    <div className="w-5/12">
                        <p className="text-[20px] leading-5 text-[#4A5D58] font-[600]">Customer Details</p>
                        <div className="rounded-[10px] my-6 p-8" style={{border: "1px solid #C9D4D1", background: "#FFF"}}>
                            <div className="flex justify-between">
                                <div className="pb-6">
                                    <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">Name</p>
                                    <p className="text-[16px] leading-5 text-[#4A5D58] font-[500] pt-2">{staff.staffDetails.name}</p>
                                </div>
                                <div className="pb-4">
                                    <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">D.O.B</p>
                                    <p className="text-[16px] leading-5 text-[#4A5D58] font-[500] pt-2">{staff.staffDetails.dateOfBirth}</p>
                                </div>
                            </div>

                            <div className="py-6">
                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">Email Address</p>
                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[500] pt-2">{staff.staffDetails.personalEmail}</p>
                            </div>
                            <div className="flex justify-between py-6">
                                <div>
                                    <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">Phone Number</p>
                                    <p className="text-[16px] leading-5 text-[#4A5D58] font-[500] pt-2">{staff.staffDetails.phoneNumber}</p>
                                </div>
                                <div>
                                    <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">BVN</p>
                                    <p className="text-[16px] leading-5 text-[#4A5D58] font-[500] pt-2">{staff.staffDetails.bvn}</p>
                                </div>
                            </div>
                            <div className="flex justify-between py-6">
                                <div>
                                    <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">Initial Loan Tenor</p>
                                    <p className="text-[16px] leading-5 text-[#4A5D58] font-[500] pt-2">{staff.staffDetails.initialTenor}</p>
                                </div>
                                <div>
                                    <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">New Tenor</p>
                                    <p className="text-[16px] leading-5 text-[#4A5D58] font-[500] pt-2">{staff.staffDetails.newTenor}</p>
                                </div>
                            </div>
                            <div className="py-6">
                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">Date Submitted</p>
                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[500] pt-2">{staff.staffDetails.dateSubmitted}</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-7/12 ml-8 mt-8">
                        <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">Repayment Schedule</p>
                        <div className="rounded-[10px] my-3 p-8" style={{
                            border: "1px solid #C9D4D1",
                            background: "#FFF",
                            boxShadow: "0px 6px 19px 0px rgba(0, 0, 0, 0.15)"}}>
                            <div>
                                <table className="table-auto md:w-full px-20">
                                    <thead>
                                    <tr>
                                        <th className="px-10 py-3 text-[16px] font-medium leading-4 tracking-wider text-[#4A5D58] truncate text-left border-b bg-gray-50">
                                            Repayment Date
                                        </th>
                                        <th className="px-10 py-3 text-[16px] font-medium leading-4 tracking-wider text-[#4A5D58] text-left border-b truncate bg-gray-50">
                                            Amount
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                    {
                                        staff.repaymentSchedule.map((item, index) => (
                                            <tr key={index}>
                                                <td className="px-10 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <span
                                                    className="text-[16px] leading-5 text-[#4A5D58] font-medium">{dayjs(item.date).format("YYYY/MM/DD")}</span>
                                                </td>
                                                <td className="px-10 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <span
                                                    className="text-[16px] leading-5 text-[#4A5D58] font-medium">{item.amount}</span>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="mt-8">
                            <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pb-3">Comment</p>
                            <textarea id="message" name="message" rows="4" cols="50"
                                      value={comment}
                                      disabled={status === "view"}
                                      onChange={handleChange}
                                      placeholder="Add comment"
                                      className="font-medium w-full text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                            ></textarea>
                        </div>
                        {
                            status !== "view" ? (
                                <div className="flex space-x-3 float-right my-8">
                                    <Button variant="primary" bgColor="#00C795" borderRadius="4px" height="37px" size='md' as={ReactLink} w={'109px'} onClick={handleOpen}>
                                        <Text color="white">Approve</Text>
                                    </Button>
                                    <Button variant="outline" borderColor="#FF0909" marginRight="10px"
                                            border={"1px solid #FF0909"}  borderRadius="4px" height="37px"
                                            size='md' as={ReactLink} w={'109px'} onClick={()=>setOpenDec(true)}>
                                        <Text color="#FF0909">Decline</Text>
                                    </Button>
                                </div>
                            ) : <div className="flex space-x-3 float-right my-8">
                                <Button variant="primary" onClick={() => router(-1)} bgColor="#384642" borderRadius="4px"
                                        height="37px" size='md' as={ReactLink} w={'109px'}>
                                    <Text color="white">Close</Text>
                                </Button>
                            </div>
                        }
                    </div>
                </div>

            </div>
            <ApproveLoanModal open={open} setOpen={setOpen} />
            <DeclineModal open={openDec} setOpen={setOpenDec}/>
        </Layout>
    );
};

export default ViewLoanRestructuringPage;