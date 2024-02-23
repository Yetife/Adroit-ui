import * as Dialog from "@radix-ui/react-dialog";
import {Close} from "@mui/icons-material";
import {Link as ReactLink, useNavigate} from "react-router-dom";
import {Button, Text} from "@chakra-ui/react";
import {useUpdateLoanRestructureMutation} from "../../../store/features/loanApplication/api.js";
import {useDispatch} from "react-redux";
import {updateSnackbar} from "../../../store/snackbar/reducer.js";

const ApproveLoanModal = ({open, setOpen, comment}) => {
    const queryParams = new URLSearchParams(location.search);
    const appId = queryParams.get("id");
    const [updateLoan] = useUpdateLoanRestructureMutation()
    const router = useNavigate()
    const dispatch = useDispatch()

    const handleApprove = ()=> {
        updateLoan({
            body: {
                loanApplicationId: appId,
                comment: comment,
                status: 1
            }
        }).then(res => {
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: res.data.message,success:true}));
            setOpen(!open)
            router('/loanApp/loanRestructuring')
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
                        <Dialog.Title className="text-[24px] text-[#343434] font-bold -mt-8">Accept</Dialog.Title>
                        {/*<Divider className="pt-4"/>*/}
                        <div className="mt-4">
                            <div>
                                <p className="text-[20px] leading-5 text-[#4A5D58] font-[500] pt-2">Please note customer will be notified via the mobile app / customer portal / email to accept this loan restructuring for final confirmation.</p>
                            </div>

                            <div className="flex tw-items-center m-auto tw-text-center mt-8 ml-14">
                                <Button variant="primary" bgColor="#D3DCDA" borderRadius="4px" onClick={()=>setOpen(!open)}
                                        height="37px" size='md' as={ReactLink} w={'109px'}>
                                    <Text color="#4A5D58">Close</Text>
                                </Button>
                                <Button className="ml-4" variant="primary" bgColor="#00C795" borderRadius="4px"
                                        height="37px" size='md' as={ReactLink} w={'109px'} onClick={handleApprove}>
                                    <Text color="white">Send</Text>
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

export default ApproveLoanModal;