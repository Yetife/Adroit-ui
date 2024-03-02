import {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {useReturnDisbursementMutation} from "../../../../store/features/bridgeLoan/api.js";
import {getUserToken} from "../../../../services/storage/index.js";
import axios from "axios";
import {updateSnackbar} from "../../../../store/snackbar/reducer.js";
import * as Dialog from "@radix-ui/react-dialog";
import {Close} from "@mui/icons-material";
import DatePicker from "react-datepicker";

const ReturnedModal = ({open, setOpen, inputs, setInputs, id, status, selectedGender, setSelectedGender}) => {
    const [gender, setGender] = useState([])
    const [selectedId, setSelectedId] = useState('');
    const dispatch  = useDispatch()
    const [returnDisbursement] = useReturnDisbursementMutation()
    const token = getUserToken();

    const handleChange = (e, fieldName) => {
        const value = e.target.value;
        setInputs((values) => ({...values, [fieldName]: value}))
    };

    const handleGenderChange = (event) => {
        const selectedOption = event.target.value;
        const selectedOptionObject = gender.find((option) => option.name === selectedOption);

        setSelectedGender(selectedOption);
        setSelectedId(selectedOptionObject ? selectedOptionObject.id : '');
    };

    const fetchGender = async () => {
        const baseUrl = import.meta.env.VITE_APP_BASE_URL
        try {
            const response = await axios.get(`${baseUrl}/GeneralSetUp/getallvalidGenders`, {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'XAPIKEY': import.meta.env.VITE_APP_ENCRYPTION_KEY,
                    'authorization': `Bearer ${token}`
                }
            });
            setGender(response.data.data);
            console.log('Fetched state:', response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchGender();
    }, []);

    // const handleAdd = () => {
    //     const user = JSON.parse(sessionStorage.getItem("userData"));
    //
    //     returnDisbursement({
    //         body: {
    //             surname: inputs.surname,
    //             firstname: inputs.firstName,
    //             middlename: inputs.middleName,
    //             emailAddress: inputs.emailAddress,
    //             gender: selectedGender,
    //             houseNo: inputs.houseNo,
    //             streetName: inputs.streetName,
    //             city: inputs.city,
    //             state: inputs.state,
    //             dob: inputs.date,
    //             bvn: inputs.bvn,
    //             idNo: inputs.idNo,
    //             idDateIssued: inputs.idDateIssued,
    //             transferAmount: inputs.transferAmount,
    //             preferredNaration: inputs.preferredNaration,
    //             repaymentDate: inputs.repayment,
    //             createdBy: user.FirstName,
    //             status: status,
    //             uniqueId: id,
    //
    //         }
    //     }).then(res => {
    //         dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: res.data.message,success:true}));
    //         setOpen(!open)
    //     }).catch(err =>{
    //         dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message:err.data.message,success:false}));
    //     })
    // }
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
                    <Dialog.Content className="custom-scroll-bar overflow-auto data-[state=open]:animate-contentShow z-[200] fixed top-[50%] left-[50%] max-h-[99vh] w-[90vw] max-w-[900px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[45px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                        <Dialog.Title className="text-[24px] text-[#343434] font-bold -mt-8">Edit</Dialog.Title>
                        {/*<Divider className="pt-4"/>*/}
                        <div className="mt-2">
                            <div className="py-4">
                                <div className="flex">
                                    <span>
                                      <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                        Surname
                                      </h3>
                                      <input
                                          type="text"
                                          value={inputs.surname}
                                          onChange={(event) => handleChange(event, "surname")}
                                          placeholder="Enter surname"
                                          className="font-medium w-[245px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                      />
                                    </span>
                                    <span className="ml-8">
                                      <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                        First Name
                                      </h3>
                                      <input
                                          type="text"
                                          value={inputs.firstName}
                                          onChange={(event) => handleChange(event, "firstName")}
                                          placeholder="Enter firstName"
                                          className="font-medium w-[245px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                      />
                                    </span>
                                    <span className="ml-8">
                                      <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                        Middle Name
                                      </h3>
                                      <input
                                          type="text"
                                          value={inputs.middleName}
                                          onChange={(event) => handleChange(event, "middleName")}
                                          placeholder="Enter middleName"
                                          className="font-medium w-[245px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                      />
                                    </span>
                                </div>
                            </div>
                            <div className="pb-4">
                                <div className="flex">
                                    <span>
                                      <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                        Email Address
                                      </h3>
                                      <input
                                          type="text"
                                          value={inputs.emailAddress}
                                          onChange={(event) => handleChange(event, "emailAddress")}
                                          placeholder="Enter name"
                                          className="font-medium w-[245px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                      />
                                    </span>
                                    <span className="ml-8">
                                      <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                       Gender
                                      </h3>
                                         <select id="select" value={selectedGender}
                                                 onChange={handleGenderChange}
                                                 className="font-medium w-[245px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex">
                                            <option value="" disabled>Select gender</option>
                                             {gender && gender?.map((option) => (
                                                 <option key={option.uniqueId} value={option.id}>
                                                     {option.name}
                                                 </option>
                                             ))}
                                        </select>
                                    </span>
                                    <span className="ml-8">
                                      <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                        House No.
                                      </h3>
                                      <input
                                          type="text"
                                          value={inputs.houseNo}
                                          onChange={(event) => handleChange(event, "houseNo")}
                                          placeholder="Enter house number"
                                          className="font-medium w-[245px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                      />
                                    </span>
                                </div>
                            </div>
                            <div className="pb-4">
                                <div className="flex">
                                    <span>
                                      <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                        Street Name
                                      </h3>
                                      <input
                                          type="text"
                                          value={inputs.streetName}
                                          onChange={(event) => handleChange(event, "streetName")}
                                          placeholder="Enter street name"
                                          className="font-medium w-[245px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                      />
                                    </span>
                                    <span className="ml-8">
                                      <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                        City
                                      </h3>
                                      <input
                                          type="text"
                                          value={inputs.city}
                                          onChange={(event) => handleChange(event, "city")}
                                          placeholder="Enter city"
                                          className="font-medium w-[245px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                      />
                                    </span>
                                    <span className="ml-8">
                                      <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                        State
                                      </h3>
                                      <input
                                          type="text"
                                          value={inputs.state}
                                          onChange={(event) => handleChange(event, "state")}
                                          placeholder="Enter state"
                                          className="font-medium w-[245px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                      />
                                    </span>
                                </div>
                            </div>
                            <div className="pb-4">
                                <div className="flex">
                                      <span>
                                      <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                        Date Of Birth
                                      </h3>
                                       <input
                                           type="date"
                                           value={inputs.date}
                                           onChange={(event) => handleChange(event, "date")}
                                           placeholder="Enter date"
                                           className="font-medium w-[245px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                       />
                                    </span>
                                    <span className="ml-8">
                                      <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                        BVN
                                      </h3>
                                      <input
                                          type="text"
                                          value={inputs.bvn}
                                          onChange={(event) => handleChange(event, "bvn")}
                                          placeholder="Enter bvn"
                                          className="font-medium w-[245px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                      />
                                    </span>
                                    <span className="ml-8">
                                      <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                        ID No. (International Passport Only)
                                      </h3>
                                      <input
                                          type="text"
                                          value={inputs.idNo}
                                          onChange={(event) => handleChange(event, "idNo")}
                                          placeholder="Enter id number"
                                          className="font-medium w-[245px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                      />
                                    </span>
                                </div>
                            </div>
                            <div className="pb-4">
                                <div className="flex">
                                    <span>
                                      <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                        ID Date issued
                                      </h3>
                                      <input
                                          type="date"
                                          value={inputs.idDateIssued}
                                          onChange={(event) => handleChange(event, "idDate")}
                                          placeholder="Enter id date"
                                          className="font-medium w-[245px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                      />
                                    </span>
                                    <span className="ml-8">
                                      <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                        Transfer Amount
                                      </h3>
                                      <input
                                          type="text"
                                          value={inputs. transferAmount}
                                          onChange={(event) => handleChange(event, "transferAmt")}
                                          placeholder="Enter transfer amount"
                                          className="font-medium w-[245px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                      />
                                    </span>
                                    <span className="ml-8">
                                      <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                        Preferred Narration
                                      </h3>
                                      <input
                                          type="text"
                                          value={inputs.preferredNaration}
                                          onChange={(event) => handleChange(event, "narration")}
                                          placeholder="Enter preferred narration"
                                          className="font-medium w-[245px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                      />
                                    </span>
                                </div>
                            </div>
                            <div className="pb-4">
                                <div className="flex">
                                     <span>
                                      <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                        Repayment Date
                                      </h3>
                                      <input
                                          type="date"
                                          value={inputs.repayment}
                                          onChange={(event) => handleChange(event, "repayment")}
                                          placeholder="Enter repayment date"
                                          className="font-medium w-[245px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                      />
                                    </span>
                                </div>
                            </div>
                            <div className="flex space-x-3 float-right">
                                <button className="bg-gray-300 rounded py-2 px-6 flex text-black mt-2" onClick={()=>setOpen(!open)}>Close</button>
                                <button className="bg-[#00C796] rounded py-2 px-12 flex text-white mt-2" onClick={()=>setOpen(!open)}>Save</button>
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

export default ReturnedModal;