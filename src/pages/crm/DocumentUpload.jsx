import {useEffect, useRef, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import ClientButton from "../../components/crm/ClientButton.jsx";
import {getUserToken} from "../../services/storage/index.js";
import {updateSnackbar} from "../../store/snackbar/reducer.js";
import {useDispatch} from "react-redux";
import axios from "axios";

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
    const dispatch = useDispatch()
    const custId = queryParams.get("cid");
    const clientId = JSON.parse(sessionStorage.getItem("cusId"));
    const token = getUserToken();

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
        if (inputs.uniqueId){
            try {
                const cusId = JSON.parse(sessionStorage.getItem("cusId"));
                const formData = new FormData();
                formData.append('CustomerId', cusId.toString());
                formData.append('PassportPhotograph', inputs.passport);
                formData.append('ESignature', inputs.signature);
                formData.append('ProofOfResidence', inputs.residence)
                formData.append('ProofOfResidenceType', type.residenceType);
                formData.append('ProofOfIdentity', inputs.identity);
                formData.append('ProofOfIdentityType', type.identityType);
                formData.append('ProofOfIdentityExpiryDate', type.expiryDate);
                formData.append('ProofOfEmployment', inputs.employment);
                formData.append('ProofOfEmploymentType', type.employmentType);
                // ... other form data
                const token = getUserToken();
                const baseUrl = import.meta.env.VITE_APP_BASE_URL;

                const res = await fetch(`${baseUrl}/CRM/Document/Update`, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'multipart/form-data',
                        'XApiKey': import.meta.env.VITE_APP_ENCRYPTION_KEY,
                        // 'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    },
                });
                if (res.status === 200) {
                    dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: "Record saved successfully", success:true}));
                    navigate({
                        search: queryParams.toString(),
                    });
                }
            } catch (error) {
                dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message:error.data.message,success:false}));
            }
        }else {
            try {
                const cusId = JSON.parse(sessionStorage.getItem("cusId"));
                const formData = new FormData();
                formData.append('CustomerId', cusId.toString());
                formData.append('PassportPhotograph', inputs.passport);
                formData.append('ESignature', inputs.signature);
                formData.append('ProofOfResidence', inputs.residence)
                formData.append('ProofOfResidenceType', type.residenceType);
                formData.append('ProofOfIdentity', inputs.identity);
                formData.append('ProofOfIdentityType', type.identityType);
                formData.append('ProofOfIdentityExpiryDate', type.expiryDate);
                formData.append('ProofOfEmployment', inputs.employment);
                formData.append('ProofOfEmploymentType', type.employmentType);
                // ... other form data
                const token = getUserToken();
                const baseUrl = import.meta.env.VITE_APP_BASE_URL;

                const res = await fetch(`${baseUrl}/CRM/Document/add`, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'multipart/form-data',
                        'XApiKey': import.meta.env.VITE_APP_ENCRYPTION_KEY,
                        // 'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    },
                });
                if (res.status === 200) {
                    dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: "Record saved successfully", success:true}));
                    navigate({
                        search: queryParams.toString(),
                    });
                }
            } catch (error) {
                dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message:error.data.message,success:false}));
            }
        }
    };

    const fetchClient = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/CRM/Client/getbycustId/${custId || clientId}`, {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'XAPIKEY': import.meta.env.VITE_APP_ENCRYPTION_KEY,
                    'authorization': `Bearer ${token}`
                }
            });
            setInputs({
                passport: response.data?.data?.documentUpload.passportPhotographFileName,
                signature: response.data?.data?.documentUpload.eSignatureFileName,
                residence: response.data?.data?.documentUpload.proofOfResidenceFileName,
                identity: response.data?.data?.documentUpload.proofOfIdentityFileName,
                employment: response.data?.data?.documentUpload.proofOfEmploymentFileName,
            })
            setType({
                residenceType: response.data?.data?.documentUpload.passportPhotographFileName,
                identityType: response.data?.data?.documentUpload.proofOfIdentityType,
                employmentType: response.data?.data?.documentUpload.proofOfEmploymentType,
                expiryDate: response.data?.data?.documentUpload.proofOfIdentityExpiryDate,
            })
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchClient()
    }, []);
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
                                            onChange={(event) => handleFileChange(event, "identity")}
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