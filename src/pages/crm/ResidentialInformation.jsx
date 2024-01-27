import ClientButton from "../../components/crm/ClientButton.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {getUserToken} from "../../services/storage/index.js";
import {updateSnackbar} from "../../store/snackbar/reducer.js";
import {useDispatch} from "react-redux";
import {
    useAddResidentialMutation,
    useEditResidentialMutation,
    useGetClientByIdQuery
} from "../../store/features/crm/api.js";

const ResidentialInformation = () => {
    const [status, setStatus] = useState([])
    const [state, setState] = useState([])
    const [lga, setLga] = useState([])
    const [residency, setResidency] = useState([])
    const [inputs, setInputs] = useState({
        state: "",
        status: "",
        landmark: "",
        lga: "",
        address: "",
        residency: "",
    })
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("step", "four");
    const token = getUserToken();
    const dispatch = useDispatch()
    const [addResident] = useAddResidentialMutation()
    const [editResident] = useEditResidentialMutation()
    const custId = queryParams.get("cid");
    const clientId = JSON.parse(sessionStorage.getItem("cusId"));
    const {data, isFetching, error} = useGetClientByIdQuery(custId || clientId )
    const handleChange = (e, fieldName) => {
        const value = e.target.value;
        setInputs((values) => ({...values, [fieldName]: value}))
    };

    const handleGoBack = () => {
        queryParams.set("step", "two");
        navigate({
            search: queryParams.toString(),
        });
    };
    const handleNext = async (e) => {
        e.preventDefault();
        const cusId = JSON.parse(sessionStorage.getItem("cusId"));
        if (custId || clientId){
            editResident({
                body: {
                    stateId: inputs.state,
                    customerId: custId.toString(),
                    lgaId: inputs.lga,
                    permanentAddress: inputs.address,
                    nearestLandmark: inputs.landmark,
                    residentialStatus: inputs.status,
                    noOfYearsAtResidence: inputs.residency,
                    uniqueId: data?.data.residentialInformation?.uniqueId,
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
            addResident({
                body: {
                    stateId: inputs.state,
                    customerId: cusId.toString(),
                    lgaId: inputs.lga,
                    permanentAddress: inputs.address,
                    nearestLandmark: inputs.landmark,
                    residentialStatus: inputs.status,
                    noOfYearsAtResidence: inputs.residency
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
    const fetchStatus = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/GeneralSetUp/getallvalidResidentialstatuss`, {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'XAPIKEY': import.meta.env.VITE_APP_ENCRYPTION_KEY,
                    'authorization': `Bearer ${token}`
                }
            });
            setStatus(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchState = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/GeneralSetUp/getallvalidStates`, {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'XAPIKEY': import.meta.env.VITE_APP_ENCRYPTION_KEY,
                    'authorization': `Bearer ${token}`
                }
            });
            setState(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const fetchLga = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/GeneralSetUp/getallvalidLgas`, {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'XAPIKEY': import.meta.env.VITE_APP_ENCRYPTION_KEY,
                    'authorization': `Bearer ${token}`
                }
            });
            setLga(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchResidency = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/GeneralSetUp/getallvalidNoofyearofresidences`, {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'XAPIKEY': import.meta.env.VITE_APP_ENCRYPTION_KEY,
                    'authorization': `Bearer ${token}`
                }
            });
            setResidency(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    useEffect(() => {
        fetchStatus();
        fetchState();
        fetchLga();
        fetchResidency()
    }, []);

    useEffect(() => {
        setInputs({
            state: data?.data.residentialInformation?.stateId,
            status: data?.data.residentialInformation?.residentialStatus,
            landmark: data?.data.residentialInformation?.nearestLandmark,
            lga: data?.data.residentialInformation?.lgaId,
            address: data?.data.residentialInformation?.permanentAddress,
            residency: data?.data.residentialInformation?.noOfYearsAtResidence,
        })
    }, []);
    return (
        <div>
            <div className="custom-scroll-bar min-w-full align-middle c-border w-full shadow-xl sm:rounded-lg mt-12 overflow-auto pl-12 h-[540px]">
                <div className="mt-4 mb-12">
                    <p className="text-[20px] leading-5 text-[#4A5D58] font-bold">Residential's Information</p>
                    <p className="text-[14px] leading-5 text-[#979797] font-medium py-3">Ensure you enter the correct information, some of the information here will <br/> later be match with your BVN details</p>
                    <div>
                        <div className="flex space-x-8 mt-4">
                            <span>
                                <p className="text-[14px] leading-5 text-[#4A5D58] font-[500] pb-3">Permanent Residential State</p>
                                <select id="select" value={inputs.state}
                                        onChange={(event) => handleChange(event, "state")}
                                        className="font-medium w-[240px] text-black h-[50px] leading-relaxed py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex">
                                    <option value="" disabled>Select state</option>
                                    {state && state?.map((option) => (
                                        <option key={option.uniqueId} value={option.name}>
                                            {option.name}
                                        </option>
                                    ))}
                                </select>
                            </span>
                            <span>
                                <p className="text-[14px] leading-5 text-[#4A5D58] font-[500] pb-3">LGA</p>
                                <select id="select" value={inputs.lga}
                                        onChange={(event) => handleChange(event, "lga")}
                                        className="font-medium w-[240px] text-black h-[50px]  leading-relaxed py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex">
                                    <option value="" disabled>Select lga</option>
                                    {lga && lga?.map((option) => (
                                        <option key={option.uniqueId} value={option.name}>
                                            {option.name}
                                        </option>
                                    ))}
                                </select>
                            </span>
                            <span>
                                <h3 className="font-medium text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                Permanent Address
                                </h3>
                                <input
                                    type="text"
                                    value={inputs.address}
                                    onChange={(event) => handleChange(event, "address")}
                                    placeholder="Enter address"
                                    className="font-medium w-[446px] h-[53px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                />
                            </span>
                        </div>
                        <div className="flex space-x-8 mt-6">
                            <span>
                                <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                    Nearest Landmark
                                </h3>
                                <input
                                    type="text"
                                    value={inputs.landmark}
                                    onChange={(event) => handleChange(event, "landmark")}
                                    placeholder="Enter landmark"
                                    className="font-medium w-[240px] h-[53px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                />
                            </span>
                            <span>
                                <p className="text-[14px] leading-5 text-[#4A5D58] font-[500] pb-3">Residential Status</p>
                                <select id="select" value={inputs.status}
                                        onChange={(event) => handleChange(event, "status")}
                                        className="font-medium w-[240px] text-black leading-relaxed py-3 rounded h-[50px] border border-neutral-300 justify-between items-center gap-4 flex">
                                    <option value="" disabled>Select status</option>
                                    {status && status?.map((option) => (
                                        <option key={option.uniqueId} value={option.name}>
                                            {option.name}
                                        </option>
                                    ))}
                                </select>
                            </span>
                            <span>
                                <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                     No. Of Years At Residence
                                </h3>
                                <select id="select" value={inputs.residency}
                                        onChange={(event) => handleChange(event, "residency")}
                                        className="font-medium w-[240px] text-black leading-relaxed py-3 h-[50px] rounded border border-neutral-300 justify-between items-center gap-4 flex">
                                    <option value="" disabled>Select no of years</option>
                                    {residency && residency?.map((option) => (
                                        <option key={option.uniqueId} value={option.name}>
                                            {option.name}
                                        </option>
                                    ))}
                                </select>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <ClientButton onNext={handleNext} onPrevious={handleGoBack}/>
        </div>
    );
};

export default ResidentialInformation;