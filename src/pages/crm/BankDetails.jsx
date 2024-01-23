import ClientButton from "../../components/crm/ClientButton.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {getUserToken} from "../../services/storage/index.js";

const BankDetails = () => {
    const [bank, setBank] = useState([])

    const [inputs, setInputs] = useState({
        bank: "",
        accNumber: "",
        accName: "",
    })
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("step", "six");
    const token = getUserToken();


    const handleChange = (e, fieldName) => {
        const value = e.target.value;
        setInputs((values) => ({...values, [fieldName]: value}))
    };
    const handleGoBack = () => {
        queryParams.set("step", "four");
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

    useEffect(() => {
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
                                Account Nummber
                                </h3>
                                <input
                                    type="text"
                                    value={inputs.accNumber}
                                    onChange={(event) => handleChange(event, "accNumber")}
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