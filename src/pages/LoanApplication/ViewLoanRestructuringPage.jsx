import {useEffect, useState} from "react";
import {Link as ReactLink, useNavigate} from "react-router-dom";
import Layout from "../Layout.jsx";
import {Button, Text} from "@chakra-ui/react";
import dayjs from "dayjs";
import {
    useAdjustApplicationMutation, useApproveApplicationMutation,
    useCompleteReviewMutation, useDisburseApplicationMutation, useReturnApplicationMutation,
} from "../../store/features/loanApplication/api.js";
import {formatAmount, formatRepayment} from "../../components/reusables/formatAmount.js";
import {CircularProgress, ThemeProvider} from "@mui/material";
import themes from "../../components/reusables/theme.jsx";
import StopDisbursementModal from "../../components/loanUnderwritting/disbursement/StopDisbursementModal.jsx";
import AdjustLoanModal from "../../components/loanUnderwritting/review/AdjustLoanModal.jsx";
import {
    useStopDisbursementMutation
} from "../../store/features/loanUnderwriting/api.js";
import {updateSnackbar} from "../../store/snackbar/reducer.js";
import {useDispatch, useSelector} from "react-redux";
import DeclineApplicationModal from "../../components/loanApplication/DeclineApplicationModal.jsx";
import ModifyRestructuringModal from "../../components/loanApplication/loanRestructuring/ModifyRestructuringModal.jsx";
import {fetchRestructuringLoanDetails, fetchTopUpLoanDetails} from "../../store/documentationSlice.js";
import {getUserToken} from "../../services/storage/index.js";

const ViewLoanRestructuringPage = () => {
    const [open, setOpen] = useState(false)
    const [openDisburse, setOpenDisburse] = useState(false)
    const queryParams = new URLSearchParams(location.search);
    const appId = queryParams.get("id");
    // const {data, isFetching, error} = useGetLoanRestructureDetailQuery(appId)
    const router = useNavigate()
    const status = queryParams.get("status");
    const [comment, setComment] = useState("")
    const [openAdjust, setOpenAdjust] = useState(false)
    const [openComplete, setOpenComplete] = useState(false)
    const [openApprove, setOpenApprove] = useState(false)
    const [completeReview] = useCompleteReviewMutation()
    const [approve] = useApproveApplicationMutation()
    const [adjust] = useAdjustApplicationMutation()
    const [returnApp] = useReturnApplicationMutation()
    const [disburseApp] = useDisburseApplicationMutation()
    const [stopDisburse] = useStopDisbursementMutation()
    const [inputs, setInputs] = useState({
        amount: "",
        tenor: "",
        description: ""
    })
    const [openModify, setOpenModify] = useState(false)
    const [modifyInputs, setModifyInputs] = useState({
        amount: "",
        tenor: "",
        remainingAmount: "",
        remainingTenor: "",
        customerTenor: "",
    })
    const [file, setFile] = useState(null)
    const dispatch = useDispatch()
    const data = useSelector((state) => state.documentation.restructuringDetail);
    const loading = useSelector((state) => state.documentation.loading);

    useEffect(() => {
        dispatch(fetchRestructuringLoanDetails(appId))
    }, []);

    useEffect(() => {
        if (data) {
            setModifyInputs({
                amount: data?.data?.cusDetail?.loanAmount,
                tenor: data?.data?.cusDetail?.initialTenorValue,
                remainingAmount: data?.data?.editBody?.remainingLoanBalance,
                remainingTenor: data?.data?.editBody?.remainingLoanTenor,
                customerTenor: data?.data?.cusDetail?.tenorValue,
            });
        }
    }, [data]);
    const handleChange = (e) => {
        setComment(e.target.value)
    };

    const handleApprove = () => {
        approve({
            body: {
                loanApplicationId: appId,
                loanCategory: "Loan Restructure"
            }
        }).then(res => {
            setOpenApprove(true)
        }).catch(err =>{
            setOpenApprove(false)
        })
    }
    const handleComplete = () => {
        completeReview({
            body: {
                loanApplicationId: appId,
                loanCategory: "Loan Restructure",
                adjustedTenor: data?.data?.cusDetail?.tenorValue,
                adjustedAmount: data?.data?.cusDetail?.loanAmount,
                comment : comment,
            }
        }).then(res => {
            if (res.data.status === true){
                setOpenComplete(true)
            }
        }).catch(err =>{
            setOpenComplete(false)
        })
    }
    const handleAdjust = () => {
        adjust({
            body: {
                loanApplicationId: appId,
                description: inputs.description,
                adjustedTenor: inputs.tenor,
                adjustedAmount: inputs.amount,
                loanCategory: "Loan Restructure"
            }
        }).then(res => {
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: res.data.message,success:true}));
            setOpenAdjust(!open)
            router('/loanUnderwriting/review')
        }).catch(err =>{
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message:err.data.message,success:false}));
        })
    }
    const handleReturn = () => {
        returnApp({
            body: {
                loanApplicationId: appId,
                loanCategory: "Loan Restructure"
            }
        }).then(res => {
            router('/loanUnderwriting/approval')
        }).catch(err =>{
            setOpenComplete(false)
        })
    }

    const handleStop = () => {
        stopDisburse({
            body: {
                loanApplicationId: appId,
                loanCategory: "Loan Restructure"
            }
        }).then(res => {
            setOpenDisburse(true)
        }).catch(err =>{
            setOpenDisburse(false)
        })
    }
    const handleDisburse = () => {
        disburseApp({
            body: {
                loanApplicationId: appId,
                loanCategory: "loanrestructure"
            }
        }).then(res => {
            router('/loanUnderwriting/disbursement')
        }).catch(err =>{
            setOpenComplete(false)
        })
    }
    const handleModify = async () => {
        try {
            const formData = new FormData();
            formData.append('AdjustedAmount', modifyInputs.amount);
            formData.append('AdjustedTenor', modifyInputs.customerTenor);
            formData.append('BankStatement', file);
            formData.append('LoanApplicationId', appId);
            formData.append('LoanCategory', 'Loan Restructure');
            const token = getUserToken();
            const baseUrl = import.meta.env.VITE_APP_BASE_URL;

            const res = await fetch(`${baseUrl}/LoanApplication/Adjust/UpdateWithBankStatement`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'multipart/form-data',
                    'XApiKey': import.meta.env.VITE_APP_ENCRYPTION_KEY,
                    // 'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                },
            });
            if (res.status === 200) {
                dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: "Record modified successfully", success:true}));
                setOpenModify(false)
                dispatch(fetchRestructuringLoanDetails(appId))
            }
        } catch (error) {
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message:error.data.message,success:false}));
        }
    }
    return (
        <Layout>
            <div>
                {
                    loading ? <ThemeProvider theme={themes}>
                        <CircularProgress color={"waveGreen"} sx={{display: "flex", margin: "auto", justifyContent: "center" }}/>
                    </ThemeProvider> : <div>
                        <div className="flex justify-between px-0 py-4  pb-2 md:pt-3 overflow-auto">
                            <div></div>
                            <div>
                                <Button variant="primary" onClick={() => router(-1)}
                                        bgColor="#00C795" borderRadius="4px"
                                        height="37px" size='md' as={ReactLink} w={'109px'}>
                                    <Text color="white">Back</Text>
                                </Button>
                            </div>
                        </div>
                        <div
                            className="custom-scroll-bar min-w-full align-middle h-[630px] c-border w-full shadow-xl overflow-auto sm:rounded-lg mt-4 px-20">
                            <div className="flex">
                                <div className="w-6/12">
                                    <p className="text-[20px] leading-5 text-[#4A5D58] font-[600]">Customer Details</p>
                                    <div className="rounded-[10px] mt-2 py-4 px-8"
                                         style={{border: "1px solid #C9D4D1", background: "#FFF"}}>
                                        <div className="flex space-x-8">
                                            <div className="pb-6">
                                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">Name</p>
                                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[500] pt-2">{data?.data?.cusDetail?.firstName + " " + data?.data?.cusDetail?.lastName}</p>
                                            </div>
                                            <div className="pb-4">
                                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">D.O.B</p>
                                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[500] pt-2">{data?.data?.cusDetail?.dateOfBirth}</p>
                                            </div>
                                        </div>

                                        <div className="pb-2">
                                            <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">Email
                                                Address</p>
                                            <p className="text-[16px] leading-5 text-[#4A5D58] font-[500] pt-2">{data?.data?.cusDetail?.emailAddress}</p>
                                        </div>
                                        <div className="flex  space-x-12 py-2">
                                            <div>
                                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">Phone
                                                    Number</p>
                                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[500] pt-2">{data?.data?.cusDetail?.phoneNumber}</p>
                                            </div>
                                            <div>
                                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">BVN</p>
                                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[500] pt-2">{data?.data?.cusDetail?.bvn}</p>
                                            </div>
                                        </div>
                                        <div className="flex space-x-12 py-2">
                                            <div>
                                                <p className="text-[16px] leading-5 text-[#FF0909] font-[600]">Original
                                                    Loan Tenor</p>
                                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[500] pt-2">{data?.data?.cusDetail?.initialTenorValue}</p>
                                            </div>
                                            <div>
                                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">New
                                                    Tenor<span className="text-[10px] font-[600]">(Customer's request)</span></p>
                                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[500] pt-2">{data?.data?.cusDetail?.tenorValue}</p>
                                            </div>
                                        </div>
                                        <div className="flex space-x-12 pt-2">
                                            <div>
                                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">Loan
                                                    Amount</p>
                                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[500] pt-2">&#8358;{formatAmount(data?.data?.cusDetail?.loanAmount)}</p>
                                            </div>
                                            <div>
                                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">Date
                                                    Submitted</p>
                                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[500] pt-2">{dayjs(data?.data?.cusDetail?.dateSubmitted).format("YYYY/MM/DD")}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-8">
                                        <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pb-3">Comment</p>
                                        <textarea id="message" name="message" rows="3" cols="50"
                                                  value={data?.data?.cusDetail?.comment === "" ?comment : data?.data?.cusDetail?.comment}
                                                  disabled={status === "view"}
                                                  onChange={handleChange}
                                                  placeholder="Add comment"
                                                  className="font-medium w-full text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                        ></textarea>
                                    </div>
                                    <div>
                                        <div className="flex items-center cursor-pointer md:w-[250px] mt-12"
                                             style={{
                                                 border: "1px solid #4A5D58",
                                                 padding: "10px 15px",
                                             }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                 viewBox="0 0 20 20"
                                                 fill="none">
                                                <path
                                                    d="M3.33325 10.8333V15.8333C3.33325 16.2754 3.50885 16.6993 3.82141 17.0118C4.13397 17.3244 4.55789 17.5 4.99992 17.5H14.9999C15.4419 17.5 15.8659 17.3244 16.1784 17.0118C16.491 16.6993 16.6666 16.2754 16.6666 15.8333V10.8333M9.99992 2.5V12.5M9.99992 12.5L7.08325 9.58333M9.99992 12.5L12.9166 9.58333"
                                                    stroke="#4A5D58"
                                                    strokeWidth="1.25"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                            <p className="text-[16px] leading-5 font-[Inter] text-[#4A5D58] font-[600] pl-3">View
                                                Bank Statement</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-6/12 ml-8 mt-6">
                                    <div>
                                        <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">Existing Repayment
                                            Schedule</p>
                                        <div className="scroll-container h-[220px] rounded-[10px] my-3 px-8 py-4" style={{
                                            border: "1px solid #C9D4D1",
                                            background: "#FFF",
                                            boxShadow: "0px 6px 19px 0px rgba(0, 0, 0, 0.15)"
                                        }}>
                                            <div>
                                                <table className="table-auto md:w-full px-20">
                                                    <thead>
                                                    <tr>
                                                        <th className="px-10 py-2 text-[16px] font-medium leading-4 tracking-wider text-[#4A5D58] truncate text-left border-b bg-gray-50">
                                                            Repayment Date
                                                        </th>
                                                        <th className="px-10 py-2 text-[16px] font-medium leading-4 tracking-wider text-[#4A5D58] text-left border-b truncate bg-gray-50">
                                                            Amount
                                                        </th>
                                                    </tr>
                                                    </thead>
                                                    <tbody className="bg-white">
                                                    {
                                                        data?.data?.oldrepaymentSchedule && data?.data?.oldrepaymentSchedule.map((item, index) => (
                                                            <tr key={index}>
                                                                <td className="px-10 py-2 whitespace-no-wrap border-b border-gray-200">
                                                                    <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{dayjs(item?.monthlyRepaymentDate).format("YYYY/MM/DD")}</span>
                                                                </td>
                                                                <td className="px-10 py-2 whitespace-no-wrap border-b border-gray-200">
                                                                    <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">&#8358;{formatRepayment(item?.monthlyRepaymentLoanAmount)}</span>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">New Repayment
                                                Schedule</p>
                                            <div className="scroll-container h-[220px] rounded-[10px] my-4 px-8 py-4" style={{
                                                border: "1px solid #C9D4D1",
                                                background: "#FFF",
                                                boxShadow: "0px 6px 19px 0px rgba(0, 0, 0, 0.15)"
                                            }}>
                                                <div>
                                                    <table className="table-auto md:w-full px-20">
                                                        <thead>
                                                        <tr>
                                                            <th className="px-10 py-2 text-[16px] font-medium leading-4 tracking-wider text-[#4A5D58] truncate text-left border-b bg-gray-50">
                                                                Repayment Date
                                                            </th>
                                                            <th className="px-10 py-2 text-[16px] font-medium leading-4 tracking-wider text-[#4A5D58] text-left border-b truncate bg-gray-50">
                                                                Amount
                                                            </th>
                                                        </tr>
                                                        </thead>
                                                        <tbody className="bg-white">
                                                        {
                                                            data?.data?.repaymentSchedule && data?.data?.repaymentSchedule.map((item, index) => (
                                                                <tr key={index}>
                                                                    <td className="px-10 py-2 whitespace-no-wrap border-b border-gray-200">
                                                                        <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{dayjs(item?.monthlyRepaymentDate).format("YYYY/MM/DD")}</span>
                                                                    </td>
                                                                    <td className="px-10 py-2 whitespace-no-wrap border-b border-gray-200">
                                                                        <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">&#8358;{formatRepayment(item?.monthlyRepaymentAmount)}</span>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    {
                                        status === "review" && (
                                            <div className="flex float-right space-x-3 my-4">
                                                <Button variant="primary" bgColor="#00C795" borderRadius="4px" height="37px"
                                                        size='md'
                                                        as={ReactLink} w={'110px'} onClick={handleApprove}>
                                                    <Text color="white">Approve</Text>
                                                </Button>
                                                <Button variant="primary" bgColor="#1781BC" borderRadius="4px" height="37px"
                                                        size='md'
                                                        as={ReactLink} w={'110px'} onClick={() => setOpenAdjust(true)}>
                                                    <Text color="white">Adjust</Text>
                                                </Button>
                                                <Button variant="outline" borderColor="#FF0909" marginRight="10px"
                                                        border={"1px solid #FF0909"} borderRadius="4px" height="37px"
                                                        size='md' as={ReactLink} w={'110px'} onClick={() => setOpen(true)}>
                                                    <Text color="#FF0909">Decline</Text>
                                                </Button>
                                            </div>
                                        )
                                    }
                                    {
                                        status === "approve" && (
                                            <div className="flex float-right space-x-3 my-4">
                                                <Button variant="primary" bgColor="#00C796" borderRadius="4px" height="37px"
                                                        size='md'
                                                        as={ReactLink} w={'110px'} onClick={handleDisburse}>
                                                    <Text color="white">Disburse</Text>
                                                </Button>
                                                <Button variant="primary" bgColor="#005F47" borderRadius="4px" height="37px"
                                                        size='md'
                                                        as={ReactLink} w={'110px'} onClick={handleReturn}>
                                                    <Text color="white">Return</Text>
                                                </Button>
                                                <Button variant="outline" borderColor="#FF0909" marginRight="10px"
                                                        border={"1px solid #FF0909"} borderRadius="4px" height="37px"
                                                        size='md' as={ReactLink} w={'110px'} onClick={() => setOpen(true)}>
                                                <Text color="#FF0909">Decline</Text>
                                                </Button>
                                            </div>
                                        )
                                    }
                                    {
                                        status === "edit" && (
                                            <div className="flex space-x-3 float-right my-8">
                                                <Button variant="primary" bgColor="#007BEC" borderRadius="4px"
                                                        height="37px" size='md' as={ReactLink} w={'100px'}
                                                        onClick={()=>setOpenModify(true)}>
                                                    <Text color="white">Modify</Text>
                                                </Button>
                                                <Button variant="primary" bgColor="#00C795" borderRadius="4px"
                                                        height="37px" size='md' as={ReactLink} w={'150px'}
                                                        onClick={handleComplete}>
                                                    <Text color="white">Complete Review</Text>
                                                </Button>
                                                <Button variant="outline" borderColor="#FF0909" marginRight="10px"
                                                        border={"1px solid #FF0909"} borderRadius="4px" height="37px"
                                                        size='md' as={ReactLink} w={'109px'}
                                                        onClick={() => setOpen(true)}>
                                                    <Text color="#FF0909">Decline</Text>
                                                </Button>
                                            </div>
                                        )
                                    }
                                    {
                                        status === "disburse" && (
                                            <div className="float-right my-4">
                                                <Button variant="primary" bgColor="#00C795" borderRadius="4px" height="37px" size='md'
                                                        as={ReactLink} w={'190px'} onClick={handleStop}>
                                                    <Text color="white">Stop Disbursement</Text>
                                                </Button>
                                            </div>
                                        )
                                    }
                                    {
                                        status === "adjust" && (
                                            <div className="flex float-right space-x-3 my-8">
                                                <Button variant="primary" bgColor="#00C795" borderRadius="4px" height="37px" size='md'
                                                        as={ReactLink} w={'110px'} onClick={handleComplete}>
                                                    <Text color="white">Review</Text>
                                                </Button>
                                                <Button variant="outline" borderColor="#FF0909" marginRight="10px"
                                                        border={"1px solid #FF0909"} borderRadius="4px" height="37px"
                                                        size='md' as={ReactLink} w={'110px'} onClick={() => setOpen(true)}>
                                                    <Text color="#FF0909">Decline</Text>
                                                </Button>
                                            </div>
                                        )
                                    }
                                    {
                                        status === "view" && ( <div className="flex space-x-3 float-right my-8">
                                            <Button variant="primary" onClick={() => router(-1)} bgColor="#384642"
                                                    borderRadius="4px"
                                                    height="37px" size='md' as={ReactLink} w={'109px'}>
                                                <Text color="white">Close</Text>
                                            </Button>
                                        </div>)
                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                }
            </div>

            {/*<ApproveLoanModal open={open} setOpen={setOpen} comment={comment}/>*/}
            <DeclineApplicationModal open={open} setOpen={setOpen} id={appId}/>
            <StopDisbursementModal open={openComplete} setOpen={setOpenComplete} title={"Loan review completed"}
                                   handleRoute={() => router('/loanApp/loanRestructuring')}/>
            <StopDisbursementModal open={openApprove} setOpen={setOpenApprove} title={"Loan approved successfully"} handleRoute={()=>router('/loanUnderwriting/approval')}/>

            <AdjustLoanModal open={openAdjust} setOpen={setOpenAdjust} inputs={inputs} setInputs={setInputs} handleSubmit={handleAdjust}/>
            <StopDisbursementModal open={openDisburse} setOpen={setOpenDisburse} title={"Disbursement Cancelled"} handleRoute={()=>router('/loanUnderwriting/disbursement')}/>
            <ModifyRestructuringModal open={openModify} setOpen={setOpenModify} inputs={modifyInputs} setInputs={setModifyInputs} file={file} setFile={setFile} handleSubmit={handleModify}/>
        </Layout>
    );
};

export default ViewLoanRestructuringPage;