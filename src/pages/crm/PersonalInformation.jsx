import ClientButton from "../../components/crm/ClientButton.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {getUserToken} from "../../services/storage/index.js";

const PersonalInformation = () => {
    const [titles, setTitles] = useState([])
    const [inputs, setInputs] = useState({
        title: "",
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
    const fetchTitle = async () => {
        try {
            const response = await axios.get('http://prananettech-001-site27.ftempurl.com/api/GeneralSetUp/getallvalidTitles', {
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

    useEffect(() => {
        fetchTitle();
    }, []);
    return (
        <div>
            <div className="custom-scroll-bar min-w-full align-middle c-border w-full shadow-xl sm:rounded-lg mt-12 overflow-auto px-20">
                <div>
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
                        <div>

                        </div>
                    </div>
                </div>
            </div>
            <ClientButton onNext={handleNext}/>
        </div>
    );
};

export default PersonalInformation;