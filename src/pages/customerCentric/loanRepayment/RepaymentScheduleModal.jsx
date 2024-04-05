import {useEffect, useState} from 'react';
import * as Dialog from "@radix-ui/react-dialog";
import {Button, Text} from "@chakra-ui/react";
import {Link as ReactLink} from "react-router-dom";
import {Close} from "@mui/icons-material";
import dayjs from "dayjs";
import {formatRepayment} from "../../../components/reusables/formatAmount.js";

const RepaymentScheduleModal = ({open, setOpen}) => {
    const [totalRepaymentAmount, setTotalRepaymentAmount] = useState(0);

    const repayment = [
        {
            date: "01/04/2024",
            amount: 20000
        },{
            date: "01/05/2024",
            amount: 20000
        },{
            date: "01/06/2024",
            amount: 20000
        },
        // {
        //     date: "01/07/2024",
        //     amount: 20000
        // },{
        //     date: "01/08/2024",
        //     amount: 20000
        // },{
        //     date: "01/09/2024",
        //     amount: 20000
        // },
    ]

    const calculateTotal = (amountArray) => {
        const total = amountArray.reduce((acc, amount) => acc + amount, 0);
        return total;
    };

    useEffect(() => {
        if (repayment && repayment) {
            const total = calculateTotal(
                repayment.map(item => {
                    const amountString = String(item.amount); // Ensure it's a string
                    const amountValue = parseFloat(amountString.replace("N", "").replace(/,/g, ""));
                    return isNaN(amountValue) ? 0 : amountValue; // Handle non-numeric values
                })
            );
            setTotalRepaymentAmount(total);
        }
    }, [repayment]);
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
                    <Dialog.Content className="data-[state=open]:animate-contentShow z-[200] fixed top-[40%] left-[50%] max-h-[87vh] w-[90vw] max-w-[400px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[45px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                        <Dialog.Title className="text-[24px] text-[#343434] font-bold -mt-8">Repayment Schedule</Dialog.Title>
                        {/*<Divider className="pt-4"/>*/}
                        <div className="mt-6">
                            <div
                                className="custom-scroll-bar overflow-auto  rounded-[5px] my-3 p-3"
                                style={{
                                    border: "1px solid #C9D4D1",
                                    background: "#FFF",
                                    // boxShadow: "0px 6px 19px 0px rgba(0, 0, 0, 0.15)"
                                }}>
                                <table className="scroll-container table-auto">
                                    <thead>
                                    <tr>
                                        <th className="py-1 px-6 text-[14px] font-medium leading-4 text-[#007970]  border-b truncate">
                                            Repayment Date
                                        </th>
                                        <th className="py-1 px-6 text-[14px] font-medium leading-4 text-[#007970] border-b">
                                            Amount
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                    {
                                        repayment?.length && repayment.map((item, index) => (
                                            <tr key={index}>
                                                <td className="py-1 px-6 whitespace-no-wrap border-b border-gray-200">
                                                    <span
                                                        className="text-[14px] leading-5 text-[#4A5D58] font-medium">{dayjs(item?.date).format("YYYY/MM/DD")}</span>
                                                </td>
                                                <td className="py-1 px-6 whitespace-no-wrap border-b border-gray-200">
                                                    <span
                                                        className="text-[14px] leading-5 text-[#4A5D58] font-medium">&#8358;{formatRepayment(item?.amount)}</span>
                                                </td>


                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </table>
                                <p className="text-[16px] pt-3 pl-2 leading-5 text-[#4A5D58] font-[700]">
                                    Total Amount: &#8358;{totalRepaymentAmount.toLocaleString("en-US", {
                                    // style: "currency",
                                    // currency: "NGN"
                                })}
                                </p>
                            </div>
                            <div className="flex tw-items-center m-auto tw-text-center mt-10">
                                <Button className="ml-2" variant="primary" bgColor="#00C795" borderRadius="4px"
                                        height="50px" size='md' as={ReactLink} w={'290px'}>
                                    <Text color="white">Debit Customer Account Now</Text>
                                </Button>
                            </div>
                            <div className="flex tw-items-center m-auto tw-text-center mt-4">
                                <Button className="ml-2" variant="outline" borderColor="#135D54" marginRight="10px"
                                        border={"1px solid #135D54"} borderRadius="4px" onClick={() => setOpen(!open)}
                                        height="50px" size='md' as={ReactLink} w={'290px'}>
                                    <Text color="#135D54">Close</Text>
                                </Button>
                            </div>
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

export default RepaymentScheduleModal;