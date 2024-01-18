import {useEffect, useState} from "react";
import {getUserToken} from "../../../services/storage/index.js";
import axios from "axios";
import * as Dialog from "@radix-ui/react-dialog";
import CustomAutocomplete from "../../reusables/CustomAutocomplete.jsx";
import {Close} from "@mui/icons-material";

const ReassignModal = ({open, setOpen, inputs, setInputs,  purpose}) => {
    const [staff, setStaff] = useState([])
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const token = getUserToken();
    const fetchStaff = async () => {
        try {
            const response = await axios.get(`http://prananettech-001-site28.ftempurl.com/api/Users/get_all_active_users`, {
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

    const handleAdd = () => {
        console.log(inputs)
    }


    useEffect(() => {
        fetchStaff()
    }, []);

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
                        <Dialog.Title className="text-[24px] text-[#343434] font-bold -mt-8">{purpose === "edit" ? "Edit" : purpose === "view" ? "View" : "Add Levels"}</Dialog.Title>
                        {/*<Divider className="pt-4"/>*/}
                        <div className="mt-2">
                            <div>
                                 <span>
                                      <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                        Staff
                                      </h3>
                                     <CustomAutocomplete
                                         options={staff}
                                         onSelect={(selectedStaff) => {
                                             setInputs((values) => ({
                                                 ...values,
                                                 firstName: selectedStaff.firstName,
                                                 emailAddress: selectedStaff.email || '',
                                                 lastName: selectedStaff.lastName || '',
                                             }));
                                         }}
                                         isDropdownOpen={isDropdownOpen} // Pass the isDropdownOpen state to the CustomAutocomplete
                                         setIsDropdownOpen={setIsDropdownOpen}
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
                                <div className="flex space-x-3 float-right my-4">
                                    <button className="bg-gray-300 rounded py-2 px-6 flex text-black mt-8"
                                            onClick={() => setOpen(!open)}>Close
                                    </button>
                                        <button className="bg-[#00C796] rounded py-2 px-6 flex text-white mt-8"
                                                onClick={handleAdd}>Re-assign</button>
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

export default ReassignModal;