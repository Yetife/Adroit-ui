import React, {useEffect, useState} from "react";
import {Link as ReactLink, useNavigate} from "react-router-dom";
import {
    useAdjustApplicationMutation,
    useApproveApplicationMutation,
    useCompleteReviewMutation, useDisburseApplicationMutation, useReturnApplicationMutation
} from "../../store/features/loanApplication/api.js";
import {
    useStopDisbursementMutation
} from "../../store/features/loanUnderwriting/api.js";
import {useDispatch, useSelector} from "react-redux";
import {fetchTopUpLoanDetails} from "../../store/documentationSlice.js";
import {updateSnackbar} from "../../store/snackbar/reducer.js";
import {getUserToken} from "../../services/storage/index.js";
import Layout from "../Layout.jsx";
import {CircularProgress, ThemeProvider} from "@mui/material";
import themes from "../../components/reusables/theme.jsx";
import {Button, Text} from "@chakra-ui/react";
import {formatAmount, formatRepayment} from "../../components/reusables/formatAmount.js";
import dayjs from "dayjs";
import DeclineApplicationModal from "../../components/loanApplication/DeclineApplicationModal.jsx";
import StopDisbursementModal from "../../components/loanUnderwritting/disbursement/StopDisbursementModal.jsx";
import AdjustLoanModal from "../../components/loanUnderwritting/review/AdjustLoanModal.jsx";
import ModifyTopUpModal from "../../components/loanApplication/loanTopup/ModifyTopUpModal.jsx";
import {getPermission} from "../../components/reusables/getPermission.js";

const ViewApprovalTopUpPage = () => {
    const [open, setOpen] = useState(false)
    const queryParams = new URLSearchParams(location.search);
    const appId = queryParams.get("id");
    const cId = queryParams.get("cid");
    // const {data, isFetching, error} = useGetLoanTopUpDetailQuery(appId)
    const router = useNavigate()
    const status = queryParams.get("status");
    const [comment, setComment] = useState("")
    const [openDisburse, setOpenDisburse] = useState(false)
    const [openAdjust, setOpenAdjust] = useState(false)
    const [openComplete, setOpenComplete] = useState(false)
    const [openApprove, setOpenApprove] = useState(false)
    const [dLoading, setDLoading] = useState(false)
    const [rLoading, setRLoading] = useState(false)
    const [completeReview] = useCompleteReviewMutation()
    const [approve] = useApproveApplicationMutation()
    const [adjust] = useAdjustApplicationMutation()
    const [returnApp] = useReturnApplicationMutation()
    const [disburseApp] = useDisburseApplicationMutation()
    const [stopDisburse] = useStopDisbursementMutation()
    const [file, setFile] = useState(null)

    const [inputs, setInputs] = useState({
        amount: "",
        tenor: "",
        description: ""
    })
    const dispatch = useDispatch()
    const [openModify, setOpenModify] = useState(false)
    const [modifyInputs, setModifyInputs] = useState({
        amount: "",
        tenor: "",
        description: ""
    })
    const data = useSelector((state) => state.documentation.topUpDetail);
    const loading = useSelector((state) => state.documentation.loading);
    const permissions = getPermission("Loan Underwriting", "Approval");


    useEffect(() => {
        dispatch(fetchTopUpLoanDetails(appId))
    }, []);
    const handleChange = (e) => {
        setComment(e.target.value)
    };

    const handleApprove = () => {
        approve({
            body: {
                loanApplicationId: appId,
                loanCategory: "Loan topup"
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
                adjustedTenor: data?.data?.cusDetail?.newLoanTopUpTenor ? data?.data?.cusDetail?.newLoanTopUpTenor : data?.data?.cusDetail?.tenor,
                adjustedAmount: data?.data?.cusDetail?.newLoanTopUpAmount ? data?.data?.cusDetail?.newLoanTopUpAmount : data?.data?.cusDetail?.initialLoanAmount,
                comment : comment,
                loanApplicationId: appId,
                loanCategory: "Loan topup"
            }
        }).then(res => {
            setOpenComplete(true)
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
                loanCategory: "Loan topup"
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
        setRLoading(true)
        returnApp({
            body: {
                loanApplicationId: appId,
                loanCategory: "Loan topup"
            }
        }).then(res => {
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: res.data.message,success:true}));
            if (res.data.status === true){
                setRLoading(false)
                router('/loanUnderwriting/approval')
            }
        }).catch(err =>{
            setOpenComplete(false)
        })
    }

    const handleStop = () => {
        stopDisburse({
            body: {
                loanApplicationId: appId,
                loanCategory: "Loan topup"
            }
        }).then(res => {
            setOpenDisburse(true)
        }).catch(err =>{
            setOpenDisburse(false)
        })
    }
    const handleDisburse = () => {
        setDLoading(true)
        disburseApp({
            body: {
                loanApplicationId: cId,
                loanCategory: "loantopup"
            }
        }).then(res => {
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: res.data.message,success:true}));
            if (res.data.status === true){
                setDLoading(false)
                router('/loanUnderwriting/approval')
            }else{
                dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: res.data.message,success:true}));
                setDLoading(false)
            }
            setDLoading(false)
        }).catch(err =>{
            setOpenComplete(false)
        })
    }
    const handleModify = async () => {
        try {
            const formData = new FormData();
            formData.append('AdjustedAmount', modifyInputs.amount);
            formData.append('AdjustedTenor', modifyInputs.tenor);
            formData.append('BankStatement', file);
            formData.append('Comment', comment);
            formData.append('LoanApplicationId', appId);
            formData.append('LoanCategory', 'Loan topup');
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
                dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: "Record adjusted successfully", success:true}));
                setOpenModify(false)
                dispatch(fetchTopUpLoanDetails(appId))
            }
        } catch (error) {
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message:error.data.message,success:false}));
        }
    }

    useEffect(() => {
        if (data) {
            setModifyInputs({
                amount:  data?.data?.cusDetail?.newLoanTopUpAmount ? data?.data?.cusDetail?.newLoanTopUpAmount : data?.data?.cusDetail?.initialLoanAmount,
                tenor: data?.data?.cusDetail?.newLoanTopUpTenor ? data?.data?.cusDetail?.newLoanTopUpTenor : data?.data?.cusDetail?.tenor,
            });
        }
    }, [data]);

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
                            className="custom-scroll-bar min-w-full align-middle h-[630px] c-border w-full shadow-xl overflow-auto sm:rounded-lg mt-4 px-12">
                            <div className="flex">
                                <div className="w-6/12">
                                    <p className="text-[20px] leading-5 text-[#4A5D58] font-[600]">Customer Details</p>
                                    <div className="rounded-[10px] my-4 p-8"
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

                                        <div className="py-4">
                                            <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">Email
                                                Address</p>
                                            <p className="text-[16px] leading-5 text-[#4A5D58] font-[500] pt-2">{data?.data?.cusDetail?.emailAddress}</p>
                                        </div>
                                        <div className="flex  space-x-8 py-4">
                                            <div>
                                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">Phone
                                                    Number</p>
                                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[500] pt-2">{data?.data?.cusDetail?.phoneNumber}</p>
                                            </div>
                                            <div>
                                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">BVN</p>
                                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[500] pt-2">{data?.data?.cusDetail?.bvn}</p>
                                            </div>
                                            <div>
                                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">Status</p>
                                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[500] pt-2">{data?.data?.cusDetail?.status}</p>
                                            </div>
                                        </div>
                                        <div className="flex  space-x-8 py-4">
                                            <div>
                                                <p className="text-[16px] leading-5 text-[#FF0909] font-[600]">Original
                                                    Loan Amount</p>
                                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[500] pt-2">&#8358;{formatAmount(data?.data?.cusDetail?.initialLoanAmount)}</p>
                                            </div>
                                            <div>
                                                <p className="text-[16px] leading-5 text-[#FF0909] font-[600]">Original
                                                    Loan Tenor</p>
                                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[500] pt-2">{data?.data?.cusDetail?.tenor}</p>
                                            </div>

                                        </div>
                                        <div className="flex space-x-8 py-4">
                                            <div>
                                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] truncate">New
                                                    Loan Amount</p>
                                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[500] pt-2">&#8358;{data?.data?.cusDetail?.newLoanTopUpAmount ? formatAmount(data?.data?.cusDetail?.newLoanTopUpAmount) : formatAmount(data?.data?.cusDetail?.initialLoanAmount)}</p>
                                            </div>
                                            <div>
                                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">New Loan
                                                    Tenor</p>
                                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[500] pt-2">{data?.data?.cusDetail?.newLoanTopUpTenor ? data?.data?.cusDetail?.newLoanTopUpTenor : data?.data?.cusDetail?.tenor}</p>
                                            </div>
                                        </div>
                                        <div className="flex  space-x-8 pt-4">
                                            {/*<div>*/}
                                            {/*    <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">Top-up*/}
                                            {/*        Amount</p>*/}
                                            {/*    <p className="text-[16px] leading-5 text-[#4A5D58] font-[500] pt-2">&#8358;{formatAmount(data?.data?.cusDetail?.topUpAmount)}</p>*/}
                                            {/*</div>*/}
                                            <div>
                                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] truncate">Date
                                                    Submitted</p>
                                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[500] pt-2">{dayjs(data?.data?.cusDetail?.dateSubmitted).format("YYYY/MM/DD")}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center cursor-pointer"
                                             style={{
                                                 border: "1px solid #4A5D58",
                                                 padding: "10px 15px",
                                                 width: "230px"
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
                                            <p className="text-[15px] leading-5 font-[Inter] text-[#4A5D58] font-[600] pl-3">View
                                                Bank Statement</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-6/12 ml-8 mt-8">
                                    <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">Repayment
                                        Schedule</p>
                                    <div className="scroll-container h-[300px] rounded-[10px] my-3 p-8" style={{
                                        border: "1px solid #C9D4D1",
                                        background: "#FFF",
                                        boxShadow: "0px 6px 19px 0px rgba(0, 0, 0, 0.15)"
                                    }}>
                                        <div>
                                            <table className="table-auto md:w-full px-20">
                                                <thead>
                                                <tr>
                                                    <th className="px-10 py-3 text-[16px] font-medium leading-4 tracking-wider text-[#4A5D58] truncate text-left border-b bg-gray-50">
                                                        Repayment Date
                                                    </th>
                                                    <th className="px-10 py-3 text-[16px] font-medium leading-4 tracking-wider text-[#4A5D58] text-left border-b truncate bg-gray-50">
                                                        Amount
                                                    </th>
                                                </tr>
                                                </thead>
                                                <tbody className="bg-white">
                                                {
                                                    data?.data?.repaymentSchedule.map((item, index) => (
                                                        <tr key={index}>
                                                            <td className="px-10 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <span
                                                    className="text-[16px] leading-5 text-[#4A5D58] font-medium">{dayjs(item?.monthlyRepaymentDate).format("YYYY/MM/DD")}</span>
                                                            </td>
                                                            <td className="px-10 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <span
                                                    className="text-[16px] leading-5 text-[#4A5D58] font-medium">&#8358;{formatRepayment(item?.monthlyRepaymentAmount)}</span>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="mt-8">
                                        <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pb-3">Comment</p>
                                        <textarea id="message" name="message" rows="4" cols="50"
                                                  value={data?.data?.cusDetail?.comment === "" ?comment : data?.data?.cusDetail?.comment}
                                                  disabled={status === "view"}
                                                  onChange={handleChange}
                                                  placeholder="Add comment"
                                                  className="font-medium w-full text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                        ></textarea>
                                    </div>
                                    {
                                        status === "review" && (
                                            <div className="flex float-right space-x-3 my-4">
                                                {permissions.canApprove && <Button variant="primary" bgColor="#00C795" borderRadius="4px"
                                                         height="37px" size='md'
                                                         as={ReactLink} w={'110px'} onClick={handleApprove}>
                                                    <Text color="white">Approve</Text>
                                                </Button>}
                                                {permissions.canAdjust && <Button variant="primary" bgColor="#1781BC" borderRadius="4px"
                                                         height="37px" size='md'
                                                         as={ReactLink} w={'110px'} onClick={() => setOpenAdjust(true)}>
                                                    <Text color="white">Adjust</Text>
                                                </Button>}
                                                {permissions.canDecline && <Button variant="outline" borderColor="#FF0909" marginRight="10px"
                                                         border={"1px solid #FF0909"} borderRadius="4px" height="37px"
                                                         size='md' as={ReactLink} w={'110px'}
                                                         onClick={() => setOpen(true)}>
                                                    <Text color="#FF0909">Decline</Text>
                                                </Button>}
                                            </div>
                                        )
                                    }
                                    {
                                        status === "approve" && (
                                            <div className="flex float-right space-x-3 my-4">
                                                {permissions.canDisburse && <Button variant="primary" bgColor="#00C796" borderRadius="4px"
                                                         height="37px" size='md'
                                                         as={ReactLink} w={'110px'} onClick={dLoading? "" : handleDisburse}
                                                         isLoading={dLoading} loadingText='Disbursing'>
                                                    <Text color="white">Disburse</Text>
                                                </Button>}
                                                {permissions.canReturn && <Button variant="primary" bgColor="#005F47" borderRadius="4px"
                                                         height="37px" size='md'
                                                         as={ReactLink} w={'110px'} onClick={handleReturn}
                                                         isLoading={rLoading}>
                                                    <Text color="white">Return</Text>
                                                </Button>}
                                                {permissions.canDecline && <Button variant="outline" borderColor="#FF0909" marginRight="10px"
                                                         border={"1px solid #FF0909"} borderRadius="4px" height="37px"
                                                         size='md' as={ReactLink} w={'110px'}
                                                         onClick={() => setOpen(true)}>
                                                    <Text color="#FF0909">Decline</Text>
                                                </Button>}
                                            </div>
                                        )
                                    }
                                    {
                                        status === "edit" && (
                                            <div className="flex space-x-3 float-right my-8">
                                                {permissions.canModify && <Button variant="primary" bgColor="#007BEC" borderRadius="4px"
                                                         height="37px" size='md' as={ReactLink} w={'100px'}
                                                         onClick={() => setOpenModify(true)}>
                                                    <Text color="white">Modify</Text>
                                                </Button>}
                                                {permissions.canReview && <Button variant="primary" bgColor="#00C795" borderRadius="4px"
                                                         height="37px" size='md' as={ReactLink} w={'150px'}
                                                         onClick={handleComplete}>
                                                    <Text color="white">Complete Review</Text>
                                                </Button>}
                                                {permissions.canDecline && <Button variant="outline" borderColor="#FF0909" marginRight="10px"
                                                         border={"1px solid #FF0909"} borderRadius="4px" height="37px"
                                                         size='md' as={ReactLink} w={'109px'}
                                                         onClick={() => setOpen(true)}>
                                                    <Text color="#FF0909">Decline</Text>
                                                </Button>}
                                            </div>
                                        )
                                    }
                                    {
                                        status === "disburse" && (
                                            <div className="float-right my-4">
                                                {permissions.canStopDisbursement && <Button variant="primary" bgColor="#00C795" borderRadius="4px"
                                                         height="37px" size='md'
                                                         as={ReactLink} w={'190px'} onClick={handleStop}>
                                                    <Text color="white">Stop Disbursement</Text>
                                                </Button>}
                                            </div>
                                        )
                                    }
                                    {
                                        status === "adjust" && (
                                            <div className="flex float-right space-x-3 my-8">
                                                {permissions.canReview && <Button variant="primary" bgColor="#00C795" borderRadius="4px"
                                                         height="37px" size='md'
                                                         as={ReactLink} w={'110px'} onClick={handleComplete}>
                                                    <Text color="white">Review</Text>
                                                </Button>}
                                                {permissions.canDecline && <Button variant="outline" borderColor="#FF0909" marginRight="10px"
                                                         border={"1px solid #FF0909"} borderRadius="4px" height="37px"
                                                         size='md' as={ReactLink} w={'110px'}
                                                         onClick={() => setOpen(true)}>
                                                    <Text color="#FF0909">Decline</Text>
                                                </Button>}
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
            <DeclineApplicationModal open={open} setOpen={setOpen} id={appId}/>
            <StopDisbursementModal open={openComplete} setOpen={setOpenComplete} title={"Loan review completed"}
                                   handleRoute={() => router('/loanApp/loanTopUp')}/>
            <StopDisbursementModal open={openApprove} setOpen={setOpenApprove} title={"Loan approved successfully"} handleRoute={()=>router('/loanUnderwriting/review')}/>
            <AdjustLoanModal open={openAdjust} setOpen={setOpenAdjust} inputs={inputs} setInputs={setInputs} handleSubmit={handleAdjust}/>
            <StopDisbursementModal open={openDisburse} setOpen={setOpenDisburse} title={"Disbursement Cancelled"} handleRoute={()=>router('/loanUnderwriting/disbursement')}/>
            <ModifyTopUpModal open={openModify} setOpen={setOpenModify} inputs={modifyInputs} setInputs={setModifyInputs} file={file} setFile={setFile} handleSubmit={handleModify}/>
        </Layout>
    );
};

export default ViewApprovalTopUpPage;