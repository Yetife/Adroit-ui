import * as Dialog from "@radix-ui/react-dialog";
import {Close} from "@mui/icons-material";
import dayjs from "dayjs";
import {useGetLoanBiddingByIdQuery, useUpdateRepaymentMutation} from "../../../store/features/customerCentric/api.js";
import {useDispatch} from "react-redux";
import {updateSnackbar} from "../../../store/snackbar/reducer.js";
import {CircularProgress, ThemeProvider} from "@mui/material";
import themes from "../../reusables/theme.jsx";
import {useEffect, useState} from "react";

const LoanBiddingModal = ({open, setOpen, id}) => {
    const {data, isFetching, error} =  useGetLoanBiddingByIdQuery(id)
    const [totalRepaymentAmount, setTotalRepaymentAmount] = useState(0);

    function formatRepayment(amount) {
        const number = parseFloat(amount);
        if (isNaN(number)) {
            return '';
        }
        const formattedNumber = number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return formattedNumber;
    }

    const calculateTotal = (amountArray) => {
        const total = amountArray.reduce((acc, amount) => acc + amount, 0);
        return total;
    };

    useEffect(() => {
        if (data && data?.data?.biddersRepaymentSchedule) {
            const total = calculateTotal(
                data?.data?.biddersRepaymentSchedule.map(item => {
                    const amountString = String(item.monthlyLoanRepaymentAmount); // Ensure it's a string
                    const amountValue = parseFloat(amountString.replace("N", "").replace(/,/g, ""));
                    return isNaN(amountValue) ? 0 : amountValue; // Handle non-numeric values
                })
            );
            setTotalRepaymentAmount(total);
        }
    }, [data]);

    return (
        <div>
            <Dialog.Root
                open={Boolean(open)}
                onOpenChange={(open) => {
                    !open && setOpen(undefined);
                }}
            >
                <Dialog.Portal>
                    <Dialog.Overlay className="bg-black bg-opacity-20 z-[100] data-[state=open]:animate-overlayShow fixed inset-0" />
                    <Dialog.Content className="data-[state=open]:animate-contentShow z-[200] fixed top-[40%] left-[50%] max-h-[85vh] w-[90vw] max-w-[780px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white px-[45px] pt-[40px] pb-[20px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                        <Dialog.Title className="text-[24px] text-[#343434] font-bold -mt-8">Loan Bidding</Dialog.Title>
                        {/*<Divider className="pt-4"/>*/}
                        <div>
                            {
                                isFetching ? <ThemeProvider theme={themes}>
                                        <CircularProgress color={"waveGreen"}
                                                          sx={{display: "flex", margin: "auto", justifyContent: "center"}}/>
                                    </ThemeProvider> : <div className="flex mt-4 space-x-6">
                                        <div>
                                            <div className="rounded-[5px] px-4 py-2"
                                                 style={{border: "1px solid #C9D4D1", background: "#FFF"}}>
                                                <p className="text-[14px] leading-5 text-[#007970] font-[600]">Lender
                                                    Details</p>
                                                <div className="flex space-x-4 py-1">
                                                    <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-[500]">Name:</p>
                                                    <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-[500] capitalize">{data?.data.lenderName}</p>
                                                </div>
                                                <div className="flex py-1">
                                                    <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-[500]">Email
                                                        Address:</p>
                                                    <p className="text-[13px] pl-2 font-[inter] leading-5 text-[#4A5D58] font-[500]">{data?.data.lenderEmailAddress}</p>
                                                </div>
                                                <div className="flex space-x-4 py-1">
                                                    <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-[500]">Phone
                                                        Number:</p>
                                                    <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-[500]">{data?.data.lenderPhoneNumber}</p>
                                                </div>
                                            </div>
                                            <div className="rounded-[5px] my-3 px-4 py-2"
                                                 style={{border: "1px solid #C9D4D1", background: "#FFF"}}>
                                                <p className="text-[14px] leading-5 text-[#007970] font-[600]">Borrower
                                                    Details</p>
                                                <div className="flex space-x-4 py-1">
                                                    <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-[500]">Name:</p>
                                                    <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-[500] capitalize">{data?.data.biddersName}</p>
                                                </div>
                                                <div className="flex py-1">
                                                    <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-[500]">Email
                                                        Address:</p>
                                                    <p className="text-[13px] font-[inter] pl-2 leading-5 text-[#4A5D58] font-[500]">{data?.data.biddersEmailAddress}</p>
                                                </div>
                                                <div className="flex space-x-4 py-1">
                                                    <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-[500]">Phone
                                                        Number:</p>
                                                    <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-[500]">{data?.data.biddersPhoneNumber}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="mt-2 flex justify-between">
                                                <div>
                                                    <div className="flex space-x-4 py-1">
                                                        <p className="text-[12px] font-[inter] leading-5 text-[#007970] font-[500]">Tenor:</p>
                                                        <p className="text-[12px] font-[inter] leading-5 text-[#4A5D58] font-[500]">{data?.data.tenor}</p>
                                                    </div>
                                                    <div className="flex space-x-4 py-1">
                                                        <p className="text-[12px] font-[inter] leading-5 text-[#007970] font-[500]">Start
                                                            Date:</p>
                                                        <p className="text-[12px] font-[inter] leading-5 text-[#4A5D58] font-[500]">{dayjs(data?.data.startDate).format("YYYY/MM/DD")}</p>
                                                    </div>
                                                    <div className="flex space-x-4 py-1">
                                                        <p className="text-[12px] font-[inter] leading-5 text-[#007970] font-[600]">End
                                                            Date:</p>
                                                        <p className="text-[12px] font-[inter] leading-5 text-[#4A5D58] font-[500]">{dayjs(data?.data.endDate).format("YYYY/MM/DD")}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[12px] font-[inter] leading-5 text-[#007970] font-[600]">Date
                                                        Requested:</p>
                                                    <p className="text-[12px] font-[inter] leading-5 text-[#4A5D58] font-[500]">{dayjs(data?.data.dateCreated).format('YYYY-MM-DD HH:mm:ss')}</p>
                                                </div>
                                            </div>
                                            <div
                                                className="custom-scroll-bar overflow-auto max-h-[10rem] rounded-[5px] my-3 p-2"
                                                style={{
                                                    border: "1px solid #C9D4D1",
                                                    background: "#FFF",
                                                    boxShadow: "0px 6px 19px 0px rgba(0, 0, 0, 0.15)"
                                                }}>
                                                <table className="scroll-container table-auto">
                                                    <thead>
                                                    <tr>
                                                        <th className="py-1 px-3 text-[12px] font-medium leading-4 text-[#007970] text-left border-b truncate">
                                                            Repayment Date
                                                        </th>
                                                        <th className="py-1 px-3 text-[12px] font-medium leading-4 text-[#007970] text-left border-b">
                                                            Amount
                                                        </th>
                                                        <th className="py-1 px-3 text-[12px] font-medium leading-4 text-[#007970] text-left border-b truncate">
                                                            Repayment Status
                                                        </th>
                                                    </tr>
                                                    </thead>
                                                    <tbody className="bg-white">
                                                    {
                                                        data?.data?.biddersRepaymentSchedule?.length && data?.data?.biddersRepaymentSchedule.map((item, index) => (
                                                            <tr key={index}>
                                                                <td className="py-1 px-3 whitespace-no-wrap border-b border-gray-200">
                                                                    <span
                                                                        className="text-[12px] leading-5 text-[#4A5D58] font-medium">{dayjs(item?.actualRepaymentDate).format("YYYY/MM/DD")}</span>
                                                                </td>
                                                                <td className="py-1 px-3 whitespace-no-wrap border-b border-gray-200">
                                                                    <span
                                                                        className="text-[12px] leading-5 text-[#4A5D58] font-medium">&#8358;{formatRepayment(item?.monthlyLoanRepaymentAmount)}</span>
                                                                </td>
                                                                <td className="py-1 px-3 whitespace-no-wrap border-b border-gray-200">
                                                                    <span
                                                                        className="text-[12px] leading-5 text-[#4A5D58] font-medium">{item?.isRecovered ? "Recovered" : "Pending"}</span>
                                                                </td>

                                                            </tr>
                                                        ))
                                                    }
                                                    </tbody>
                                                </table>
                                                <p className="text-[14px] pt-3 pl-2 leading-5 text-[#4A5D58] font-[600]">
                                                    Total Repayment
                                                    Amount: {totalRepaymentAmount.toLocaleString("en-US", {
                                                    style: "currency",
                                                    currency: "NGN"
                                                })}
                                                </p>
                                            </div>
                                        </div>
                                </div>
                            }
                        </div>
                        <Dialog.Close asChild>
                            <button
                                className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[20px] right-[40px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                                aria-label="Close"
                            >
                                <Close/>
                            </button>
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    );
};

export default LoanBiddingModal;