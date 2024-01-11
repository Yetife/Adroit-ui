import {useEffect, useState} from 'react';
import * as Dialog from "@radix-ui/react-dialog";
import {Close} from "@mui/icons-material";
import axios from "axios";
import {getUserToken} from "../../../../services/storage/index.js";

const AddManageModal = ({open, setOpen, inputs, setInputs,  purpose, handleAdd}) => {
    const [staff, setStaff] = useState([])
    const [level, setLevel] = useState([])
    const token = getUserToken();


    const handleChange = (e, fieldName) => {
        const value = e.target.value;
        if (fieldName === "firstName"){
            const selectedStaff = staff.find((s) => s.firstName === value);

            setInputs((values) => ({
                ...values,
                [fieldName]: selectedStaff,
                emailAddress: selectedStaff?.email || '',
                firstName: selectedStaff.firstName || '',
                lastName: selectedStaff.lastName || '',
            }));
        }else {
            setInputs((values) => ({...values, [fieldName]: value}))
        }
    };

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

    const fetchLevel = async () => {
        try {
            const response = await axios.get('http://prananettech-001-site27.ftempurl.com/api/Administration/UnderwriterLevel/getallvalidUnderwriterLevels', {
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
                                        Tenor
                                      </h3>
                                      <select id="select" value={inputs.firstName}
                                              disabled={purpose === "view"}
                                              onChange={(event) => handleChange(event, "firstName")}
                                              className="font-medium w-full text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex">
                                            <option value="" disabled>Select staff</option>
                                          {staff && staff?.map((option) => (
                                              <option key={option.id} value={option.firstName}>
                                                  {option.firstName} {option.lastName}
                                              </option>
                                          ))}
                                        </select>
                                </span>
                                <div className="pt-8">
                                    <span>
                                      <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                        Level
                                      </h3>
                                      <select id="select" value={inputs.level}
                                              disabled={purpose === "view"}
                                              onChange={(event) => handleChange(event, "level")}
                                              className="font-medium w-full text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex">
                                            <option value="" disabled>Select level</option>
                                          {level && level?.map((option) => (
                                              <option key={option.uniqueId} value={option.name}>
                                                  {option.name}
                                              </option>
                                          ))}
                                        </select>
                                    </span>
                                </div>
                                <div className="flex space-x-3 float-right my-4">
                                    <button className="bg-gray-300 rounded py-2 px-6 flex text-black mt-8"
                                            onClick={() => setOpen(!open)}>Close
                                    </button>
                                    {purpose !== "view" &&
                                        <button className="bg-[#00C796] rounded py-2 px-6 flex text-white mt-8"
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