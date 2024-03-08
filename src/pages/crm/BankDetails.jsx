import ClientButton from "../../components/crm/ClientButton.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {getUserToken} from "../../services/storage/index.js";
import {
    useAddBankDetailsMutation,
    useEditBankDetailsMutation,
} from "../../store/features/crm/api.js";
import {updateSnackbar} from "../../store/snackbar/reducer.js";
import {useDispatch} from "react-redux";

const BankDetails = () => {
    const [bank, setBank] = useState([])
    const [inputs, setInputs] = useState({
        bank: "",
        accNumber: "",
        accName: "",
        uniqueId: ""
    })
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("step", "six");
    const token = getUserToken();
    const [addBank] = useAddBankDetailsMutation()
    const [editBank] = useEditBankDetailsMutation()
    const dispatch = useDispatch()
    const custId = queryParams.get("cid");
    const clientId = JSON.parse(sessionStorage.getItem("cusId"));


    const handleChange = (e, fieldName, isNumeric = false) => {
        const value = e.target.value;
        if (fieldName === "accNumber"){
            const numericRegex = /^\d{0,10}$/;

            if ((isNumeric && numericRegex.test(value)) || !isNumeric) {
                setInputs((values) => ({ ...values, [fieldName]: value }));
            }
        }else {
            setInputs((values) => ({...values, [fieldName]: value}))
        }
    };
    const handleGoBack = () => {
        queryParams.set("step", "four");
        navigate({
            search: queryParams.toString(),
        });
    };

    const handleNext = async (e) => {
        e.preventDefault();
        const cusId = JSON.parse(sessionStorage.getItem("cusId"));
        if (inputs.uniqueId){
            editBank({
                body: {
                    bankId: inputs.bank,
                    customerId: cusId.toString(),
                    accountNumber: inputs.accNumber,
                    accountName: inputs.accName,
                    uniqueId: inputs.uniqueId
                }
            }).then(res => {
                dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: res.data.message,success:true}));
                navigate({
                    search: queryParams.toString(),
                });
            }).catch(err =>{
                dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message:err.data.message,success:false}));
            })
        }else {
            addBank({
                body: {
                    bankId: inputs.bank,
                    customerId: cusId.toString(),
                    accountNumber: inputs.accNumber,
                    accountName: inputs.accName
                }
            }).then(res => {
                dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: res.data.message,success:true}));
                navigate({
                    search: queryParams.toString(),
                });
            }).catch(err =>{
                dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message:err.data.message,success:false}));
            })
        }
    };
    const fetchTitle = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/GeneralSetUp/getallvalidbanks`, {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'XAPIKEY': import.meta.env.VITE_APP_ENCRYPTION_KEY,
                    'authorization': `Bearer ${token}`
                }
            });
            setBank(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const fetchClient = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/CRM/Client/getbycustId/${custId || clientId}`, {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'XAPIKEY': import.meta.env.VITE_APP_ENCRYPTION_KEY,
                    'authorization': `Bearer ${token}`
                }
            });
            setInputs({
                bank: response.data?.data.bankDetail?.bankId,
                accNumber: response.data?.data.bankDetail?.accountNumber,
                accName: response.data?.data.bankDetail?.accountName,
                uniqueId: response.data?.data.bankDetail?.uniqueId,
            })
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchClient();
        fetchTitle();
    }, []);

    return (
        <div>
            <div className="custom-scroll-bar min-w-full align-middle c-border w-full shadow-xl sm:rounded-lg mt-12 overflow-auto pl-12">
                <div className="mt-4 mb-20">
                    <p className="text-[20px] leading-5 text-[#4A5D58] font-bold">Bank Details</p>
                    <p className="text-[13px] leading-5 text-[#979797] font-medium py-4">Ensure you enter the correct information, some of the information here will <br/> later be match with your BVN details</p>
                    <div>
                        <span>
                            <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pb-3">Bank</p>
                            <select id="select" value={inputs.bank}
                                    onChange={(event) => handleChange(event, "bank")}
                                    className="font-medium w-[240px] text-black leading-relaxed py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex">
                                <option value="" disabled>Select bank</option>
                                {bank && bank?.map((option) => (
                                    <option key={option.uniqueId} value={option.name}>
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                        </span>
                        <div className="flex space-x-6 mt-4">
                            <span>
                                <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                Account Number
                                </h3>
                                <input
                                    type="text"
                                    value={inputs.accNumber}
                                    onChange={(event) => handleChange(event, "accNumber", true)}
                                    placeholder="Enter account number"
                                    className="font-medium w-full text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                />
                            </span>
                            <span>
                                <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                Account Name
                                </h3>
                                <input
                                    type="text"
                                    value={inputs.accName}
                                    onChange={(event) => handleChange(event, "accName")}
                                    placeholder="Enter account name"
                                    className="font-medium w-full text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <ClientButton onNext={handleNext} onPrevious={handleGoBack}/>
        </div>
    );
};

export default BankDetails;