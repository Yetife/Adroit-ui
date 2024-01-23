import Layout from "../Layout.jsx";
import {useEffect, useState} from "react";
import {Switch, ThemeProvider} from "@mui/material";
import axios from "axios";
import {getUserToken} from "../../services/storage/index.js";
import {Link as ReactLink, useNavigate} from "react-router-dom";
import {Button, Text} from "@chakra-ui/react";
import themes from "../../components/reusables/theme.jsx";

const NewClient = () => {
    const [sector, setSector] = useState([]);
    const [checked, setChecked] = useState(false);
    const [employSector, setEmploySector] = useState("")
    const router = useNavigate()
    const token = getUserToken();

    const fetchData = async () => {
        try {
            const response = await axios.get('http://prananettech-001-site27.ftempurl.com/api/GeneralSetUp/getallvalidEmploymentSector', {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'XAPIKEY': import.meta.env.VITE_APP_ENCRYPTION_KEY,
                    'authorization': `Bearer ${token}`
                }
            });
            setSector(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <Layout>
            <div className="mt-8">
                <p className="text-[24px] leading-5 text-[#4A5D58] font-bold">Add New Client</p>
                <div className="custom-scroll-bar min-w-full align-middle c-border w-full shadow-xl sm:rounded-lg mt-12 overflow-auto px-20 h-[513px]">
                    <div className="flex flex-col items-center justify-center mt-12">
                        <p className="text-[18px] leading-5 text-[#4A5D58] font-bold">Selector</p>
                        <div className="flex items-center mt-12">
                            <p className="text-[16px] leading-5 text-[#4A5D58] font-medium pr-20">Does Client has a BVN</p>
                            <ThemeProvider theme={themes}>
                                <div className="flex items-center">
                                    <p className="text-[18px] leading-5 text-[#4A5D58] font-bold">Yes</p>
                                    <Switch
                                        checked={checked}
                                        onChange={handleChange}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        color={"waveGreen"}
                                    />
                                    <p className="text-[18px] leading-5 text-[#4A5D58] font-bold">No</p>
                                </div>
                            </ThemeProvider>
                        </div>
                        <div className="flex items-center">
                            <p className="text-[16px] leading-5 text-[#4A5D58] font-medium">What Employment Sector do you work in</p>
                            <select id="select" value={employSector}
                                    onChange={(event) => setEmploySector(event.target.value)}
                                    className="font-medium w-[240px] text-black leading-relaxed ml-12 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex">
                                <option value="" disabled>Select sector</option>
                                {sector && sector?.map((option) => (
                                    <option key={option.uniqueId} value={option.name}>
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="float-right my-4">
                    <Button variant="primary" bgColor="#00C795" borderRadius="4px" onClick={()=>router('/crm/addNewClient?step=one')}
                            height="37px" size='md' as={ReactLink} w={'109px'}>
                        <Text color="white">Proceed</Text>
                    </Button>
                </div>
            </div>
            
        </Layout>
    );
};

export default NewClient;