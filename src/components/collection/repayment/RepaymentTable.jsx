import  {useState} from 'react';
import {useNavigate} from "react-router-dom";
import EscrowModal from "../../customerCentric/escrow/EscrowModal.jsx";
import {useGetAllCustomerQuery} from "../../../store/features/loanApplication/api.js";
import {LinearProgress, ThemeProvider} from "@mui/material";
import themes from "../../reusables/theme.jsx";
import {formatAmount} from "../../reusables/formatAmount.js";

const RepaymentTable = ({searchTerm}) => {
    const {data, isFetching, error} =  useGetAllCustomerQuery()
    if (error) return <p>Network error</p>

    const customer = [
        {
            id: 1,
            customerRef: "Ref1234",
            firstName: "Adegeshi",
            lastName: "Dami",
            middleName: "Samuel",
            emailAddress: "adegeshidami@gmail.com",
            phoneNumber: "08110239494",
            loanAmount: "200000",
            repaymentAmount: "20000",
            transDate: "09/03/1991",
            status: "Pending",
        },
    ]

    const filteredData = customer.filter((item) =>
        item.firstName.toLowerCase().includes(searchTerm.toLowerCase())
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

export default RepaymentTable;

export function TableHeader({name}) {
    return (
        <th className="px-3 py-3 text-[16px] font-medium leading-4 tracking-wider text-[#4A5D58] text-left border-b truncate bg-gray-50">
            {name}
        </th>
    )
}

const header = ['S/N', 'Cus Ref', 'Email Address', 'Phone No.', 'First Name', 'Mid. Name', 'Last Name', 'Loan Amnt', 'Repay... Amnt', 'Appli. Date', 'Status', 'Actions' ]

export function TableData({data, no}) {
    const router = useNavigate()
    const [open, setOpen] = useState(false)

    return (
        <tr>
            <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{no}</span>
            </td>
            <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.customerRef}</span>
            </td>
            <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.emailAddress}</span>
            </td>
            <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.phoneNumber}</span>
            </td><td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
            <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.firstName}</span>
        </td>
            <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.middleName}</span>
            </td>
            <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.lastName}</span>
            </td>
            <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{formatAmount(data?.loanAmount)}</span>
            </td>
            <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{formatAmount(data?.repaymentAmount)}</span>
            </td>
            <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.transDate}</span>
            </td>
            <td className="px-3 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.status}</span>
            </td>

            <td className="px-6 py-4 pt-2 text-xs font-medium leading-5 whitespace-no-wrap border-b border-gray-200">
                 <span
                     className="text-[16px] leading-5 text-[#007BEC] font-medium cursor-pointer"
                     onClick={() => router('/collection/repayment/loanDetails')}>View
                 </span>
            </td>
            <EscrowModal open={open} setOpen={setOpen}/>
        </tr>
    )
}