import React, {useEffect, useState} from 'react';
import Layout from "../Layout.jsx";
import {ChevronRight, Search} from "react-feather";
import CustomDropdown from "../../components/reusables/CustomDropdown.jsx";
import {getCurrentDate} from "../../components/reusables/getCurrentDate.js";
import {Button, Text} from "@chakra-ui/react";
import {Link as ReactLink} from "react-router-dom";
import AccountOpeningReportTable from "../../components/report/wallet/AccountOpeningReportTable.jsx";
import DownloadExcelButton from "../../components/reusables/DownloadExcelButton.jsx";
import CustomerWalletStatementTable from "../../components/report/wallet/CustomerWalletStatementTable.jsx";
import CustomerTransactionReportTable from "../../components/report/wallet/CustomerTransactionReportTable.jsx";
import CustomerTransactionReceipt from "../../components/report/wallet/CustomerTransactionReceipt.jsx";
import CustomerWalletAccountTable from "../../components/report/wallet/CustomerWalletAccountTable.jsx";
import TransactionStatusTable from "../../components/report/wallet/TransactionStatusTable.jsx";
import CustomerWalletDetailsTable from "../../components/report/wallet/CustomerWalletDetailsTable.jsx";

const reportOptions = {
    'Wallet': ['Account Opening Report', 'Customer Wallet Statement', 'Customer Transaction Report', 'Customer Transaction Receipt', 'Customer Wallet Account', 'Transaction Status', 'Customer Wallet Details',],
    'Fixed Deposit': ['Customer Accrued Interest Till Date', 'Fixed Deposit Details Report', 'Customer Fixed Deposit Report', 'Total Fixed Deposit Report'],
    'Loans': ['Loan Application Report', 'Loan Application Category Report', 'Loan Breakdown Report', 'Loan Repayment Report'],
    'Overdue Loan Report': ['Loan Overdue Category Report', 'Loan Collection Report']
};
const accountOpeningOptions = ['ALL', 'ACCOUNT NUMBER', 'BVN', 'NIN', 'EMAIL ADDRESS', 'PHONE NUMBER'];
const daysOptions = ['0-30 DAYS', '30-60 DAYS', '60-90 DAYS', '90-120 DAYS', '120-365 DAYS', 'OVER 365 DAYS'];
const walletAccountOptions = ['THIS WEEK', 'LAST WEEK', 'THIS MONTH', 'LAST MONTH', 'DATE RANGE']
const statusOptions = ['ACTIVE', 'INACTIVE']

const Report = () => {
    const [selectedReportType, setSelectedReportType] = useState('');
    const [selectedReport, setSelectedReport] = useState("");
    const [selectedSearchOption, setSelectedSearchOption] = useState(accountOpeningOptions[0]);
    const [selectedWalletOption, setSelectedWalletOption] = useState(walletAccountOptions[0]);
    const [status, setStatus] = useState(statusOptions[0])
    const [days, setDays] = useState(daysOptions[0])
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

    const checkStatus = () => {
        return selectedReport === 'Transaction Status' || selectedReport === 'Loan Breakdown Report'
    }

    const checkReport = () => {
        return selectedReport === 'Loan Application Report' || selectedReport === 'Loan Repayment Report'
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
                            <label htmlFor="reportType" className="block text-[16px] font-[700] text-[#4A5D58] mb-1 uppercase">Report Category:</label>
                            <select
                                id="reportType"
                                value={selectedReportType}
                                onChange={handleReportTypeChange}
                                className="block w-full py-1 px-3 border border-[#007970] bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#007970] focus:border-[#007970] font-[600] text-[14px] text-[#007970] sm:text-sm uppercase"
                            >
                                <option value="" disabled>Select report category</option>
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
                                   className="block text-[16px] font-[700] text-[#4A5D58] mb-1 uppercase">Report Type:</label>
                            <select
                                id="report"
                                value={selectedReport}
                                onChange={handleReportChange}
                                className="block w-[360px] py-1 px-3 border border-[#007970] bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#007970]
                                focus:border-[#007970] font-[600] text-[14px] text-[#007970] sm:text-sm uppercase"
                            >
                                <option value="" disabled>Select report type</option>
                                {reportOptions[selectedReportType]?.map((report) => (
                                    <option key={report} value={report}>
                                        {report}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    {checkOption() && (
                        <div className="flex space-x-1 space-y-3 items-center justify-center mr-2">
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
                            <div className="relative flex items-center w-[200px] max-w-xs">
                                <input
                                    id="searchQuery"
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearchQueryChange}
                                    placeholder="Search"
                                    className="block w-[200px] py-1 px-3 border border-[#007970] bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#007970] focus:border-[#007970] font-[600] text-[14px] text-[#007970] sm:text-sm"
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <Search className="w-4 h-4 text-gray-400"/>
                                </div>
                            </div>
                            <div>
                                <Button variant="primary" onClick={handleSearch} bgColor="#00C796"
                                        borderRadius="4px"
                                        height="31px" size='md' as={ReactLink} w={'182px'}>
                                    <Text color="white">SEARCH</Text>
                                </Button>
                            </div>
                        </div>
                    )}
                    {checkWeek() && (
                        <div>
                            <div
                                className={`${selectedWalletOption !== "DATE RANGE" ? 'flex items-center justify-center space-x-1 ml-12 space-y-3' : "flex items-center justify-center space-x-1 mr-32 space-y-3"}flex items-center justify-center space-x-1 ml-8 space-y-3`}>
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
                                <div className="relative flex items-center w-[150px] max-w-xs">
                                    <input
                                        id="searchQuery"
                                        type="text"
                                        value={searchQuery}
                                        onChange={handleSearchQueryChange}
                                        placeholder="Search"
                                        className="block w-[150px] py-1 px-3 border border-[#007970] bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#007970] focus:border-[#007970] font-[600] text-[14px] text-[#007970] sm:text-sm"
                                    />
                                    <div
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <Search className="w-4 h-4 text-gray-400"/>
                                    </div>
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
                                {selectedWalletOption !== "DATE RANGE" && <div>
                                    <div>
                                        <Button variant="primary" onClick={handleSearch} bgColor="#00C796"
                                                borderRadius="4px"
                                                height="31px" size='md' as={ReactLink} w={'129px'}>
                                            <Text color="white">SEARCH</Text>
                                        </Button>
                                    </div>
                                </div>}
                            </div>
                            {
                                selectedWalletOption === "DATE RANGE" && (
                                    <div className="flex items-center justify-center space-x-1 mr-32  mt-2">
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
                                            <Button variant="primary" onClick={handleSearch} bgColor="#00C796" mt={'22px'}
                                                    borderRadius="4px"
                                                    height="31px" size='md' as={ReactLink} w={'119px'}>
                                                <Text color="white">SEARCH</Text>
                                            </Button>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    )}
                    {checkStatus() && (
                        <div>
                            <div className="flex items-center justify-center space-x-1 mt-3">
                                <div>
                                    <select
                                        id="searchOption"
                                        value={selectedSearchOption}
                                        onChange={handleSearchOptionChange}
                                        className="block w-[190px] py-1 px-3 border border-[#007970] bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#007970] focus:border-[#007970] font-[600] text-[14px] text-[#007970] sm:text-sm"
                                    >
                                        {accountOpeningOptions.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="relative flex items-center w-[400px]">
                                    <input
                                        id="searchQuery"
                                        type="text"
                                        value={searchQuery}
                                        onChange={handleSearchQueryChange}
                                        placeholder="Search"
                                        className="block w-[400px] py-1 px-3 border border-[#007970] bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#007970] focus:border-[#007970] font-[600] text-[14px] text-[#007970] sm:text-sm"
                                    />
                                    <div
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <Search className="w-4 h-4 text-gray-400"/>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-center space-x-1 mr-4 mt-2">
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
                                        className="block w-[180px] py-1 px-3 border border-[#007970] bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#007970] focus:border-[#007970] font-[600] text-[14px] text-[#007970] sm:text-sm"
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
                                        className="block w-[180px] py-1 px-3 border border-[#007970] bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#007970] focus:border-[#007970] font-[600] text-[14px] text-[#007970] sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <Button variant="primary" onClick={handleSearch} bgColor="#00C796" mt={'22px'}
                                            borderRadius="4px"
                                            height="31px" size='md' as={ReactLink} w={'189px'}>
                                        <Text color="white">SEARCH</Text>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                    {
                        selectedReport === "Customer Wallet Details" && (
                            <div className="flex space-x-2 items-center justify-center mr-48  mt-2">
                                <div>
                                    <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-1">
                                        Account Number
                                    </h3>
                                    <div className="relative flex items-center w-[250px] max-w-xs">
                                        <input
                                            id="searchQuery"
                                            type="text"
                                            value={searchQuery}
                                            onChange={handleSearchQueryChange}
                                            placeholder="Input account number"
                                            className="block w-[250px] py-1 px-3 border border-[#007970] bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#007970] focus:border-[#007970] font-[600] text-[14px] text-[#007970] sm:text-sm"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <Button variant="primary" onClick={handleSearch} bgColor="#00C796"
                                                borderRadius="4px"
                                                height="31px" size='md' as={ReactLink} w={'129px'} mt={'24px'}>
                                            <Text color="white">SEARCH</Text>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    {selectedReport === 'Fixed Deposit Details Report' && (
                        <div className="flex items-center justify-center space-x-1 mt-2">
                            <div>
                                <select
                                    id="searchOption"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="block w-[140px] mt-6 py-1 px-3 border border-[#007970] bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#007970] focus:border-[#007970] font-[600] text-[14px] text-[#007970] sm:text-sm"
                                >
                                    {statusOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex items-center space-x-1">
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
                                        className="py-1 px-6 mt-6 bg-[#00C796] text-white rounded-md shadow-sm hover:bg-[#00C796] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#007970]"
                                    >
                                        SEARCH
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {
                        checkReport() && (
                            <div className="flex items-center justify-center space-x-1 mr-32 mt-2">
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
                    { selectedReport === 'Loan Application Category Report' && (
                        <div className="flex space-x-1 space-y-3 items-center justify-center">
                            <div>
                                <select
                                    id="searchOption"
                                    value={days}
                                    onChange={(e) => setDays(e.target.value)}
                                    className="block mt-3 w-[190px] py-1 px-3 border border-[#007970] bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#007970] focus:border-[#007970] font-[600] text-[14px] text-[#007970] sm:text-sm"
                                >
                                    {daysOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="relative flex items-center w-[200px] max-w-xs">
                                <input
                                    id="searchQuery"
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearchQueryChange}
                                    placeholder="Search"
                                    className="block w-[200px] py-1 px-3 border border-[#007970] bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#007970] focus:border-[#007970] font-[600] text-[14px] text-[#007970] sm:text-sm"
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <Search className="w-4 h-4 text-gray-400"/>
                                </div>
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
                    {
                        selectedReport !== "" && <div className="flex justify-between mt-4">
                            <div></div>
                            <DownloadExcelButton/>
                        </div>
                    }

                    {selectedReport === 'Account Opening Report' && <AccountOpeningReportTable />}
                    {selectedReport === 'Customer Wallet Statement' && <CustomerWalletStatementTable />}
                    {selectedReport === 'Customer Transaction Report' && <CustomerTransactionReportTable />}
                    {selectedReport === 'Customer Transaction Receipt' && <CustomerTransactionReceipt />}
                    {selectedReport === 'Customer Wallet Account' && <CustomerWalletAccountTable />}
                    {selectedReport === 'Transaction Status' && <TransactionStatusTable />}
                    {selectedReport === 'Customer Wallet Details' && <CustomerWalletDetailsTable />}
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