import {useEffect, useRef, useState} from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {Button, Text} from "@chakra-ui/react";
import {Link as ReactLink} from "react-router-dom";
import {Close} from "@mui/icons-material";
import axios from "axios";
import {getUserToken} from "../../../services/storage/index.js";

const ModifyRestructuringModal = ({open, setOpen, handleSubmit, inputs, setInputs,}) => {
    const [file, setFile] = useState(null)
    const fileInputRef = useRef(null);
    const [tenor, setTenor] = useState([]);
    const token = getUserToken();
    const baseUrl = import.meta.env.VITE_APP_BASE_URL

    const handleChange = (e, fieldName) => {
        const value = e.target.value;
        setInputs((values) => ({...values, [fieldName]: value}))
    };

    const openExplorer = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log(file)
        setFile(file);
    };

    const fetchTenor = async () => {
        try {
            const response = await axios.get(`${baseUrl}/GeneralSetUp/getallvalidRegularLoanTenors`, {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'XAPIKEY': import.meta.env.VITE_APP_ENCRYPTION_KEY,
                    'authorization': `Bearer ${token}`
                }
            });
            setTenor(response.data.data);
            console.log('Fetched state:', response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchTenor()
    }, []);

    return (
        <div>
            <Dialog.Root
                open={Boolean(open)}
                onOpenChange={(open) => {
                    !open && setOpen(undefined);
                }}
            >
                <Dialog.Portal>
                    <Dialog.Overlay className="bg-black bg-opacity-20 z-[100] data-[state=open]:animate-overlayShow fixed inset-0" />
                    <Dialog.Content className="data-[state=open]:animate-contentShow custom-scroll-bar overflow-y-auto z-[200] fixed top-[50%] left-[50%] max-h-[100vh] w-[90vw] max-w-[600px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[45px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                        <Dialog.Title className="text-[24px] text-[#343434] font-bold -mt-8">Modify Loan Restructuring</Dialog.Title>
                        {/*<Divider className="pt-4"/>*/}
                        <div className="mt-3">
                            <div className="flex items-center space-x-8">
                                <div>
                                    <div>
                                        <span className="ml-8">
                                          <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                           Original Loan Amount
                                          </h3>
                                          <input
                                              type="text"
                                              disabled
                                              value={inputs.amount}
                                              onChange={(event) => handleChange(event, "amount")}
                                              placeholder="Enter amount"
                                              className="font-medium w-full text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                          />
                                        </span>
                                    </div>
                                    <div>
                                        <span className="ml-8">
                                          <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                           Remaining Loan Balance
                                          </h3>
                                          <input
                                              type="text"
                                              value={inputs.amount}
                                              disabled
                                              onChange={(event) => handleChange(event, "amount")}
                                              placeholder="Enter amount"
                                              className="font-medium w-full text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                          />
                                        </span>
                                    </div>

                                </div>
                                <div>
                                    <div>
                                        <span className="ml-4">
                                          <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                           Original Loan Tenor
                                          </h3>
                                             <select id="select" value={inputs.tenor}
                                                     disabled
                                                     onChange={(event) => handleChange(event, "tenor")}
                                                     className="font-medium w-[250px] text-black leading-relaxed px-4 py-2 rounded h-[45px]  border border-neutral-300 justify-between items-center gap-4 flex">
                                                <option value="" disabled>Select tenor</option>
                                                 {tenor && tenor?.map((option, index) => (
                                                     <option key={option.uniqueId} value={option.name}>
                                                         {option.name}
                                                     </option>
                                                 ))}
                                            </select>
                                        </span>
                                    </div>
                                    <div>
                                        <span className="ml-4">
                                          <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                           Remaining Loan Tenor
                                          </h3>
                                             <select id="select" value={inputs.tenor}
                                                     disabled
                                                     onChange={(event) => handleChange(event, "tenor")}
                                                     className="font-medium w-full text-black leading-relaxed px-4 py-2 rounded h-[45px]  border border-neutral-300 justify-between items-center gap-4 flex">
                                                <option value="" disabled>Select tenor</option>
                                                 {tenor && tenor?.map((option, index) => (
                                                     <option key={option.uniqueId} value={option.name}>
                                                         {option.name}
                                                     </option>
                                                 ))}
                                            </select>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <span className="ml-4">
                                        <p>Customer Request</p>
                                      <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                       Loan Tenor
                                      </h3>
                                         <select id="select" value={inputs.tenor}
                                                 onChange={(event) => handleChange(event, "tenor")}
                                                 className="font-medium w-[220px] text-black leading-relaxed px-4 py-2 rounded h-[45px]  border border-neutral-300 justify-between items-center gap-4 flex">
                                            <option value="" disabled>Select tenor</option>
                                             {tenor && tenor?.map((option, index) => (
                                                 <option key={option.uniqueId} value={option.name}>
                                                     {option.name}
                                                 </option>
                                             ))}
                                        </select>
                                    </span>
                                </div>
                            </div>


                            <div className="mt-6 w-full">
                                <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                    Bank Statement Upload (Optional)
                                </h3>
                                <div className="flex flex-col">
                                    <div onClick={openExplorer}
                                         style={{border: '1px dashed #00C795', background: '#A7A7A70F'}}
                                         className="flex flex-col items-center cursor-pointer py-8 h-[110px]">
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            id="fileInput"
                                            name="files"
                                            style={{position: "absolute", left: "-9999px"}}
                                            accept="*/*"
                                            multiple
                                            onChange={handleFileChange}
                                        />
                                        {file && (
                                            <p className="font-medium text-[#4A5D58] text-[18px] flex flex-wrap pt-4">
                                                {file?.name}
                                            </p>
                                        )}
                                        {!file && (
                                            <>
                                                <div>
                                                    <svg width="28" height="27" viewBox="0 0 28 27" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M4.84263 0H23.1571C24.278 0 25.353 0.445282 26.1456 1.23789C26.9382 2.03049 27.3835 3.1055 27.3835 4.22642V22.5409C27.3835 23.6618 26.9382 24.7368 26.1456 25.5294C25.353 26.322 24.278 26.7673 23.1571 26.7673H4.84263C3.72171 26.7673 2.64671 26.322 1.8541 25.5294C1.06149 24.7368 0.616211 23.6618 0.616211 22.5409V4.22642C0.616211 3.1055 1.06149 2.03049 1.8541 1.23789C2.64671 0.445282 3.72171 0 4.84263 0ZM4.84263 1.40881C4.09535 1.40881 3.37868 1.70566 2.85027 2.23406C2.32187 2.76247 2.02502 3.47914 2.02502 4.22642V20.5545L8.06879 14.4966L11.5908 18.0186L18.6348 10.9746L25.9747 18.3145V4.22642C25.9747 3.47914 25.6778 2.76247 25.1494 2.23406C24.621 1.70566 23.9044 1.40881 23.1571 1.40881H4.84263ZM11.5908 20.0191L8.06879 16.4971L2.02502 22.5409C2.02502 23.2882 2.32187 24.0048 2.85027 24.5332C3.37868 25.0616 4.09535 25.3585 4.84263 25.3585H23.1571C23.9044 25.3585 24.621 25.0616 25.1494 24.5332C25.6778 24.0048 25.9747 23.2882 25.9747 22.5409V20.3009L18.6348 12.9751L11.5908 20.0191ZM8.36464 4.22642C9.29873 4.22642 10.1946 4.59748 10.8551 5.25799C11.5156 5.91849 11.8867 6.81433 11.8867 7.74843C11.8867 8.68252 11.5156 9.57836 10.8551 10.2389C10.1946 10.8994 9.29873 11.2704 8.36464 11.2704C7.43054 11.2704 6.53471 10.8994 5.8742 10.2389C5.21369 9.57836 4.84263 8.68252 4.84263 7.74843C4.84263 6.81433 5.21369 5.91849 5.8742 5.25799C6.53471 4.59748 7.43054 4.22642 8.36464 4.22642ZM8.36464 5.63522C7.80418 5.63522 7.26668 5.85786 6.87037 6.25416C6.47407 6.65047 6.25143 7.18797 6.25143 7.74843C6.25143 8.30888 6.47407 8.84639 6.87037 9.24269C7.26668 9.63899 7.80418 9.86164 8.36464 9.86164C8.9251 9.86164 9.4626 9.63899 9.8589 9.24269C10.2552 8.84639 10.4778 8.30888 10.4778 7.74843C10.4778 7.18797 10.2552 6.65047 9.8589 6.25416C9.4626 5.85786 8.9251 5.63522 8.36464 5.63522Z"
                                                            fill="#155E56"/>
                                                    </svg>
                                                </div>
                                                <p className="font-medium text-[#4A5D58] text-[10px] bg-[#00C79533] rounded-[14px] mt-2 px-3 py-1 whitespace-nowrap">
                                                    Drag or Drop file
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex float-right mt-6">
                                <Button variant="primary" bgColor="#D3DCDA" borderRadius="4px"
                                        onClick={() => setOpen(!open)}
                                        height="37px" size='md' as={ReactLink} w={'109px'}>
                                    <Text color="#4A5D58">Close</Text>
                                </Button>
                                <Button className="ml-2" variant="primary" bgColor="#00C795" borderRadius="4px"
                                        height="37px" size='md' as={ReactLink} w={'109px'} onClick={handleSubmit}>
                                    <Text color="white">Ok</Text>
                                </Button>
                            </div>
                        </div>
                        <Dialog.Close asChild>
                            <button
                                className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[20px] right-[40px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                                aria-label="Close"
                            >
                                <Close/>
                            </button>
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    );
};

export default ModifyRestructuringModal;