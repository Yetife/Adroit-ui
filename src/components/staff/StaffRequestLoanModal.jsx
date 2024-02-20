import {useEffect, useState} from 'react';
import {getUserToken} from "../../services/storage/index.js";
import axios from "axios";
import * as Dialog from "@radix-ui/react-dialog";
import {Close} from "@mui/icons-material";
import {Divider} from "@mui/material";

const StaffRequestLoanModal = ({open, setOpen, inputs, setInputs, endDate, setEndDate, handleAdd}) => {
    const [tenor, setTenor] = useState([]);
    const [type, setType] = useState([]);
    const token = getUserToken();
    const baseUrl = import.meta.env.VITE_APP_BASE_URL;

    const handleChange = (e, fieldName, isNumeric = false) => {
        const userInput = e.target.value;
        const numericRegex = /^-?[0-9]*(\.[0-9]*)?$/; // Allow an optional minus sign at the beginning and an empty string

        if ((isNumeric && numericRegex.test(userInput)) || !isNumeric) {
            setInputs((values) => ({ ...values, [fieldName]: userInput }));
        }
    };


    const allOption = { uniqueId: 'all', name: 'All' };

    const fetchTenor = async () => {
        try {
            const response = await axios.get(`${baseUrl}/BridgeLoan/GeneralSetUpTenor/getallvalid`, {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'XAPIKEY': '_*-+pgH7QzFH%^&!Jx4w46**fI@@#5Uzi4RvtTwlEXp_!*',
                    'authorization': `Bearer ${token}`
                }
            });
            setTenor(response.data.data);
            console.log('Fetched state:', response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const fetchLoanType = async () => {
        try {
            const response = await axios.get(`${baseUrl}/StaffLoan/GetStaffLoanType`, {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'XAPIKEY': '_*-+pgH7QzFH%^&!Jx4w46**fI@@#5Uzi4RvtTwlEXp_!*',
                    'authorization': `Bearer ${token}`
                }
            });
            setType(response.data.data);
            console.log('Fetched state:', response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchTenor()
        fetchLoanType()
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
                    <Dialog.Content className="custom-scroll-bar overflow-auto data-[state=open]:animate-contentShow z-[200] fixed top-[45%] left-[50%] max-h-[95vh] w-[90vw] max-w-[700px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[45px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                        <Dialog.Title className="text-[32px] text-[#343434] font-extrabold -mt-8">Request for loan</Dialog.Title>
                        <Divider className="pt-3"/>
                        <div className="mt-4">
                            <div>
                                <div className="flex items-center">
                                    <div className='py-2 flex items-center'>
                                        <span>
                                          <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                           Loan Type
                                          </h3>
                                             <select id="select" value={inputs.type}
                                                     onChange={(event) => handleChange(event, "type")}
                                                     className="font-medium w-[300px] text-black leading-relaxed px-4 py-3 rounded h-[50px]  border border-neutral-300 justify-between items-center gap-4 flex">
                                                <option value="" disabled>Select loan type</option>
                                                 {type && type?.map((option) => (
                                                     <option key={option.key} value={option.key}>
                                                         {option.value}
                                                     </option>
                                                 ))}
                                            </select>
                                        </span>
                                        <span className="ml-4">
                                          <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                            Loan Amount
                                          </h3>
                                          <input
                                              type="number"
                                              value={inputs.amount}
                                              onChange={(event) => handleChange(event, "amount", true)}
                                              placeholder="Enter Loan Amount"
                                              className="font-medium w-[300px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                          />
                                        </span>

                                    </div>
                                </div>
                                <div className="flex items-center mt-4">
                                    <div className='py-2 flex items-center'>
                                        <span>
                                      <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                       Loan Tenor
                                      </h3>
                                         <select id="select" value={inputs.tenor}
                                                 onChange={(event) => handleChange(event, "tenor")}
                                                 className="font-medium w-[300px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex">
                                            <option value="" disabled>Select tenor</option>
                                             {tenor && tenor?.map((option) => (
                                                 <option key={option.uniqueId} value={option.name}>
                                                     {option.name}
                                                 </option>
                                             ))}
                                        </select>
                                    </span>
                                        <span className="ml-4">
                                          <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                            Interest Rate
                                          </h3>
                                          <input
                                              type="text"
                                              value={inputs.interestRate}
                                              onChange={(event) => handleChange(event, "interestRate", true)}
                                              placeholder="Enter interestRate"
                                              className="font-medium w-[300px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                          />
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center mt-4">
                                    <div className='py-2 flex items-center'>
                                        <div>
                                            <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                                Start Date
                                            </h3>
                                            <input
                                                type="date"
                                                value={inputs.startDate}
                                                onChange={(event) => handleChange(event, "startDate")}
                                                placeholder="Enter start date"
                                                className="font-medium w-[300px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                            />
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                                End Date
                                            </h3>
                                            <input
                                                type="date"
                                                value={inputs.endDate}
                                                onChange={(event) => handleChange(event, "endDate")}
                                                placeholder="Enter end date"
                                                className="font-medium w-[300px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-4'>
                                    <div>
                                        <span>
                                          <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                            Purpose
                                          </h3>
                                             <textarea id="message" name="message" rows="4" cols="50"
                                                       value={inputs.purpose}
                                                       onChange={(event) => handleChange(event, "purpose")}
                                                       placeholder="Enter purpose"
                                                       className="font-medium w-full text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                             ></textarea>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex space-x-3 float-right">
                                <button className="bg-gray-300 rounded py-2 px-6 flex text-black mt-8"
                                        onClick={() => setOpen(!open)}>Cancel
                                </button>
                                <button className="bg-[#00C796] rounded py-2 px-6 flex text-white mt-8"
                                        onClick={handleAdd}>Send Request</button>
                            </div>
                        </div>
                        <Dialog.Close asChild>
                            <button
                                className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[20px] right-[40px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                                aria-label="Close"
                            >
                                <Close/>
                            </button>
                        </Dialog.Close>`
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    );
};

export default StaffRequestLoanModal;