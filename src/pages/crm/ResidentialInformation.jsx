import ClientButton from "../../components/crm/ClientButton.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {getUserToken} from "../../services/storage/index.js";
import { MuiTelInput } from 'mui-tel-input'

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
        queryParams.set("step", "two");
        navigate({
            search: queryParams.toString(),
        });
    };
    const handleNext = async (e) => {
        e.preventDefault();
        navigate({
            search: queryParams.toString(),
        });
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
    return (
        <div>
            <div className="custom-scroll-bar min-w-full align-middle c-border w-full shadow-xl sm:rounded-lg mt-12 overflow-auto pl-12 h-[450px]">
                <div className="mt-4 mb-12">
                    <p className="text-[20px] leading-5 text-[#4A5D58] font-bold">Employer’s Information</p>
                    <p className="text-[14px] leading-5 text-[#979797] font-medium py-3">Ensure you enter the correct information, some of the information here will <br/> later be match with your BVN details</p>
                    <div>
                        <div className="flex space-x-8 mt-4">
                            <span>
                                <p className="text-[14px] leading-5 text-[#4A5D58] font-[500] pb-3">Permanent Residential State</p>
                                <select id="select" value={inputs.state}
                                        onChange={(event) => handleChange(event, "state")}
                                        className="font-medium w-[240px] text-black leading-relaxed py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex">
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
                                        className="font-medium w-[240px] text-black leading-relaxed py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex">
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
                                        className="font-medium w-[240px] text-black leading-relaxed py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex">
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
                                        onChange={(event) => handleChange(event, "residenct")}
                                        className="font-medium w-[240px] text-black leading-relaxed py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex">
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