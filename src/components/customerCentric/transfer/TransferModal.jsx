import {useState} from 'react';
import * as Dialog from "@radix-ui/react-dialog";
import {Button, Text} from "@chakra-ui/react";
import {Link as ReactLink} from "react-router-dom";
import {Close} from "@mui/icons-material";

const TransferModal = ({open, setOpen}) => {
    const [desc, setDesc] = useState("")
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
                    <Dialog.Content className="data-[state=open]:animate-contentShow z-[200] fixed top-[30%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[45px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                        <Dialog.Title className="text-[24px] text-[#343434] font-bold -mt-8">Bills Payment</Dialog.Title>
                        {/*<Divider className="pt-4"/>*/}
                        <div className="mt-4">
                            <div className="ml-6">
                                <span>
                                  <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                    Description
                                  </h3>
                                     <textarea id="message" name="message" rows="3" cols="50"
                                               value={desc}
                                               onChange={(event) => setDesc(event.target.value)}
                                               placeholder="Add description"
                                               className="font-medium w-[290px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                     ></textarea>
                                </span>
                            </div>

                            <div className="flex tw-items-center m-auto tw-text-center mt-6">
                                <Button className="ml-6" variant="primary" bgColor="#00C795" borderRadius="4px"
                                        height="40px" size='md' as={ReactLink} w={'290px'}>
                                    <Text color="white">Reverse</Text>
                                </Button>
                            </div>
                            <div className="flex tw-items-center m-auto tw-text-center mt-3">
                                <Button className="ml-6" variant="primary" bgColor="#135D54" borderRadius="4px"
                                        height="40px" size='md' as={ReactLink} w={'290px'}>
                                    <Text color="white">Retry</Text>
                                </Button>
                            </div>
                            <div className="flex tw-items-center m-auto tw-text-center mt-3">
                                <Button  className="ml-6" variant="outline" borderColor="#135D54" marginRight="10px"
                                         border={"1px solid #135D54"} borderRadius="4px" onClick={() =>setOpen(!open)}
                                         height="40px" size='md' as={ReactLink} w={'290px'}>
                                    <Text color="#135D54">Close</Text>
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

export default TransferModal;