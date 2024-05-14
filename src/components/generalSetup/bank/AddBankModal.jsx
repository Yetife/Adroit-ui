import * as Dialog from "@radix-ui/react-dialog";
import {Close} from "@mui/icons-material";
import {Checkbox} from "@mui/material";
import {Button, Stack, Text} from "@chakra-ui/react";
import {Link as ReactLink} from "react-router-dom";

const AddBankModal = ({open, setOpen, purpose, checked, setChecked, bankName, setBankName, loading, setLoading, bankCode, setBankCode, handleAdd}) => {

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };
    const handleNameChange = (e) => {
        setBankName(e.target.value)
    };
    const handleCodeChange = (e) => {
        setBankCode(e.target.value)
    };



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
                    <Dialog.Content className="data-[state=open]:animate-contentShow z-[200] fixed top-[35%] left-[50%] max-h-[70vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[45px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                        <Dialog.Title className="text-[24px] text-[#343434] font-bold -mt-8">{purpose === "edit" ? "Edit" : purpose === "view" ? "View" : "Add"}</Dialog.Title>
                        {/*<Divider className="pt-4"/>*/}
                        <div className="mt-2">
                            <div>
                                <span className="ml-8">
                                  <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                    Bank
                                  </h3>
                                  <input
                                      type="text"
                                      value={bankName}
                                      disabled={purpose === "view"}
                                      onChange={handleNameChange}
                                      placeholder="Enter bank"
                                      className="font-medium w-full text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                  />
                                </span>
                                <span className="ml-8">
                                  <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                    Bank Code
                                  </h3>
                                  <input
                                      type="text"
                                      value={bankCode}
                                      disabled={purpose === "view"}
                                      onChange={handleCodeChange}
                                      placeholder="Enter bank"
                                      className="font-medium w-full text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                  />
                                </span>
                                <div className="text-center mx-40 mt-8">
                                    <span className="flex items-center">
                                   <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap">
                                        Active
                                    </h3>
                                     <Checkbox
                                         checked={checked}
                                         disabled={purpose === "view"}
                                         sx={{'&.Mui-checked': {
                                                 color: "#00C796",
                                             },}}
                                         onChange={handleChange}
                                         inputProps={{ 'aria-label': 'controlled' }}
                                     />
                                </span>
                                </div>
                                <div className="flex space-x-3 float-right my-4">
                                    <button className="bg-gray-300 rounded py-2 px-6 flex text-black" onClick={()=>setOpen(!open)}>Close</button>
                                    {/*{purpose !== "view" && <button className="bg-[#00C796] rounded py-2 px-6 flex text-white"*/}
                                    {/*          onClick={handleAdd}>Save</button>}*/}
                                    {purpose !== "view" &&
                                        <Stack>
                                            <Button variant="primary" bgColor="#00C795" p={{base:"5px 20px", md: "8px 20px"}} borderRadius="5px" size='md' as={ReactLink} isLoading={loading} isDisabled={true} colorScheme={"brand"} loadingText='Saving' onClick={handleAdd}>
                                                <Text color="white">Save</Text>
                                            </Button>
                                        </Stack>
                                    }
                                </div>
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

export default AddBankModal;