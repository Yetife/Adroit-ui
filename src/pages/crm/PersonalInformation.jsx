import ClientButton from "../../components/crm/ClientButton.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {getUserToken} from "../../services/storage/index.js";
import { MuiTelInput } from 'mui-tel-input'

const PersonalInformation = () => {
    const [titles, setTitles] = useState([])
    const [gender, setGender] = useState([])
    const [maritalStatus, setMaritalStatus] = useState([])
    const [noOfDependant, setNoOfDependant] = useState([])
    const [educationalLevel, setEducationalLevel] = useState([])
    const [inputs, setInputs] = useState({
        title: "",
        firstName: "",
        middleName: "",
        lastName: "",
        gender: "",
        dateOfBirth: "",
        maritalStatus: "",
        noOfDependant: "",
        educationalLevel: "",
        email: "",
        phoneNumber: "",
        alternatePhoneNumber: "",
    })
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("step", "two");
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
        navigate('/crm/addClient');
    };
    const handleNext = async (e) => {
        e.preventDefault();
        navigate({
            search: queryParams.toString(),
        });
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

    const fetchGender = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/GeneralSetUp/getallvalidGenders`, {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'XAPIKEY': import.meta.env.VITE_APP_ENCRYPTION_KEY,
                    'authorization': `Bearer ${token}`
                }
            });
            setGender(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const fetchMaritalStatus = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/GeneralSetUp/getallvalidMaritalstatuss`, {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'XAPIKEY': import.meta.env.VITE_APP_ENCRYPTION_KEY,
                    'authorization': `Bearer ${token}`
                }
            });
            setMaritalStatus(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchDependant = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/GeneralSetUp/getallvalidNoofdependants`, {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'XAPIKEY': import.meta.env.VITE_APP_ENCRYPTION_KEY,
                    'authorization': `Bearer ${token}`
                }
            });
            setNoOfDependant(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchLevel = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/GeneralSetUp/getallvalidEducationalLevels`, {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'XAPIKEY': import.meta.env.VITE_APP_ENCRYPTION_KEY,
                    'authorization': `Bearer ${token}`
                }
            });
            setEducationalLevel(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchTitle();
        fetchGender();
        fetchMaritalStatus();
        fetchDependant();
        fetchLevel();
    }, []);
    return (
        <div>
            <div className="custom-scroll-bar min-w-full align-middle c-border w-full shadow-xl sm:rounded-lg mt-12 overflow-auto pl-12">
                <div className="mt-4 mb-8">
                    <p className="text-[20px] leading-5 text-[#4A5D58] font-bold">Personal Information</p>
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
                            <span>
                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pb-3">Gender</p>
                                <select id="select" value={inputs.gender}
                                        onChange={(event) => handleChange(event, "gender")}
                                        className="font-medium w-[240px] text-black leading-relaxed py-3 h-[50px] rounded  border border-neutral-300 justify-between items-center gap-4 flex">
                                    <option value="" disabled>Select gender</option>
                                    {gender && gender?.map((option) => (
                                        <option key={option.uniqueId} value={option.name}>
                                            {option.name}
                                        </option>
                                    ))}
                                </select>
                            </span>
                        </div>
                        <div className="flex space-x-6 mt-4">
                            <span>
                                <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                Date Of Birth
                                </h3>
                                    <input
                                        type="date"
                                        value={inputs.dateOfBirth}
                                        onChange={(event) => handleChange(event, "dateOfBirth")}
                                        placeholder="Enter date of birth"
                                        className="font-medium w-[240px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                    />
                            </span>
                            <span>
                                <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                Marital Status
                                </h3>
                                <select id="select" value={inputs.maritalStatus}
                                        onChange={(event) => handleChange(event, "maritalStatus")}
                                        className="font-medium w-[240px] text-black leading-relaxed h-[50px] py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex">
                                    <option value="" disabled>Select marital status</option>
                                    {maritalStatus && maritalStatus?.map((option) => (
                                        <option key={option.uniqueId} value={option.name}>
                                            {option.name}
                                        </option>
                                    ))}
                                </select>
                            </span>
                            <span>
                                <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                No. Of Dependent
                                </h3>
                                <select id="select" value={inputs.noOfDependant}
                                        onChange={(event) => handleChange(event, "noOfDependant")}
                                        className="font-medium w-[250px] text-black leading-relaxed py-3  h-[50px] rounded  border border-neutral-300 justify-between items-center gap-4 flex">
                                    <option value="" disabled>Select Dependent</option>
                                    {noOfDependant && noOfDependant?.map((option) => (
                                        <option key={option.uniqueId} value={option.name}>
                                            {option.name}
                                        </option>
                                    ))}
                                </select>
                            </span>
                            <span>
                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pb-3">Educational Level</p>
                                <select id="select" value={inputs.educationalLevel}
                                        onChange={(event) => handleChange(event, "educationalLevel")}
                                        className="font-medium w-[240px] text-black leading-relaxed py-3 rounded  h-[50px]  border border-neutral-300 justify-between items-center gap-4 flex">
                                    <option value="" disabled>Select Educational Level</option>
                                    {educationalLevel && educationalLevel?.map((option) => (
                                        <option key={option.uniqueId} value={option.name}>
                                            {option.name}
                                        </option>
                                    ))}
                                </select>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="mt-4 mb-8">
                    <p className="text-[20px] leading-5 text-[#4A5D58] font-bold">Contact Information</p>
                    <p className="text-[13px] leading-5 text-[#979797] font-medium py-4">Ensure you enter the correct information, some of the information here will <br/> later be match with your BVN details</p>
                    <div>
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
                        </div>
                    </div>
                </div>
            </div>
            <ClientButton onNext={handleNext} onPrevious={handleGoBack}/>
        </div>
    );
};

export default PersonalInformation;