import {useEffect, useState} from 'react';
import * as Dialog from "@radix-ui/react-dialog";
import {Close} from "@mui/icons-material";
import axios from "axios";
import {getUserToken} from "../../../../services/storage/index.js";
// import { Autocomplete } from '@mui/material';
import {FormControl, TextField, Autocomplete} from "@mui/material";
import CustomAutocomplete from "../../../reusables/CustomAutocomplete.jsx";

const AddManageModal = ({open, setOpen, inputs, setInputs,  purpose, handleAdd}) => {
    const [staff, setStaff] = useState([])
    const [level, setLevel] = useState([])
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const token = getUserToken();
    const baseUrl = import.meta.env.VITE_APP_BASE_URL


    //
    // const handleChange = (e, fieldName) => {
    //     const value = e.target.value;
    //     if (fieldName === "firstName"){
    //         const selectedStaff = staff.find((s) => s.firstName === value);
    //
    //         setInputs((values) => ({
    //             ...values,
    //             [fieldName]: selectedStaff,
    //             emailAddress: selectedStaff?.email || '',
    //             firstName: selectedStaff.firstName || '',
    //             lastName: selectedStaff.lastName || '',
    //         }));
    //     }else {
    //         setInputs((values) => ({...values, [fieldName]: value}))
    //     }
    // };

    const handleChange = (e, fieldName) => {
        const value = e.target.value;

        if (fieldName === "firstName") {
            const selectedStaff = staff.find((s) => s.firstName === value);

            setInputs((values) => ({
                ...values,
                [fieldName]: value,
                emailAddress: selectedStaff?.email || '',
                firstName: selectedStaff.firstName || '',
                lastName: selectedStaff.lastName || '',
            }));
        } else {
            setInputs((values) => ({...values, [fieldName]: value}));
        }
    };


    const fetchStaff = async () => {
        try {
            const response = await axios.get(`${baseUrl}/Users/get_all_active_users`, {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'XAPIKEY': "_*-+pgH7QzFH%^&!Jx4w46**fI@@#5Uzi4RvtTwlEXp_!*",
                    'authorization': `Bearer ${token}`
                }
            });
            setStaff(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // const fetchStaff = async () => {
    //     try {
    //         const response = await axios.get(`http://prananettech-001-site28.ftempurl.com/api/Users/get_all_active_users`, {
    //             headers: {
    //                 'Content-Type': "application/json",
    //                 'Accept': "application/json",
    //                 'XAPIKEY': "_*-+pgH7QzFH%^&!Jx4w46**fI@@#5Uzi4RvtTwlEXp_!*",
    //                 'authorization': `Bearer ${token}`
    //             }
    //         });
    //         const formattedStaff = response.data.data.map(item => ({
    //             id: item.id, // Make sure to use the actual property names
    //             firstName: item.firstName,
    //             lastName: item.lastName,
    //             emailAddress: item.email
    //             // ... other properties you may want to include
    //         }));
    //         setStaff(formattedStaff);
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // };
    const fetchLevel = async () => {
        try {
            const response = await axios.get(`${baseUrl}/Administration/UnderwriterLevel/getall`, {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'XAPIKEY': import.meta.env.VITE_APP_ENCRYPTION_KEY,
                    'authorization': `Bearer ${token}`
                }
            });
            setLevel(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchStaff()
        fetchLevel()
    }, []);

    const updateInputs = (updatedValues) => {
        setInputs((prevInputs) => ({ ...prevInputs, ...updatedValues }));
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
                        <Dialog.Title className="text-[24px] text-[#343434] font-bold -mt-8">{purpose === "edit" ? "Edit" : purpose === "view" ? "View" : "Manage"}</Dialog.Title>
                        {/*<Divider className="pt-4"/>*/}
                        <div className="mt-2">
                            <div>
                                 <span>
                                      <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                        Staff
                                      </h3>
                                     <CustomAutocomplete
                                         options={staff}
                                         disabled={purpose === "view"}
                                         onSelect={(selectedStaff) => {
                                             setInputs((values) => ({
                                                 ...values,
                                                 firstName: selectedStaff.firstName,
                                                 emailAddress: selectedStaff.email || '',
                                                 lastName: selectedStaff.lastName || '',
                                             }));
                                         }}
                                         isDropdownOpen={isDropdownOpen}
                                         setIsDropdownOpen={setIsDropdownOpen}
                                         updateInputs={updateInputs}
                                         // inputValue={inputs.firstName}
                                         // setInputValue={setInputs}
                                     />
                                      {/*<select id="select" value={inputs.firstName}*/}
                                      {/*        disabled={purpose === "view"}*/}
                                      {/*        onChange={(event) => handleChange(event, "firstName")}*/}
                                      {/*        className="font-medium w-full text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex">*/}
                                      {/*      <option value="" disabled>Select staff</option>*/}
                                      {/*    {staff && staff?.map((option) => (*/}
                                      {/*        <option key={option.id} value={option.firstName}>*/}
                                      {/*            {option.firstName} {option.lastName}*/}
                                      {/*        </option>*/}
                                      {/*    ))}*/}
                                      {/*  </select>*/}
                                </span>
                                <div className="pt-8">
                                    <span>
                                      <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                        Level
                                      </h3>
                                      <select id="select" value={inputs.level}
                                              disabled={purpose === "view"}
                                              onChange={(event) => handleChange(event, "level")}
                                              className="font-medium w-full text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300 justify-between items-center gap-4 flex">
                                            <option value="" disabled>Select level</option>
                                          {level && level?.map((option) => (
                                              <option key={option.uniqueId} value={option.name}>
                                                  {option.name}
                                              </option>
                                          ))}
                                        </select>
                                    </span>
                                </div>
                                <div className="flex space-x-3 float-right mt-6">
                                    <button className="bg-gray-300 rounded py-2 px-6 flex text-black"
                                            onClick={() => setOpen(!open)}>Close
                                    </button>
                                    {purpose !== "view" &&
                                        <button className="bg-[#00C796] rounded py-2 px-6 flex text-white"
                                                onClick={handleAdd}>Save</button>}
                                </div>
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

export default AddManageModal;