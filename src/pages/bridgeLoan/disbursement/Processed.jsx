import  {useState} from 'react';
import Layout from "../../Layout.jsx";
import Search from "../../../components/reusables/Search.jsx";
import DatePicker from "react-datepicker";
import ProcessedTable from "../../../components/bridgeLoan/disbursement/processed/ProcessedTable.jsx";
import "react-datepicker/dist/react-datepicker.css";
import DownloadExcelButton from "../../../components/reusables/DownloadExcelButton.jsx";


const Processed = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [startDate, setStartDate] = useState(new Date());

    const handleSearch = (searchValue) => {
        setSearchTerm(searchValue);
    };

    const backendData = [
        { id: 1, name: 'John Doe', age: 25 },
        { id: 2, name: 'Jane Smith', age: 30 },
        // ... more data
    ];

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
                        <DownloadExcelButton data={backendData} filename="example.xlsx" />
                    </div>
                </div>
                <ProcessedTable searchTerm={searchTerm}/>
            </div>
        </Layout>
    );
};

export default Processed;