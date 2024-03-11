import React from 'react';
import * as Dialog from "@radix-ui/react-dialog";
import {Button, Text} from "@chakra-ui/react";
import {Link as ReactLink} from "react-router-dom";
import {Close} from "@mui/icons-material";
import {
    useModifyBillsPaymentMutation,
    useModifyFixedDepositMutation
} from "../../../store/features/customerCentric/api.js";
import {updateSnackbar} from "../../../store/snackbar/reducer.js";
import {useDispatch} from "react-redux";

const ApproveDepositModal = ({open, setOpen, id}) => {
    const dispatch = useDispatch()
    const [modifyBills] = useModifyFixedDepositMutation()

    const handleSubmit = (status) => {
        modifyBills({
            body: {
                entityId: id,
                status: status
            }
        }).then(res => {
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: res.data.message,success:true}));
            setOpen(!open)
        }).catch(err =>{
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message:err.data.message,success:false}));
        })
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
                    <Dialog.Content className="data-[state=open]:animate-contentShow z-[200] fixed top-[30%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[45px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                        <Dialog.Title className="text-[24px] text-[#343434] font-bold -mt-8">Processing</Dialog.Title>
                        {/*<Divider className="pt-4"/>*/}
                        <div className="mt-4">
                            <div className="flex tw-items-center m-auto tw-text-center mt-10">
                                <Button className="ml-6" variant="primary" bgColor="#00C795" borderRadius="4px"
                                        height="37px" size='md' as={ReactLink} w={'290px'} onClick={()=>handleSubmit("1")}>
                                    <Text color="white">Approve</Text>
                                </Button>
                            </div>
                            <div className="flex tw-items-center m-auto tw-text-center mt-3">
                                <Button className="ml-6" variant="primary" bgColor="#FF0909" borderRadius="4px"
                                        height="37px" size='md' as={ReactLink} w={'290px'} onClick={()=>handleSubmit("2")}>
                                    <Text color="white">Reject</Text>
                                </Button>
                            </div>
                            <div className="flex tw-items-center m-auto tw-text-center mt-3">
                                <Button  className="ml-6" variant="outline" borderColor="#00C795" marginRight="10px"
                                        border={"2px solid #00C795"} borderRadius="4px" onClick={() =>setOpen(!open)}
                                        height="37px" size='md' as={ReactLink} w={'290px'}>
                                    <Text color="#00C795">Close</Text>
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

export default ApproveDepositModal;