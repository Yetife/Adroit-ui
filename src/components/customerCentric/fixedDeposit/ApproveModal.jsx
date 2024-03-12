import * as Dialog from "@radix-ui/react-dialog";
import {Button, Text} from "@chakra-ui/react";
import {Link as ReactLink} from "react-router-dom";

const ApproveModal = ({open, setOpen, title}) => {
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
                    <Dialog.Content className="data-[state=open]:animate-contentShow z-[200] fixed top-[50%] left-[50%] max-h-[85vh]
                    w-[90vw] max-w-[300px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[35px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                        {/*<Divider className="pt-4"/>*/}
                        <div className="mt-4">
                            <div>
                                <p className="text-[24px] leading-5 text-[#4A5D58] text-center font-[500] pt-2">{title}</p>
                            </div>

                            <div className="flex tw-items-center m-auto tw-text-center mt-8 ml-10 leading-8">
                                <Button className="ml-4" variant="primary" bgColor="#00C795" borderRadius="4px"
                                        height="37px" size='md' as={ReactLink} w={'109px'} onClick={()=>setOpen(!open)}>
                                    <Text color="white">Okay</Text>
                                </Button>
                            </div>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    );
};

export default ApproveModal;