import React, {useState} from 'react';
import {formatRepayment} from "../../reusables/formatAmount.js";
import Pagination from "../../reusables/Pagination.jsx";
import dayjs from "dayjs";

const CustomerWalletDetailsTable = () => {
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleRowPerPageChange = (event) => {
        setSize(parseInt(event.target.value, 10));
    };

    const data = [
        {
            emailAddress: "adekunle@creditwaveng.com",
            firstName: "Adebona",
            middleName: "Adebona",
            lastName: "Adekunle",
            bvn: "7474836848",
            nin: "5336439298",
            dob: "01/08/2023",
            walletBalance: "30000",
            isOnlien: "True",
            isBlacklist: "True",
            status: "Active",

        },
    ]
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
                        {data?.length > 0 && data?.map((val, ind) => <TableData key={"00" + ind}
                                                                                no={ind + 1} data={val}/>)}
                        </tbody>
                    </table>
                </div>
                {data && (
                    <Pagination
                        totalCount={data?.length || 0}
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

export default CustomerWalletDetailsTable;

export function TableHeader({name}) {
    return (
        <th className="px-6 py-3 text-[16px] font-medium leading-4 tracking-wider text-[#4A5D58] text-left border-b truncate bg-gray-50">
            {name}
        </th>
    )
}

const header = ['S/N', 'Email Address', 'First Name', 'Middle Name', 'Last Name', 'BVN', 'NIN', 'DOB', 'Wallet Balance', 'IsOnlien', 'IsBlacklisted', 'Status' ]

export function TableData({data, no}) {
    return (
        <tr>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{no}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span
                    className="text-[16px] leading-5 text-[#4A5D58] font-medium truncate">{data?.emailAddress}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.firstName}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.middleName}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium truncate">{data?.lastName}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.bvn}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.nin}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span
                    className="text-[16px] leading-5 text-[#4A5D58] font-medium">{dayjs(data.dob).format("YYYY/MM/DD")}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span
                    className="text-[16px] leading-5 text-[#4A5D58] font-medium">&#8358;{formatRepayment(data?.walletBalance)}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.isOnlien}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.isBlacklist}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.status}</span>
            </td>
        </tr>
    )
}