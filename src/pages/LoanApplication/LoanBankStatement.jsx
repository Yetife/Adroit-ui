
const LoanBankStatement = ({data}) => {
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
                <div>
                    <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">Bank Statement</p>
                </div>
                <div style={{border: "1px solid #4A5D58", padding: "10px 15px", cursor: "pointer"}} onClick={downloadPDF}>
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
                        <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pl-3">View Bank Statement</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoanBankStatement;