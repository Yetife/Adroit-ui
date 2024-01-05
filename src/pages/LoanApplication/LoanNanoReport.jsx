import {Divider} from "@mui/material";
import {CSVLink} from "react-csv";

const LoanNanoReport = () => {
    const data = [
        { applicationId: 'CUS20230904-122', amountRequested: 'N50,000.00', interest: 'N10,000.00' },
    ];

    // CSV headers
    const headers = [
        { label: 'Application ID', key: 'applicationId' },
        { label: 'Amount Requested', key: 'amountRequested' },
        { label: 'Interest', key: 'interest' },
    ];
    return (
        <div>
            <div className="flex justify-between">
                <div></div>
                <div style={{border: "1px solid #4A5D58", padding: "10px 15px"}}>
                    <CSVLink data={data} headers={headers} filename="loan_report.csv">
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                 fill="none">
                                <path
                                    d="M3.33325 10.8333V15.8333C3.33325 16.2754 3.50885 16.6993 3.82141 17.0118C4.13397 17.3244 4.55789 17.5 4.99992 17.5H14.9999C15.4419 17.5 15.8659 17.3244 16.1784 17.0118C16.491 16.6993 16.6666 16.2754 16.6666 15.8333V10.8333M9.99992 2.5V12.5M9.99992 12.5L7.08325 9.58333M9.99992 12.5L12.9166 9.58333"
                                    stroke="#4A5D58"
                                    strokeWidth="1.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pl-3">Export CSV</p>
                        </div>
                    </CSVLink>
                </div>
            </div>

            <div className="mt-2">
                <Divider/>
                <div className="flex justify-between mt-8">
                    <div>
                        <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">Application ID</p>
                        <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pt-8">Amount Requested</p>
                        <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pt-8">Interest</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">CUS20230904-122</p>
                        <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pt-8">N50,000.00</p>
                        <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pt-8">N10,000.00</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoanNanoReport;