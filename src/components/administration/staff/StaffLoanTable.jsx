import {useState} from 'react';
import {useDispatch} from "react-redux";
import {LinearProgress, ThemeProvider} from "@mui/material";
import themes from "../../reusables/theme.jsx";
import {useNavigate} from "react-router-dom";
import {useGetStaffLoanQuery} from "../../../store/features/administration/api.js";
import dayjs from "dayjs";

const StaffLoanTable = () => {
    const {data, isFetching, error} = useGetStaffLoanQuery()
    // if (error) return <p>Network error</p>

    // const data = [
    //     {
    //         id: 1,
    //         staffId: "Ref123456",
    //         loanAmount: "N200,000",
    //         officialEmail: "adebona@credit...",
    //         firstName: "Adekunle",
    //         middleName: "Samuel",
    //         lastName: "Adebona",
    //         applicationDate: "01/08/2023",
    //     },{
    //         id: 2,
    //         staffId: "Ref123456",
    //         loanAmount: "N200,000",
    //         officialEmail: "adebona@credit...",
    //         firstName: "Adekunle",
    //         middleName: "Samuel",
    //         lastName: "Adebona",
    //         applicationDate: "01/08/2023",
    //     },{
    //         id: 3,
    //         staffId: "Ref123456",
    //         loanAmount: "N200,000",
    //         officialEmail: "adebona@credit...",
    //         firstName: "Adekunle",
    //         middleName: "Samuel",
    //         lastName: "Adebona",
    //         applicationDate: "01/08/2023",
    //     },{
    //         id: 4,
    //         staffId: "Ref123456",
    //         loanAmount: "N200,000",
    //         officialEmail: "adebona@credit...",
    //         firstName: "Adekunle",
    //         middleName: "Samuel",
    //         lastName: "Adebona",
    //         applicationDate: "01/08/2023",
    //     },{
    //         id: 5,
    //         staffId: "Ref123456",
    //         loanAmount: "N200,000",
    //         officialEmail: "adebona@credit...",
    //         firstName: "Adekunle",
    //         middleName: "Samuel",
    //         lastName: "Adebona",
    //         applicationDate: "01/08/2023",
    //     },{
    //         id: 6,
    //         staffId: "Ref123456",
    //         loanAmount: "N200,000",
    //         officialEmail: "adebona@credit...",
    //         firstName: "Adekunle",
    //         middleName: "Samuel",
    //         lastName: "Adebona",
    //         applicationDate: "01/08/2023",
    //     },
    // ]
    const filteredData = data?.data?.filter((item) =>
        item.staffName.toLowerCase()
    );

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

export default StaffLoanTable;


export function TableHeader({name}) {
    return (
        <th className="px-10 py-3 text-[16px] font-medium leading-4 tracking-wider text-[#4A5D58] text-left border-b text-gray-900 bg-gray-50">
            {name}
        </th>
    )
}

const header = ['S/N', 'Staff ID', 'Loan Amount', 'Official Email Address', 'First Name', 'Middle Name', 'Last Name', 'Application Date', 'Actions' ]

export function TableData({data, no}) {
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(0)
    const router = useNavigate()
    const dispatch = useDispatch()


    return (
        <tr>
            <td className="px-10 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{no}</span>
            </td>
            <td className="px-10 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.staffId}</span>
            </td>
            <td className="px-10 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.loanAmount}</span>
            </td>
            <td className="px-10 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.officialEmail}</span>
            </td>
            <td className="px-10 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.staffName}</span>
            </td>
            <td className="px-10 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.middleName}</span>
            </td>
            <td className="px-10 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.lastName}</span>
            </td>
            <td className="px-10 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{dayjs(data?.dateCreated).format("YYYY/MM/DD")}</span>
            </td>
            <td className="px-10 py-4 pt-2 text-xs font-medium leading-5 whitespace-no-wrap border-b border-gray-200">
                <span className="w-32  mt-2 shadow-md divide-y overflow-auto bg-white rounded-md cursor-pointer">
                    <span className="block px-4 w-full py-2 text-[16px] font-medium text-[#007BEC]" onClick={()=>router(`/administration/staff/view?id=${data.uniqueId}`)}>View</span>
                </span>
            </td>
        </tr>
    )
}