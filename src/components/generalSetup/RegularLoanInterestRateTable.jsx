import {useState} from 'react';
import {useDispatch} from "react-redux";
import {useDeleteRegularLoanInterestRateMutation,
    useGetAllRegularLoanInterestRateQuery
} from "../../store/features/generalSetup/api.js";
import {updateSnackbar} from "../../store/snackbar/reducer.js";
import {LinearProgress, ThemeProvider} from "@mui/material";
import themes from "../reusables/theme.jsx";
import AddRegularLoanInterestRateModal from "./AddRegularLoanInterestRateModal.jsx";

const RegularLoanInterestRateTable = () => {
    const {data, isFetching, error} = useGetAllRegularLoanInterestRateQuery()

    return (
        <div className="flex overflow-x-auto rounded-3xl lg:overflow-hidden flex-col mt-8">
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
                        { data?.data?.length > 0 && data?.data?.map((val, ind) => <TableData key={"00" + ind} no={ind + 1} data={val} />) }
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

export default RegularLoanInterestRateTable;


export function TableHeader({name}) {
    return (
        <th className="px-10 py-3 text-[16px] font-medium leading-4 tracking-wider text-[#4A5D58] text-left border-b text-gray-900 bg-gray-50">
            {name}
        </th>
    )
}

const header = ['S/N', 'Interest Rate', 'Loan Amount From', 'Loan Amount To', 'Status', 'Actions' ]

export function TableData({data, no}) {
    const [showDropdown, setShowDropdown] = useState(false)
    const [open, setOpen] = useState(false);
    const [checked, setChecked] = useState(true);
    const [depositFrom, setDepositFrom] = useState("")
    const [depositTo, setDepositTo] = useState("")
    const [rate, setRate] = useState("")
    const dispatch = useDispatch()
    const [purpose, setPurpose] = useState("")
    const [id, setId] = useState(0)
    const [deleteLoan] = useDeleteRegularLoanInterestRateMutation()


    const handleshowDropDown = () => setShowDropdown((initValue) => !initValue)
    const handleBlurDropdown = () => setShowDropdown(false)

    const handleOpenView = (data) => {
        setOpen(true)
        setPurpose("view")
        setDepositFrom(data.loanAmountFrom)
        setDepositTo(data.loanAmountTo)
        setRate(data.interestRate)
        setChecked(data.status === 1 ? true : false)
        setId(data.id)
    }
    const handleOpenEdit = (data) => {
        setOpen(true)
        setPurpose("edit")
        setDepositFrom(data.loanAmountFrom)
        setDepositTo(data.loanAmountTo)
        setRate(data.interestRate)
        setId(data.id)
        setChecked(data.status === 1 ? true : false)
    }
    const handleRemove = (id) => {
        deleteLoan(id).then((res) => {
            dispatch(
                updateSnackbar({
                    type: "TOGGLE_SNACKBAR_OPEN",
                    message: res?.data?.message,
                    success: true,
                })
            );
        });
    }


    return (
        <tr>
            <td className="px-10 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{no}</span>
            </td>
            <td className="px-10 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.interestRate}</span>
            </td>
            <td className="px-10 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.loanAmountFrom}</span>
            </td>
            <td className="px-10 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.loanAmountTo}</span>
            </td>
            <td className="px-10 py-4 whitespace-no-wrap border-b border-gray-200">
                <span
                    className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.status === 1 ? "Active" : "Inactive"}</span>
            </td>
            <td className="px-10 py-4 pt-2 text-xs font-medium leading-5 whitespace-no-wrap border-b border-gray-200">
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
                      className="absolute z-10 w-32  mt-2 shadow-md divide-y overflow-hidden bg-white rounded-md cursor-pointer"
                      style={{display: showDropdown ? "block" : "none"}}>
                    <span
                        className="block px-4 w-full py-2 text-[14px] font-medium text-[#4A5D58] hover:bg-[#00C796]  hover:text-white"
                        onClick={() => handleOpenView(data)}>View</span>
                    <span
                        className="block px-4 w-full py-2 text-[14px] font-medium text-[#4A5D58] hover:bg-[#00C796] hover:text-white"
                        onClick={() => handleOpenEdit(data)}>Edit</span>
                    <span
                        className="block px-4 w-full py-2 text-[14px] font-medium text-[#4A5D58] hover:bg-[#00C796] hover:text-white"
                        onClick={() => handleRemove(data.id)}>Remove</span>
        </span>
            </td>
            <AddRegularLoanInterestRateModal open={open} setOpen={setOpen} checked={checked} setChecked={setChecked} depositFrom={depositFrom} setDepositFrom={setDepositFrom}
                                             depositTo={depositTo} setDepositTo={setDepositTo} rate={rate} setRate={setRate} purpose={purpose} id={id}/>
        </tr>
    )
}