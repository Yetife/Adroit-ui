import ClientButton from "../../components/crm/ClientButton.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {getUserToken} from "../../services/storage/index.js";
import { MuiTelInput } from 'mui-tel-input'

const EmploymentInformation = () => {
    const [organization, setOrganization] = useState([])
    const [state, setState] = useState([])
    const [lga, setLga] = useState([])
    const [employmentType, setEmploymentType] = useState([])
    const [range, setRange] = useState([])
    const [paymentDay, setPaymentDay] = useState([])
    const [inputs, setInputs] = useState({
        organization: "",
        state: "",
        staffId: "",
        landmark: "",
        lga: "",
        dateOfEmployment: "",
        jobRole: "",
        employmentType: "",
        email: "",
        address: "",
        phoneNumber: "",
        salaryRange: "",
        paymentDay: ""
    })
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("step", "three");
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
        queryParams.set("step", "one");
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
    const fetchOrganization = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/GeneralSetUp/getallvalidOrganizations`, {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'XAPIKEY': import.meta.env.VITE_APP_ENCRYPTION_KEY,
                    'authorization': `Bearer ${token}`
                }
            });
            setOrganization(response.data.data);
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

    const fetchEmploymentType = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/GeneralSetUp/getallvalidEmploymenttypes`, {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'XAPIKEY': import.meta.env.VITE_APP_ENCRYPTION_KEY,
                    'authorization': `Bearer ${token}`
                }
            });
            setEmploymentType(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchSalaryRange = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/GeneralSetUp/getallvalidSalaryranges`, {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'XAPIKEY': import.meta.env.VITE_APP_ENCRYPTION_KEY,
                    'authorization': `Bearer ${token}`
                }
            });
            setRange(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchPaymentDay = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/GeneralSetUp/getallvalidSalarypaymentdates`, {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'XAPIKEY': import.meta.env.VITE_APP_ENCRYPTION_KEY,
                    'authorization': `Bearer ${token}`
                }
            });
            setPaymentDay(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchOrganization();
        fetchState();
        fetchLga();
        fetchEmploymentType();
        fetchSalaryRange();
        fetchPaymentDay()
    }, []);
    return (
        <div>
            <div className="custom-scroll-bar min-w-full align-middle c-border w-full shadow-xl sm:rounded-lg mt-12 overflow-auto pl-12">
                <div className="mt-4 mb-12">
                    <p className="text-[20px] leading-5 text-[#4A5D58] font-bold">Employer’s Information</p>
                    <p className="text-[14px] leading-5 text-[#979797] font-medium py-3">Ensure you enter the correct information, some of the information here will <br/> later be match with your BVN details</p>
                    <div>
                        <div className="flex space-x-6 mt-4">
                            <span>
                                <p className="text-[14px] leading-5 text-[#4A5D58] font-[500] pb-3">Organization</p>
                                <select id="select" value={inputs.organization}
                                        onChange={(event) => handleChange(event, "organization")}
                                        className="font-medium w-[326px] text-black leading-relaxed py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex">
                                    <option value="" disabled>Select organization</option>
                                    {organization && organization?.map((option) => (
                                        <option key={option.uniqueId} value={option.name}>
                                            {option.name}
                                        </option>
                                    ))}
                                </select>
                            </span>
                            <span>
                                <p className="text-[14px] leading-5 text-[#4A5D58] font-[500] pb-3">State Of Posting</p>
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
                        </div>
                        <div className="flex space-x-6 mt-6">
                            <span>
                                <h3 className="font-medium text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                    Address
                                </h3>
                                <input
                                    type="text"
                                    value={inputs.address}
                                    onChange={(event) => handleChange(event, "address")}
                                    placeholder="Enter address"
                                    className="font-medium w-[326px] h-[53px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                />
                            </span>
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
                        </div>
                    </div>
                </div>
                <div className="mt-4 mb-8">
                    <p className="text-[20px] leading-5 text-[#4A5D58] font-bold">Work Details</p>
                    <p className="text-[14px] leading-5 text-[#979797] font-medium py-3">Fill in the information below to help us identify you as an employed worker of a company</p>
                    <div>
                    <div className="flex space-x-6 mt-4">
                            <span>
                                <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                    Staff ID
                                </h3>
                                <input
                                    type="text"
                                    value={inputs.staffId}
                                    onChange={(event) => handleChange(event, "staffId")}
                                    placeholder="Enter staff id"
                                    className="font-medium w-full text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                />
                            </span>
                            <span>
                                <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                    Job Role / Grade
                                </h3>
                                <input
                                    type="text"
                                    value={inputs.jobRole}
                                    onChange={(event) => handleChange(event, "jobRole")}
                                    placeholder="Enter Job Role"
                                    className="font-medium w-full text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                />
                            </span>
                            <span>
                                <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                Employment Type
                                </h3>
                                <select id="select" value={inputs.employmentType}
                                        onChange={(event) => handleChange(event, "employmentType")}
                                        className="font-medium w-[240px] text-black leading-relaxed py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex">
                                    <option value="" disabled>Select employment Type</option>
                                    {employmentType && employmentType?.map((option) => (
                                        <option key={option.uniqueId} value={option.name}>
                                            {option.name}
                                        </option>
                                    ))}
                                </select>
                            </span>
                            <span>
                                <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                    Date Of Employment
                                </h3>
                                <input
                                    type="date"
                                    value={inputs.dateOfEmployment}
                                    onChange={(event) => handleChange(event, "dateOfEmployment")}
                                    placeholder="Enter date of employment"
                                    className="font-medium w-[232px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                />
                            </span>
                        </div>
                        <div className="flex space-x-6 mt-6">
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
                                <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                Salary Range
                                </h3>
                                <select id="select" value={inputs.salaryRange}
                                        onChange={(event) => handleChange(event, "salaryRange")}
                                        className="font-medium w-[240px] text-black leading-relaxed py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex">
                                    <option value="" disabled>Select salary range</option>
                                    {range && range?.map((option) => (
                                        <option key={option.uniqueId} value={option.name}>
                                            {option.name}
                                        </option>
                                    ))}
                                </select>
                            </span>
                            <span>
                                <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                Salary Payment Day
                                </h3>
                                <select id="select" value={inputs.paymentDay}
                                        onChange={(event) => handleChange(event, "paymentDay")}
                                        className="font-medium w-[240px] text-black leading-relaxed py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex">
                                    <option value="" disabled>Select payment day</option>
                                    {paymentDay && paymentDay?.map((option) => (
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

export default EmploymentInformation;