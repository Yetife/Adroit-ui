import {useState} from 'react';
import {useDispatch} from "react-redux";
import {updateSnackbar} from "../../../../store/snackbar/reducer.js";
import * as Dialog from "@radix-ui/react-dialog";
import {Close} from "@mui/icons-material";

const FilterDisbursedModal = ({open, setOpen, handleFilter}) => {
    const [startDate, setStartDate] = useState("");
    const [bvn, setBvn] = useState("");
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setStartDate(e.target.value)
    };

    const handleBvn = (e, isNumeric = false) => {
        const numericRegex = /^\d{0,11}$/;
        if ((isNumeric && numericRegex.test(e.target.value)) || !isNumeric) {
            setBvn(e.target.value)
        }
    }
    const applyFilters = () => {
        if (!startDate) {
            dispatch(updateSnackbar({type: 'TOGGLE_SNACKBAR_OPEN', message: "Date is required", success: false}));
            return;
        }
        const filters = {
            startDate: startDate,
            bvn: bvn,
        };
        handleFilter(filters);
        setOpen(false);
    };



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
                    <Dialog.Content className="data-[state=open]:animate-contentShow z-[200] fixed top-[35%] left-[50%] max-h-[90vh] w-[90vw] max-w-[350px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[45px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                        <Dialog.Title className="text-[24px] text-[#343434] font-bold -mt-8">Filter</Dialog.Title>
                        {/*<Divider className="pt-4"/>*/}
                        <div className="mt-2">
                            <div className="flex items-center mt-2">
                                <div className='py-2 flex items-center'>
                                    <div>
                                        <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                            Date
                                        </h3>
                                        <input
                                            type="date"
                                            value={startDate}
                                            onChange={handleChange}
                                            placeholder="Enter start date"
                                            className="font-medium w-[260px] text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300"
                                        />
                                    </div>
                                </div>
                            </div>
                            <span className="ml-8">
                                  <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                    BVN
                                  </h3>
                                  <input
                                      type="number"
                                      value={bvn}
                                      onChange={(event) => handleBvn(event, true)}
                                      placeholder="Enter bvn"
                                      className="font-medium w-full text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                  />
                                </span>
                        </div>
                        <div className="flex space-x-3 float-right">
                            <button className="bg-gray-300 rounded py-1 px-6 flex text-black mt-6"
                                    onClick={() => setOpen(!open)}>Close
                            </button>
                            <button className="bg-[#00C796] rounded py-1 px-6 flex text-white mt-6"
                                    onClick={applyFilters}>Filter
                            </button>
                        </div>
                        <Dialog.Close asChild>
                            <button
                                className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[20px] right-[40px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                                aria-label="Close"
                            >
                                <Close/>
                            </button>
                        </Dialog.Close>`
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    );
};

export default FilterDisbursedModal;