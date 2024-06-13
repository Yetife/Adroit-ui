import {useEffect, useState} from "react";
import {
    useGetAllCustomerQuery,
} from "../../../store/features/loanApplication/api.js";
import {useNavigate} from "react-router-dom";
import dayjs from "dayjs";
import {LinearProgress, ThemeProvider} from "@mui/material";
import themes from "../../reusables/theme.jsx";
import {formatAmount} from "../../reusables/formatAmount.js";
import Pagination from "../../reusables/Pagination.jsx";
import {getPermission} from "../../reusables/getPermission.js";

const CustomerTable = ({searchTerm, applicationId, name, statusName, email, channel, startDate, endDate}) => {
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const permissions = getPermission("Loan Application", "Customer");
    if (permissions) {
        console.log("Permissions for 'Customer' page in 'Loan Application' module:", permissions);
    } else {
        console.log("Permissions not found");
    }

    // Query data
    const { data, isFetching, error } = useGetAllCustomerQuery({
        size,
        page,
        applicationId, name, statusName, email, channel, startDate, endDate // Spread filters directly into the query
    });

    if (error) return <p>Network error</p>;

    const filterData = (item) => {
        for (const key in item) {
            if (item[key]?.toString().toLowerCase().includes(searchTerm.toLowerCase())) {
                return true; // Found a match
            }
        }
        return false; // No match found
    };

    const filteredData = data?.data?.filter(filterData) ?? [];

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleRowPerPageChange = (event) => {
        setSize(parseInt(event.target.value, 10));
    };


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
                        {filteredData?.length > 0 && filteredData?.map((val, ind) => <TableData key={"00" + ind} no={ind + 1} data={val} perms={permissions}/>)}
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

export default CustomerTable;

export function TableHeader({name}) {
    return (
        <th className="px-6 py-3 text-[16px] font-medium leading-4 tracking-wider text-[#4A5D58] text-left border-b truncate bg-gray-50">
            {name}
        </th>
    )
}

const header = ['S/N', 'Channel', 'Loan Category', 'Loan Amount', 'Email Address', 'First Name', 'Last Name', 'Application Date', 'Actions' ]

export function TableData({data, no, perms}) {
    const router = useNavigate()

    return (
        <tr>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{no}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium truncate">{data?.applicationChannel}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium truncate">Regular Loan</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span
                    className="text-[16px] leading-5 text-[#4A5D58] font-medium truncate">&#8358;{formatAmount(data?.loanAmount)}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.workEmail}</span>
            </td><
            td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.firstName}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium truncate">{data?.lastName}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{dayjs(data.dateCreated).format("YYYY/MM/DD")}</span>
            </td>
             <td className="px-6 py-4 pt-2 text-xs font-medium leading-5 whitespace-no-wrap border-b border-gray-200">
                 {perms.canView && <span
                     className="text-[16px] leading-5 text-[#007BEC] font-medium cursor-pointer"
                     onClick={() => router(`/loanApp/customerDetails?id=${data.customerId}&aid=${data.applicantNumber}&status=cust`)}>View
                 </span>}
            </td>
        </tr>
    )
}