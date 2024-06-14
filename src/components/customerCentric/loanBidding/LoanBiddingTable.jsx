import {useState} from "react";
import {LinearProgress, ThemeProvider} from "@mui/material";
import themes from "../../reusables/theme.jsx";
import LoanBiddingModal from "./LoanBiddingModal.jsx";
import {useGetAllLoanBiddingQuery} from "../../../store/features/customerCentric/api.js";
import Pagination from "../../reusables/Pagination.jsx";
import dayjs from "dayjs";
import {formatRepayment} from "../../reusables/formatAmount.js";
import {getPermission} from "../../reusables/getPermission.js";

const LoanBiddingTable = ({searchTerm, dropDown, statusName, startDate, endDate}) => {
    const [page, setPage] = useState(1)
    const [size, setSize] = useState(10)
    const {data, isFetching, error} =  useGetAllLoanBiddingQuery({size, page, dropDown, searchTerm, statusName, startDate, endDate})
    if (error) return <p>Network error</p>

    const handlePageChange = (newPage) => {
        setPage(newPage)
    }

    const handleRowPerPageChange = (event) => {
        setSize(parseInt(event.target.value, 10));
    }

    return (
        <div className="flex rounded-3xl flex-col mt-8">
            <div className="py-2 md:px-2 sm:px-2 inline-block min-w-full align-middle c-border shadow sm:rounded-lg">
                <div className="scroll-container">
                    {isFetching && <ThemeProvider theme={themes}>
                        <LinearProgress color={"waveGreen"}/>
                    </ThemeProvider>}
                    <table className="table-auto md:w-full px-20">
                        <thead>
                        <tr>
                            {header?.map((val, ind) => <TableHeader key={ind + val} name={val}/>)}
                        </tr>
                        </thead>
                        <tbody className="bg-white">
                        {data?.data.length > 0 && data?.data.map((val, ind) => <TableData key={"00" + ind} no={ind + 1}
                                                                                          data={val}/>)}
                        </tbody>
                    </table>
                </div>
                {data && (
                    <Pagination
                        totalCount={data?.recordCount || 0}
                        page={page}
                        rowsPerPage={size}
                        rowsPerPageOptions={[10, 20, 50, 70, 100]}
                        sizes={[10, 20, 50, 70, 100]}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleRowPerPageChange}
                    />
                )}
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
    const [id, setId] = useState(null)
    const permissions = getPermission("Customer Centric", "Loan Bidding");


    const handleOpen = (id) => {
        setId(id)
        setOpen(true)
    }

    return (
        <tr>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{no}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium truncate">{data?.lenderName}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.lenderEmailAddress}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.lenderPhoneNumber}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.biddersName}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.biddersEmailAddress}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.biddersPhoneNumber}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font -medium">&#8358;{formatRepayment(data?.loanAmount)}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.tenor}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span
                    className="text-[16px] leading-5 text-[#4A5D58] font-medium truncate">{dayjs(data.startDate).format("YYYY/MM/DD")}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span
                    className="text-[16px] leading-5 text-[#4A5D58] font-medium truncate">{dayjs(data.endDate).format("YYYY/MM/DD")}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.statusName}</span>
            </td>

            <td className="px-6 py-4 pt-2 text-xs font-medium leading-5 whitespace-no-wrap border-b border-gray-200">
                {permissions.canView && <span
                    className="text-[16px] leading-5 text-[#007BEC] font-medium cursor-pointer"
                    onClick={() => handleOpen(data?.loanOfferId)}>View
                 </span>}
            </td>
            <LoanBiddingModal open={open} setOpen={setOpen} id={id}/>
        </tr>
    )
}