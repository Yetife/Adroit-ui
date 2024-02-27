import {useState} from 'react';
import {Link as ReactLink, useNavigate} from "react-router-dom";
import Layout from "../Layout.jsx";
import {TabContext} from "@mui/lab";
import HorizontalMenu from "../../components/reusables/HorizontalMenu.jsx";
import {Button, Text} from "@chakra-ui/react";
import DeclineApplicationModal from "../../components/loanApplication/DeclineApplicationModal.jsx";
import {
    useAdjustApplicationMutation, useApproveApplicationMutation, useReturnApplicationMutation,
} from "../../store/features/loanApplication/api.js";
import {CircularProgress, ThemeProvider} from "@mui/material";
import themes from "../../components/reusables/theme.jsx";
import LoanInformation from '../LoanApplication/LoanInformation.jsx';
import LoanNanoReport from '../LoanApplication/LoanNanoReport.jsx';
import LoanBankStatement from '../LoanApplication/LoanBankStatement.jsx';
import LoanActivity from '../LoanApplication/LoanActivity.jsx';
import LoanRepaymentDetails from '../LoanApplication/LoanRepaymentDetails.jsx';
import LoanSupportingDocument from '../LoanApplication/LoanSupportingDocument.jsx';
import LoanComments from './LoanComments.jsx';
import AddCommentModal from '../../components/loanUnderwritting/review/AddCommentModal.jsx';
import AdjustLoanModal from '../../components/loanUnderwritting/review/AdjustLoanModal.jsx';
import StopDisbursementModal from '../../components/loanUnderwritting/disbursement/StopDisbursementModal.jsx';
import DecisionModal from '../../components/loanUnderwritting/approval/DecisionModal.jsx';
import ReassignModal from '../../components/loanUnderwritting/loanReassignment/ReassignModal.jsx';
import {useDisburseApplicationMutation, useGetReviewCustomerDetailsQuery, useStopDisbursementMutation } from '../../store/features/loanUnderwriting/api.js';
import { useDispatch } from 'react-redux';
import {updateSnackbar} from "../../store/snackbar/reducer.js";

const ViewApprovalLoanPage = () => {
    const [comment, setComment] = useState("")
    const [openComment, setOpenComment] = useState(false)
    const [openAdjust, setOpenAdjust] = useState(false)
    const [open, setOpen] = useState(false)
    const [openReassign, setOpenReassign] = useState(false)
    const [openDisburse, setOpenDisburse] = useState(false)
    const [openDecision, setOpenDecision] = useState(false)
    const [openComplete, setOpenComplete] = useState(false)
    const [inputs, setInputs] = useState({
        amount: "",
        tenor: "",
        description: ""
    })
    const queryParams = new URLSearchParams(location.search);
    const custId = queryParams.get("id");
    const appId = queryParams.get("aid");
    const type = queryParams.get('type');
    const {data, isFetching, error} = useGetReviewCustomerDetailsQuery(custId)
    const status = queryParams.get("status");
    const [approve] = useApproveApplicationMutation()
    const [adjust] = useAdjustApplicationMutation()
    const [returnApp] = useReturnApplicationMutation()
    const [disburseApp] = useDisburseApplicationMutation()
    const [stopDisburse] = useStopDisbursementMutation()

    const dispatch = useDispatch()
    const tabMenu = [
        {id:0, name:'Information'},
        {id:1, name:'CRC Nano Report'},
        {id:2, name:'Bank Statement'},
        {id:3, name:'Activity'},
        {id:4, name:'Repayment Details'},
        {id:5, name:'Supporting Documents'},
        {id:6, name:'Comments'},
    ];

    const components = {
        'information':{
            component: <LoanInformation data={data}/>,
            step: 0
        },
        'crc nano report':{
            component: <LoanNanoReport data={data}/>,
            step: 1
        },
        'bank statement':{
            component: <LoanBankStatement />,
            step: 2
        },
        'activity':{
            component: <LoanActivity />,
            step: 3
        },
        'repayment details':{
            component: <LoanRepaymentDetails />,
            step: 4
        },
        'supporting documents':{
            component: <LoanSupportingDocument />,
            step: 5
        },
        'comments':{
            component: <LoanComments />,
            step: 6
        },
    }

    const [currentTab, setActiveTab] = useState(0);
    const [item, setItem] = useState('information');
    const router = useNavigate()

    const handleChange = (event,newValue) => {
        if (newValue >= 0 && newValue < tabMenu.length) {
            setItem(tabMenu[newValue].name);
            setActiveTab(newValue);
        } else {
            console.error('Invalid tab index:', newValue);
        }
    };

    const handleOpen = () => {
        setOpen(true)
    }
    const handleApprove = () => {
        approve({
            body: {
                loanApplicationId: appId,
                loanCategory: "Regular Loan"
            }
        }).then(res => {
            setOpenComplete(true)
        }).catch(err =>{
            setOpenComplete(false)
        })
    }

    const handleStop = () => {
        stopDisburse({
            body: {
                loanApplicationId: appId,
                loanCategory: "Regular Loan"
            }
        }).then(res => {
            setOpenDisburse(true)
        }).catch(err =>{
            setOpenDisburse(false)
        })
    }
    const handleReturn = () => {
        returnApp({
            body: {
                loanApplicationId: appId,
                loanCategory: type ===  "Regular Loan"
            }
        }).then(res => {
            router('/loanUnderwriting/approval')
        }).catch(err =>{
            setOpenComplete(false)
        })
    }
    const handleDisburse = () => {
        disburseApp({
            body: {
                loanApplicationId: appId,
                loanCategory: "Regular Loan"
            }
        }).then(res => {
            router('/loanUnderwriting/disbursement')
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
                loanCategory:  "Regular Loan"
            }
        }).then(res => {
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: res.data.message,success:true}));
            setOpenAdjust(!open)
            router('/loanApp/adjust')
        }).catch(err =>{
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message:err.data.message,success:false}));
        })
    }

    return (
        <Layout>
             <div>
                {
                    isFetching ? <ThemeProvider theme={themes}>
                        <CircularProgress color={"waveGreen"} sx={{display: "flex", margin: "auto", justifyContent: "center" }}/>
                    </ThemeProvider> : <div>
                        {
                            status === "review" && <div className="flex justify-between px-0 pb-1 md:pt-1 overflow-auto">
                                <div></div>
                                <div>
                                    <Button variant="primary" bgColor="#00C795" borderRadius="4px"
                                            height="37px" size='md' as={ReactLink} w={'129px'} onClick={()=>setOpenComment(true)}>
                                        <Text color="white">Add Comment</Text>
                                    </Button>
                                </div>
                            </div>
                        }
                        {
                            status === "approve" && <div className="flex justify-between px-0 pb-2 md:pt-1 overflow-auto">
                                <div></div>
                                <div>
                                    <Button variant="primary" bgColor="#FF0909" borderRadius="4px"
                                            height="37px" size='md' as={ReactLink} w={'119px'} onClick={()=>setOpenDecision(true)}>
                                        <Text color="white">Decide</Text>
                                    </Button>
                                </div>
                            </div>
                        }
                        <div
                            className="custom-scroll-bar min-w-full align-middle c-border w-full shadow-xl sm:rounded-lg mt-12 overflow-auto h-[613px]">
                            <div className=" px-10">
                                <TabContext value={currentTab.toString()}>
                                    <HorizontalMenu activeTab={currentTab} handleChange={handleChange} tabMenu={tabMenu}/>
                                </TabContext>
                            </div>
                            <div className={'mt-4 pb-12 px-12'}>
                                {components[item.toLowerCase()].component}
                            </div>
                        </div>
                        <div className="flex justify-between items-center px-0 pb-2 md:pt-3 overflow-x-auto">
                            <div>
                                {
                                    status === "review" && (
                                        <div className="flex space-x-3 my-4">
                                            <Button variant="primary" bgColor="#00C795" borderRadius="4px" height="37px" size='md'
                                                    as={ReactLink} w={'110px'} onClick={handleApprove}>
                                                <Text color="white">Approve</Text>
                                            </Button>
                                            <Button variant="primary" bgColor="#1781BC" borderRadius="4px" height="37px" size='md'
                                                    as={ReactLink} w={'110px'} onClick={()=>setOpenAdjust(true)}>
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
                                        <div className="flex space-x-3 my-4">
                                            <Button variant="primary" bgColor="#00C796" borderRadius="4px" height="37px" size='md'
                                                    as={ReactLink} w={'110px'} onClick={handleDisburse}>
                                                <Text color="white">Disburse</Text>
                                            </Button>
                                            <Button variant="primary" bgColor="#005F47" borderRadius="4px" height="37px" size='md'
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
                                    status === "disburse" && (
                                        <div className="my-4">
                                            <Button variant="primary" bgColor="#00C795" borderRadius="4px" height="37px" size='md'
                                                    as={ReactLink} w={'190px'} onClick={handleStop}>
                                                <Text color="white">Stop Disbursement</Text>
                                            </Button>
                                        </div>
                                    )
                                }
                                {
                                    status === "reassign" && (
                                        <div className="my-4">
                                            <Button variant="primary" bgColor="#FF0909" borderRadius="4px" height="37px" size='md'
                                                    as={ReactLink} w={'130px'} onClick={()=>setOpenReassign(true)}>
                                                <Text color="white">Re-assign</Text>
                                            </Button>
                                        </div>
                                    )
                                }
                            </div>
                            <div>
                                <div>
                                    <Button variant="primary" onClick={() => router(-1)} bgColor="#4A5D58" borderRadius="4px"
                                            height="37px" size='md' as={ReactLink} w={'109px'}>
                                        <Text color="white">Back</Text>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>

            <DeclineApplicationModal open={open} setOpen={setOpen}/>
            <AddCommentModal open={openComment} setOpen={setOpenComment} comment={comment} setComment={setComment}/>
            <AdjustLoanModal open={openAdjust} setOpen={setOpenAdjust} inputs={inputs} setInputs={setInputs} handleSubmit={handleAdjust}/>
            <StopDisbursementModal open={openDisburse} setOpen={setOpenDisburse} title={"Disbursement Cancelled"} handleRoute={()=>router('/loanUnderwriting/disbursement')}/>
            <StopDisbursementModal open={openComplete} setOpen={setOpenComplete} title={"Loan approved successfully"} handleRoute={()=>router('/loanUnderwriting/approval')}/>
            <DecisionModal open={openDecision} setOpen={setOpenDecision}/>
            <ReassignModal open={openReassign} setOpen={setOpenReassign}/>
        </Layout>
    );
};

export default ViewApprovalLoanPage;