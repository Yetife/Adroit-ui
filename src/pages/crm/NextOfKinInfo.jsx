import ClientButton from "../../components/crm/ClientButton.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {getUserToken} from "../../services/storage/index.js";
import { MuiTelInput } from 'mui-tel-input'
import {updateSnackbar} from "../../store/snackbar/reducer.js";
import {
    useAddNextOfKinMutation,
    useEditNextOfKinMutation,
    useGetClientByIdQuery
} from "../../store/features/crm/api.js";
import {useDispatch} from "react-redux";

const NextOfKinInfo = () => {
    const [titles, setTitles] = useState([])

    const [inputs, setInputs] = useState({
        title: "",
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        alternatePhoneNumber: "",
        address: "",
        uniqueId: ""
    })
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("step", "five");
    const token = getUserToken();
    const dispatch = useDispatch()
    const [addNOK] = useAddNextOfKinMutation()
    const [editNOK] = useEditNextOfKinMutation()
    const custId = queryParams.get("cid");
    const clientId = JSON.parse(sessionStorage.getItem("cusId"));

    const handleChange = (e, fieldName) => {
        const value = e.target.value;
        setInputs((values) => ({...values, [fieldName]: value}))
    };

    const handlePhone = (e) => {
        const name = "phoneNumber"
        setInputs((values)=>({ ...values, [name]: e }))
    }

    const handleAlternatePhone = (e) => {
        const name = "alternatePhoneNumber"
        setInputs((values)=>({ ...values, [name]: e }))
    }

    const handleGoBack = () => {
        queryParams.set("step", "three");
        navigate({
            search: queryParams.toString(),
        });
    };

    const handleNext = async (e) => {
        e.preventDefault();
        const cusId = JSON.parse(sessionStorage.getItem("cusId"));
        if (custId || clientId) {
            editNOK({
                body: {
                    customerId: custId.toString(),
                    titleId: inputs.title,
                    firstName: inputs.firstName,
                    middleName: inputs.middleName,
                    lastName: inputs.lastName,
                    phoneNumber: inputs.phoneNumber,
                    altPhoneNumber: inputs.alternatePhoneNumber,
                    emailAddress: inputs.email,
                    permanentAddress: inputs.address,
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
            addNOK({
                body: {
                    customerId: cusId.toString(),
                    titleId: inputs.title,
                    firstName: inputs.firstName,
                    middleName: inputs.middleName,
                    lastName: inputs.lastName,
                    phoneNumber: inputs.phoneNumber,
                    altPhoneNumber: inputs.alternatePhoneNumber,
                    emailAddress: inputs.email,
                    permanentAddress: inputs.address
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
            const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/GeneralSetUp/getallvalidTitles`, {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'XAPIKEY': import.meta.env.VITE_APP_ENCRYPTION_KEY,
                    'authorization': `Bearer ${token}`
                }
            });
            setTitles(response.data.data);
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
                title: response.data?.data.nextOfKin?.titleId,
                firstName: response.data?.data.nextOfKin?.firstName,
                middleName: response.data?.data.nextOfKin?.middleName,
                lastName: response.data?.data.nextOfKin?.lastName,
                email: response.data?.data.nextOfKin?.emailAddress,
                phoneNumber: response.data?.data.nextOfKin?.phoneNumber,
                alternatePhoneNumber: response.data?.data.nextOfKin?.altPhoneNumber,
                address: response.data?.data.nextOfKin?.permanentAddress,
                uniqueId: response.data?.data.nextOfKin?.uniqueId,
            })
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    useEffect(() => {
        fetchClient()
        fetchTitle();
    }, []);

    return (
        <div>
            <div className="custom-scroll-bar min-w-full align-middle c-border w-full shadow-xl sm:rounded-lg mt-12 overflow-auto pl-12">
                <div className="mt-4 mb-12">
                    <p className="text-[20px] leading-5 text-[#4A5D58] font-bold">Next of Kin</p>
                    <p className="text-[13px] leading-5 text-[#979797] font-medium py-4">Ensure you enter the correct information, some of the information here will <br/> later be match with your BVN details</p>
                    <div>
                        <span>
                            <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pb-3">Title</p>
                            <select id="select" value={inputs.title}
                                    onChange={(event) => handleChange(event, "title")}
                                    className="font-medium w-[240px] text-black leading-relaxed py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex">
                                <option value="" disabled>Select title</option>
                                {titles && titles?.map((option) => (
                                    <option key={option.uniqueId} value={option.name}>
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                        </span>
                        <div className="flex space-x-6 mt-4">
                            <span>
                                <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                First Name
                                </h3>
                                <input
                                    type="text"
                                    value={inputs.firstName}
                                    onChange={(event) => handleChange(event, "firstName")}
                                    placeholder="Enter name"
                                    className="font-medium w-full text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                />
                            </span>
                            <span>
                                <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                Middle Name(Optional)
                                </h3>
                                <input
                                    type="text"
                                    value={inputs.middleName}
                                    onChange={(event) => handleChange(event, "middleName")}
                                    placeholder="Enter middle name"
                                    className="font-medium w-full text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                />
                            </span>
                            <span>
                                <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                Last Name
                                </h3>
                                <input
                                    type="text"
                                    value={inputs.lastName}
                                    onChange={(event) => handleChange(event, "lastName")}
                                    placeholder="Enter last name"
                                    className="font-medium w-full text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                />
                            </span>
                        </div>
                        <div className="flex space-x-6 mt-4">
                        <span>
                                <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                    Phone Number
                                </h3>
                                <MuiTelInput 
                                    value={inputs.phoneNumber} 
                                    onChange={handlePhone}
                                    sx={{width: "250px"}}
                                    defaultCountry="NG"
                                    name="phoneNumber"
                                />
                            </span>
                            <span>
                                <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                    Alternative Phone Number
                                </h3>
                                <MuiTelInput 
                                    value={inputs.alternatePhoneNumber} 
                                    onChange={handleAlternatePhone}
                                    sx={{width: "250px"}}
                                    defaultCountry="NG"
                                    name="alternatePhoneNumber"
                                />
                            </span>
                        </div>
                    </div>
                    <div className="flex space-x-6 mt-4 mb-8">
                    <span>
                        <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                        Email Address
                        </h3>
                        <input
                            type="text"
                            value={inputs.email}
                            onChange={(event) => handleChange(event, "email")}
                            placeholder="Enter email address"
                            className="font-medium w-[350px] h-[53px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                        />
                    </span>
                    <span>
                        <h3 className="font-medium text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                            Permananent Address
                        </h3>
                        <input
                            type="text"
                            value={inputs.address}
                            onChange={(event) => handleChange(event, "address")}
                            placeholder="Enter permanent address"
                            className="font-medium w-[326px] h-[53px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                        />
                    </span>
                </div>
                </div>
            </div>
            <ClientButton onNext={handleNext} onPrevious={handleGoBack}/>
        </div>
    );
};

export default NextOfKinInfo;