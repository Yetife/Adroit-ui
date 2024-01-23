import {useRef, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import ClientButton from "../../components/crm/ClientButton.jsx";

const DocumentUpload = () => {
    const [inputs, setInputs] = useState({
        passport: null,
        signature: null,
        residence: null,
        identity: null,
        employment: null,

    })
    const [type, setType] = useState({
        residenceType: "",
        identityType: "",
        employmentType: "",
        expiryDate: "",
    })
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("step", "seven");
    const fileInputRef = useRef(null);
    const signatureInputRef = useRef(null);
    const residenceInputRef = useRef(null);
    const identityInputRef = useRef(null);
    const employmentInputRef = useRef(null);
    const openExplorer = () => {
        fileInputRef.current.click();
    };
    const openSignatureExplorer = () => {
        signatureInputRef.current.click();
    };
    const openResidenceExplorer = () => {
        residenceInputRef.current.click();
    };
    const identityExplorer = () => {
        identityInputRef.current.click();
    };
    const employmentExplorer = () => {
        employmentInputRef.current.click();
    };

    const handleFileChange = (event, fieldName) => {
        const file = event.target.files[0];
        setInputs((values) => ({...values, [fieldName]: file}))
    };
    const handleChange = (e, fieldName) => {
        const value = e.target.value;
        setType((values) => ({...values, [fieldName]: value}))
    };
    const handleGoBack = () => {
        queryParams.set("step", "five");
        navigate({
            search: queryParams.toString(),
        });
    };

    const handleNext = async (e) => {
        e.preventDefault();
        navigate({
            search: queryParams.toString(),
        });
    };
    return (
        <div>
            <div className="custom-scroll-bar min-w-full align-middle c-border w-full shadow-xl sm:rounded-lg mt-12 overflow-auto pl-12">
                <div className="mt-4 mb-12">
                    <p className="text-[20px] leading-5 text-[#4A5D58] font-bold">Document Upload</p>
                    <p className="text-[14px] leading-5 bg-[#EAFFFA] text-[#007970] px-3 font-medium w-[680px] py-2 my-4">Ensure all documents are uploaded and tagged properly. Files should be in .jpg, .png or .pdf formats</p>
                    <div className="mt-8"><div className="flex items-center space-x-12">
                            <div>
                                <div className="flex items-center">
                                    <span>
                                        <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                        Passport Photograph
                                        </h3>
                                        <input
                                            type="text"
                                            value={inputs?.passport?.name}
                                            disabled
                                            placeholder="No file chosen"
                                            className="font-medium w-[250px] text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                        />
                                    </span>
                                    <span className="ml-4 mt-8" onClick={openExplorer}>
                                         <p className="font-[600] w-[130px] text-[#007970] cursor-pointer px-4 py-2 rounded bg-[#EAFFFA] border-solid border-2 border-[#007970]">
                                            Choose file
                                        </p>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            id="fileInput"
                                            name="files"
                                            style={{ position: "absolute", left: "-9999px" }}
                                            accept="image/*"
                                            // accept="*/*"
                                            multiple
                                            onChange={(event) => handleFileChange(event, "passport")}
                                        />
                                    </span>
                                </div>
                                <p className="text-[11px] leading-5 text-[#6D6D6D] font-medium">Upload a clear passport photograph with white background in .jpg or .png format</p>
                            </div>
                            <div>
                                <div className="flex items-center">
                                    <span>
                                        <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                        E-Signature
                                        </h3>
                                        <input
                                            type="text"
                                            value={inputs?.signature?.name}
                                            disabled
                                            placeholder="No file chosen"
                                            className="font-medium w-[250px] text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                        />
                                    </span>
                                    <span className="ml-4 mt-8" onClick={openSignatureExplorer}>
                                         <p className="font-[600] w-[130px] text-[#007970] cursor-pointer px-4 py-2 rounded bg-[#EAFFFA] border-solid border-2 border-[#007970]">
                                            Choose file
                                        </p>
                                        <input
                                            ref={signatureInputRef}
                                            type="file"
                                            id="fileInput"
                                            name="files"
                                            style={{ position: "absolute", left: "-9999px" }}
                                            accept="image/*, .pdf"
                                            // accept="*/*"
                                            multiple
                                            onChange={(event) => handleFileChange(event, "signature")}
                                        />
                                    </span>
                                </div>
                                <p className="text-[11px] leading-5 text-[#6D6D6D] font-medium">Upload an image of your signature on white background in .jpg, .png or .pdf format</p>
                            </div>
                        </div>
                        <div className="mt-6">
                            <div className="flex items-center space-x-3">
                                    <span>
                                        <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                        Proof Of Residence
                                        </h3>
                                        <input
                                            type="text"
                                            value={inputs?.residence?.name}
                                            disabled
                                            placeholder="No file chosen"
                                            className="font-medium w-[250px] text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                        />
                                    </span>
                                    <span className="ml-8 mt-8">
                                         <select id="select" value={type.residenceType}
                                                 onChange={(event) => handleChange(event, "residenceType")}
                                                 className="font-medium w-[220px] text-black h-[45px]  leading-relaxed py-1 rounded  border border-neutral-300 justify-between items-center gap-4 flex">
                                             <option value="" disabled>Select Document Type</option>
                                             <option value={'jpg'}>Jpg</option>
                                             <option value={'png'}>Png</option>
                                             <option value={'pdf'}>Pdf</option>
                                        </select>
                                    </span>
                                     <span className="mt-8" onClick={openResidenceExplorer}>
                                         <p className="font-[600] w-[130px] text-[#007970] cursor-pointer px-4 py-2 rounded bg-[#EAFFFA] border-solid border-2 border-[#007970]">
                                            Choose file
                                        </p>
                                        <input
                                            ref={residenceInputRef}
                                            type="file"
                                            id="fileInput"
                                            name="files"
                                            style={{ position: "absolute", left: "-9999px" }}
                                            accept="image/*, .pdf"
                                            // accept="*/*"
                                            multiple
                                            onChange={(event) => handleFileChange(event, "residence")}
                                        />
                                    </span>
                            </div>
                            <p className="text-[11px] leading-5 text-[#6D6D6D] font-medium">Upload a proof of residence, this could be Utility bill or tenancy receipt in .jpg, .png or .pdf format</p>
                        </div>
                        <div className="mt-6">
                            <div className="flex items-center space-x-3">
                                    <span>
                                        <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                        Proof Of Identity
                                        </h3>
                                        <input
                                            type="text"
                                            value={inputs?.identity?.name}
                                            disabled
                                            placeholder="No file chosen"
                                            className="font-medium w-[250px] text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                        />
                                    </span>
                                    <span className="ml-8 mt-8">
                                         <select
                                             id="select" value={type.identityType}
                                             onChange={(event) => handleChange(event, "identityType")}
                                             className="font-medium w-[220px] text-black h-[45px]  leading-relaxed py-1 rounded  border border-neutral-300 justify-between items-center gap-4 flex">
                                             <option value="" disabled>Select Document Type</option>
                                             <option value={'jpg'}>Jpg</option>
                                             <option value={'png'}>Png</option>
                                             <option value={'pdf'}>Pdf</option>
                                        </select>
                                    </span>
                                    <span>
                                        <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                            Expiry Date
                                        </h3>
                                            <input
                                                type="date"
                                                value={type.expiryDate}
                                                onChange={(event) => handleChange(event, "expiryDate")}
                                                placeholder="Enter expiry date"
                                                className="font-medium w-[200px] text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                            />
                                    </span>
                                    <span className="mt-8" onClick={identityExplorer}>
                                         <p className="font-[600] w-[130px] text-[#007970] cursor-pointer px-4 py-2 rounded bg-[#EAFFFA] border-solid border-2 border-[#007970]">
                                            Choose file
                                        </p>
                                        <input
                                            ref={identityInputRef}
                                            type="file"
                                            id="fileInput"
                                            name="files"
                                            style={{ position: "absolute", left: "-9999px" }}
                                            accept="image/*, .pdf"
                                            // accept="*/*"
                                            multiple
                                            onChange={(event) => handleFileChange(event, "residence")}
                                        />
                                </span>
                            </div>
                            <p className="text-[11px] leading-5 text-[#6D6D6D] font-medium">Upload a means of identification, this could be Drivers License, National ID or International Passport in .jpg, .png or .pdf format</p>
                        </div>
                        <div className="mt-6">
                            <div className="flex items-center space-x-3">
                                    <span>
                                        <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                        Proof Of Employment
                                        </h3>
                                        <input
                                            type="text"
                                            value={inputs?.employment?.name}
                                            disabled
                                            placeholder="No file chosen"
                                            className="font-medium w-[250px] text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                        />
                                    </span>
                                <span className="ml-8 mt-8">
                                         <select id="select" value={type.employmentType}
                                                 onChange={(event) => handleChange(event, "employmentType")}
                                                 className="font-medium w-[220px] text-black h-[45px]  leading-relaxed py-1 rounded  border border-neutral-300 justify-between items-center gap-4 flex">
                                             <option value="" disabled>Select Document Type</option>
                                             <option value={'jpg'}>Jpg</option>
                                             <option value={'png'}>Png</option>
                                             <option value={'pdf'}>Pdf</option>
                                        </select>
                                </span>
                                <span className="mt-8" onClick={employmentExplorer}>
                                     <p className="font-[600] w-[130px] text-[#007970] cursor-pointer px-4 py-2 rounded bg-[#EAFFFA] border-solid border-2 border-[#007970]">
                                        Choose file
                                    </p>
                                    <input
                                        ref={employmentInputRef}
                                        type="file"
                                        id="fileInput"
                                        name="files"
                                        style={{ position: "absolute", left: "-9999px" }}
                                        accept="image/*, .pdf"
                                        // accept="*/*"
                                        multiple
                                        onChange={(event) => handleFileChange(event, "employment")}
                                    />
                                    </span>
                            </div>
                            <p className="text-[11px] leading-5 text-[#6D6D6D] font-medium">Upload a copy of employment letter or salary bank statement in .jpg, .png or .pdf format</p>
                        </div>
                    </div>
                </div>
            </div>
            <ClientButton onNext={handleNext} onPrevious={handleGoBack}/>
        </div>
    );
};

export default DocumentUpload;