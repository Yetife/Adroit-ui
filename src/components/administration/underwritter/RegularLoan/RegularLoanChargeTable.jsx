import {useState} from "react";
import {useDispatch} from "react-redux";
import {updateSnackbar} from "../../../../store/snackbar/reducer.js";
import {LinearProgress, ThemeProvider} from "@mui/material";
import themes from "../../../reusables/theme.jsx";
import AddRegularLoanCharges from "./AddRegularLoanCharges.jsx";
import {
    useDeleteRegularLoanChargesMutation,
    useGetAllRegularLoanChargesQuery,
} from "../../../../store/features/administration/api.js";
import Pagination from "../../../reusables/Pagination.jsx";
import {formatAmount} from "../../../reusables/formatAmount.js";
import {getPermission} from "../../../reusables/getPermission.js";

const RegularLoanChargeTable = () => {
    const [page, setPage] = useState(1)
    const [size, setSize] = useState(10)
    const {data, isFetching, error} =  useGetAllRegularLoanChargesQuery({size, page})
    if (error) return <p>Network error</p>

    const handlePageChange = (newPage) => {
        setPage(newPage)
    }

    const handleRowPerPageChange = (event) => {
        setSize(parseInt(event.target.value, 10));
    }


    return (
        <div className="flex rounded-3xl flex-col mt-8">
            <div className="py-2 md:px-2 sm:px-2 inline-block min-w-full align-middle c-border shadow sm:rounded-lg">
                <div className="scroll-container">
                    {isFetching && <ThemeProvider theme={themes}>
                        <LinearProgress color={"waveGreen"}/>
                    </ThemeProvider>}
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
                        totalCount={data?.recordCount || 0}
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

export default RegularLoanChargeTable;

export function TableHeader({name}) {
    return (
        <th className="px-10 py-3 text-[16px] font-medium leading-4 tracking-wider text-[#4A5D58] text-left border-b truncate bg-gray-50">
            {name}
        </th>
    )
}

const header = ['S/N','Employment Type', 'Charge Amount', 'Is Percentage', 'Loan Amount From', 'Loan Amount To', 'Loan Tenor', 'Actions' ]

export function TableData({data, no}) {
    const [showDropdown, setShowDropdown] = useState(false)
    const [open, setOpen] = useState(false);
    const [depositFrom, setDepositFrom] = useState("")
    const [depositTo, setDepositTo] = useState("")
    const [cAmount, setCAmount] = useState('')
    const [selectedType, setSelectedType] = useState('');
    const [selectedLoan, setSelectedLoan] = useState('');
    const [selectedPer, setSelectedPer] = useState(false);
    const dispatch = useDispatch()
    const [purpose, setPurpose] = useState("")
    const [id, setId] = useState(0)
    const [deleteLoan] = useDeleteRegularLoanChargesMutation()
    const permissions = getPermission("Administration", "Underwriter_Regularloan");


    const handleshowDropDown = () => setShowDropdown((initValue) => !initValue)
    const handleBlurDropdown = () => setShowDropdown(false)

    const handleOpenView = (data) => {
        setOpen(true)
        setPurpose("view")
        setDepositFrom(data.loanAmountFrom)
        setDepositTo(data.loanAmountTo)
        setCAmount(data.chargeAmount)
        setSelectedLoan(data.loanTenorid)
        setSelectedType(data.employmentTypeId)
        setSelectedPer(data.isPercentage)
        setId(data.uniqueId)
    }
    const handleOpenEdit = (data) => {
        setOpen(true)
        setPurpose("edit")
        setDepositFrom(data.loanAmountFrom)
        setDepositTo(data.loanAmountTo)
        setCAmount(data.chargeAmount)
        setSelectedLoan(data.loanTenorid)
        setSelectedType(data.employmentTypeId)
        setSelectedPer(data.isPercentage)
        setId(data.uniqueId)
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
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.employmentTypeId}</span>
            </td>
            <td className="px-10 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">&#8358;{formatAmount(data?.chargeAmount)}</span>
            </td>
            <td className="px-10 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium capitalize">{data?.isPercentage.toString()}</span>
            </td>
            <td className="px-10 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">&#8358;{formatAmount(data?.loanAmountFrom)}</span>
            </td>
            <td className="px-10 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">&#8358;{formatAmount(data?.loanAmountTo)}</span>
            </td>
            <td className="px-10 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.loanTenorid}</span>
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
                      className="absolute z-10 w-32 right--1 md:right-10 mt-2 shadow-md divide-y overflow-hidden bg-white rounded-md cursor-pointer"
                      style={{display: showDropdown ? "block" : "none"}}>
                    {permissions.canView && <span
                        className="block px-4 w-full py-2 text-[14px] font-medium text-[#4A5D58] hover:bg-[#00C796]  hover:text-white"
                        onClick={() => handleOpenView(data)}>View</span>}
                    {permissions.canEdit && <span
                        className="block px-4 w-full py-2 text-[14px] font-medium text-[#4A5D58] hover:bg-[#00C796] hover:text-white"
                        onClick={() => handleOpenEdit(data)}>Edit</span>}
                    {permissions.canRemove && <span
                        className="block px-4 w-full py-2 text-[14px] font-medium text-[#4A5D58] hover:bg-[#00C796] hover:text-white"
                        onClick={() => handleRemove(data.uniqueId)}>Remove</span>}
        </span>
            </td>
            <AddRegularLoanCharges open={open} setOpen={setOpen} depositFrom={depositFrom} setDepositFrom={setDepositFrom}
                                       depositTo={depositTo} setDepositTo={setDepositTo} cAmount={cAmount} setCAmount={setCAmount} purpose={purpose}
                                   setSelectedValue={setSelectedType} selectedValue={selectedType} selectedLoan={selectedLoan}
                                   setSelectedLoan={setSelectedLoan} selectedPer={selectedPer} setSelectedPer={setSelectedPer} id={id}/>
        </tr>
    )
}