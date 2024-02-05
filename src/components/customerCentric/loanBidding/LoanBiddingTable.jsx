import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import EscrowModal from "../escrow/EscrowModal.jsx";
import {useGetAllCustomerQuery} from "../../../store/features/loanApplication/api.js";
import {LinearProgress, ThemeProvider} from "@mui/material";
import themes from "../../reusables/theme.jsx";
import LoanBiddingModal from "./LoanBiddingModal.jsx";

const LoanBiddingTable = ({searchTerm, dropDown}) => {
    const {data, isFetching, error} =  useGetAllCustomerQuery()
    if (error) return <p>Network error</p>

    const customer = [
        {
            id: 1,
            lenderName: "Adegeshi Dami",
            lenderEmail: "adegeshidami@gmail.com",
            lenderPhoneNumber: "08110239494",
            borrowerName: "Adegeshi Dami",
            borrowerEmailAddress: "adegeshidami@gmail.com",
            borrowerPhoneNumber: "08110239494",
            amount: "N200,000",
            tenor: 12,
            startDate: "09/03/1991",
            endDate: "09/03/1991",
            status: "Pending",
        }, {
            id: 2,
            lenderName: "Adegeshi Dami",
            lenderEmail: "adegeshidami@gmail.com",
            lenderPhoneNumber: "08110221394",
            borrowerName: "Bakare Dami",
            borrowerEmailAddress: "adegeshidami@gmail.com",
            borrowerPhoneNumber: "08110239494",
            amount: "N200,000",
            tenor: 12,
            startDate: "09/03/1991",
            endDate: "09/03/1991",
            status: "Completed",
        }, {
            id: 2,
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
        },
    ]

    const filteredData = customer.filter((item) =>
        item[dropDown].toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (
        <div className="scroll-container flex rounded-3xl flex-col mt-8">
            <div className="py-2 md:px-2 sm:px-2">
                <div className="inline-block min-w-full align-middle c-border shadow sm:rounded-lg">
                    {isFetching && <ThemeProvider theme={themes}>
                        <LinearProgress color={"waveGreen"}/>
                    </ThemeProvider>}
                    <table className="table-auto md:w-full px-40">
                        <thead>
                        <tr>
                            { header?.map((val, ind) => <TableHeader key={ind + val} name={val} />)}
                        </tr>
                        </thead>
                        <tbody className="bg-white">
                        { filteredData?.length > 0 && filteredData?.map((val, ind) => <TableData key={"00" + ind} no={ind + 1} data={val} />) }
                        </tbody>
                    </table>
                    {/*{ data?.data?.length > 0 && <Pagination totalCount={data?.resultCount} getPage={getPage} /> }*/}
                    {/*{ err || data?.data?.length === 0 && <div className='w-full flex align-center'>*/}
                    {/*    <div className="m-auto py-5">*/}
                    {/*        <Image src={'../img/no-data.svg'} width="150" height="150" alt="no data" />*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*}*/}
                </div>
            </div>
        </div>
    );
};

export default LoanBiddingTable;

export function TableHeader({name}) {
    return (
        <th className="px-6 py-3 text-[16px] font-medium leading-4 text-[#4A5D58] truncate text-left border-b bg-gray-50">
            {name}
        </th>
    )
}

const header = ['S/N', 'Lender Name', 'Lender Email Address', 'Lender Phone Number', 'Borrower Name', 'Borrower Email Address', 'Borrower Phone Number', 'Amount', 'Tenor', 'Start Date', 'End Date', 'Status', 'Actions' ]
export function TableData({data, no}) {
    const [open, setOpen] = useState(false)

    return (
        <tr>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{no}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium truncate">{data?.lenderName}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.lenderEmail}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.lenderPhoneNumber}</span>
            </td><td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
            <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.borrowerName}</span>
        </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.borrowerEmailAddress}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.borrowerPhoneNumber}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font -medium">{data?.amount}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.tenor}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.startDate}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.endDate}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.status}</span>
            </td>

            <td className="px-6 py-4 pt-2 text-xs font-medium leading-5 whitespace-no-wrap border-b border-gray-200">
                 <span
                     className="text-[16px] leading-5 text-[#007BEC] font-medium cursor-pointer"
                     onClick={() => setOpen(true)}>View
                 </span>
            </td>
            <LoanBiddingModal open={open} setOpen={setOpen}/>
        </tr>
    )
}