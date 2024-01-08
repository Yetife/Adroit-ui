import {useState} from "react";
import {getUserToken} from "../../services/storage/index.js";
import * as Dialog from "@radix-ui/react-dialog";
import {Close} from "@mui/icons-material";
import {Checkbox, Divider} from "@mui/material";

const DeclineApplicationModal = ({open, setOpen, handleAdd}) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [inputs, setInputs] = useState({
        comment: "",
        applicationId: ""
    })


    const items= [
        {
            id: 1,
            name: "State of residence not supported"
        },{
            id: 2,
            name: "Outstanding unpaid loan"
        },{
            id: 3,
            name: "Debt-service ratio exceeded"
        },{
            id: 4,
            name: "Salary not sufficient"
        },{
            id: 5,
            name: "Unverified Documents"
        },{
            id: 6,
            name: "Others"
        },
    ]
    const token = getUserToken();


    const handleChange = (e, fieldName) => {
        const value = e.target.value;
        setInputs((values) => ({...values, [fieldName]: value}))
    };
    const handleStatusSelect = (statusName) => {
        setSelectedItems((prevSelectedStatus) => {
            if (prevSelectedStatus.includes(statusName)) {
                return prevSelectedStatus.filter((name) => name !== statusName);
            } else {
                return [...prevSelectedStatus, statusName];
            }
        });
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
                    <Dialog.Content className="data-[state=open]:animate-contentShow z-[200] fixed top-[49%] left-[50%] max-h-[95vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[45px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                        <Dialog.Title className="text-[24px] text-[#343434] font-extrabold -mt-8 mb-3 text-center">Review Application</Dialog.Title>
                        <Divider />
                        <div className="mt-6">
                            <div>
                                <p className="font-semibold text-[#4A5D58] text-[16px] whitespace-nowrap">Are you sure you want to decline this loan?</p>
                                <span className="ml-8">
                                  <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-4">
                                    Application Id Number
                                  </h3>
                                  <input
                                      type="text"
                                      value={inputs.applicationId}
                                      onChange={(event) => handleChange(event, "applicationId")}
                                      placeholder="Enter application id"
                                      className="font-medium w-full text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                  />
                                </span>
                                <span className="ml-8 mt-8">
                                  <h3 className="font-semibold text-[#4A5D58] text-[16px] whitespace-nowrap pb-3">
                                    Please select one or more reasons for decline
                                  </h3>
                                   <div className="flex flex-col space-y-2">
                                    {items.map((option) => (
                                        <div key={option.uniqueId} className="flex items-center">
                                            <Checkbox
                                                checked={selectedItems.includes(option.name)}
                                                sx={{'&.Mui-checked': {
                                                        color: "#00C796",
                                                    },}}
                                                onChange={() => handleStatusSelect(option.name)}
                                                color="primary"
                                            />
                                            <span className="font-[500] text-[#4A5D58] text-[15px] whitespace-nowrap">{option.name}</span>
                                        </div>
                                    ))}
                                  </div>
                                </span>
                                <span className="ml-8 mt-8">
                                  <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                        Comment
                                      </h3>
                                         <textarea id="message" name="message" rows="4" cols="50"
                                                   value={inputs.comment}
                                                   onChange={(event) => handleChange(event, "comment")}
                                                   placeholder="Add comment"
                                                   className="font-medium w-full text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                         ></textarea>
                                </span>
                            </div>
                            <div className="flex space-x-3 float-right">
                                <button className="bg-gray-300 rounded py-2 px-6 flex text-black mt-8"
                                        onClick={() => setOpen(!open)}>Close
                                </button>
                                <button className="bg-[#FF6060] rounded py-2 px-6 flex text-white mt-8"
                                        onClick={handleAdd}>Decline</button>
                            </div>
                        </div>
                        {/*<Dialog.Close asChild>*/}
                        {/*    <button*/}
                        {/*        className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[20px] right-[40px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"*/}
                        {/*        aria-label="Close"*/}
                        {/*    >*/}
                        {/*        <Close/>*/}
                        {/*    </button>*/}
                        {/*</Dialog.Close>`*/}
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    );
};

export default DeclineApplicationModal;