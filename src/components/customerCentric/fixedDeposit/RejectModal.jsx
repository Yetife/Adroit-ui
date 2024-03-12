import {useState} from 'react';
import * as Dialog from "@radix-ui/react-dialog";
import {useDispatch} from "react-redux";
import {useModifyFixedDepositMutation} from "../../../store/features/customerCentric/api.js";
import {updateSnackbar} from "../../../store/snackbar/reducer.js";
import DeclineModal from "./DeclineModal.jsx";

const RejectModal = ({open, setOpen, id}) => {
    const [reason, setReason] = useState("")
    const dispatch = useDispatch()
    const [modifyFixedDeposit] = useModifyFixedDepositMutation()
    const [openModal, setOpenModal] = useState(false)

    const handleSubmit = () => {
        modifyFixedDeposit({
            body: {
                entityId: id,
                status: "4",
                description: reason,
            }
        }).then(res => {
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: res.data.message,success:true}));
            setOpen(!open)
            setOpenModal(true)
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
                    w-[90vw] max-w-[300px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[35px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                        {/*<Divider className="pt-4"/>*/}
                        <div className="-mt-8">
                           <span className="ml-8">
                              <h3 className="font-bold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                State Reasons:
                              </h3>
                                 <textarea id="message" name="message" rows="4" cols="50"
                                           value={reason}
                                           onChange={(event) => setReason(event.target.value)}
                                           placeholder="Add reasons"
                                           className="font-medium w-full text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                 ></textarea>
                            </span>

                            <div className="flex space-x-3 float-right pt-4">
                                <button className="bg-gray-300 rounded py-2 px-6 flex text-black"
                                        onClick={() => setOpen(!open)}>Close
                                </button>
                                <button className="bg-[#FF0909] rounded py-2 px-4 flex text-white"
                                        onClick={handleSubmit}>Decline</button>
                            </div>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>

            {/* eslint-disable-next-line react/jsx-no-undef */}
            <DeclineModal open={openModal} setOpen={setOpenModal}/>
        </div>
    );
};

export default RejectModal;