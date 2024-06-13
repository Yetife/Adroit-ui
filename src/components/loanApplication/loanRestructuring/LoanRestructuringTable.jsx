import {useState} from "react";
import {
    useGetAllLoanRestructuringQuery,
    useGetAllReviewQuery,
    useGetAllStatusQuery
} from "../../../store/features/loanApplication/api.js";
import {useNavigate} from "react-router-dom";
import dayjs from "dayjs";
import {LinearProgress, ThemeProvider} from "@mui/material";
import themes from "../../reusables/theme.jsx";
import Pagination from "../../reusables/Pagination.jsx";
import {formatAmount} from "../../reusables/formatAmount.js";
import {getPermission} from "../../reusables/getPermission.js";

const LoanRestructuringTable = ({searchTerm, statusName, bvn, email, customerRef, startDate, endDate}) => {
    const [page, setPage] = useState(1)
    const [size, setSize] = useState(10)
    const {data, isFetching, error} =  useGetAllLoanRestructuringQuery({
        size,
        page,
        statusName, bvn, email, customerRef, startDate, endDate,
    })
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
};

export default LoanRestructuringTable;

export function TableHeader({name}) {
    return (
        <th className="px-6 py-3 text-[16px] font-medium leading-4 tracking-wider text-[#4A5D58] text-left border-b truncate bg-gray-50">
            {name}
        </th>
    )
}

const header = ['S/N', 'Loan Category', 'First Name', 'Last Name', 'Email Address', 'Phone Number', 'D.O.B', 'BVN', 'Initial Loan Tenor', 'New Loan Tenor', 'Loan Amount', 'Date Submitted', 'Actions' ]

export function TableData({data, no}) {
    const [ showDropdown, setShowDropdown ] = useState(false)
    const router = useNavigate()
    const permissions = getPermission("Loan Application", "Loan Restructuring");


    const handleshowDropDown = () => setShowDropdown((initValue) => !initValue)
    const handleBlurDropdown = () => setShowDropdown(false)

    return (
        <tr>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{no}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium truncate">Loan Restructuring</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.firstName}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.lastName}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.email}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.phoneNumber}</span>
            </td>
            {/*<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">*/}
            {/*    <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.gender}</span>*/}
            {/*</td>*/}
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.dateOfBirth}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.bvn}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.initialTenorValue}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.tenorValue}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span
                    className="text-[16px] leading-5 text-[#4A5D58] font-medium">&#8358;{formatAmount(data?.loanAmount)}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{dayjs(data.dateSubmitted).format("YYYY/MM/DD")}</span>
            </td>
            <td className="px-6 text-xs font-medium leading-5 whitespace-no-wrap border-b border-gray-200">
                <a onClick={handleshowDropDown}
                   className="text-2xl cursor-pointer pt-0 leading-5 text-indigo-00 hover:text-indigo-900">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="7" viewBox="0 0 30 7" fill="none">
                        <path d="M2 3.625C2 4.05598 2.17121 4.4693 2.47595 4.77405C2.7807 5.07879 3.19402 5.25 3.625 5.25C4.05598 5.25 4.4693 5.07879 4.77405 4.77405C5.07879 4.4693 5.25 4.05598 5.25 3.625C5.25 3.19402 5.07879 2.7807 4.77405 2.47595C4.4693 2.17121 4.05598 2 3.625 2C3.19402 2 2.7807 2.17121 2.47595
                        2.47595C2.17121 2.7807 2 3.19402 2 3.625ZM13.375 3.625C13.375 4.05598 13.5462 4.4693 13.851 4.77405C14.1557 5.07879 14.569 5.25 15 5.25C15.431 5.25 15.8443 5.07879 16.149 4.77405C16.4538 4.4693 16.625 4.05598 16.625 3.625C16.625 3.19402 16.4538 2.7807 16.149 2.47595C15.8443 2.17121 15.431 2 15 2C14.569 2 14.1557 2.17121 13.851
                         2.47595C13.5462 2.7807 13.375 3.19402 13.375 3.625ZM24.75 3.625C24.75 4.05598 24.9212 4.4693 25.226 4.77405C25.5307 5.07879 25.944 5.25 26.375 5.25C26.806 5.25 27.2193 5.07879 27.524 4.77405C27.8288 4.4693 28 4.05598 28 3.625C28 3.19402 27.8288 2.7807 27.524 2.47595C27.2193 2.17121 26.806 2 26.375 2C25.944 2 25.5307 2.17121 25.226 2.47595C24.9212 2.7807 24.75 3.19402 24.75 3.625Z"
                              stroke="#4A5D58" strokeWidth="3.25" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </a>
                <span onMouseLeave={handleBlurDropdown}
                      className="absolute z-10 w-32 right--1 md:right-10 mt-2 shadow-md divide-y overflow-hidden bg-white rounded-md cursor-pointer"
                      style={{display: showDropdown ? "block" : "none"}}>
                   {permissions.canView && <span
                       className="block px-4 w-full py-2 text-[14px] font-medium text-[#4A5D58] hover:bg-[#00C796]  hover:text-white"
                       onClick={() => router(`/loanApp/loanRestructuring/view?id=${data.loanApplicationId}&status=view`)}>View</span>}
                    {permissions.canEdit && <span
                        className="block px-4 w-full py-2 text-[14px] font-medium text-[#4A5D58] hover:bg-[#00C796] hover:text-white"
                        onClick={() => router(`/loanApp/loanRestructuring/edit?id=${data.loanApplicationId}&status=edit`)}>Edit</span>}
                </span>
            </td>
        </tr>
    )
}