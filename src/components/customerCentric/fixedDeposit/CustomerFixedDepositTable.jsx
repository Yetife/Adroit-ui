import {useState} from "react";
import {useDispatch} from "react-redux";
import {useEditStatusMutation, useGetAllCustomerQuery} from "../../../store/features/loanApplication/api.js";
import {useNavigate} from "react-router-dom";
import {updateSnackbar} from "../../../store/snackbar/reducer.js";
import dayjs from "dayjs";
import AddLoanStatusModal from "../../loanApplication/loanStatus/AddLoanStatusModal.jsx";
import {LinearProgress, ThemeProvider} from "@mui/material";
import themes from "../../reusables/theme.jsx";

const CustomerFixedDepositTable = ({searchTerm}) => {
    const {data, isFetching, error} =  useGetAllCustomerQuery()
    if (error) return <p>Network error</p>

    const customer = [
        {
            id: 1,
            customerRef: "Ref123456",
            firstName: "Adekunle",
            lastName: "Adebona",
            middleName: "Samuel",
            emailAddress: "adebona@credit...",
            dob: "09/03/1991",
            bvn: "109031991",
            status: "Active",
        }, {
            id: 2,
            customerRef: "Ref123456",
            firstName: "Adekunle",
            lastName: "Adebona",
            middleName: "Samuel",
            emailAddress: "adebona@credit...",
            dob: "09/03/1991",
            bvn: "109031991",
            status: "Active",
        }, {
            id: 3,
            customerRef: "Ref123456",
            firstName: "Adekunle",
            lastName: "Adebona",
            middleName: "Samuel",
            emailAddress: "adebona@credit...",
            dob: "09/03/1991",
            bvn: "109031991",
            status: "Active",
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

export default CustomerFixedDepositTable;

export function TableHeader({name}) {
    return (
        <th className="px-6 py-3 text-[16px] font-medium leading-4 tracking-wider text-[#4A5D58] text-left border-b text-gray-900 bg-gray-50">
            {name}
        </th>
    )
}

const header = ['S/N', 'Customer Ref.', 'Email Address', 'First Name', 'Mid. Name', 'Last Name', 'Date of birth', 'BVN', 'Status', 'Actions' ]

export function TableData({data, no}) {
    const [open, setOpen] = useState(false);
    const [checked, setChecked] = useState(true);
    const [status, setStatus] = useState("")
    const [purpose, setPurpose] = useState("")
    const [id, setId] = useState(0)
    const dispatch = useDispatch()
    const [editStatus] = useEditStatusMutation()
    const router = useNavigate()

    const handleEdit = ()=> {
        editStatus({
            body: {
                name: status,
                status: checked ? "1" : "0",
                uniqueId: id
            }
        }).then(res => {
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: res.data.message,success:true}));
            setOpen(!open)
            setStatus("")
        }).catch(err =>{
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message:err.data.message,success:false}));
        })
    }

    return (
        <tr>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{no}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.customerRef}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.emailAddress}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.firstName}</span>
            </td><td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.middleName}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.lastName}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.dob}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.bvn}</span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.status}</span>
            </td>

            <td className="px-6 py-4 pt-2 text-xs font-medium leading-5 whitespace-no-wrap border-b border-gray-200">
                 <span
                     className="text-[16px] leading-5 text-[#007BEC] font-medium cursor-pointer"
                     onClick={() => router(`/customerCentric/fixedDeposit/customerDetails?id=${data.id}`)}>View
                 </span>
            </td>
            <AddLoanStatusModal open={open} setOpen={setOpen} status={status} setStatus={setStatus} checked={checked}
                                setChecked={setChecked} purpose={purpose} handleAdd={handleEdit}/>
        </tr>
    )
}