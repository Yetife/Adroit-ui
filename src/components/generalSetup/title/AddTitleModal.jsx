import * as Dialog from "@radix-ui/react-dialog";
import {Checkbox} from "@mui/material";
import {Close} from "@mui/icons-material";

const AddTitleModal = ({open, setOpen, checked, setChecked, title, setTitle, purpose, handleAdd}) => {
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };
    const handleLgaChange = (e) => {
        setTitle(e.target.value)
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
                    <Dialog.Content className="data-[state=open]:animate-contentShow z-[200] fixed top-[30%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[45px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                        <Dialog.Title className="text-[24px] text-[#343434] font-bold -mt-8">{purpose === "edit" ? "Edit" : purpose === "view" ? "View" : "Add"}</Dialog.Title>
                        {/*<Divider className="pt-4"/>*/}
                        <div className="mt-2">
                            <div>
                                <span className="ml-8">
                                  <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                    Title
                                  </h3>
                                  <input
                                      type="text"
                                      value={title}
                                      disabled={purpose === "view"}
                                      onChange={handleLgaChange}
                                      placeholder="Enter title"
                                      className="font-medium w-full text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                  />
                                </span>
                                <div className="text-center mx-40 mt-8">
                                    <span className="flex items-center">
                                   <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap">
                                        Active
                                    </h3>
                                     <Checkbox
                                         checked={checked}
                                         disabled={purpose === "view"}
                                         sx={{'&.Mui-checked': {
                                                 color: "#00C796",
                                             },}}
                                         onChange={handleChange}
                                         inputProps={{ 'aria-label': 'controlled' }}
                                     />
                                </span>
                                </div>
                                <div className="flex space-x-3 float-right my-4">
                                    <button className="bg-gray-300 rounded py-2 px-6 flex text-black mt-8" onClick={()=>setOpen(!open)}>Close</button>
                                    {purpose !== "view" && <button className="bg-[#00C796] rounded py-2 px-6 flex text-white mt-8"
                                                                   onClick={handleAdd}>Save</button>}
                                </div>
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

export default AddTitleModal;