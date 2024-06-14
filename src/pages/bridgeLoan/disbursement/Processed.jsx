import React, {useRef, useState} from 'react';
import Layout from "../../Layout.jsx";
import Search from "../../../components/reusables/Search.jsx";
import DatePicker from "react-datepicker";
import ProcessedTable from "../../../components/bridgeLoan/disbursement/processed/ProcessedTable.jsx";
import "react-datepicker/dist/react-datepicker.css";
import DownloadExcelButton from "../../../components/reusables/DownloadExcelButton.jsx";
import axios from "axios";
import {Button, Text} from "@chakra-ui/react";
import {Link as ReactLink} from "react-router-dom";
import {getUserToken} from "../../../services/storage/index.js";
import {useGetAllProcessedDisbursementQuery} from "../../../store/features/bridgeLoan/api.js";
import {getPermission} from "../../../components/reusables/getPermission.js";


const Processed = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [startDate, setStartDate] = useState(getCurrentDate());
    const baseUrl = import.meta.env.VITE_APP_BASE_URL
    const token = getUserToken();
    const [page, setPage] = useState(1)
    const [size, setSize] = useState(10)
    const {data, isFetching, error} =  useGetAllProcessedDisbursementQuery({size, page, startDate})
    const permissions = getPermission("Bridge Loan", "Disbursement_Process");

    function getCurrentDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    const handleSearch = (searchValue) => {
        setSearchTerm(searchValue);
    };

    const handleChange = (e) => {
        setStartDate(e.target.value)
    }

    const fetchData = async () => {
        // setLoading(true)
        try {
            const response = await axios.get(`${baseUrl}/BridgeLoan/Disbursement/getprocessedForDownload?Det=1&StartDate=${startDate}`, {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'XAPIKEY': import.meta.env.VITE_APP_ENCRYPTION_KEY,
                    'authorization': `Bearer ${token}`
                }
            });
            console.log(response)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <Layout>
            <div className="px-2">
                <div className="flex items-center justify-between px-0 py-4  pb-2 md:pt-3">
                    <Search search={searchTerm} setSearch={handleSearch}/>
                    <div className="flex items-center">
                        <div className='py-2 w-full'>
                            Date :
                                <input
                                    type="date"
                                    name="dateInput"
                                    value={startDate}
                                    onChange={handleChange}
                                    placeholder="Enter start date"
                                    max={getCurrentDate()}
                                    className="font-medium w-[160px] text-black leading-relaxed ml-2 px-4 py-1 rounded  border border-neutral-300"
                                />
                            {/*<DatePicker*/}
                            {/*    className='border broder-gray-700 ml-3 px-2 rounded-md py-3 text-[14px] focus:outline-none'*/}
                            {/*    // closeOnScroll={true}*/}
                            {/*    dateFormat="dd/MM/yyyy"*/}
                            {/*    placeholderText="Select a date"*/}
                            {/*    selected={startDate} onChange={(date) => setStartDate(date)}*/}
                            {/*    showYearDropdown*/}
                            {/*    showMonthDropdown*/}
                            {/*    showDisabledMonthNavigation*/}
                            {/*    dropdownMode="select"*/}
                            {/*/>*/}
                        </div>
                        {/*<Button variant="primary" onClick={fetchData} bgColor="#00C795" borderRadius="4px" height="37px" size='md' as={ReactLink} w={'129px'}>*/}
                        {/*    <Text color="white">Download</Text>*/}
                        {/*</Button>*/}
                        {permissions.canDownload && <DownloadExcelButton data={data?.data} filename={`BridgeLoan_Adroit_File_${startDate}.xlsx`}/>}
                    </div>
                </div>
                <ProcessedTable searchTerm={searchTerm} startDate={startDate} page={page} setPage={setPage} size={size} setSize={setSize}
                data={data} error={error} isFetching={isFetching}/>
            </div>
        </Layout>
    );
};

export default Processed;