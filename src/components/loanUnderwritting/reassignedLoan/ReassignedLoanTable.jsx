import {useState} from "react";
import {useDispatch} from "react-redux";
import {
    useEditStatusMutation,
    useGetReassignedLoanQuery
} from "../../../store/features/loanApplication/api.js";
import {useNavigate} from "react-router-dom";
import {updateSnackbar} from "../../../store/snackbar/reducer.js";
import AddLoanStatusModal from "../../loanApplication/loanStatus/AddLoanStatusModal.jsx";
import {LinearProgress, ThemeProvider} from "@mui/material";
import themes from "../../reusables/theme.jsx";
import {formatAmount} from "../../reusables/formatAmount.js";

const ReassignedLoanTable = ({searchTerm}) => {
    const user = JSON.parse(sessionStorage.getItem("userData"));

    const {data, isFetching, error} =  useGetReassignedLoanQuery(user.UserId)
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


    return (
        <div className="scroll-container flex rounded-3xl flex-col mt-8">
            <div className="py-2 md:px-2 sm:px-2">
                <div className="inline-block min-w-full align-middle c-border shadow sm:rounded-lg">
                    {isFetching && <ThemeProvider theme={themes}>
                        <LinearProgress color={"waveGreen"}/>
                    </ThemeProvider>}
                    <table className="table-auto md:w-full px-20">
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

export default ReassignedLoanTable;

export function TableHeader({name}) {
    return (
        <th className="px-6 py-3 text-[16px] font-medium leading-4 tracking-wider text-[#4A5D58] text-left border-b truncate bg-gray-50">
            {name}
        </th>
    )
}

const header = ['S/N', 'Channel', 'Loan Category', 'Email Address', 'First Name', 'Last Name', 'Amount', 'Tenor', 'Actions' ]
export function TableData({data, no}) {
    const router = useNavigate()


    return (
        <tr>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{no}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.applicationChannel}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.loanCategory}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.workEmail}</span>
            </td>
            <
                td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.firstName}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.lastName}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span
                    className="text-[16px] leading-5 text-[#4A5D58] font-medium">&#8358;{formatAmount(data?.loanAmount)}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span
                    className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.loanDuration}</span>
            </td>
            <td className="px-6 py-4 pt-2 text-xs font-medium leading-5 whitespace-no-wrap border-b border-gray-200">
                 <span
                     className="text-[16px] leading-5 text-[#007BEC] font-medium cursor-pointer"
                     onClick={() => router(`/loanUnderwriting/customerDetails?id=${data.uniqueId}&status=review`)}>View
                 </span>
            </td>
        </tr>
    )
}