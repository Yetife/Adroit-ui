import React, {useEffect, useState} from 'react';
import Layout from "../Layout.jsx";
import {ChevronRight} from "react-feather";
import CustomDropdown from "../../components/reusables/CustomDropdown.jsx";
import {getCurrentDate} from "../../components/reusables/getCurrentDate.js";

const reportOptions = {
    'Wallet': ['Account Opening Report', 'Customer Wallet Statement', 'Customer Transaction Report', 'Customer Transaction Receipt', 'Customer Wallet Account', 'Transaction Status', 'Customer Wallet Details',],
    'Fixed Deposit': ['Customer Accrued Interest Till Date', 'Fixed Deposit Details Report', 'Customer Fixed Deposit Report', 'Total Fixed Deposit Report'],
    'Loans': ['Loan Application Report', 'Loan Application Category Report', 'Loan Breakdown Report', 'Loan Repayment Report'],
    'Overdue Loan Report': ['Loan Overdue Category Report', 'Loan Collection Report']
};
const accountOpeningOptions = ['ALL', 'ACCOUNT NUMBER', 'BVN', 'NIN', 'EMAIL ADDRESS', 'PHONE NUMBER'];
const walletAccountOptions = ['THIS WEEK', 'LAST WEEK', 'THIS MONTH', 'LAST MONTH', 'DATE RANGE']
const statusOptions = ['ACTIVE', 'INACTIVE']

const Report = () => {
    const [selectedReportType, setSelectedReportType] = useState('');
    const [selectedReport, setSelectedReport] = useState("");
    const [selectedSearchOption, setSelectedSearchOption] = useState(accountOpeningOptions[0]);
    const [selectedWalletOption, setSelectedWalletOption] = useState(walletAccountOptions[0]);
    const [status, setStatus] = useState(statusOptions[0])
    const [searchQuery, setSearchQuery] = useState('');
    const [inputs, setInputs] = useState({
        startDate: "",
        endDate: ""
    })

    const handleReportTypeChange = (event) => {
        const newReportType = event.target.value;
        setSelectedReportType(newReportType);
        setSelectedReport("");
    };

    // const handleReportTypeChange = (selectedOption) => {
    //     setSelectedReportType(selectedOption);
    //     setSelectedReport(reportOptions[selectedOption][0]);
    // };

    const handleReportChange = (event) => {
        setSelectedReport(event.target.value);
    };

    const handleSearchOptionChange = (event) => {
        setSelectedSearchOption(event.target.value);
    };

    const handleSearchQueryChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearch = () => {
        console.log(`Searching for ${searchQuery} in ${selectedSearchOption}`);
        // Implement your search logic here
    };

    const handleChange = (e, fieldName) => {
        const value = e.target.value;
        setInputs((values) => ({...values, [fieldName]: value}))
    };

    const checkOption = () => {
      return  selectedReport === 'Account Opening Report' || selectedReport === 'Customer Wallet Statement'
          || selectedReport === 'Customer Transaction Report' || selectedReport === 'Customer Transaction Receipt'
          || selectedReport === 'Customer Accrued Interest Till Date' || selectedReport === "Total Fixed Deposit Report"
    }
    const checkWeek = () => {
        return selectedReport === 'Customer Wallet Account' || selectedReport === 'Customer Fixed Deposit Report'
    }

    useEffect(() => {
        setSelectedReport("")
    }, []);
    return (
        <Layout>
            <div>
                <div>
                    <div className="text-[16px] font-[600] text-[#4A5D58] mb-2 flex items-center space-x-2 capitalize">
                        <span>Report</span>
                        { selectedReportType && <span> <ChevronRight style={{color: "#00C796", height: "17px"}}/></span>}
                        <span className="capitalize" style={{textTransform: "capitalize"}}>{selectedReportType}</span>
                        { selectedReport && <span> <ChevronRight style={{color: "#00C796", height: "17px"}} /></span>}
                        <span className= "capitalize">{selectedReport}</span>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="mr-4">
                            <label htmlFor="reportType" className="block text-[16px] font-[700] text-[#4A5D58] mb-1 uppercase">Report Type:</label>
                            <select
                                id="reportType"
                                value={selectedReportType}
                                onChange={handleReportTypeChange}
                                className="block w-full py-1 px-3 border border-[#007970] bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#007970] focus:border-[#007970] font-[600] text-[14px] text-[#007970] sm:text-sm uppercase"
                            >
                                <option value="" disabled>Select report type</option>
                                {Object.keys(reportOptions).map((reportType) => (
                                    <option key={reportType} value={reportType} className="border border-[#007970]">
                                        {reportType}
                                    </option>
                                ))}
                            </select>
                            {/*    <CustomDropdown*/}
                            {/*        width={'191px'}*/}
                            {/*        options={Object.keys(reportOptions)}*/}
                            {/*        selectedOption={selectedReportType}*/}
                            {/*        onSelect={handleReportTypeChange}*/}
                            {/*    />*/}
                        </div>
                        <div>
                            <label htmlFor="reportType"
                                   className="block text-[16px] font-[700] text-[#4A5D58] mb-1 uppercase">Report Category:</label>
                            <select
                                id="report"
                                value={selectedReport}
                                onChange={handleReportChange}
                                className="block w-[360px] py-1 px-3 border border-[#007970] bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#007970]
                                focus:border-[#007970] font-[600] text-[14px] text-[#007970] sm:text-sm uppercase"
                            >
                                <option value="" disabled>Select report category</option>
                                {reportOptions[selectedReportType]?.map((report) => (
                                    <option key={report} value={report}>
                                        {report}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    {checkOption() && (
                        <div className="flex space-x-1 space-y-3 mx-48">
                            <div>
                                <select
                                    id="searchOption"
                                    value={selectedSearchOption}
                                    onChange={handleSearchOptionChange}
                                    className="block mt-3 w-[180px] py-1 px-3 border border-[#007970] bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#007970] focus:border-[#007970] font-[600] text-[14px] text-[#007970] sm:text-sm"
                                >
                                    {accountOpeningOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <input
                                    id="searchQuery"
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearchQueryChange}
                                    className="block w-[200px] py-1 px-3 border border-[#007970] bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#007970] focus:border-[#007970] font-[600] text-[14px] text-[#007970] sm:text-sm"
                                    placeholder="Search"
                                />
                            </div>
                            <div>
                                <button
                                    onClick={handleSearch}
                                    className="py-1 px-16 bg-[#00C796] text-white rounded-md shadow-sm hover:bg-[#00C796] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#007970]"
                                >
                                    SEARCH
                                </button>
                            </div>
                        </div>
                    )}
                    { checkWeek() && (
                        <div>
                            <div className="flex space-x-1 space-y-3 mx-48">
                                <div>
                                    <select
                                        id="searchOption"
                                        value={selectedSearchOption}
                                        onChange={handleSearchOptionChange}
                                        className="block mt-3 w-[170px] py-1 px-3 border border-[#007970] bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#007970] focus:border-[#007970] font-[600] text-[14px] text-[#007970] sm:text-sm"
                                    >
                                        {accountOpeningOptions.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <input
                                        id="searchQuery"
                                        type="text"
                                        value={searchQuery}
                                        onChange={handleSearchQueryChange}
                                        className="block w-[150px] py-1 px-3 border border-[#007970] bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#007970] focus:border-[#007970] font-[600] text-[14px] text-[#007970] sm:text-sm"
                                        placeholder="Search"
                                    />
                                </div>
                                <div>
                                    <select
                                        id="searchOption"
                                        value={selectedWalletOption}
                                        onChange={(e) => setSelectedWalletOption(e.target.value)}
                                        className="block w-[150px] py-1 px-3 border border-[#007970] bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#007970] focus:border-[#007970] font-[600] text-[14px] text-[#007970] sm:text-sm"
                                    >
                                        {walletAccountOptions.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                { selectedWalletOption !== "DATE RANGE" && <div>
                                    <button
                                        onClick={handleSearch}
                                        className="py-1 px-8 bg-[#00C796] text-white rounded-md shadow-sm hover:bg-[#00C796] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#007970]"
                                    >
                                        SEARCH
                                    </button>
                                </div>}
                            </div>
                            {
                                selectedWalletOption === "DATE RANGE" && (
                                    <div className="flex items-center space-x-1 ml-48 mt-2">
                                        <div>
                                            <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-1">
                                                Start Date
                                            </h3>
                                            <input
                                                type="date"
                                                value={inputs.startDate}
                                                onChange={(event) => handleChange(event, "startDate")}
                                                placeholder="Enter start date"
                                                max={getCurrentDate()}
                                                className="block w-[150px] py-1 px-3 border border-[#007970] bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#007970] focus:border-[#007970] font-[600] text-[14px] text-[#007970] sm:text-sm"
                                            />
                                        </div>
                                        <div className="">__</div>
                                        <div>
                                            <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-1">
                                                End Date
                                            </h3>
                                            <input
                                                type="date"
                                                value={inputs.endDate}
                                                onChange={(event) => handleChange(event, "endDate")}
                                                placeholder="Enter end date"
                                                max={getCurrentDate()}
                                                className="block w-[150px] py-1 px-3 border border-[#007970] bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#007970] focus:border-[#007970] font-[600] text-[14px] text-[#007970] sm:text-sm"
                                            />
                                        </div>
                                        <div>
                                            <button
                                                onClick={handleSearch}
                                                className="py-1 px-8 mt-6 bg-[#00C796] text-white rounded-md shadow-sm hover:bg-[#00C796] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#007970]"
                                            >
                                                SEARCH
                                            </button>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    )}
                    {selectedReport === 'Transaction Status' && (
                        <div>
                            <div className="flex items-center space-x-1 ml-48 mt-3">
                                <div>
                                    <select
                                        id="searchOption"
                                        value={selectedSearchOption}
                                        onChange={handleSearchOptionChange}
                                        className="block w-[170px] py-1 px-3 border border-[#007970] bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#007970] focus:border-[#007970] font-[600] text-[14px] text-[#007970] sm:text-sm"
                                    >
                                        {accountOpeningOptions.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <input
                                        id="searchQuery"
                                        type="text"
                                        value={searchQuery}
                                        onChange={handleSearchQueryChange}
                                        className="block w-[150px] py-1 px-3 border border-[#007970] bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#007970] focus:border-[#007970] font-[600] text-[14px] text-[#007970] sm:text-sm"
                                        placeholder="Search"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center space-x-1 ml-48 mt-2">
                                <div>
                                    <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-1">
                                        Start Date
                                    </h3>
                                    <input
                                        type="date"
                                        value={inputs.startDate}
                                        onChange={(event) => handleChange(event, "startDate")}
                                        placeholder="Enter start date"
                                        max={getCurrentDate()}
                                        className="block w-[150px] py-1 px-3 border border-[#007970] bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#007970] focus:border-[#007970] font-[600] text-[14px] text-[#007970] sm:text-sm"
                                    />
                                </div>
                                <div className="">__</div>
                                <div>
                                    <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-1">
                                        End Date
                                    </h3>
                                    <input
                                        type="date"
                                        value={inputs.endDate}
                                        onChange={(event) => handleChange(event, "endDate")}
                                        placeholder="Enter end date"
                                        max={getCurrentDate()}
                                        className="block w-[150px] py-1 px-3 border border-[#007970] bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#007970] focus:border-[#007970] font-[600] text-[14px] text-[#007970] sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <button
                                        onClick={handleSearch}
                                        className="py-1 px-8 mt-6 bg-[#00C796] text-white rounded-md shadow-sm hover:bg-[#00C796] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#007970]"
                                    >
                                        SEARCH
                                    </button>
                                </div>
                            </div>


                        </div>
                    )}
                    {
                        selectedReport === "Customer Wallet Details" && (
                            <div className="flex space-x-4 ml-48 mt-2">
                                <div>
                                    <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-1">
                                        Account Number
                                    </h3>
                                    <input
                                        id="searchQuery"
                                        type="text"
                                        value={searchQuery}
                                        onChange={handleSearchQueryChange}
                                        className="block w-[150px] py-1 px-3 border border-[#007970] bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#007970] focus:border-[#007970] font-[600] text-[14px] text-[#007970] sm:text-sm"
                                        placeholder="Search"
                                    />
                                </div>
                                <div>
                                    <button
                                        onClick={handleSearch}
                                        className="py-1 px-8 mt-6 bg-[#00C796] text-white rounded-md shadow-sm hover:bg-[#00C796] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#007970]"
                                    >
                                        SEARCH
                                    </button>
                                </div>
                            </div>
                        )
                    }
                    {selectedReport === 'Fixed Deposit Details Report' && (
                        <div className="flex justify-center mt-2">
                            <div>
                                <select
                                    id="searchOption"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="block w-[140px] py-1 px-3 border border-[#007970] bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#007970] focus:border-[#007970] font-[600] text-[14px] text-[#007970] sm:text-sm"
                                >
                                    {statusOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}
                    {/*{selectedReport === 'Total Fixed Deposit Report' && (*/}
                    {/*    <div className="flex justify-center mt-2">*/}
                    {/*        <div>*/}
                    {/*            <select*/}
                    {/*                id="searchOption"*/}
                    {/*                value={status}*/}
                    {/*                onChange={(e)=>setStatus(e.target.value)}*/}
                    {/*                className="block w-[140px] py-1 px-3 border border-[#007970] bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#007970] focus:border-[#007970] font-[600] text-[14px] text-[#007970] sm:text-sm"*/}
                    {/*            >*/}
                    {/*                {statusOptions.map((option) => (*/}
                    {/*                    <option key={option} value={option}>*/}
                    {/*                        {option}*/}
                    {/*                    </option>*/}
                    {/*                ))}*/}
                    {/*            </select>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*)}*/}
                </div>
                {/*<p>sdghsdghs</p>*/}
            </div>
        </Layout>
    );
};

export default Report;