import {useNavigate} from "react-router-dom";
import {useGetAllCustomerQuery} from "../../../store/features/loanApplication/api.js";
import {LinearProgress, ThemeProvider} from "@mui/material";
import themes from "../../reusables/theme.jsx";
import {useState} from "react";
import EscrowModal from "./EscrowModal.jsx";

const EscrowTable = ({searchTerm, dropDown}) => {
    const {data, isFetching, error} =  useGetAllCustomerQuery()
    if (error) return <p>Network error</p>

    const customer = [
        {
            id: 1,
            sellerName: "Adegeshi Dami",
            sellerEmail: "adegeshidami@gmail.com",
            sellerPhoneNumber: "08110239494",
            buyerName: "Adegeshi Dami",
            buyerEmailAddress: "adegeshidami@gmail.com",
            buyerPhoneNumber: "08110239494",
            transDate: "09/03/1991",
            status: "Pending",
        }, {
            id: 2,
            sellerName: "Adegeshi Dami",
            sellerEmail: "adegeshidami@gmail.com",
            sellerPhoneNumber: "08110221394",
            buyerName: "Bakare Dami",
            buyerEmailAddress: "adegeshidami@gmail.com",
            buyerPhoneNumber: "08110239494",
            transDate: "09/03/1991",
            status: "Completed",
        }, {
            id: 2,
            sellerName: "Olakunle Dami",
            sellerEmail: "olageshidami@gmail.com",
            sellerPhoneNumber: "08110239494",
            buyerName: "Adegeshi Dami",
            buyerEmailAddress: "adegeshidami@gmail.com",
            buyerPhoneNumber: "08110239494",
            transDate: "09/03/1991",
            status: "Pending",
        },
    ]

    const filteredData = customer.filter((item) =>
        item[dropDown].toLowerCase().includes(searchTerm.toLowerCase())
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

export default EscrowTable;

export function TableHeader({name}) {
    return (
        <th className="px-6 py-3 text-[16px] font-medium leading-4 tracking-wider text-[#4A5D58] text-left border-b text-gray-900 bg-gray-50">
            {name}
        </th>
    )
}

const header = ['S/N', 'Seller Name', 'Seller Email Address', 'Seller Phone Number', 'Buyer Name', 'Buyer Email Address', 'Buyer Phone Number', 'Transaction Date', 'Status', 'Actions' ]

export function TableData({data, no}) {
    const router = useNavigate()
    const [open, setOpen] = useState(false)

    return (
        <tr>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{no}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.sellerName}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.sellerEmail}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.sellerPhoneNumber}</span>
            </td><td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
            <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.buyerName}</span>
        </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.buyerEmailAddress}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.buyerPhoneNumber}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.transDate}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.status}</span>
            </td>

            <td className="px-6 py-4 pt-2 text-xs font-medium leading-5 whitespace-no-wrap border-b border-gray-200">
                 <span
                     className="text-[16px] leading-5 text-[#007BEC] font-medium cursor-pointer"
                     onClick={() => setOpen(true)}>View
                 </span>
            </td>
            <EscrowModal open={open} setOpen={setOpen}/>
        </tr>
    )
}