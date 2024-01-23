import React, {useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {getUserToken} from "../../services/storage/index.js";
import ClientButton from "../../components/crm/ClientButton.jsx";

const DocumentUpload = () => {
    const [inputs, setInputs] = useState({
        passport: null
    })
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("step", "six");

    const handleFileChange = (event, fieldName) => {
        const file = event.target.files[0];
        setInputs((values) => ({...values, [fieldName]: file}))
    };
    const handleGoBack = () => {
        queryParams.set("step", "four");
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
                <div className="mt-4 mb-20">
                    <p className="text-[20px] leading-5 text-[#4A5D58] font-bold">Document Upload</p>
                    <p className="text-[14px] leading-5 bg-[#EAFFFA] text-[#007970] px-3 font-medium w-[680px] py-2 my-4">Ensure all documents are uploaded and tagged properly. Files should be in .jpg, .png or .pdf formats</p>
                    <div className="mt-8">
                        <span>
                        <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                            Document Upload
                        </h3>
                            <input
                                className="font-medium w-[300px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                type="file"
                                id="fileInput"
                                name="files"
                                accept="image/*, .pdf"
                                // accept="*/*"
                                multiple
                                onChange={(event) => handleFileChange(event, "passport")}
                            />
                        </span>
                    </div>
                </div>
            </div>
            <ClientButton onNext={handleNext} onPrevious={handleGoBack}/>
        </div>
    );
};

export default DocumentUpload;