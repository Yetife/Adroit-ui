import * as Dialog from "@radix-ui/react-dialog";
import {useRef, useState} from "react";
import {Close} from "@mui/icons-material";

const UploadBulkModal = ({open, setOpen}) => {
    const [doc, setDoc] = useState(null)
    const fileInputRef = useRef(null);

    const openExplorer = () => {
        fileInputRef.current.click();
    };

    const handleDocChange = (event) =>{
        const file = event.target.files[0];
        setDoc(file);
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
                    w-[80vw] max-w-[400px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[35px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                        <Dialog.Title className="text-[24px] text-[#343434] font-bold -mt-4">Bulk Upload</Dialog.Title>

                        <div className="mt-6">
                            <div className="flex items-center space-x-4">
                                    <span>
                                        <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                            Upload
                                        </h3>
                                        <input
                                            type="text"
                                            value={doc?.name}
                                            disabled
                                            placeholder="No file chosen"
                                            className="font-medium w-[200px] text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                        />
                                    </span>
                                <span onClick={openExplorer}>
                                         <p className="font-[600] mt-8 w-[102px] text-white cursor-pointer px-4 py-2 rounded bg-[#00C795]">
                                            Upload
                                        </p>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            id="fileInput"
                                            name="files"
                                            style={{position: "absolute", left: "-9999px"}}
                                            // accept="image/*"
                                            accept="*/*"
                                            multiple
                                            onChange={handleDocChange}
                                        />
                                    </span>
                            </div>

                            <div className="flex space-x-3 float-right ml-4 mt-12">
                                <button className="bg-gray-300 rounded py-2 px-6 flex text-black"
                                        onClick={() => setOpen(!open)}>Close
                                </button>
                                <button className="bg-[#00C796] rounded py-2 px-6 flex text-white">Submit</button>
                            </div>
                        </div>
                        <Dialog.Close asChild>
                            <button
                                className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[24px] right-[40px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
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

export default UploadBulkModal;