import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {formatAmount} from "../../reusables/formatAmount.js";

const SummaryTable = ({searchTerm}) => {
    const customer = [
        {
            id: 1,
            totalDisbursed: "56,000,000",
            totalRecovered: "2,000,000",
            totalOutstanding: "2,000,000",
            month: "2 - 3",
        },{
            id: 2,
            totalDisbursed: "56,000,000",
            totalRecovered: "2,000,000",
            totalOutstanding: "2,000,000",
            month: "3",
        },
    ]

    const filteredData = customer.filter((item) =>
        item.totalDisbursed.toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (
        <div className="scroll-container flex rounded-3xl flex-col mt-8">
            <div className="py-2 md:px-2 sm:px-2">
                <div className="inline-block min-w-full align-middle c-border shadow sm:rounded-lg">
                    {/*{isFetching && <ThemeProvider theme={themes}>*/}
                    {/*    <LinearProgress color={"waveGreen"}/>*/}
                    {/*</ThemeProvider>}*/}
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

export default SummaryTable;

export function TableHeader({name}) {
    return (
        <th className="px-3 py-3 text-[16px] font-medium leading-4 tracking-wider text-[#4A5D58] text-left border-b truncate bg-gray-50">
            {name}
        </th>
    )
}

const header = ['S/N', 'Total Disbursed', 'Total Recovered', 'Total Outstanding', 'Month(s)']

export function TableData({data, no}) {

    return (
        <tr>
            <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{no}</span>
            </td>
            <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.totalDisbursed}</span>
            </td>
            <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.totalRecovered}</span>
            </td>
            <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.totalOutstanding}</span>
            </td>
            <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.month}</span>
            </td>
        </tr>
    )
}