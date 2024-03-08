import {useEffect, useState} from 'react';
import {getUserToken} from "../../../services/storage/index.js";
import {useDispatch} from "react-redux";
import axios from "axios";
import {updateSnackbar} from "../../../store/snackbar/reducer.js";
import * as Dialog from "@radix-ui/react-dialog";
import {Close} from "@mui/icons-material";
import {getCurrentDate} from "../../reusables/getCurrentDate.js";

const FilterTransferModal = ({open, setOpen, handleFilter}) => {
    const [status, setStatus] = useState([]);
    const [inputs, setInputs] = useState({
        startDate: "",
        endDate: ""
    })
    const [statusName, setStatusName] = useState("");
    const token = getUserToken();
    const dispatch = useDispatch()

    const handleChange = (e, fieldName) => {
        const value = e.target.value;
        setInputs((values) => ({...values, [fieldName]: value}))
    };

    const handleStatusNameChange = (e) => {
        setStatusName(e.target.value)
    }

    const allOption = { id: 0, name: 'All' };

    const fetchData = async () => {
        const baseUrl = import.meta.env.VITE_APP_BASE_URL
        try {
            const response = await axios.get(`${baseUrl}/CustomerCentric/GetAlltransfersStattus`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'XAPIKEY': import.meta.env.VITE_APP_ENCRYPTION_KEY,
                    'authorization': `Bearer ${token}`
                }
            });
            // Include the "ALL" option in the status dropdown
            setStatus([allOption, ...response.data.data]);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData()
    }, []);

    const applyFilters = () => {
        if (!inputs.startDate) {
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message:"Start date is required",success:false}));
            return;
        }else if (!inputs.endDate) {
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message:"End date is required",success:false}));
            return;
        }
        // Gather filter parameters
        const filters = {
            statusName,
            startDate: inputs.startDate,
            endDate: inputs.endDate,
        };
        handleFilter(filters);
        setOpen(false);
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
                    <Dialog.Content className="data-[state=open]:animate-contentShow z-[200] fixed top-[42%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[45px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                        <Dialog.Title className="text-[32px] text-[#343434] font-bold -mt-8">Filter by</Dialog.Title>
                        {/*<Divider className="pt-4"/>*/}
                        <div className="mt-2">
                            <div>
                                <div className="flex items-center mt-4">
                                    <div className='py-2 flex items-center'>
                                        <span>
                                             <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                                Status
                                            </h3>
                                              <select id="select" value={statusName}
                                                      onChange={handleStatusNameChange}
                                                      className="font-medium w-[355px] text-black leading-relaxed px-4 py-2 rounded h-[50px]  border border-neutral-300 justify-between items-center gap-4 flex">
                                                <option value="" disabled>Select status</option>
                                                  {status && status?.map((option) => (
                                                      <option key={option.id} value={option.id}>
                                                          {option.name}
                                                      </option>
                                                  ))}
                                            </select>
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center mt-3">
                                    <div className='py-2 flex items-center'>
                                        <div>
                                            <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                                Start Date
                                            </h3>
                                            <input
                                                type="date"
                                                value={inputs.startDate}
                                                onChange={(event) => handleChange(event, "startDate")}
                                                placeholder="Enter start date"
                                                className="font-medium w-[170px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                            />
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                                End Date
                                            </h3>
                                            <input
                                                type="date"
                                                value={inputs.endDate}
                                                onChange={(event) => handleChange(event, "endDate")}
                                                placeholder="Enter end date"
                                                max={getCurrentDate()}
                                                className="font-medium w-[170px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex space-x-3 float-right">
                                <button className="bg-gray-300 rounded py-2 px-6 flex text-black mt-8"
                                        onClick={() => setOpen(!open)}>Close
                                </button>
                                <button className="bg-[#00C796] rounded py-2 px-6 flex text-white mt-8"
                                        onClick={applyFilters}>Filter</button>
                            </div>
                        </div>
                        <Dialog.Close asChild>
                            <button
                                className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[20px] right-[40px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                                aria-label="Close"
                            >
                                <Close/>
                            </button>
                        </Dialog.Close>`
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    );
};

export default FilterTransferModal;