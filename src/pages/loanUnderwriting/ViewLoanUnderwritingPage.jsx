import {useState} from 'react';
import LoanInformation from "../LoanApplication/LoanInformation.jsx";
import LoanNanoReport from "../LoanApplication/LoanNanoReport.jsx";
import LoanBankStatement from "../LoanApplication/LoanBankStatement.jsx";
import LoanActivity from "../LoanApplication/LoanActivity.jsx";
import LoanRepaymentDetails from "../LoanApplication/LoanRepaymentDetails.jsx";
import LoanSupportingDocument from "../LoanApplication/LoanSupportingDocument.jsx";
import {Link as ReactLink, useNavigate} from "react-router-dom";
import Layout from "../Layout.jsx";
import {TabContext} from "@mui/lab";
import HorizontalMenu from "../../components/reusables/HorizontalMenu.jsx";
import {Button, Text} from "@chakra-ui/react";
import DeclineApplicationModal from "../../components/loanApplication/DeclineApplicationModal.jsx";
import AddCommentModal from "../../components/loanUnderwritting/review/AddCommentModal.jsx";
import AdjustLoanModal from "../../components/loanUnderwritting/review/AdjustLoanModal.jsx";
import StopDisbursementModal from "../../components/loanUnderwritting/disbursement/StopDisbursementModal.jsx";
import DecisionModal from "../../components/loanUnderwritting/approval/DecisionModal.jsx";
import { useGetReviewCustomerDetailsQuery } from '../../store/features/loanUnderwriting/api.js';

const ViewLoanUnderwritingPage = () => {
    const [comment, setComment] = useState("")
    const [openComment, setOpenComment] = useState(false)
    const [openAdjust, setOpenAdjust] = useState(false)
    const [open, setOpen] = useState(false)
    const [openDisburse, setOpenDisburse] = useState(false)
    const [openDecision, setOpenDecision] = useState(false)
    const [inputs, setInputs] = useState({
        amount: "",
        tenor: "",
        description: ""
    })
    const queryParams = new URLSearchParams(location.search);
    const custId = queryParams.get("id");
    const appId = queryParams.get("aid");
    const {data, isFetching, error} = useGetReviewCustomerDetailsQuery(custId)
    const status = queryParams.get("status");
    const tabMenu = [
        {id:0, name:'Information'},
        {id:1, name:'CRC Nano Report'},
        {id:2, name:'Bank Statement'},
        {id:3, name:'Activity'},
        {id:4, name:'Repayment Details'},
        {id:5, name:'Supporting Documents'},
    ];

    const components = {
        'information':{
            component: <LoanInformation data={data}/>,
            step: 0
        },
        'crc nano report':{
            component: <LoanNanoReport/>,
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
            step: 3
        },
        'supporting documents':{
            component: <LoanSupportingDocument />,
            step: 3
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

    return (
        <Layout>
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
                className="custom-scroll-bar min-w-full align-middle c-border w-full shadow-xl sm:rounded-lg mt-12 overflow-auto px-20 h-[613px]">
                <div>
                    <TabContext value={currentTab.toString()}>
                        <HorizontalMenu activeTab={currentTab} handleChange={handleChange} tabMenu={tabMenu}/>
                    </TabContext>
                </div>
                <div className={'mt-8 pb-12'}>
                    {components[item.toLowerCase()].component}
                </div>
            </div>
            <div className="flex justify-between items-center px-0 pb-2 md:pt-3 overflow-x-auto">
                <div>
                    {
                        status === "review" && (
                            <div className="flex space-x-3 my-4">
                                <Button variant="primary" bgColor="#00C795" borderRadius="4px" height="37px" size='md'
                                        as={ReactLink} w={'110px'}>
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
                                        as={ReactLink} w={'110px'}>
                                    <Text color="white">Disburse</Text>
                                </Button>
                                <Button variant="primary" bgColor="#005F47" borderRadius="4px" height="37px" size='md'
                                        as={ReactLink} w={'110px'}>
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
                                        as={ReactLink} w={'190px'} onClick={()=>setOpenDisburse(true)}>
                                    <Text color="white">Stop Disbursement</Text>
                                </Button>
                            </div>
                        )
                    }
                    {
                        status === "reassign" && (
                            <div className="my-4">
                                <Button variant="primary" bgColor="#FF0909" borderRadius="4px" height="37px" size='md'
                                        as={ReactLink} w={'130px'}>
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
            <DeclineApplicationModal open={open} setOpen={setOpen}/>
            <AddCommentModal open={openComment} setOpen={setOpenComment} comment={comment} setComment={setComment}/>
            <AdjustLoanModal open={openAdjust} setOpen={setOpenAdjust} inputs={inputs} setInputs={setInputs}/>
            <StopDisbursementModal open={openDisburse} setOpen={setOpenDisburse} title={"Disbursement Cancelled"}/>
            <DecisionModal open={openDecision} setOpen={setOpenDecision}/>
        </Layout>
    );
};

export default ViewLoanUnderwritingPage;