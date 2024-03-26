import * as Dialog from "@radix-ui/react-dialog";
import {Button, Text} from "@chakra-ui/react";
import {Link as ReactLink} from "react-router-dom";
import {Close} from "@mui/icons-material";
import {useState} from "react";

const AdjustLoanModal = ({open, setOpen, inputs, setInputs, handleSubmit}) => {
    const tenor = [3, 6, 9, 12]
    const handleChange = (e, fieldName) => {
        const value = e.target.value;
        setInputs((values) => ({...values, [fieldName]: value}))
    };
    console.log(inputs)
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
                    <Dialog.Content className="data-[state=open]:animate-contentShow z-[200] fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[45px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                        <Dialog.Title className="text-[24px] text-[#343434] font-bold -mt-8">Adjust Loan</Dialog.Title>
                        {/*<Divider className="pt-4"/>*/}
                        <div className="mt-3">
                            <div>
                                <span className="ml-8">
                                  <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                   Adjusted Amount
                                  </h3>
                                  <input
                                      type="text"
                                      value={inputs.amount}
                                      onChange={(event) => handleChange(event, "amount")}
                                      placeholder="Enter amount"
                                      className="font-medium w-full text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                  />
                                </span>
                            </div>
                            <div>
                                <span className="ml-4">
                                          <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                           Adjusted Tenor
                                          </h3>
                                             <select id="select" value={inputs.tenor}
                                                     onChange={(event) => handleChange(event, "tenor")}
                                                     className="font-medium w-full text-black leading-relaxed px-4 py-2 rounded h-[50px]  border border-neutral-300 justify-between items-center gap-4 flex">
                                                <option value="" disabled>Select tenor</option>
                                                 {tenor && tenor?.map((option, index) => (
                                                     <option key={index} value={option}>
                                                         {option}
                                                     </option>
                                                 ))}
                                            </select>
                                        </span>
                            </div>
                            <div className="mt-6">
                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pb-3">Description</p>
                                <textarea id="message" name="message" rows="4" cols="50"
                                          value={inputs.description}
                                          onChange={(event) => handleChange(event, "description")}
                                          placeholder="Add description"
                                          className="font-medium w-full text-black leading-relaxed px-4 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                ></textarea>
                            </div>

                            <div className="flex float-right mt-6">
                                <Button variant="primary" bgColor="#D3DCDA" borderRadius="4px" onClick={()=>setOpen(!open)}
                                        height="37px" size='md' as={ReactLink} w={'109px'}>
                                    <Text color="#4A5D58">Close</Text>
                                </Button>
                                <Button className="ml-2" variant="primary" bgColor="#00C795" borderRadius="4px"
                                        height="37px" size='md' as={ReactLink} w={'109px'} onClick={handleSubmit}>
                                    <Text color="white">Submit</Text>
                                </Button>
                            </div>
                        </div>
                        <Dialog.Close asChild>
                            <button
                                className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[20px] right-[40px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                                aria-label="Close"
                            >
                                <Close />
                            </button>
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    );
};

export default AdjustLoanModal;