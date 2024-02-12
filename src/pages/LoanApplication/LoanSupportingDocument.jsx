import {useRef, useState} from "react";
import {Close} from "@mui/icons-material";
import {Button, Text} from "@chakra-ui/react";
import {Link as ReactLink} from "react-router-dom";
import RequestDocumentModal from "../../components/loanUnderwritting/RequestDocumentModal";
import { useDispatch } from "react-redux";
import {updateSnackbar} from "../../store/snackbar/reducer.js";
import { getUserToken } from "../../services/storage";

const LoanSupportingDocument = () => {
    const [guarantorFile, setGuarantorFile] = useState(null)
    const [selectedFiles, setSelectedFiles] = useState([])
    const queryParams = new URLSearchParams(location.search);
    const appId = queryParams.get("aid");
    const [open, setOpen] = useState(false)
    const fileGuarantorInputRef = useRef(null);
    const fileInputRef = useRef(null);
    const dispatch = useDispatch()
    const openExplorer = () => {
        fileInputRef.current.click();
    };

    const openGuarantorExplorer = () => {
        fileGuarantorInputRef.current.click();
    };
    const handleGuarantorChange = (event) => {
        const file = event.target.files[0];
        console.log(file)
        setGuarantorFile(file);
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles([...selectedFiles, ...files]);
        console.log(selectedFiles)

    };

    const removeFile = (index) => {
        const newFiles = [...selectedFiles];
        newFiles.splice(index, 1);
        setSelectedFiles(newFiles);
    };

    const handleGuarantorUpload = async () => {
        console.log("Uploading files:", selectedFiles);
        console.log("Uploading files:", guarantorFile);
        try {
            const formData = new FormData();
            formData.append('GuarantorForm', guarantorFile);
            formData.append('LoanApplicationId', appId);
            const token = getUserToken();
            const baseUrl = import.meta.env.VITE_APP_BASE_URL;

            const res = await fetch(`${baseUrl}/LoanApplication/Customer/addSupportingDocumentGuarantorForm`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'multipart/form-data',
                    'XApiKey': import.meta.env.VITE_APP_ENCRYPTION_KEY,
                    // 'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                },
            });
            console.log(res.status, "resssssss")
            if (res.status === 200) {
                dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: "Record saved successfully", success:true}));
                setSelectedFiles([]);
                setGuarantorFile(null)
            }
        } catch (error) {
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message:error.data.message,success:false}));
            setSelectedFiles([]);
            setGuarantorFile(null)
        }
    };
    const handleOtherFormUpload = async () => {
        try {
            const formData = new FormData();
            selectedFiles.forEach((file, index) => {
                formData.append('OtherForms', file);
            });
            formData.append('LoanApplicationId', appId);
            const token = getUserToken();
            const baseUrl = import.meta.env.VITE_APP_BASE_URL;

            const res = await fetch(`${baseUrl}/LoanApplication/Customer/addSupportingDocumentOtherForms`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'multipart/form-data',
                    'XApiKey': import.meta.env.VITE_APP_ENCRYPTION_KEY,
                    'Authorization': `Bearer ${token}`
                },
            });

            if (res.status === 200) {
                dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: "Record saved successfully", success:true}));
                setSelectedFiles([]);
            }
        } catch (error) {
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message:error.data.message,success:false}));
            setSelectedFiles([]);
            setGuarantorFile(null)
        }
    };

    return (
        <div className="flex">
            <div className="flex">
            <div className="flex flex-col">
                <div onClick={openExplorer} style={{border: '1px solid rgba(105, 119, 115, 0.50', background: '#F3F3F3'}} className="cursor-pointer flex flex-wrap h-[180px] py-1 px-16">
                    <input
                        ref={fileInputRef}
                        type="file"
                        id="fileInput"
                        name="files"
                        style={{ position: "absolute", left: "-9999px" }}
                        accept="*/*"
                        multiple
                        onChange={handleFileChange}
                    />
                    {selectedFiles?.length > 0 && (
                        <div>
                            {selectedFiles.map((file, index) => (
                                <div key={index} className="items-center flex pt-4 px-2">
                                    <p className="font-medium text-[#4A5D58] flex flex-wrap text-[14px]">
                                        {file.name}
                                    </p>
                                    <button
                                        onClick={() => removeFile(index)}
                                        className="ml-2 text-red-500 font-medium"
                                    >
                                        <Close style={{fontSize: '16px'}}/>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    {selectedFiles?.length === 0 && (
                        <div className="flex flex-col items-center py-12">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="33" height="38" viewBox="0 0 33 38" fill="none">
                                    <path d="M32.5 17.4557V34.9102C32.5 35.6818 32.1935 36.4217 31.6479 36.9673C31.1024 37.5128 30.3624 37.8193 29.5909 37.8193H3.40909C2.63755 37.8193 1.89761 37.5128 1.35205 36.9673C0.806493 36.4217 0.5 35.6818 0.5 34.9102V17.4557C0.5 16.6842 0.806493 15.9442 1.35205 15.3987C1.89761 14.8531 2.63755 14.5466 3.40909 14.5466H7.77273C8.1585 14.5466 8.52847 14.6998 8.80125 14.9726C9.07403 15.2454 9.22727 15.6154 9.22727 16.0011C9.22727 16.3869 9.07403 16.7569 8.80125 17.0297C8.52847 17.3024 8.1585 17.4557 7.77273 17.4557H3.40909V34.9102H29.5909V17.4557H25.2273C24.8415 17.4557 24.4715 17.3024 24.1988 17.0297C23.926 16.7569 23.7727 16.3869 23.7727 16.0011C23.7727 15.6154 23.926 15.2454 24.1988 14.9726C24.4715 14.6998 24.8415 14.5466 25.2273 14.5466H29.5909C30.3624 14.5466 31.1024 14.8531 31.6479 15.3987C32.1935 15.9442 32.5 16.6842 32.5 17.4557ZM10.2564 9.75751L15.0455 4.9666V21.8193C15.0455 22.2051 15.1987 22.5751 15.4715 22.8478C15.7443 23.1206 16.1142 23.2739 16.5 23.2739C16.8858 23.2739 17.2557 23.1206 17.5285 22.8478C17.8013 22.5751 17.9545 22.2051 17.9545 21.8193V4.9666L22.7436 9.75751C23.0166 10.0304 23.3867 10.1838 23.7727 10.1838C24.1587 10.1838 24.5289 10.0304 24.8018 9.75751C25.0748 9.48458 25.2281 9.1144 25.2281 8.72842C25.2281 8.34243 25.0748 7.97226 24.8018 7.69933L17.5291 0.426599C17.394 0.29136 17.2336 0.184074 17.057 0.110875C16.8804 0.0376764 16.6912 0 16.5 0C16.3089 0 16.1196 0.0376764 15.943 0.110875C15.7664 0.184074 15.606 0.29136 15.4709 0.426599L8.19818 7.69933C7.92525 7.97226 7.77192 8.34243 7.77192 8.72842C7.77192 9.1144 7.92525 9.48458 8.19818 9.75751C8.47111 10.0304 8.84129 10.1838 9.22727 10.1838C9.61326 10.1838 9.98343 10.0304 10.2564 9.75751Z" fill="#4A5D58"/>
                                </svg>
                            </div>
                            <p className="font-medium text-[#4A5D58] text-[14px] whitespace-nowrap pt-4">
                                Upload Documents
                            </p>
                        </div>
                    )}
                </div>
                <div className="mt-8 flex justify-center">
                    <Button className="ml-2" variant="primary" bgColor="#00C795" borderRadius="4px"
                            height="37px" size='md' as={ReactLink} w={'109px'} onClick={handleOtherFormUpload}>
                        <Text color="white">Upload</Text>
                    </Button>
            </div>
            </div>
            <div className="flex flex-col">
                <div onClick={openGuarantorExplorer} style={{border: '1px solid rgba(105, 119, 115, 0.50', background: '#F3F3F3'}} className="flex flex-col items-center cursor-pointer py-12 h-[180px] px-12 ml-12">
                    <input
                        ref={fileGuarantorInputRef}
                        type="file"
                        id="fileInput"
                        name="files"
                        style={{ position: "absolute", left: "-9999px" }}
                        accept="*/*"
                        multiple
                        onChange={handleGuarantorChange}
                    />
                    {guarantorFile && (
                        <p className="font-medium text-[#4A5D58] text-[18px] flex flex-wrap pt-4">
                            {guarantorFile.name}
                        </p>
                    )}
                    {!guarantorFile && (
                        <>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="33" height="38" viewBox="0 0 33 38" fill="none">
                                    <path d="M32.5 17.4557V34.9102C32.5 35.6818 32.1935 36.4217 31.6479 36.9673C31.1024 37.5128 30.3624 37.8193 29.5909 37.8193H3.40909C2.63755 37.8193 1.89761 37.5128 1.35205 36.9673C0.806493 36.4217 0.5 35.6818 0.5 34.9102V17.4557C0.5 16.6842 0.806493 15.9442 1.35205 15.3987C1.89761 14.8531 2.63755 14.5466 3.40909 14.5466H7.77273C8.1585 14.5466 8.52847 14.6998 8.80125 14.9726C9.07403 15.2454 9.22727 15.6154 9.22727 16.0011C9.22727 16.3869 9.07403 16.7569 8.80125 17.0297C8.52847 17.3024 8.1585 17.4557 7.77273 17.4557H3.40909V34.9102H29.5909V17.4557H25.2273C24.8415 17.4557 24.4715 17.3024 24.1988 17.0297C23.926 16.7569 23.7727 16.3869 23.7727 16.0011C23.7727 15.6154 23.926 15.2454 24.1988 14.9726C24.4715 14.6998 24.8415 14.5466 25.2273 14.5466H29.5909C30.3624 14.5466 31.1024 14.8531 31.6479 15.3987C32.1935 15.9442 32.5 16.6842 32.5 17.4557ZM10.2564 9.75751L15.0455 4.9666V21.8193C15.0455 22.2051 15.1987 22.5751 15.4715 22.8478C15.7443 23.1206 16.1142 23.2739 16.5 23.2739C16.8858 23.2739 17.2557 23.1206 17.5285 22.8478C17.8013 22.5751 17.9545 22.2051 17.9545 21.8193V4.9666L22.7436 9.75751C23.0166 10.0304 23.3867 10.1838 23.7727 10.1838C24.1587 10.1838 24.5289 10.0304 24.8018 9.75751C25.0748 9.48458 25.2281 9.1144 25.2281 8.72842C25.2281 8.34243 25.0748 7.97226 24.8018 7.69933L17.5291 0.426599C17.394 0.29136 17.2336 0.184074 17.057 0.110875C16.8804 0.0376764 16.6912 0 16.5 0C16.3089 0 16.1196 0.0376764 15.943 0.110875C15.7664 0.184074 15.606 0.29136 15.4709 0.426599L8.19818 7.69933C7.92525 7.97226 7.77192 8.34243 7.77192 8.72842C7.77192 9.1144 7.92525 9.48458 8.19818 9.75751C8.47111 10.0304 8.84129 10.1838 9.22727 10.1838C9.61326 10.1838 9.98343 10.0304 10.2564 9.75751Z" fill="#4A5D58"/>
                                </svg>
                            </div>
                            <p className="font-medium text-[#4A5D58] text-[14px] whitespace-nowrap pt-4">
                                Upload Guarantor's Form
                            </p>
                        </>
                    )}
                </div>
                <div className="mt-8 flex justify-center">
                        <Button className="ml-12" variant="primary" bgColor="#00C795" borderRadius="4px"
                                height="37px" size='md' as={ReactLink} w={'109px'} onClick={ handleGuarantorUpload}>
                            <Text color="white">Upload</Text>
                        </Button>
                </div>
            </div>
            </div>
            <div style={{border: '1px solid rgba(105, 119, 115, 0.50', background: '#F3F3F3'}} onClick={()=>setOpen(true)} className="flex flex-col h-[180px] items-center py-12 px-10 ml-12 cursor-pointer">
                <div>
                    <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="19.5" cy="19.5" r="18.8558" fill="#D9D9D9" stroke="#4A5D58" strokeWidth="0.711538"
                                strokeDasharray="2.85 2.85"/>
                        <path
                            d="M28.7504 21.1258H21.1267V28.7494H18.5855V21.1258H10.9619V18.5846H18.5855V10.9609H21.1267V18.5846H28.7504V21.1258Z"
                            fill="#4A5D58"/>
                    </svg>
                </div>
                <p className="font-medium text-[#4A5D58] text-[14px] whitespace-nowrap pt-4">Request for New
                    Document</p>
            </div>
            <RequestDocumentModal open={open} setOpen={setOpen}/>
        </div>
    );
};

export default LoanSupportingDocument;