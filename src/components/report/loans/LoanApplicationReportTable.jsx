import {formatRepayment} from "../../reusables/formatAmount.js";
import dayjs from "dayjs";
import Pagination from "../../reusables/Pagination.jsx";

const LoanApplicationReportTable = ({data, page, handlePageChange, handleRowPerPageChange}) => {
    return (
        <div className="flex rounded-3xl mt-4">
            <div className="py-2 md:px-2 sm:px-2 inline-block min-w-full align-middle c-border shadow sm:rounded-lg">
                <div className="scroll-container">
                    {/*{isFetching && <ThemeProvider theme={themes}>*/}
                    {/*    <LinearProgress color={"waveGreen"}/>*/}
                    {/*</ThemeProvider>}*/}
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
                        totalCount={data?.totalRecords || 0}
                        page={page}
                        rowsPerPage={data?.pageSize}
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

export default LoanApplicationReportTable;

export function TableHeader({name}) {
    return (
        <th className="px-6 py-3 text-[16px] font-medium leading-4 tracking-wider text-[#4A5D58] text-left border-b truncate bg-gray-50">
            {name}
        </th>
    )
}

const header = ['S/N', 'Customer Full Name', 'Email Address', 'BVN', 'Loan Amount', 'Tenor', 'Date Requested', 'Date Disbursed', 'Disbursed Amount', 'Total Processing Fee', 'Loan Type']

export function TableData({data, no}) {
    return (
        <tr>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{no}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.customerFullName}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span
                    className="text-[16px] leading-5 text-[#4A5D58] font-medium truncate">{data?.emailAddress}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.bvn}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium truncate">{data?.loanAmount}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium truncate">{data?.tenor}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{dayjs(data?.dateRequested).format("YYYY/MM/DD")}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{dayjs(data?.dateDisbursed).format("YYYY/MM/DD")}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span
                    className="text-[16px] leading-5 text-[#4A5D58] font-medium truncate">&#8358;{formatRepayment(data?.disbursedAmount)}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span
                    className="text-[16px] leading-5 text-[#4A5D58] font-medium truncate">&#8358;{formatRepayment(data?.totalProcessingFee)}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium truncate">{data?.loanType}</span>
            </td>
        </tr>
    )
}