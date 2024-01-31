import React, {useState} from 'react';
import * as Dialog from "@radix-ui/react-dialog";
import {Button, Text} from "@chakra-ui/react";
import {Link as ReactLink} from "react-router-dom";
import {Close} from "@mui/icons-material";
import dayjs from "dayjs";

const LoanBiddingModal = ({open, setOpen}) => {
    const details = {
            lenderName: "Olakunle Dami",
            lenderEmail: "olageshidami@gmail.com",
            lenderPhoneNumber: "08110239494",
            borrowerName: "Adegeshi Dami",
            borrowerEmailAddress: "adegeshidami@gmail.com",
            borrowerPhoneNumber: "08110239494",
            amount: "N200,000",
            tenor: 12,
            startDate: "09/03/1991",
            endDate: "09/03/1991",
            status: "Pending",
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
        }

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
                    <Dialog.Content className="data-[state=open]:animate-contentShow z-[200] fixed top-[40%] left-[50%] max-h-[85vh] w-[90vw] max-w-[650px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white px-[45px] py-[40px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                        <Dialog.Title className="text-[24px] text-[#343434] font-bold -mt-8">Loan Bidding</Dialog.Title>
                        {/*<Divider className="pt-4"/>*/}
                        <div className="flex mt-4 space-x-6">
                            <div>
                                <div className="rounded-[5px] p-4"
                                     style={{border: "1px solid #C9D4D1", background: "#FFF"}}>
                                    <p className="text-[14px] leading-5 text-[#007970] font-[600]">Lender Details</p>
                                    <div className="flex space-x-4">
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-[500]">Name:</p>
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-[500]">{details.lenderName}</p>
                                    </div>
                                    <div className="flex space-x-4">
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-[500]">Email
                                            Address:</p>
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-[500]">{details.lenderEmail}</p>
                                    </div>
                                    <div className="flex space-x-4">
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-[500]">Phone
                                            Number:</p>
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-[500]">{details.lenderPhoneNumber}</p>
                                    </div>
                                </div>
                                <div className="rounded-[5px] my-3 p-4"
                                     style={{border: "1px solid #C9D4D1", background: "#FFF"}}>
                                    <p className="text-[14px] leading-5 text-[#007970] font-[600]">Borrower Details</p>
                                    <div className="flex space-x-4">
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-[500]">Name:</p>
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-[500]">{details.borrowerName}</p>
                                    </div>
                                    <div className="flex space-x-4">
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-[500]">Email Address:</p>
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-[500]">{details.borrowerEmailAddress}</p>
                                    </div>
                                    <div className="flex space-x-4">
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-[500]">Phone Number:</p>
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-[500]">{details.borrowerPhoneNumber}</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="mt-4">
                                    <div className="flex space-x-4">
                                        <p className="text-[13px] font-[inter] leading-5 text-[#007970] font-[500]">Tenor:</p>
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-[500]">{details.tenor}</p>
                                    </div>
                                    <div className="flex space-x-4">
                                        <p className="text-[13px] font-[inter] leading-5 text-[#007970] font-[500]">Start
                                            Date:</p>
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-[500]">{details.startDate}</p>
                                    </div>
                                    <div className="flex space-x-4">
                                        <p className="text-[13px] font-[inter] leading-5 text-[#007970] font-[600]">End
                                            Date:</p>
                                        <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-[500]">{details.endDate}</p>
                                    </div>
                                </div>
                                <div  className="rounded-[5px] my-3 p-2 scroll-container"
                                      style={{border: "1px solid #C9D4D1", background: "#FFF"}}>
                                    <table className="table-auto">
                                        <thead>
                                        <tr>
                                            <th className="py-2 px-3 text-[13px] font-medium leading-4 text-[#007970] text-left border-b">
                                                Repayment Date
                                            </th>
                                            <th className="py-2 px-3 text-[13px] font-medium leading-4 text-[#007970] text-left border-b">
                                                Amount
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody className="bg-white">
                                        {
                                            details.repaymentSchedule.map((item, index) => (
                                                <tr key={index}>
                                                    <td className="py-2 px-3 whitespace-no-wrap border-b border-gray-200">
                                                <span
                                                    className="text-[13px] leading-5 text-[#4A5D58] font-medium">{dayjs(item.repaymentSchedule).format("YYYY/MM/DD")}</span>
                                                    </td>
                                                    <td className="py-2 px-3 whitespace-no-wrap border-b border-gray-200">
                                                <span
                                                    className="text-[13px] leading-5 text-[#4A5D58] font-medium">{item.amount}</span>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                        </tbody>
                                    </table>
                                </div>
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

export default LoanBiddingModal;