import {useState} from 'react';
import {useCompleteReviewMutation, useGetCustomerDetailsQuery} from "../../store/features/loanApplication/api.js";
import {Link as ReactLink, useNavigate} from "react-router-dom";
import Layout from "../Layout.jsx";
import {CircularProgress, ThemeProvider} from "@mui/material";
import themes from "../../components/reusables/theme.jsx";
import {TabContext} from "@mui/lab";
import HorizontalMenu from "../../components/reusables/HorizontalMenu.jsx";
import {Button, Text} from "@chakra-ui/react";
import DeclineApplicationModal from "../../components/loanApplication/DeclineApplicationModal.jsx";
import StopDisbursementModal from "../../components/loanUnderwritting/disbursement/StopDisbursementModal.jsx";
import LoanDetails from "./LoanDetails.jsx";
import RepaymentBreakdown from "./RepaymentBreakdown.jsx";
import Transactions from "./Transactions.jsx";
import LoanHistory from "./LoanHistory.jsx";
import SupportingDocument from "./SupportingDocument.jsx";

const RepaymentDetails = () => {
    const [open, setOpen] = useState(false)
    const queryParams = new URLSearchParams(location.search);
    const custId = queryParams.get("id");
    const appId = queryParams.get("aid");
    // const {data, isFetching, error} = useGetCustomerDetailsQuery(custId)
    const status = queryParams.get("status");
    const [openComplete, setOpenComplete] = useState(false)
    const [completeReview] = useCompleteReviewMutation()

    const tabMenu = [
        {id:0, name:'Loan Details'},
        {id:1, name:'Repayment Breakdown'},
        {id:2, name:'Transactions'},
        {id:3, name:'Loan History'},
        {id:4, name:'Supporting Documents'},
    ];

    const components = {
        'loan details':{
            component: <LoanDetails />,
            step: 0
        },
        'repayment breakdown':{
            component: <RepaymentBreakdown />,
            step: 1
        },
        'transactions':{
            component: <Transactions />,
            step: 2
        },
        'loan history':{
            component: <LoanHistory />,
            step: 3
        },
        'supporting documents':{
            component: <SupportingDocument />,
            step: 4
        },
    }

    const [currentTab, setActiveTab] = useState(0);
    const [item, setItem] = useState('loan details');
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

    const handleComplete = () => {
        completeReview({
            body: {
                loanApplicationId: appId,
            }
        }).then(res => {
            setOpenComplete(true)
        }).catch(err =>{
            setOpenComplete(false)
        })
    }

    return (
        <Layout>
            <div>
                {
                    // isFetching ? <ThemeProvider theme={themes}>
                    //     <CircularProgress color={"waveGreen"} sx={{display: "flex", margin: "auto", justifyContent: "center" }}/>
                    // </ThemeProvider> :
                        <div>
                        <div className="custom-scroll-bar min-w-full align-middle c-border w-full shadow-xl sm:rounded-lg mt-12 overflow-auto h-[613px]">
                            <div>
                                <TabContext value={currentTab.toString()}>
                                    <HorizontalMenu activeTab={currentTab} handleChange={handleChange} tabMenu={tabMenu}/>
                                </TabContext>
                            </div>
                            <div className={'mt-8 pb-12 px-8'}>
                                {components[item.toLowerCase()].component}
                            </div>
                        </div>
                        <div className="flex float-right items-center px-0 py-4  pb-2 md:pt-3 overflow-x-auto">
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
            <DeclineApplicationModal open={open} setOpen={setOpen} id={appId}/>
            <StopDisbursementModal open={openComplete} setOpen={setOpenComplete} title={"Loan review completed"} handleRoute={()=>router('/loanApp/customer')}/>
        </Layout>
    );
};

export default RepaymentDetails;