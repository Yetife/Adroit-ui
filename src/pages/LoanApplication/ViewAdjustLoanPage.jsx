import {useState} from 'react';
import LoanInformation from "./LoanInformation.jsx";
import LoanNanoReport from "./LoanNanoReport.jsx";
import LoanBankStatement from "./LoanBankStatement.jsx";
import LoanActivity from "./LoanActivity.jsx";
import LoanRepaymentDetails from "./LoanRepaymentDetails.jsx";
import LoanSupportingDocument from "./LoanSupportingDocument.jsx";
import {Link as ReactLink, useNavigate} from "react-router-dom";
import Layout from "../Layout.jsx";
import {TabContext} from "@mui/lab";
import HorizontalMenu from "../../components/reusables/HorizontalMenu.jsx";
import {Button, Text} from "@chakra-ui/react";
import DeclineApplicationModal from "../../components/loanApplication/DeclineApplicationModal.jsx";
import LoanAdjustDetails from "./LoanAdjustDetails.jsx";
import {
    useCompleteReviewMutation,
    useGetAdjustCustomerDetailsQuery,
} from "../../store/features/loanApplication/api.js";
import {CircularProgress, ThemeProvider} from "@mui/material";
import themes from "../../components/reusables/theme.jsx";
import StopDisbursementModal from "../../components/loanUnderwritting/disbursement/StopDisbursementModal.jsx";
import {getPermission} from "../../components/reusables/getPermission.js";

const ViewAdjustLoanPage = () => {
    const [open, setOpen] = useState(false)
    const queryParams = new URLSearchParams(location.search);
    const custId = queryParams.get("id");
    const appId = queryParams.get("aid");
    const {data, isFetching, error} = useGetAdjustCustomerDetailsQuery(appId)
    const [rloading, setRLoading] = useState(false)
    const permissions = getPermission("Loan Application", "Adjust");


    // const {dataa} = useGetAdjustmentDetailsQuery(custId)
    const status = queryParams.get("status");
    const [openComplete, setOpenComplete] = useState(false)
    const [completeReview] = useCompleteReviewMutation()
    const tabMenu = [
        {id:0, name:'Information'},
        {id:1, name:'CRC Nano Report'},
        {id:2, name:'Bank Statement'},
        {id:3, name:'Activity'},
        {id:4, name:'Repayment Details'},
        {id:5, name:'Supporting Documents'},
        {id:6, name:'Adjustment'},
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
            component: <LoanBankStatement data={data}/>,
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
        'adjustment':{
            component: <LoanAdjustDetails data={data}/>,
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
    const handleComplete = () => {
        setRLoading(true)
        completeReview({
            body: {
                loanApplicationId: appId,
                loanCategory: "Regular loan",
                adjustedTenor: "",
                adjustedAmount: 0,
                comment: ""
            }
        }).then(res => {
            if (res.data.status === true){
                setRLoading(false)
                setOpenComplete(true)
            }
        }).catch(err =>{
            setOpenComplete(false)
        })
    }
    const handleOpen = () => {
        setOpen(true)
    }

    return (
        <Layout>
            <div>
            {
                isFetching ? <ThemeProvider theme={themes}>
                    <CircularProgress color={"waveGreen"} sx={{display: "flex", margin: "auto", justifyContent: "center" }}/>
                </ThemeProvider> : <div>
                    <div className="custom-scroll-bar min-w-full align-middle c-border w-full shadow-xl sm:rounded-lg mt-12 overflow-auto px-20 h-[613px]">
                        <div>
                            <TabContext value={currentTab.toString()}>
                                <HorizontalMenu activeTab={currentTab} handleChange={handleChange} tabMenu={tabMenu}/>
                            </TabContext>
                        </div>
                        <div className={'mt-8 pb-12'}>
                            {components[item.toLowerCase()].component}
                        </div>
                    </div>
                    <div className="flex justify-between items-center px-0 py-4  pb-2 md:pt-3 overflow-x-auto">
                        <div>
                            {
                                status === "adjust" && (
                                    <div className="flex space-x-3 my-8">
                                        {permissions.canReview && <Button variant="primary" bgColor="#00C795" borderRadius="4px" height="37px"
                                                 size='md'
                                                 as={ReactLink} w={'110px'} onClick={handleComplete}
                                                 isLoading={rloading} loadingText={"Reviewing"}>
                                            <Text color="white">Review</Text>
                                        </Button>}
                                        {permissions.canDecline && <Button variant="outline" borderColor="#FF0909" marginRight="10px"
                                                 border={"1px solid #FF0909"} borderRadius="4px" height="37px"
                                                 size='md' as={ReactLink} w={'110px'} onClick={handleOpen}>
                                            <Text color="#FF0909">Decline</Text>
                                        </Button>}
                                    </div>
                                )
                            }
                        </div>
                        <div>
                            {
                                status === "cust" && (
                                    <div className="flex space-x-3 my-8 float-right">
                                        {permissions.canDecline && <Button variant="outline" borderColor="#FF0909" marginRight="10px"
                                                 border={"1px solid #FF0909"} borderRadius="4px" height="37px"
                                                 size='md' as={ReactLink} w={'150px'} onClick={handleOpen}>
                                            <Text color="#FF0909">Decline Loan</Text>
                                        </Button>}
                                        {permissions.canReview && <Button variant="primary" bgColor="#00C795" borderRadius="4px" height="37px"
                                                 size='md'
                                                 as={ReactLink} w={'180px'} onClick={handleComplete}
                                                 isLoading={rloading} loadingText={"Reviewing"}>
                                            <Text color="white">Complete Review</Text>
                                        </Button>}

                                    </div>
                                )
                            }
                            {
                                status !== "cust" && (
                                    <div>
                                        <Button variant="primary" onClick={() => router(-1)} bgColor="#4A5D58" borderRadius="4px"
                                                height="37px" size='md' as={ReactLink} w={'109px'}>
                                            <Text color="white">Back</Text>
                                        </Button>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            }
            </div>
            <DeclineApplicationModal open={open} setOpen={setOpen} id={appId}/>
            <StopDisbursementModal open={openComplete} setOpen={setOpenComplete} title={"Loan review completed"} handleRoute={()=>router('/loanApp/adjust')}/>
        </Layout>
    );
};

export default ViewAdjustLoanPage;