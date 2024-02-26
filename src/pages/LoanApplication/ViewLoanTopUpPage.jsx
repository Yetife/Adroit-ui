import {useState} from "react";
import {Link as ReactLink, useNavigate} from "react-router-dom";
import Layout from "../Layout.jsx";
import {Button, Text} from "@chakra-ui/react";
import dayjs from "dayjs";
import ApproveTopUpModal from "../../components/loanApplication/loanTopup/ApproveTopUpModal.jsx";
import {useGetLoanTopUpDetailQuery} from "../../store/features/loanApplication/api.js";
import {CircularProgress, ThemeProvider} from "@mui/material";
import themes from "../../components/reusables/theme.jsx";
import {formatAmount} from "../../components/reusables/formatAmount.js";
import DeclineTopUpModal from "../../components/loanApplication/loanTopup/DeclineTopUpModal.jsx";

const ViewLoanTopUpPage = () => {
    const [open, setOpen] = useState(false)
    const [openDec, setOpenDec] = useState(false)
    const queryParams = new URLSearchParams(location.search);
    const appId = queryParams.get("id");
    const {data, isFetching, error} = useGetLoanTopUpDetailQuery(appId)
    const router = useNavigate()
    const status = queryParams.get("status");
    const [comment, setComment] = useState("")
    const handleChange = (e) => {
        setComment(e.target.value)
    };

    const handleOpen = () => {
        setOpen(true)
    }

    return (
        <Layout>
            <div>
                {
                    isFetching ? <ThemeProvider theme={themes}>
                        <CircularProgress color={"waveGreen"} sx={{display: "flex", margin: "auto", justifyContent: "center" }}/>
                    </ThemeProvider> : <div>
                        <div className="flex justify-between px-0 py-4  pb-2 md:pt-3 overflow-auto">
                            <div></div>
                            <div>
                                <Button variant="primary" onClick={() => router('/loanApp/loanTopUp')}
                                        bgColor="#00C795" borderRadius="4px"
                                        height="37px" size='md' as={ReactLink} w={'109px'}>
                                    <Text color="white">Back</Text>
                                </Button>
                            </div>
                        </div>
                        <div
                            className="custom-scroll-bar min-w-full align-middle h-[630px] c-border w-full shadow-xl overflow-auto sm:rounded-lg mt-4 px-12">
                            <div className="flex">
                                <div className="w-6/12">
                                    <p className="text-[20px] leading-5 text-[#4A5D58] font-[600]">Customer Details</p>
                                    <div className="rounded-[10px] my-6 p-8"
                                         style={{border: "1px solid #C9D4D1", background: "#FFF"}}>
                                        <div className="flex space-x-8">
                                            <div className="pb-6">
                                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">Name</p>
                                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[500] pt-2">{data?.data?.cusDetail?.firstName + " " + data?.data?.cusDetail?.lastName}</p>
                                            </div>
                                            <div className="pb-4">
                                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">D.O.B</p>
                                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[500] pt-2">{data?.data?.cusDetail?.dateOfBirth}</p>
                                            </div>
                                        </div>

                                        <div className="py-6">
                                            <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">Email
                                                Address</p>
                                            <p className="text-[16px] leading-5 text-[#4A5D58] font-[500] pt-2">{data?.data?.cusDetail?.emailAddress}</p>
                                        </div>
                                        <div className="flex  space-x-8 py-6">
                                            <div>
                                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">Phone
                                                    Number</p>
                                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[500] pt-2">{data?.data?.cusDetail?.phoneNumber}</p>
                                            </div>
                                            <div>
                                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">BVN</p>
                                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[500] pt-2">{data?.data?.cusDetail?.bvn}</p>
                                            </div>
                                            <div>
                                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">Status</p>
                                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[500] pt-2">{data?.data?.cusDetail?.status}</p>
                                            </div>
                                        </div>
                                        <div className="flex  space-x-8 py-6">
                                            <div>
                                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">Initial
                                                    Loan Amount</p>
                                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[500] pt-2">&#8358;{formatAmount(data?.data?.cusDetail?.initialLoanAmount)}</p>
                                            </div>
                                            <div>
                                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">Top-up Amount</p>
                                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[500] pt-2">&#8358;{formatAmount(data?.data?.cusDetail?.topUpAmount)}</p>
                                            </div>
                                        </div>
                                        <div className="flex  space-x-8 py-6">
                                            <div>
                                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] truncate">New
                                                    Loan Amount</p>
                                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[500] pt-2">&#8358;{formatAmount(data?.data?.cusDetail?.newLoanAmount)}</p>
                                            </div>
                                            <div>
                                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">Tenor</p>
                                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[500] pt-2">{data?.data?.cusDetail?.tenor}</p>
                                            </div>
                                            <div>
                                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] truncate">Date
                                                    Submitted</p>
                                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[500] pt-2">{dayjs(data?.data?.cusDetail?.dateSubmitted).format("YYYY/MM/DD")}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-6/12 ml-8 mt-8">
                                    <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">Repayment
                                        Schedule</p>
                                    <div className="scroll-container h-[300px] rounded-[10px] my-3 p-8" style={{
                                        border: "1px solid #C9D4D1",
                                        background: "#FFF",
                                        boxShadow: "0px 6px 19px 0px rgba(0, 0, 0, 0.15)"
                                    }}>
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
                                                    data?.data?.repaymentSchedule.map((item, index) => (
                                                        <tr key={index}>
                                                            <td className="px-10 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <span
                                                    className="text-[16px] leading-5 text-[#4A5D58] font-medium">{dayjs(item?.monthlyRepaymentDate).format("YYYY/MM/DD")}</span>
                                                            </td>
                                                            <td className="px-10 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <span
                                                    className="text-[16px] leading-5 text-[#4A5D58] font-medium">&#8358;{formatAmount(item?.monthlyRepaymentAmount)}</span>
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
                                                  value={status === "view" ? "" : comment}
                                                  disabled={status === "view"}
                                                  onChange={handleChange}
                                                  placeholder="Add comment"
                                                  className="font-medium w-full text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                        ></textarea>
                                    </div>
                                    {
                                        status !== "view" ? (
                                            <div className="flex space-x-3 float-right my-8">
                                                <Button variant="primary" bgColor="#00C795" borderRadius="4px"
                                                        height="37px" size='md' as={ReactLink} w={'109px'}
                                                        onClick={handleOpen}>
                                                    <Text color="white">Approve</Text>
                                                </Button>
                                                <Button variant="outline" borderColor="#FF0909" marginRight="10px"
                                                        border={"1px solid #FF0909"} borderRadius="4px" height="37px"
                                                        size='md' as={ReactLink} w={'109px'}
                                                        onClick={() => setOpenDec(true)}>
                                                    <Text color="#FF0909">Decline</Text>
                                                </Button>
                                            </div>
                                        ) : <div className="flex space-x-3 float-right my-8">
                                            <Button variant="primary" onClick={() => router(-1)} bgColor="#384642"
                                                    borderRadius="4px"
                                                    height="37px" size='md' as={ReactLink} w={'109px'}>
                                                <Text color="white">Close</Text>
                                            </Button>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <ApproveTopUpModal open={open} setOpen={setOpen} />
            <DeclineTopUpModal open={openDec} setOpen={setOpenDec}/>
        </Layout>
    );
};

export default ViewLoanTopUpPage;