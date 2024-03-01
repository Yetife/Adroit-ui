import * as Dialog from "@radix-ui/react-dialog";
import {Checkbox} from "@mui/material";
import {Close} from "@mui/icons-material";
import {
    useAddStateMutation,
    useEditStateMutation
} from "../../../store/features/generalSetup/api.js";
import {useEffect, useState} from "react";
import axios from "axios";
import {updateSnackbar} from "../../../store/snackbar/reducer.js";
import {useDispatch} from "react-redux";
import {getUserToken} from "../../../services/storage/index.js";

const AddStateModal = ({open, setOpen, checked, setChecked, state, setState, purpose, selectedValue, setSelectedValue, id}) => {
    const [country, setCountry] = useState([]);
    const [selectedId, setSelectedId] = useState('');
    const dispatch = useDispatch()
    const [addState] = useAddStateMutation()
    const [editState] = useEditStateMutation()
    const token = getUserToken();
    const baseUrl = import.meta.env.VITE_APP_BASE_URL



    const handleAdd = ()=> {
        if (!id){
            addState({
                body: {
                    name: state,
                    statusID: checked ? 1 : 0,
                    detId: selectedValue
                }
            }).then(res => {
                dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: res.data.message,success:true}));
                setOpen(!open)
                setState("")
                setSelectedValue("")
            }).catch(err =>{
                dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message:err.data.message,success:false}));
            })
        }else{
            editState({
                body: {
                    name: state,
                    statusID: checked ? 1 : 0,
                    detId: selectedValue,
                    id: id
                }
            }).then(res => {
                dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: res.data.message,success:true}));
                setOpen(!open)
                setState("")
                setSelectedValue("")
            }).catch(err =>{
                dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message:err.data.message,success:false}));
            })
        }
    }

    const handleSelectChange = (event) => {
        const selectedOption = event.target.value;
        // const selectedOptionObject = country.find((option) => option.name === selectedOption);

        setSelectedValue(selectedOption);
        // setSelectedId(selectedOptionObject ? selectedOptionObject.id : ''); // Use the corresponding ID
    };

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const handleLgaChange = (e) => {
        setState(e.target.value);
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`${baseUrl}/GeneralSetUp/getallvalidCountry`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'XAPIKEY': import.meta.env.VITE_APP_ENCRYPTION_KEY,
                    'authorization': `Bearer ${token}`
                }
            });
            setCountry(response.data.data);
            console.log('Fetched Country:', response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // const fetchState = async () => {
    //     try {
    //         const response = await axios.get(`http://prananettech-001-site27.ftempurl.com/api/GeneralSetUp/getStatebyid/id?id=${id}`);
    //         setSelectedValue(response.data?.data.countryid)
    //         console.log(response?.data.data.countryid)
    //         console.log('Fetched Country:', response.data.data);
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // };
    //
    // if (id && open){
    //     fetchState()
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
                    <Dialog.Content className="data-[state=open]:animate-contentShow z-[200] fixed top-[40%] left-[50%] max-h-[70vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[45px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                        <Dialog.Title className="text-[24px] text-[#343434] font-bold -mt-8">{purpose === "edit" ? "Edit" : purpose === "view" ? "View" : "Add"}</Dialog.Title>
                        {/*<Divider className="pt-4"/>*/}
                        <div className="mt-2">
                            <div>
                                <span className="ml-8">
                                  <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                    State
                                  </h3>
                                  <input
                                      type="text"
                                      value={state}
                                      disabled={purpose === "view"}
                                      onChange={handleLgaChange}
                                      placeholder="Enter state"
                                      className="font-medium w-full text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                  />
                                </span>
                                <span className="ml-8">
                                  <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                    Country
                                  </h3>
                                     <select id="select" value={selectedValue} disabled={purpose === "view"} onChange={handleSelectChange}
                                             style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>
                                        <option value="" disabled>Select a country</option>
                                             {country.map((option) => (
                                             <option key={option.id} value={option.id}>
                                                 {option.name}
                                             </option>
                                         ))}
                                    </select>
                                </span>
                                <div className="text-center mx-40 mt-8">
                                    <span className="flex items-center">
                                   <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap">
                                        Active
                                    </h3>
                                     <Checkbox
                                         checked={checked}
                                         disabled={purpose === "view"}
                                         sx={{'&.Mui-checked': {
                                                 color: "#00C796",
                                             },}}
                                         onChange={handleChange}
                                         inputProps={{ 'aria-label': 'controlled' }}
                                     />
                                </span>
                                </div>
                                <div className="flex space-x-3 float-right my-4">
                                    <button className="bg-gray-300 rounded py-2 px-6 flex text-black" onClick={()=>setOpen(!open)}>Close</button>
                                    {purpose !== "view" && <button className="bg-[#00C796] rounded py-2 px-6 flex text-white"
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

export default AddStateModal;