import {useEffect, useState} from 'react';
import {Button, Stack, Text} from "@chakra-ui/react";
import {Link as ReactLink, useNavigate} from "react-router-dom";
import Layout from '../Layout.jsx'
import LoanInformation from "./LoanInformation.jsx";
import LoanNanoReport from "./LoanNanoReport.jsx";
import LoanBankStatement from "./LoanBankStatement.jsx";
import LoanActivity from "./LoanActivity.jsx";
import LoanRepaymentDetails from "./LoanRepaymentDetails.jsx";
import LoanSupportingDocument from "./LoanSupportingDocument.jsx";
import HorizontalMenu from "../../components/reusables/HorizontalMenu.jsx";
import {TabContext} from "@mui/lab";
import DeclineApplicationModal from "../../components/loanApplication/DeclineApplicationModal.jsx";
import {
    useCompleteReviewMutation,
    useGetCustomerDetailsQuery, useGetSOAQuery,
} from "../../store/features/loanApplication/api.js";
import StopDisbursementModal from '../../components/loanUnderwritting/disbursement/StopDisbursementModal.jsx';
import {CircularProgress, ThemeProvider} from "@mui/material";
import themes from "../../components/reusables/theme.jsx";
import {getPermission} from "../../components/reusables/getPermission.js";
import MonoBankStatementModal from "../../components/loanApplication/customer/MonoBankStatementModal.jsx";
import axios from "axios";
import {getUserToken} from "../../services/storage/index.js";
import {updateSnackbar} from "../../store/snackbar/reducer.js";
import {fetchDocumentation} from "../../store/documentationSlice.js";

const ViewLoanApplicationPage = () => {
    const [open, setOpen] = useState(false)
    const [file, setFile] = useState(null)
    const queryParams = new URLSearchParams(location.search);
    const custId = queryParams.get("id");
    const appId = queryParams.get("aid");
    const {data, isFetching, error} = useGetCustomerDetailsQuery(appId)
    const [soaData, setSoaData] = useState(null)
    const status = queryParams.get("status");
    const [loading, setLoading] = useState(false)
    const [rloading, setRLoading] = useState(false)
    const [uloading, setULoading] = useState(false)
    const [openComplete, setOpenComplete] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [completeReview] = useCompleteReviewMutation()
    const permissions = getPermission("Loan Application", "Customer");
    const token = getUserToken();
    const baseUrl = import.meta.env.VITE_APP_BASE_URL


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

    const fetchData = async () => {
        try {
            const response = await axios.get(`${baseUrl}/LoanApplication/Customer/AsUploadedBankStatement?loanId=${appId}`, {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'XAPIKEY': '_*-+pgH7QzFH%^&!Jx4w46**fI@@#5Uzi4RvtTwlEXp_!*',
                    'authorization': `Bearer ${token}`
                }
            });
            console.log(response.data)
            setSoaData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData()
    }, []);

    const handleComplete = () => {
        if(soaData === false){
            setOpenModal(true)
        }else {
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
                setRLoading(false)
                setOpenComplete(false)
            })
        }

    }

    const handleReview = () => {
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
            setRLoading(false)
            setOpenComplete(false)
        })
    }

    const handleUpload = async () => {
        setULoading(true)
        try {
            const formData = new FormData();
            formData.append('LoanId', appId);
            formData.append('StatementOfAccount', file);

            const token = getUserToken();
            const baseUrl = import.meta.env.VITE_APP_BASE_URL;

            const res = await fetch(`${baseUrl}/LoanApplication/Customer/uploadManual`, {
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
               handleReview()
                setOpenModal(false)
               setOpenComplete(true)
            }
        } catch (error) {
            setOpenComplete(false)
            setULoading(false)
        }
    }
    return (
        <Layout>
            <div>
                {
                    isFetching ? <ThemeProvider theme={themes}>
                        <CircularProgress color={"waveGreen"} sx={{display: "flex", margin: "auto", justifyContent: "center" }}/>
                    </ThemeProvider> : <div>
                        <div className="custom-scroll-bar min-w-full align-middle c-border w-full shadow-xl sm:rounded-lg mt-12 overflow-auto h-[613px]">
                            <div>
                                <TabContext value={currentTab.toString()}>
                                    <HorizontalMenu activeTab={currentTab} handleChange={handleChange} tabMenu={tabMenu}/>
                                </TabContext>
                            </div>
                            <div className={'mt-8 pb-12 px-12'}>
                                {components[item.toLowerCase()].component}
                            </div>
                        </div>
                        <div className="flex justify-between items-center px-0 py-4  pb-2 md:pt-3 overflow-x-auto">
                            <div>
                                {
                                    status === "adjust" && (
                                        <div className="flex space-x-3 my-8">
                                            {permissions.canReview && <Button variant="primary" bgColor="#00C795" borderRadius="4px"
                                                     height="37px" size='md'
                                                     as={ReactLink} w={'110px'} onClick={handleComplete}>
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
                                                     size='md' as={ReactLink} w={'150px'} isLoading={loading}
                                                     onClick={handleOpen}>
                                                <Text color="#FF0909">Decline Loan</Text>
                                            </Button>}
                                            {permissions.canReview && <Button variant="primary" bgColor="#00C795" borderRadius="4px"
                                                     height="37px" size='md'
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
            <StopDisbursementModal open={openComplete} setOpen={setOpenComplete} title={"Loan review completed"} handleRoute={()=>router('/loanApp/customer')}/>
            <MonoBankStatementModal open={openModal} setOpen={setOpenModal} handleSubmit={handleUpload} setFile={setFile} file={file} setLoading={setULoading} loading={uloading}/>
        </Layout>
    );
};

export default ViewLoanApplicationPage;