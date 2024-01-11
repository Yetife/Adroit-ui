import * as Dialog from "@radix-ui/react-dialog";
import {Button, Text} from "@chakra-ui/react";
import {Link as ReactLink} from "react-router-dom";
import {Close} from "@mui/icons-material";
import {Divider} from "@mui/material";

const DecisionModal = ({open, setOpen}) => {
    const decide = {
        fullName: "Franca Olayinka",
        phoneNumber: "+2346789231423",
        email: "franka@creditwave.ng",
        dob: "12/10/2023",
        loanAmount: "N20,000",
        tenor: 3
    }

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
                    <Dialog.Content className="data-[state=open]:animate-contentShow z-[200] fixed top-[35%] left-[50%] max-h-[85vh] w-[90vw] max-w-[600px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[45px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                        <Dialog.Title className="text-[24px] text-[#343434] font-bold -mt-8">Loan Decision</Dialog.Title>
                        {/*<Divider className="pt-4"/>*/}
                        <div className="mt-3">
                            <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pb-6">Customer Details</p>
                            <div className="flex justify-between mb-4">
                                <div>
                                    <div className="pb-6">
                                        <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">Full Name</p>
                                        <p className="text-[16px] leading-5 text-[#4A5D58] font-[500] pt-2">{decide.fullName}</p>
                                    </div>
                                    <div className="pb-4">
                                        <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">D.O.B</p>
                                        <p className="text-[16px] leading-5 text-[#4A5D58] font-[500] pt-2">{decide.dob}</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="pb-6">
                                        <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">Phone Number</p>
                                        <p className="text-[16px] leading-5 text-[#4A5D58] font-[500] pt-2">{decide.phoneNumber}</p>
                                    </div>
                                    <div className="pb-4">
                                        <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">Loan Amount</p>
                                        <p className="text-[16px] leading-5 text-[#4A5D58] font-[500] pt-2">{decide.loanAmount}</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="pb-6">
                                        <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">Email Address</p>
                                        <p className="text-[16px] leading-5 text-[#4A5D58] font-[500] pt-2">{decide.email}</p>
                                    </div>
                                    <div className="pb-4">
                                        <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">Tenor</p>
                                        <p className="text-[16px] leading-5 text-[#4A5D58] font-[500] pt-2">{decide.tenor}</p>
                                    </div>
                                </div>
                            </div>
                            <Divider/>
                            <div className="mx-40">
                                <p className="text-[36px] text-[#FF0909] font-[600] my-4">DECISION</p>
                            </div>
                            <div className="flex float-right mt-28">
                            <Button variant="primary" bgColor="#D3DCDA" borderRadius="4px" onClick={()=>setOpen(!open)}
                                    height="37px" size='md' as={ReactLink} w={'109px'}>
                                <Text color="#4A5D58">Close</Text>
                            </Button>
                            <Button className="ml-2" variant="primary" bgColor="#00C795" borderRadius="4px"
                                    height="37px" size='md' as={ReactLink} w={'109px'}>
                                <Text color="white">Okay</Text>
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

export default DecisionModal;