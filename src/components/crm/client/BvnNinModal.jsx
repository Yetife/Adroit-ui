import * as Dialog from "@radix-ui/react-dialog";
import {Button, Text} from "@chakra-ui/react";
import {Link as ReactLink} from "react-router-dom";
import {Close} from "@mui/icons-material";
import {useVerifyBvnOrNinQuery} from "../../../store/features/crm/api.js";

const BvnNinModal = ({open, setOpen, modalData}) => {
    const {data, isFetching, error} = useVerifyBvnOrNinQuery(modalData.id)

    console.log(data, "DGHGHSDHSDJ")
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
                    <Dialog.Content className="custom-scroll-bar overflow-auto data-[state=open]:animate-contentShow z-[200] fixed top-[50%] left-[50%] max-h-[100vh] w-[90vw] max-w-[650px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[42px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                        <Dialog.Title className="text-[24px] text-[#343434] font-bold -mt-8">BVN/NIN</Dialog.Title>
                        {/*<Divider className="pt-4"/>*/}
                        <div className="mt-3">
                            <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pb-2">Customer Details</p>
                            <div className="rounded-[5px] my-2 p-4" style={{border: "1px solid #C9D4D1", background: "#FFF"}}>
                                <div className="flex space-x-8">
                                    <div className="pb-4">
                                        <p className="text-[14px] leading-5 text-[#4A5D58] font-[600]">Customer Name</p>
                                        <p className="text-[14px] leading-5 text-[#4A5D58] font-[500] pt-1">{modalData.firstName} {modalData.lastName}</p>
                                    </div>
                                    <div className="pb-4">
                                        <p className="text-[14px] leading-5 text-[#4A5D58] font-[600]">Email Address</p>
                                        <p className="text-[14px] leading-5 text-[#4A5D58] font-[500] pt-1">{modalData.emailAddress}</p>
                                    </div>
                                </div>
                                <div className="flex space-x-8">
                                        <div>
                                            <p className="text-[14px] leading-5 text-[#4A5D58] font-[600]">D.O.B</p>
                                            <p className="text-[14px] leading-5 text-[#4A5D58] font-[500] pt-1">{modalData.dateOfBirth}</p>
                                        </div>
                                        <div>
                                            <p className="text-[14px] leading-5 text-[#4A5D58] font-[600]">Phone
                                                Number</p>
                                            <p className="text-[14px] leading-5 text-[#4A5D58] font-[500] pt-1">{modalData.phoneNumber}</p>
                                        </div>
                                        <div>
                                            <p className="text-[14px] leading-5 text-[#4A5D58] font-[600]">BVN</p>
                                            <p className="text-[14px] leading-5 text-[#4A5D58] font-[500] pt-1">{modalData.bvn}</p>
                                        </div>
                                        <div>
                                            <p className="text-[14px] leading-5 text-[#4A5D58] font-[600]">NIN</p>
                                            <p className="text-[14px] leading-5 text-[#4A5D58] font-[500] pt-1">{modalData.nin}</p>
                                        </div>
                                    </div>
                            </div>
                            <div className="rounded-[5px] my-2 p-4 h-[199px] custom-scroll-bar overflow-auto" style={{border: "1px solid #C9D4D1", background: "#FFF"}}>
                                <div>
                                    <div className="flex justify-between">
                                        <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">BVN</p>
                                        <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">Channel: <span
                                            className="font-[500]">{data?.data[0]?.channelId}</span></p>
                                    </div>
                                    <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pt-6">{data?.data[0]?.responseJsonDetail}</p>
                                </div>
                            </div>
                            <div className="rounded-[5px] my-2 p-4 h-[199px] custom-scroll-bar overflow-auto"
                                 style={{border: "1px solid #C9D4D1", background: "#FFF"}}>
                                <div>
                                    <div className="flex justify-between">
                                        <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">NIN</p>
                                        <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">Channel: <span
                                            className="font-[500]">{data?.data[1]?.channelId}</span></p>
                                    </div>
                                    <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pt-6">{data?.data[1]?.responseJsonDetail}</p>
                                </div>
                            </div>
                            <div className="flex float-right mt-4">
                                <Button variant="primary" bgColor="#D3DCDA" borderRadius="4px"
                                        onClick={() => setOpen(!open)}
                                        height="32px" size='md' as={ReactLink} w={'100px'}>
                                    <Text color="#4A5D58">Close</Text>
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

export default BvnNinModal;