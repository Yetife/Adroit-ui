import {useGetAllProcessedDisbursementQuery} from "../../../../store/features/bridgeLoan/api.js";
import {LinearProgress, ThemeProvider} from "@mui/material";
import themes from "../../../reusables/theme.jsx";
import {useState} from "react";
import ProcessedModal from "./ProcessedModal.jsx";

const ProcessedTable = ({searchTerm}) => {
    const {data, isFetching, error} = useGetAllProcessedDisbursementQuery()
    if (error) return <p>Network error</p>

    const filteredData = data?.data?.filter((item) =>
        item.firstname.toLowerCase().includes(searchTerm.toLowerCase())
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

export default ProcessedTable;

export function TableHeader({name}) {
    return (
        <th className="px-2 py-3 text-[16px] font-medium leading-4 text-[#4A5D58] text-left border-b bg-gray-50">
            {name}
        </th>
    )
}

const header = ['S/N', 'Surname', 'First Name', 'Middle Name', 'Email Address', 'House No.', 'Street Name', 'City', 'State', 'D.O.B', 'BVN', 'ID NO. (International Passport Only)',
    'ID Date Issued', 'Transfer Amount', 'Preferred Narration', 'Re-Payment Date', 'Action' ]

export function TableData({data, no}) {
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(0)
    const [status, setStatus] = useState("")
    const [selectedGender, setSelectedGender] = useState('')

    const initialState = {
        surname: "",
        firstName: "",
        middleName: "",
        emailAddress: "",
        houseNo: "",
        streetName: "",
        city: "",
        state: "",
        date: "",
        bvn: "",
        idNo: "",
        idDateIssued: "",
        transferAmount: "",
        preferredNaration: "",
        repayment: "",
        comments: "",
    }
    const [inputs, setInputs] = useState(initialState)

   const handleOpenReturn = (data) => {
       setOpen(true)
       setId(data.uniqueId)
       setStatus(data.status)
       setSelectedGender(data?.gender)
        setInputs({
            surname: data?.surname,
            firstName: data?.firstname,
            middleName: data?.middlename,
            emailAddress: data?.emailAddress,
            houseNo: data?.houseNo,
            streetName: data?.streetName,
            city: data?.city,
            state: data?.state,
            date: data?.dob,
            bvn: data?.bvn,
            idNo: data?.idNo,
            idDateIssued: data?.idDateIssued,
            transferAmount: data?.transferAmount,
            preferredNaration: data?.preferredNaration,
            repayment: data?.repaymentDate
        })
   }
    return (
        <tr>
            <td className="px-3 py-4 border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{no}</span>
            </td>
            <td className="px-3 py-4 border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.surname}</span>
            </td>
            <td className="px-3 py-4 border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.firstname}</span>
            </td>
            <td className="px-3 py-4 border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.middlename}</span>
            </td>
            <td className="px-3 py-4 border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.emailAddress}</span>
            </td>
            <td className="px-3 py-4 border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.houseNo}</span>
            </td>
            <td className="px-3 py-4 border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.streetName}</span>
            </td>
            <td className="px-3 py-4 border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.city}</span>
            </td>
            <td className="px-3 py-4 border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.state}</span>
            </td>
            <td className="px-3 py-4 border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.dob}</span>
            </td>
            <td className="px-3 py-4 border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.bvn}</span>
            </td>
            <td className="px-3 py-4 border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.idNo}</span>
            </td>
            <td className="px-3 py-4 border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.idDateIssued}</span>
            </td>
            <td className="px-3 py-4 border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.transferAmount}</span>
            </td>
            <td className="px-3 py-4 border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.preferredNaration}</span>
            </td>
            <td className="px-3 py-4 border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.repaymentDate}</span>
            </td>
            <td className="px-3 py-4 border-b border-gray-200 cursor-pointer">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium" onClick={()=>handleOpenReturn(data)}>Return</span>
            </td>

            <ProcessedModal open={open} setOpen={setOpen} inputs={inputs} setInputs={setInputs} id={id} status={status} selectedGender={selectedGender} setSelectedGender={setSelectedGender}/>
        </tr>
    )
}