import {useState} from 'react';
import {
    useUpdateLoanTopUpMutation
} from "../../../store/features/loanApplication/api.js";
import {useDispatch} from "react-redux";
import {Link as ReactLink, useNavigate} from "react-router-dom";
import {updateSnackbar} from "../../../store/snackbar/reducer.js";
import * as Dialog from "@radix-ui/react-dialog";
import {Button, Text} from "@chakra-ui/react";
import {Close} from "@mui/icons-material";

const DeclineTopUpModal = ({open, setOpen}) => {
    const [comment, setComment] = useState("")
    const queryParams = new URLSearchParams(location.search);
    const appId = queryParams.get("id");
    const [updateLoan] = useUpdateLoanTopUpMutation()
    const dispatch = useDispatch()
    const router = useNavigate()

    const handleChange = (e) => {
        setComment(e.target.value)
    };
    const handleDecline = ()=> {
        updateLoan({
            body: {
                loanApplicationId: appId,
                comment: comment,
                status: 2
            }
        }).then(res => {
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: res.data.message,success:true}));
            setOpen(!open)
            router('/loanApp/loanTopUp')
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
                        <Dialog.Title className="text-[24px] text-[#343434] font-bold -mt-8">Decline</Dialog.Title>
                        {/*<Divider className="pt-4"/>*/}
                        <div className="mt-3">
                            <div className="mt-8">
                                <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pb-3">Reason for decline</p>
                                <textarea id="message" name="message" rows="4" cols="50"
                                          value={comment}
                                          onChange={handleChange}
                                          placeholder="Add comment"
                                          className="font-medium w-full text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                ></textarea>
                            </div>

                            <div className="flex float-right mt-6">
                                <Button variant="primary" bgColor="#D3DCDA" borderRadius="4px" onClick={()=>setOpen(!open)}
                                        height="37px" size='md' as={ReactLink} w={'109px'}>
                                    <Text color="#4A5D58">Close</Text>
                                </Button>
                                <Button className="ml-4" variant="primary" bgColor="#00C795" borderRadius="4px"
                                        height="37px" size='md' as={ReactLink} w={'109px'} onClick={handleDecline}>
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

export default DeclineTopUpModal;