import Layout from "../../Layout.jsx";
import {Button, Text} from "@chakra-ui/react";
import {Link as ReactLink, useNavigate} from "react-router-dom";
import {useGetStaffLoanByIdQuery} from "../../../store/features/administration/api.js";
import dayjs from "dayjs";
import {useState, useEffect} from "react";

const ViewStaffPage = () => {
    const queryParams = new URLSearchParams(location.search);
    const staffId = queryParams.get("id");
    const status = queryParams.get("status");
    const [totalRepaymentAmount, setTotalRepaymentAmount] = useState(0);
    const {data, isFetching, error} = useGetStaffLoanByIdQuery(staffId)
    const router = useNavigate()

    const staff = {
        staffDetails: {
            name: "Adekunle Samuel Adebona",
            personalEmail: "adekunle.adebona@gmail.com",
            officialEmail: "adekunle.adebona@gmail.com",
            unit: "Recovery / Recovery Officer 1",
            phoneNumber: "081 123 45678",
            amount: "N30,000,000.00"
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
            <div className="flex justify-between px-0 py-4  pb-2 md:pt-3 overflow-x-auto">
                <div></div>
                <div>
                    <Button variant="primary" onClick={() => router(-1)} bgColor="#00C795" borderRadius="4px"
                            height="37px" size='md' as={ReactLink} w={'109px'}>
                        <Text color="white">Back</Text>
                    </Button>
                </div>
            </div>
            <div className="custom-scroll-bar overflow-auto min-w-full align-middle c-border w-full shadow-xl sm:rounded-lg mt-8 px-20">
                <div className="flex">
                    <div className="w-4/12">
                        <p className="text-[20px] leading-5 text-[#4A5D58] font-[600]"> Staff Details</p>
                        <div className="rounded-[10px] my-6 p-8"
                             style={{border: "1px solid #C9D4D1", background: "#FFF"}}>
                            <div className="pb-4">
                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">Name:</p>
                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[500] pt-2">{data?.data.firstname + " " + data?.data.lastname }</p>
                            </div>
                            <div className="py-4">
                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">Personal Email
                                    Address:</p>
                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[500] pt-2">{data?.data.personalEmail}</p>
                            </div>
                            <div className="py-4">
                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">Official Email
                                    Address:</p>
                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[500] pt-2">{data?.data.officialEmail}</p>
                            </div>
                            <div className="py-4">
                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">Unit/ Designation:</p>
                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[500] pt-2">{staff.staffDetails.unit}</p>
                            </div>
                            <div className="py-4">
                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">Phone Number:</p>
                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[500] pt-2">{data?.data.phoneNumber}</p>
                            </div>
                            <div className="py-4">
                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">Loan Amount:</p>
                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[500] pt-2">{data?.data.loanAmount}</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-8/12 ml-8">
                        <p className="text-[20px] leading-5 text-[#4A5D58] font-[600]">Repayment Schedule</p>
                        <div className="rounded-[10px] my-6 p-8" style={{
                            border: "1px solid #C9D4D1",
                            background: "#FFF",
                            boxShadow: "0px 6px 19px 0px rgba(0, 0, 0, 0.15)"
                        }}>
                            <div>
                                <table className="table-auto md:w-full px-20">
                                    <thead>
                                    <tr>
                                        <th className="px-10 py-3 text-[16px] font-medium leading-4 tracking-wider text-[#4A5D58] text-left border-b bg-gray-50">
                                            Repayment Date
                                        </th>
                                        <th className="px-10 py-3 text-[16px] font-medium leading-4 tracking-wider text-[#4A5D58] text-left border-b text-gray-900 bg-gray-50">
                                            Amount
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                    {
                                        data?.data.repaymentSchedule.map((item, index) => (
                                            <tr key={index}>
                                                <td className="px-10 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <span
                                                    className="text-[16px] leading-5 text-[#4A5D58] font-medium">{dayjs(item.repaymentSchedule).format("YYYY/MM/DD")}</span>
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
                                <p className="text-[16px] pt-8 pl-8 leading-5 text-[#4A5D58] font-[600]">
                                    Total Repayment Amount: {totalRepaymentAmount.toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "NGN"
                                })}
                                </p>
                            </div>

                        </div>
                        <div className="mt-8">
                            <p className="text-[20px] leading-5 text-[#4A5D58] font-[600]">Purpose</p>
                            <div className="rounded-[10px] my-6 p-8" style={{
                                border: "1px solid #C9D4D1",
                                background: "#FFF",
                                boxShadow: "0px 6px 19px 0px rgba(0, 0, 0, 0.15)"
                            }}>
                                <p className="text-[16px] leading-5 text-[#3A3A3A] font-[400]">{data?.data.purpose}</p>
                            </div>
                        </div>
                        {
                            status !== "loan" && (
                                <div className="flex space-x-3 float-right my-8">
                                    <Button variant="primary" bgColor="#00C795" borderRadius="4px" height="37px" size='md' as={ReactLink} w={'180px'}>
                                        <Text color="white">Approve & Disburse</Text>
                                    </Button>
                                    <Button variant="outline" borderColor="#FF0909" marginRight="10px"
                                            border={"1px solid #FF0909"}  borderRadius="4px" height="37px"
                                            size='md' as={ReactLink} w={'109px'}>
                                        <Text color="#FF0909">Decline</Text>
                                    </Button>
                                </div>
                            )
                        }
                    </div>
                </div>

            </div>

        </Layout>
    );
};

export default ViewStaffPage;