import * as Dialog from "@radix-ui/react-dialog";
import {Checkbox} from "@mui/material";
import {Close} from "@mui/icons-material";
import {useEffect, useState} from "react";
import axios from "axios";
import {updateSnackbar} from "../../store/snackbar/reducer.js";
import {useDispatch} from "react-redux";
import {useAddLgaMutation, useEditLgaMutation} from "../../store/features/generalSetup/api.js";
import {getUserToken} from "../../services/storage/index.js";

const AddLgaModal = ({open, setOpen, checked, setChecked, lga, setLga, selectedValue,setSelectedValue, purpose, id}) => {
    const [state, setState] = useState([]);
    // const [selectedValue, setSelectedValue] = useState('');
    const [selectedId, setSelectedId] = useState('');
    const dispatch = useDispatch()
    const [addLga] = useAddLgaMutation()
    const [editLga] = useEditLgaMutation()
    const token = getUserToken();

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };
    const handleLgaChange = (e) => {
        setLga(e.target.value)
    };

    const handleSelectChange = (event) => {
        const selectedOption = event.target.value;
        const selectedOptionObject = state.find((option) => option.name === selectedOption);

        setSelectedValue(selectedOption);
        setSelectedId(selectedOptionObject ? selectedOptionObject.id : ''); // Use the corresponding ID
    };

    const handleAdd = ()=> {
        if (!id){
            addLga({
                body: {
                    name: lga,
                    statusID: checked ? 1 : 0,
                    detId: selectedValue,
                }
            }).then(res => {
                dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: res.data.message,success:true}));
                setOpen(!open)
                setLga("")
                setSelectedValue("")
            }).catch(err =>{
                dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message:err.data.message,success:false}));
            })
        }else{
            editLga({
                body: {
                    name: lga,
                    statusID: checked ? 1 : 0,
                    detId: selectedValue,
                    id: id
                }
            }).then(res => {
                dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: res.data.message,success:true}));
                setOpen(!open)
                setLga("")
                setSelectedValue("")
            }).catch(err =>{
                dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message:err.data.message,success:false}));
            })
        }
    }
    const fetchData = async () => {
        try {
            const response = await axios.get('http://prananettech-001-site27.ftempurl.com/api/GeneralSetUp/getallvalidStates', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'XAPIKEY': import.meta.env.VITE_APP_ENCRYPTION_KEY,
                    'authorization': `Bearer ${token}`
                }
            });
            setState(response.data.data);
            console.log('Fetched state:', response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // const fetchLga = async () => {
    //     try {
    //         const response = await axios.get(`http://prananettech-001-site27.ftempurl.com/api/GeneralSetUp/getLgabyid/id?id=${id}`);
    //         setSelectedValue(response.data?.data.stateid)
    //         console.log(response?.data.data.stateid)
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // };
    //
    // if (id && open){
    //     fetchLga()
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
                    <Dialog.Content className="data-[state=open]:animate-contentShow z-[200] fixed top-[35%] left-[50%] max-h-[70vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[45px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                        <Dialog.Title className="text-[24px] text-[#343434] font-bold -mt-8">{purpose === "edit" ? "Edit" : purpose === "view" ? "View" : "Add"}</Dialog.Title>
                        {/*<Divider className="pt-4"/>*/}
                        <div className="mt-2">
                            <div>
                                <span className="ml-8">
                                  <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                    L.G.A
                                  </h3>
                                  <input
                                      type="text"
                                      value={lga}
                                      disabled={purpose === "view"}
                                      onChange={handleLgaChange}
                                      placeholder="Enter lga"
                                      className="font-medium w-full text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                  />
                                </span>
                                <span className="ml-8">
                                  <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                    State
                                  </h3>
                                     <select id="select" value={selectedValue} disabled={purpose === "view"} onChange={handleSelectChange}
                                             style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>
                                        <option value="" disabled>Select a state</option>
                                         {state && state?.map((option) => (
                                             <option key={option.id} value={option.name}>
                                                 {option.name}
                                             </option>
                                         ))}
                                    </select>
                                </span>
                                <div className="text-center mx-40 mt-4">
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

export default AddLgaModal;