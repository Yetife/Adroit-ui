import * as Dialog from "@radix-ui/react-dialog";
import {Close} from "@mui/icons-material";
import Payment from "../../../assets/Payment.jsx";

const SavingsHistoryModal = ({open, setOpen}) => {
    const history = [
        {
            name: "Successful Repayment",
            date: "21/02/2023    5:00 AM",
            amount: "-N15,000.00"
        },{
            name: "Successful Repayment",
            date: "21/02/2023    5:00 AM",
            amount: "-N15,000.00"
        },{
            name: "Successful Repayment",
            date: "21/02/2023    5:00 AM",
            amount: "-N15,000.00"
        },
    ]
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
                    <Dialog.Content className="data-[state=open]:animate-contentShow z-[200] fixed top-[35%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[40px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                        <Dialog.Title className="text-[24px] text-[#343434] font-bold -mt-8">Transaction History</Dialog.Title>
                        <div>
                            <div className="mt-6">
                                {
                                    history.map((item, index)=>(
                                        <div key={index} className="flex space-x-4 items-center border-b py-3 border-gray-200">
                                          <div>
                                              <Payment />
                                          </div>
                                            <div>
                                                <p className="text-[15px] font-[inter] leading-5 text-[#3A3A3A] font-[500]">{item.name}</p>
                                                <p className="text-[10px] font-[inter] leading-5 text-[#A7A7A7] font-[500]">{item.date}</p>
                                            </div>
                                            <div>
                                                <p className="text-[17px] font-[inter] leading-5 text-[#E94F37] font-[500]">{item.amount}</p>
                                            </div>
                                        </div>
                                    ))
                                }
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

export default SavingsHistoryModal;