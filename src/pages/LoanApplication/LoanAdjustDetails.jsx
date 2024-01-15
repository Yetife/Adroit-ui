const LoanAdjustDetails = () => {
    return (
        <div className="flex justify-between">
            <div>
                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">Adjusted Amount</p>
                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pt-8">Adjusted Tenor</p>
                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pt-8">Description</p>
            </div>
            <div className="text-right">
                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">N50,000.00</p>
                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pt-8">6</p>
                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pt-8">None</p>
            </div>
        </div>
    );
};

export default LoanAdjustDetails;