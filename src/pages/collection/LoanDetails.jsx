import React from 'react';

const LoanDetails = ({data}) => {
    return (
        <div className="flex justify-between">
            <div>
                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">Loan ID</p>
                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pt-8">Principal Amount</p>
                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pt-8">Interest Amount</p>
                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pt-8">Processing Fee</p>
                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pt-8">Late Fees</p>
                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pt-8">Loan Duration</p>
                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pt-8">Amount Disbursed</p>
                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pt-8">Amount Paid</p>
                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pt-8">Status</p>
                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pt-8">Loan Count</p>
                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pt-8">Created at</p>
                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pt-8">Repayment Date</p>
            </div>
            <div className="text-right">
                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">LOAN-20230904099-122</p>
                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pt-8">N350,000.00</p>
                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pt-8">N140,000.00</p>
                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pt-8">N20,000.00</p>
                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pt-8">N/A</p>
                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pt-8">3 months</p>
                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pt-8">N350,000.00</p>
                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pt-8">N0.00</p>
                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pt-8">Disbursed</p>
                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pt-8">N/A</p>
                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pt-8">Sep 8, 2023  10:30am</p>
                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pt-8">Oct 8, 2023</p>
            </div>
        </div>
    );
};

export default LoanDetails;