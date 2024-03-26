import {Link as ReactLink} from "react-router-dom";
import {Button, Text} from "@chakra-ui/react";
import AdjustDetailsModal from "../../components/loanApplication/adjust/AdjustDetailsModal.jsx";
import {useState} from "react";

const LoanAdjustDetails = ({data}) => {
    const [openAdjust, setOpenAdjust] = useState(false)
    const [inputs, setInputs] = useState({
        amount: data.data.adjustedDetail.adjustAmount,
        tenor: data.data.adjustedDetail.adjustedLoanTenor
    })

    const downloadPDF = () => {
        // Convert base64 string to a blob
        const byteCharacters = atob(data?.data.bankStatement.bankStatementOfAccount);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });

        // Create a URL for the blob
        const url = URL.createObjectURL(blob);

        // Trigger file download
        const a = document.createElement('a');
        a.href = url;
        a.download = 'bankStatement.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // Revoke the URL to free up resources
        URL.revokeObjectURL(url);
    };

    return (
        <div>
            <div className="flex justify-between">
                <div className="flex space-x-8">
                    <div>
                        <p className="text-[16px] leading-5 text-[#FF0909] font-[600]">Original Loan Amount</p>
                        <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pt-6">Adjusted Amount</p>
                        <p className="text-[16px] leading-5 text-[#FF0909] font-[600] pt-6">Original Loan Tenor</p>
                        <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pt-6">Adjusted Tenor</p>
                        <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pt-6">Comment</p>
                    </div>
                    <div className="text-left">
                        <p className="text-[16px] leading-5 text-[#FF0909] font-[600]">{data.data.adjustedDetail.initialLoanAmount}</p>
                        <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pt-6">{data.data.adjustedDetail.adjustAmount}</p>
                        <p className="text-[16px] leading-5 text-[#FF0909] font-[600] pt-6">{data.data.adjustedDetail.initialLoanTenor}</p>
                        <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pt-6">{data.data.adjustedDetail.adjustedLoanTenor}</p>
                    </div>
                </div>
                <div>
                    <div className="flex items-center cursor-pointer" style={{border: "1px solid #4A5D58", padding: "10px 15px"}} onClick={downloadPDF}>
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
                        <p className="text-[16px] leading-5 font-[Inter] text-[#4A5D58] font-[600] pl-3">Download Bank Statement</p>
                    </div>
                </div>
            </div>
            <div className="mt-6">
                 <textarea
                     id="message" name="message" rows="4" cols="50"
                       value={data.data.adjustedDetail.comment}
                       disabled
                       className="font-medium w-full text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                 ></textarea>
                <div className="float-right mt-4">
                    <Button variant="primary" bgColor="#00C795" borderRadius="4px" height="37px" size='md'
                            as={ReactLink} w={'110px'} onClick={()=>setOpenAdjust(true)}>
                        <Text color="white">Update</Text>
                    </Button>
                </div>
            </div>

            <AdjustDetailsModal open={openAdjust} setOpen={setOpenAdjust} inputs={inputs} setInputs={setInputs}/>
        </div>
    );
};

export default LoanAdjustDetails;