import {LinearProgress, ThemeProvider} from "@mui/material";
import themes from "../reusables/theme.jsx";
import {useNavigate} from "react-router-dom";
import {useGetAllStaffLoanQuery} from "../../store/features/staff/api.js";
import {useState} from "react";
import Pagination from "../reusables/Pagination.jsx";
import {formatAmount} from "../reusables/formatAmount.js";

const StaffTable = ({applicationId, statusName, startDate, endDate}) => {
    const [page, setPage] = useState(1)
    const [size, setSize] = useState(10)
    const {data, isFetching, error} =  useGetAllStaffLoanQuery({
        size,
        page,
        applicationId, statusName, startDate, endDate
    })
    if (error) return <p>Network error</p>

    console.log(statusName)
    // const filterData = (item) => {
    //     for (const key in item) {
    //         if (item[key]?.toString().toLowerCase().includes(searchTerm.toLowerCase())) {
    //             return true; // Found a match
    //         }
    //     }
    //     return false; // No match found
    // };
    //
    // const filteredData = data?.data?.filter(filterData);
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
                        {data?.data?.length > 0 && data?.data?.map((val, ind) => <TableData key={"00" + ind} no={ind + 1} data={val}/>)}
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

export default StaffTable;



export function TableHeader({name}) {
    return (
        <th className="px-6 py-3 text-[16px] font-medium leading-4 tracking-wider text-[#4A5D58] text-left border-b truncate bg-gray-50">
            {name}
        </th>
    )
}

const header = ['S/N', 'Staff ID', 'Official Email Address', 'First Name', 'Last Name', 'Staff Loan Amount', 'Status', 'Actions' ]

export function TableData({data, no}) {
    const router = useNavigate()

    return (
        <tr>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{no}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium truncate">{data?.staffId}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.officialEmail}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.firstName}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.lastName}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">&#8358;{formatAmount(data?.loanAmount)}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.statusName}</span>
            </td>
            <td className="px-6 py-4 pt-2 text-xs font-medium leading-5 whitespace-no-wrap border-b border-gray-200">
                <span className="w-32  mt-2 shadow-md divide-y overflow-auto bg-white rounded-md cursor-pointer">
                    <span className="block px-4 w-full py-2 text-[16px] font-medium text-[#007BEC]" onClick={()=>router(`/staff/view?id=${data.uniqueId}&status=loan`)}>View</span>
                </span>
            </td>
        </tr>
    )
}