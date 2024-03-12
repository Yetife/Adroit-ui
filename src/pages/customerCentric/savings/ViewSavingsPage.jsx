import {Link as ReactLink, useNavigate} from "react-router-dom";
import {useState} from "react";
import Layout from "../../Layout.jsx";
import {Button, Text} from "@chakra-ui/react";
import dayjs from "dayjs";
import {TableHeader} from "../fixedDeposit/ViewFixedDepositPage.jsx";
import SavingsHistoryModal from "../../../components/customerCentric/savings/SavingsHistoryModal.jsx";
import {formatAmount} from "../../../components/reusables/formatAmount.js";
import {useGetSavingsByIdQuery} from "../../../store/features/customerCentric/api.js";
import {CircularProgress, ThemeProvider} from "@mui/material";
import themes from "../../../components/reusables/theme.jsx";

const ViewSavingsPage = () => {
    const router = useNavigate();
    const [open, setOpen] = useState(false)
    const queryParams = new URLSearchParams(location.search);
    const custId = queryParams.get("id");
    const {data, isFetching, error} =  useGetSavingsByIdQuery(custId)

    const header = ['S/N', 'Purpose', 'Tenor', 'Start Date', 'End Date', 'Amount', 'Target Amount','Email Notification', 'Sms Notification', 'Transaction Date', 'Status', 'Actions' ]

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
                                <Button variant="outline" borderColor="#00C795" marginRight="10px"
                                        border={"2px solid #00C795"} borderRadius="4px" onClick={() => router(-1)}
                                        height="37px" size='md' as={ReactLink} w={'109px'}>
                                    <Text color="#00C795">Back</Text>
                                </Button>
                            </div>
                        </div>
                        <div
                            className="custom-scroll-bar min-w-full align-middle c-border w-full shadow-xl overflow-auto sm:rounded-lg mt-4 px-6">
                            <div>
                                <p className="text-[20px] leading-5 text-[#4A5D58] font-[600]">Savings</p>
                                <div className="rounded-[5px] my-6 p-8 scroll-container"
                                     style={{border: "1px solid #C9D4D1", background: "#FFF"}}>
                                    <div className="flex space-x-12">
                                        <div>
                                            <p className="text-[15px] font-[inter] leading-5 text-[#4A5D58] font-[600]">Name</p>
                                            <p className="text-[15px] font-[inter] leading-5 text-[#4A5D58] font-[500]">{data?.data.fullName}</p>
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
                                <p className="text-[20px] leading-5 text-[#4A5D58] font-[600]">Savings</p>
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
                                                    className="text-[16px] leading-5 text-[#4A5D58] font-medium">{item.purpose}</span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <span
                                                    className="text-[16px] leading-5 text-[#4A5D58] font-medium">{item.savingsFrequencyId}</span>
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
                                                    className="text-[16px] leading-5 text-[#4A5D58] font-medium">&#8358;{formatAmount(item.amount)}</span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <span
                                                    className="text-[16px] leading-5 text-[#4A5D58] font-medium">&#8358;{formatAmount(item.targetAmount)}</span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <span
                                                    className="text-[16px] leading-5 text-[#4A5D58] font-medium capitalize">{item.enableEmailNotification.toString()}</span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <span
                                                    className="text-[16px] leading-5 text-[#4A5D58] font-medium capitalize">{item.enableSmsNotification.toString()}</span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <span
                                                    className="text-[16px] leading-5 text-[#4A5D58] font-medium">{dayjs(item.dateCreated).format("YYYY/MM/DD")}</span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <span
                                                    className="text-[16px] leading-5 text-[#4A5D58] font-medium">{item.isActive ? "Active" : "Inactive"}</span>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <span onClick={() => setOpen(true)}
                                                      className={`text-[16px] leading-5 font-[inter] text-[#007BEC] cursor-pointer font-medium`}>View</span>
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
                    </div>
                }
            </div>

            <SavingsHistoryModal open={open} setOpen={setOpen}/>
        </Layout>
    )
};

export default ViewSavingsPage;