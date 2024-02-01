import React from 'react';
import * as Dialog from "@radix-ui/react-dialog";
import {Close} from "@mui/icons-material";

const FilterSavingsModal = ({open, setOpen, inputs, setInputs, handleFilter}) => {
    const handleChange = (e, fieldName) => {
        const value = e.target.value;
        setInputs((values) => ({...values, [fieldName]: value}))
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
                    <Dialog.Content className="data-[state=open]:animate-contentShow z-[200] fixed top-[42%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[45px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                        <Dialog.Title className="text-[32px] text-[#343434] font-bold -mt-8">Filter by</Dialog.Title>
                        {/*<Divider className="pt-4"/>*/}
                        <div className="mt-2">
                            <div>
                                <div className="flex items-center mt-4">
                                    <div className='py-2 flex items-center'>
                                        <span>
                                             <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                                Status
                                            </h3>
                                             <select
                                                 id="select" value={inputs.status}
                                                 onChange={(event) => handleChange(event, "status")}
                                                 className="font-medium w-[355px] text-black h-[50px]  leading-relaxed py-1 rounded  border border-neutral-300 justify-between items-center gap-4 flex">
                                                     <option value="All">All</option>
                                                     <option value="Active">Active</option>
                                                    <option value={'Terminated'}>Terminated</option>
                                                     <option value={'Closed'}>Closed</option>
                                                     <option value={'Preliquidate'}>Preliquidate</option>
                                            </select>
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center mt-3">
                                    <div className='py-2 flex items-center'>
                                        <div>
                                            <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                                Start Date
                                            </h3>
                                            <input
                                                type="date"
                                                value={inputs.startDate}
                                                onChange={(event) => handleChange(event, "startDate")}
                                                placeholder="Enter start date"
                                                className="font-medium w-[170px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                            />
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                                End Date
                                            </h3>
                                            <input
                                                type="date"
                                                value={inputs.endDate}
                                                onChange={(event) => handleChange(event, "endDate")}
                                                placeholder="Enter end date"
                                                className="font-medium w-[170px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex space-x-3 float-right">
                                <button className="bg-gray-300 rounded py-2 px-6 flex text-black mt-8"
                                        onClick={() => setOpen(!open)}>Close
                                </button>
                                <button className="bg-[#00C796] rounded py-2 px-6 flex text-white mt-8"
                                        onClick={handleFilter}>Filter</button>
                            </div>
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

export default FilterSavingsModal;