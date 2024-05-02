import {formatAmount, formatRepayment} from "../../components/reusables/formatAmount.js";

const LoanInformation = ({data}) => {

    return (
        <div className="flex justify-between">
            <div>
                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">Application ID</p>
                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pt-8">Amount Requested</p>
                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pt-8">Interest</p>
                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pt-8">Total Amount</p>
                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pt-8">Processing Fee</p>
                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pt-8">Status</p>
                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pt-8">Duration</p>
                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pt-8">Assigned Loan Officer</p>
                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pt-8">Application Date</p>
                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pt-8">Submission Date</p>
            </div>
            <div className="text-right">
                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">{data?.data.information.applicationId}</p>
                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pt-8">&#8358;{formatRepayment(data?.data.information.amountRequested)}</p>
                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pt-8">{data?.data.information.interest ? data?.data.information.interest : "null" }</p>
                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pt-8">&#8358;{formatRepayment(data?.data.information.totalAmount)}</p>
                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pt-8">{data?.data.information.processingFee}</p>
                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pt-8">{data?.data.information.status}</p>
                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pt-8">{data?.data.information.duration}</p>
                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pt-8">{data?.data.information.assignedLoanOfficer}</p>
                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pt-8">{data?.data.information.applicationDate}</p>
                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pt-8">{data?.data.information.submissionDate}</p>
            </div>
        </div>
    );
};

export default LoanInformation;