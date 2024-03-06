import {useState} from "react";
import {LinearProgress, ThemeProvider} from "@mui/material";
import themes from "../../../reusables/theme.jsx";
import {
    useGetAllDisbursedDisbursementQuery,
} from "../../../../store/features/bridgeLoan/api.js";
import Pagination from "../../../reusables/Pagination.jsx";
import {formatAmount} from "../../../reusables/formatAmount.js";
import dayjs from "dayjs";

export const DisbursedTable = ({searchTerm, startDate, bvn}) => {
    const [page, setPage] = useState(1)
    const [size, setSize] = useState(10)
    const {data, isFetching, error} =  useGetAllDisbursedDisbursementQuery({size, page, startDate, bvn})
    if (error) return <p>Network error</p>

    const filterData = (item) => {
        for (const key in item) {
            if (item[key]?.toString().toLowerCase().includes(searchTerm.toLowerCase())) {
                return true; // Found a match
            }
        }
        return false; // No match found
    };

    const filteredData = data?.data?.filter(filterData);
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
                        {filteredData?.length > 0 && filteredData?.map((val, ind) => <TableData key={"00" + ind} no={ind + 1} data={val}/>)}
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
}

export function TableHeader({name}) {
    return (
        <th className="px-2 py-3 text-[16px] font-medium truncate leading-4 text-[#4A5D58] text-left border-b bg-gray-50">
            {name}
        </th>
    )
}

const header = ['S/N', 'Surname', 'First Name', 'Middle Name', 'Email Address', 'Phone Number', 'Gender', 'House No.', 'Street Name', 'City', 'State', 'D.O.B', 'BVN', 'ID NO. (International Passport Only)', 'ID Date Issued',
    'Transfer Amount', 'Preferred Narration', 'Re-Payment Date' ]

export function TableData({data, no}) {
    return (
        <tr>
            <td className="px-3 py-4 border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{no}</span>
            </td>
            <td className="px-3 py-4 border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.surname}</span>
            </td>
            <td className="px-3 py-4 border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.firstname}</span>
            </td>
            <td className="px-3 py-4 border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.middlename}</span>
            </td>
            <td className="px-3 py-4 border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.emailAddress}</span>
            </td>
            <td className="px-3 py-4 border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.phoneno}</span>
            </td>
            <td className="px-3 py-4 border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.gender}</span>
            </td>
            <td className="px-3 py-4 border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.houseNo}</span>
            </td>
            <td className="px-3 py-4 border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.streetName}</span>
            </td>
            <td className="px-3 py-4 border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.city}</span>
            </td>
            <td className="px-3 py-4 border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.state}</span>
            </td>
            <td className="px-3 py-4 border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium truncate">{dayjs(data.dob).format("YYYY/MM/DD")}</span>
            </td>
            <td className="px-3 py-4 border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.bvn}</span>
            </td>
            <td className="px-3 py-4 border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.idNo}</span>
            </td>
            <td className="px-3 py-4 border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{dayjs(data?.idDateIssued).format("YYYY/MM/DD")}</span>
            </td>
            <td className="px-3 py-4 border-b border-gray-200">
                <span
                    className="text-[16px] leading-5 text-[#4A5D58] font-medium">&#8358;{formatAmount(data?.transferAmount)}</span>
            </td>
            <td className="px-3 py-4 border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.preferredNaration}</span>
            </td>
            <td className="px-3 py-4 border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{dayjs(data?.repaymentDate).format("YYYY/MM/DD")}</span>
            </td>
        </tr>
    )
}