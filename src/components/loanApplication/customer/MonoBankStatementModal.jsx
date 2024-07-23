import React, {useEffect, useRef, useState} from 'react';
import {getUserToken} from "../../../services/storage/index.js";
import axios from "axios";
import * as Dialog from "@radix-ui/react-dialog";
import {Button, Text} from "@chakra-ui/react";
import {Link as ReactLink} from "react-router-dom";
import {Close} from "@mui/icons-material";

const MonoBankStatementModal = ({open, setOpen, file, setFile, handleSubmit, loading, setLoading}) => {
    const fileInputRef = useRef(null);
    const token = getUserToken();
    const baseUrl = import.meta.env.VITE_APP_BASE_URL

    const openExplorer = () => {
        fileInputRef.current.click();
    };
    const handleFileChange = (event) =>{
        const file = event.target.files[0];
        setFile(file);
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
                    <Dialog.Content className="data-[state=open]:animate-contentShow z-[200] fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[480px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[45px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                        <Dialog.Title className="text-[24px] text-[#343434] font-bold -mt-8">Upload Mono Bank Statement</Dialog.Title>
                        {/*<Divider className="pt-4"/>*/}
                        <div className="mt-6">
                            <h3 className="font-semibold text-[#4A5D58] text-[20px] whitespace-nowrap pb-3">
                                Kindly Upload Mono Bank Statement
                            </h3>
                            <div className="flex items-center mt-4">
                                    <span>
                                        {/*<h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">*/}
                                        {/*Passport Photograph*/}
                                        {/*</h3>*/}
                                        <input
                                            type="text"
                                            value={file?.name}
                                            disabled
                                            placeholder="No file chosen"
                                            className="font-medium w-[250px] text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                        />
                                    </span>
                                <span className="ml-4" onClick={openExplorer}>
                                         <p className="font-[600] w-[130px] text-[#007970] cursor-pointer px-4 py-2 rounded bg-[#EAFFFA] border-solid border-2 border-[#007970]">
                                            Choose file
                                        </p>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            id="fileInput"
                                            name="files"
                                            style={{position: "absolute", left: "-9999px"}}
                                            accept=".pdf"
                                            // accept="*/*"
                                            onChange={handleFileChange}
                                        />
                                    </span>
                            </div>
                            <div className="flex float-right mt-10">
                                <Button variant="primary" bgColor="#D3DCDA" borderRadius="4px"
                                        onClick={() => setOpen(!open)}
                                        height="37px" size='md' as={ReactLink} w={'109px'}>
                                    <Text color="#4A5D58">Close</Text>
                                </Button>
                                <Button className="ml-2" variant="primary" bgColor="#00C795" borderRadius="4px"
                                        height="37px" size='md' as={ReactLink} w={'109px'} isLoading={loading} onClick={loading ? "" : handleSubmit}>
                                    <Text color="white">Upload</Text>
                                </Button>
                            </div>
                        </div>
                        <Dialog.Close asChild>
                            <button
                                className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[20px] right-[40px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                                aria-label="Close"
                            >
                                <Close/>
                            </button>
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    );
};

export default MonoBankStatementModal;