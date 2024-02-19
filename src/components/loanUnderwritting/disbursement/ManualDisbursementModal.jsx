import {useState} from 'react';
import * as Dialog from "@radix-ui/react-dialog";
import {Button, Text} from "@chakra-ui/react";
import {Link as ReactLink} from "react-router-dom";
import {updateSnackbar} from "../../../store/snackbar/reducer.js";
import {useManualDisbursementMutation} from "../../../store/features/loanUnderwriting/api.js";
import {useDispatch} from "react-redux";

const ManualDisbursementModal = ({open, setOpen, handleRoute}) => {
    const [desc, setDesc] = useState("")
    const queryParams = new URLSearchParams(location.search);
    const appId = queryParams.get("aid");
    const [manualDisburse] = useManualDisbursementMutation()
    const dispatch = useDispatch()

    const handleSubmit = () =>{
        console.log(desc)
        manualDisburse({
            body: {
                loanApplicationId: appId,
                description: desc,
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
                    <Dialog.Content className="data-[state=open]:animate-contentShow z-[200] fixed top-[30%] left-[50%] max-h-[85vh]
                    w-[90vw] max-w-[350px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[35px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                        <Dialog.Title className="text-[24px] text-[#343434] font-bold -mt-8">Manual Disbursement</Dialog.Title>
                        {/*<Divider className="pt-4"/>*/}
                        <div className="mt-4">
                            <div className="mt-6">
                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pb-3">Description</p>
                                <textarea id="message" name="message" rows="4" cols="50"
                                          value={desc}
                                          onChange={(event) => setDesc(event.target.value)}
                                          placeholder="Add description"
                                          className="font-medium w-full text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                ></textarea>
                            </div>

                            <div className="flex float-right mt-6">
                                <Button variant="primary" bgColor="#D3DCDA" borderRadius="4px"
                                        onClick={() => setOpen(!open)}
                                        height="37px" size='md' as={ReactLink} w={'109px'}>
                                    <Text color="#4A5D58">Close</Text>
                                </Button>
                                <Button className="ml-2" variant="primary" bgColor="#00C795" borderRadius="4px"
                                        height="37px" size='md' as={ReactLink} w={'109px'} onClick={handleSubmit}>
                                    <Text color="white">Submit</Text>
                                </Button>
                            </div>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    );
};

export default ManualDisbursementModal;