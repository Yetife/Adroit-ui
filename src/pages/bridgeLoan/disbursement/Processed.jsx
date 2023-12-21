import  {useState} from 'react';
import Layout from "../../Layout.jsx";
import Search from "../../../components/reusables/Search.jsx";
import {Button, Text} from "@chakra-ui/react";
import {Link as ReactLink} from "react-router-dom";
import DatePicker from "react-datepicker";
import ProcessedTable from "../../../components/bridgeLoan/disbursement/processed/ProcessedTable.jsx";
import "react-datepicker/dist/react-datepicker.css";


const Processed = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [startDate, setStartDate] = useState(new Date());

    const handleSearch = (searchValue) => {
        setSearchTerm(searchValue);
    };

    return (
        <Layout>
            <div className="px-2">
                <div className="flex justify-between px-0 py-4  pb-2 md:pt-3">
                    <Search search={searchTerm} setSearch={handleSearch}/>
                    <div className="flex items-center">
                        <div className='py-2 w-full'>
                            Date :
                            <DatePicker
                                className='border broder-gray-700 ml-3 px-2 rounded-md py-3 text-[14px] focus:outline-none'
                                // closeOnScroll={true}
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Select a date"
                                selected={startDate} onChange={(date) => setStartDate(date)}
                                showYearDropdown
                                showMonthDropdown
                                showDisabledMonthNavigation
                                dropdownMode="select"
                            />
                        </div>
                        <Button variant="primary" to={'/bridgeLoan/disbursement/new/add'} bgColor="#00C795" borderRadius="4px" height="37px" size='md' as={ReactLink} w={'139px'}>
                            <Text color="white">Download</Text>
                        </Button>
                    </div>
                </div>
                <ProcessedTable searchTerm={searchTerm}/>
            </div>
        </Layout>
    );
};

export default Processed;