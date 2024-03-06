import * as Dialog from "@radix-ui/react-dialog";
import {Close} from "@mui/icons-material";
import {useEffect, useState} from "react";
import axios from "axios";
import {getUserToken} from "../../../services/storage/index.js";
import {updateSnackbar} from "../../../store/snackbar/reducer.js";
import {useDispatch} from "react-redux";
import {fetchDocumentation} from "../../../store/documentationSlice.js";


const AddDocumentModal = ({open, setOpen, purpose, inputs, setInputs, selectedFiles, setSelectedFiles, id}) => {
    const [type, setType] = useState([]);
    const [status, setStatus] = useState([]);
    const [tenor, setTenor] = useState([]);
    const [interest, setInterest] = useState([])
    const dispatch = useDispatch()
    const token = getUserToken();
    const baseUrl = import.meta.env.VITE_APP_BASE_URL
    const [phone, setPhone] = useState("");

    const handleChange = (e, fieldName) => {
        const value = e.target.value;
        setInputs((values) => ({...values, [fieldName]: value}))
    };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFiles(file);
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`${baseUrl}/BridgeLoan/GeneralSetUpFacilityType/getallvalid`, {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'XAPIKEY': import.meta.env.VITE_APP_ENCRYPTION_KEY,
                    'authorization': `Bearer ${token}`
                }
            });
            setType(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const fetchTenor = async () => {
        try {
            const response = await axios.get(`${baseUrl}/BridgeLoan/GeneralSetUpTenor/getallvalid`, {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'XAPIKEY': '_*-+pgH7QzFH%^&!Jx4w46**fI@@#5Uzi4RvtTwlEXp_!*',
                    'authorization': `Bearer ${token}`
                }
            });
            setTenor(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchStatus = async () => {
        try {
            const response = await axios.get(`${baseUrl}/BridgeLoan/DocumentationStatus/getallvalid`, {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'XAPIKEY': '_*-+pgH7QzFH%^&!Jx4w46**fI@@#5Uzi4RvtTwlEXp_!*',
                    'authorization': `Bearer ${token}`
                }
            });
            setStatus(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const fetchInterest = async () => {
        try {
            const response = await axios.get(`${baseUrl}/GeneralSetUp/getallvalidRegularLoanInterestRate`, {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'XAPIKEY': '_*-+pgH7QzFH%^&!Jx4w46**fI@@#5Uzi4RvtTwlEXp_!*',
                    'authorization': `Bearer ${token}`
                }
            });
            setInterest(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
        fetchTenor()
        fetchStatus()
        fetchInterest()
    }, []);

    const handlePhoneChange = (e, isNumeric= false) => {
        const numericRegex = /^\d{0,11}$/;
        if ((isNumeric && numericRegex.test(e.target.value)) || !isNumeric) {
            setPhone(e.target.value)
        }
    }
    const handleAdd = async ()=> {
        if (!id){
            try {
                const user = JSON.parse(sessionStorage.getItem("userData"));
                const formData = new FormData();
                formData.append('Lender', inputs.lender);
                formData.append('ObligorName', inputs.obName);
                formData.append('ObligorDob', inputs.dateOfBirth);
                formData.append('FacilityType', inputs.facilityType)
                formData.append('InterestRate', inputs.interestRate);
                formData.append('DocumentationStatus', inputs.docStatus);
                formData.append('ValueDate', inputs.valueDate);
                formData.append('MaturityDate', inputs.maturityDate);
                formData.append('Comment', inputs.comment ? inputs.comment : "No comment");
                formData.append('CreatedBy', user.UserName);
                formData.append('DocumentationDoc', selectedFiles);
                formData.append('Tenor', inputs.tenor);
                formData.append('PhoneNo', phone);
                formData.append('Amount', inputs.amount);
                // ... other form data
                const token = getUserToken();
                const baseUrl = import.meta.env.VITE_APP_BASE_URL;

                const res = await fetch(`${baseUrl}/BridgeLoan/Documentation/add`, {
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
                    setOpen(!open)
                    setInputs({
                        lender: "",
                        obName: "",
                        dateOfBirth: null,
                        valueDate: null,
                        maturityDate: null,
                        comment: "",
                        tenor: "",
                        interestRate: "",
                        facilityType: "",
                        docStatus: "",
                        amount: "",
                    })
                    await dispatch(fetchDocumentation(10, 1))
                }
            } catch (error) {
                dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message:error.data.message,success:false}));
            }
        }else {
            try {
                const user = JSON.parse(sessionStorage.getItem("userData"));
                const formData = new FormData();
                formData.append('Lender', inputs.lender);
                formData.append('ObligorName', inputs.obName);
                formData.append('ObligorDob', inputs.dateOfBirth);
                formData.append('FacilityType', inputs.facilityType)
                formData.append('InterestRate', inputs.interestRate);
                formData.append('DocumentationStatus', inputs.docStatus);
                formData.append('ValueDate', inputs.valueDate);
                formData.append('MaturityDate', inputs.maturityDate);
                formData.append('Comment', inputs.comment ? inputs.comment : "No comment");
                formData.append('CreatedBy', user.UserName);
                formData.append('DocumentationDoc', selectedFiles);
                formData.append('Tenor', inputs.tenor);
                formData.append('Amount', inputs.amount);
                formData.append('PhoneNo', phone);
                formData.append('UniqueId', id)
                // ... other form data
                const token = getUserToken();

                const res = await fetch(`${baseUrl}/BridgeLoan/Documentation/Update`, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'multipart/form-data',
                        'XApiKey': import.meta.env.VITE_APP_ENCRYPTION_KEY,
                        // 'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    },
                });
                console.log(res.status, "resssssss")
                if (res.status === 200) {
                    dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: "Record saved successfully", success:true}));
                    setOpen(!open)
                    setInputs({
                        lender: "",
                        obName: "",
                        dateOfBirth: null,
                        valueDate: null,
                        maturityDate: null,
                        comment: "",
                        tenor: "",
                        interestRate: "",
                        facilityType: "",
                        docStatus: "",
                        amount: "",
                    })
                    await dispatch(fetchDocumentation(10, 1))
                }
            } catch (error) {
                dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message:error.data.message,success:false}));
            }
        }
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
                    <Dialog.Content className="custom-scroll-bar overflow-auto data-[state=open]:animate-contentShow z-[200] fixed top-[50%] left-[50%] max-h-[100vh] w-[90vw] max-w-[900px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[45px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                        <Dialog.Title className="text-[24px] text-[#343434] font-bold -mt-8">{purpose === "edit" ? "Edit" : purpose === "view" ? "View" : "Add"}</Dialog.Title>
                        {/*<Divider className="pt-4"/>*/}
                        <div className="mt-2">
                            <div>
                                <div className="flex">
                                    <span>
                                      <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                        Lender
                                      </h3>
                                      <input
                                          type="text"
                                          value={inputs.lender}
                                          disabled={purpose === "view"}
                                          onChange={(event) => handleChange(event, "lender")}
                                          placeholder="Enter name"
                                          className="font-medium w-[240px] text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                      />
                                    </span>
                                    <span className="ml-8">
                                      <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                        Obligor Name
                                      </h3>
                                      <input
                                          type="text"
                                          value={inputs.obName}
                                          disabled={purpose === "view"}
                                          onChange={(event) => handleChange(event, "obName")}
                                          placeholder="Enter name"
                                          className="font-medium w-[240px] text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                      />
                                    </span>
                                    <span className="ml-8">
                                      <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                        Obligor D.O.B
                                      </h3>
                                         <input
                                             type="date"
                                             value={inputs.dateOfBirth}
                                             disabled={purpose === "view"}
                                             onChange={(event) => handleChange(event, "dateOfBirth")}
                                             placeholder="Enter date of birth"
                                             className="font-medium w-[240px] text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300 "
                                         />
                                    </span>
                                </div>
                                <div className="flex mt-8">
                                    <span>
                                      <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                       Loan Tenor
                                      </h3>
                                         <select id="select" value={inputs.tenor} disabled={purpose === "view"}
                                                 onChange={(event) => handleChange(event, "tenor")}
                                                 className="font-medium w-[240px] text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300 justify-between items-center gap-4 flex">
                                            <option value="" disabled>Select tenor</option>
                                             {tenor && tenor?.map((option) => (
                                                 <option key={option.uniqueId} value={option.name}>
                                                     {option.name}
                                                 </option>
                                             ))}
                                        </select>
                                    </span>
                                    <span className="ml-8">
                                      <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                       Interest Rate
                                      </h3>
                                         <select id="select" value={inputs.interestRate} disabled={purpose === "view"}
                                                 onChange={(event) => handleChange(event, "interestRate")}
                                                 className="font-medium w-[240px] text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300 justify-between items-center gap-4 flex">
                                            <option value="" disabled>Select interest</option>
                                             {interest && interest?.map((option) => (
                                                 <option key={option.id} value={option.interestRate}>
                                                     {option.interestRate}
                                                 </option>
                                             ))}
                                        </select>
                                    </span>
                                    <span className="ml-8">
                                      <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                        Amount
                                      </h3>
                                      <input
                                          type="text"
                                          value={inputs.amount}
                                          disabled={purpose === "view"}
                                          onChange={(event) => handleChange(event, "amount")}
                                          placeholder="Enter amount"
                                          className="font-medium w-[240px] text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                      />
                                    </span>
                                </div>
                                <div className="flex mt-8">
                                    <span>
                                      <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                       Facility Type
                                      </h3>
                                         <select id="select" value={inputs.facilityType} disabled={purpose === "view"}
                                                 onChange={(event) => handleChange(event, "facilityType")}
                                                 className="font-medium w-[240px] text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300">
                                            <option value="" disabled>Select facility type</option>
                                             {type && type?.map((option) => (
                                                 <option key={option.uniqueId} value={option.docName}>
                                                     {option.docName}
                                                 </option>
                                             ))}
                                        </select>
                                    </span>
                                    <span className="ml-8">
                                      <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                       Documentation Status
                                      </h3>
                                         <select id="select" value={inputs.docStatus} disabled={purpose === "view"}
                                                 onChange={(event) => handleChange(event, "docStatus")}
                                                 className="font-medium w-[240px] text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300">
                                            <option value="" disabled>Select status</option>
                                             {status && status?.map((option) => (
                                                 <option key={option.uniqueId} value={option.docName}>
                                                     {option.docName}
                                                 </option>
                                             ))}
                                        </select>
                                    </span>
                                    <span className="ml-8">
                                      <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                        Value Date
                                      </h3>
                                         <input
                                             type="date"
                                             value={inputs.valueDate}
                                             disabled={purpose === "view"}
                                             onChange={(event) => handleChange(event, "valueDate")}
                                             placeholder="Enter value date"
                                             className="font-medium w-[240px] text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300"
                                         />
                                    </span>
                                </div>
                                <div className="flex mt-8">
                                    <span>
                                      <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                        Maturity Date
                                      </h3>
                                         <input
                                             type="date"
                                             value={inputs.maturityDate}
                                             disabled={purpose === "view"}
                                             onChange={(event) => handleChange(event, "maturityDate")}
                                             placeholder="Enter maturity date"
                                             className="font-medium w-[240px] text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300"
                                         />
                                    </span>
                                     <span className="ml-8">
                                        <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                            Phone Number
                                        </h3>
                                          <input
                                              type="number"
                                              disabled={purpose === "view"}
                                              value={phone}
                                              onChange={(e) => handlePhoneChange(e, true)}
                                              placeholder="Enter phone"
                                              className="font-medium w-[240px] text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                          />
                                    </span>
                                    <span className="ml-8">
                                      <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                        Document Upload
                                      </h3>
                                         <input
                                             className="font-medium w-[240px] text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                             type="file"
                                             id="fileInput"
                                             name="files"
                                             // accept="image/*, .csv, .xlsx"
                                             accept="application/pdf"
                                             // multiple
                                             onChange={handleFileChange}
                                         />
                                    </span>
                                </div>
                                <div>
                                    <span className="ml-8">
                                      <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                        Comment
                                      </h3>
                                         <textarea id="message" name="message" rows="4" cols="50"
                                                   value={inputs.comment}
                                                   disabled={purpose === "view"}
                                                   onChange={(event) => handleChange(event, "comment")}
                                                   placeholder="Add comment"
                                                   className="font-medium w-full text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                         ></textarea>
                                    </span>
                                </div>

                                <div className="flex space-x-3 float-right my-2">
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

export default AddDocumentModal;