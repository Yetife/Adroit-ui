import {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {updateSnackbar} from "../../../../store/snackbar/reducer.js";
import axios from "axios";
import * as Dialog from "@radix-ui/react-dialog";
import {Close} from "@mui/icons-material";
import {
    useAddRegularLoanInterestMutation,
    useEditRegularLoanInterestMutation
} from "../../../../store/features/administration/api.js";
import {getUserToken} from "../../../../services/storage/index.js";

const AddRegularLoanInterestModal = ({open, setOpen, rate, setRate, depositFrom, setDepositFrom, depositTo, setDepositTo, selectedValue, setSelectedValue, purpose, id}) => {
    const [type, setType] = useState([]);
    const dispatch = useDispatch()
    const [addLoan] = useAddRegularLoanInterestMutation()
    const [editLoan] = useEditRegularLoanInterestMutation()
    const token = getUserToken();

    const handleFromChange = (e) => {
        setDepositFrom(e.target.value)
    };
    const handleToChange = (e) => {
        setDepositTo(e.target.value)
    };
    const numbersOnlyRegex =  /^[0-9]+(\.[0-9]*)?$/;

    const handleRateChange = (e) => {
        const userInput = e.target.value;

        if (numbersOnlyRegex.test(userInput) || userInput === "") {
            setRate(userInput);
        }
    };

    const handleSelectChange = (event) => {
        const selectedOption = event.target.value;
        setSelectedValue(selectedOption);

    };

    const handleAdd = ()=> {
        if (!id){
            addLoan({
                body: {
                    interestRate: rate,
                    loanAmountFrom: depositFrom,
                    loanAmountTo: depositTo,
                    employmentTypeId: selectedValue,
                }
            }).then(res => {
                dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: res.data.message,success:true}));
                setOpen(!open)
                setRate("")
                setDepositTo("")
                setDepositFrom("")
                setSelectedValue("")
            }).catch(err =>{
                dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message:err.data.message,success:false}));
            })
        }else{
            editLoan({
                body: {
                    interestRate: rate,
                    loanAmountFrom: depositFrom,
                    loanAmountTo: depositTo,
                    employmentTypeId: selectedValue,
                    uniqueId: id
                }
            }).then(res => {
                dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: res.data.message,success:true}));
                setOpen(!open)
                setRate("")
                setDepositTo("")
                setDepositFrom("")
                setSelectedValue("")
            }).catch(err =>{
                dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message:err.data.message,success:false}));
            })
        }
    }
    const fetchData = async () => {
        try {
            const response = await axios.get('http://prananettech-001-site27.ftempurl.com/api/GeneralSetUp/getallvalidEmploymenttypes', {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'XAPIKEY': import.meta.env.VITE_APP_ENCRYPTION_KEY,
                    'authorization': `Bearer ${token}`
                }
            });
            setType(response.data.data);
            console.log('Fetched state:', response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // const fetchType = async () => {
    //     try {
    //         const response = await axios.get(`http://prananettech-001-site27.ftempurl.com/api/GeneralSetUp/getRegularLoanInterestRatebyid/id?id=${id}`);
    //         setSelectedValue(response.data?.data.employmentTypeId)
    //         console.log(response?.data.data.stateid)
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // };
    //
    // if (id && open){
    //     fetchType()
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
                    <Dialog.Content className="data-[state=open]:animate-contentShow z-[200] fixed top-[35%] left-[50%] max-h-[85vh] w-[90vw] max-w-[720px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[45px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                        <Dialog.Title className="text-[24px] text-[#343434] font-bold -mt-8">{purpose === "edit" ? "Edit" : purpose === "view" ? "View" : "Add"}</Dialog.Title>
                        {/*<Divider className="pt-4"/>*/}
                        <div className="mt-2">
                            <div>
                                <div className="flex items-center">
                                    <div>
                                        <span className="ml-8">
                                          <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                            Employment Type
                                          </h3>
                                             <select id="select" value={selectedValue}
                                                     className="font-medium w-[300px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                                     onChange={handleSelectChange} disabled={purpose === "view"}
                                                     style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
                                                <option value="" disabled>Select employment type</option>
                                                 {type && type?.map((option) => (
                                                     <option key={option.id} value={option.name}>
                                                         {option.name}
                                                     </option>
                                                 ))}
                                            </select>
                                        </span>
                                        <span className="ml-8">
                                          <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                            Loan Amount From
                                          </h3>
                                          <input
                                              type="number"
                                              value={depositFrom}
                                              disabled={purpose === "view"}
                                              onChange={handleFromChange}
                                              placeholder="Enter loan amount from"
                                              className="font-medium w-[300px] text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                          />
                                        </span>
                                    </div>
                                    <div className="px-6">
                                        <span className="ml-8">
                                          <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                            Interest Rate
                                          </h3>
                                          <input
                                              type="text"
                                              value={rate}
                                              disabled={purpose === "view"}
                                              onChange={handleRateChange}
                                              placeholder="Enter interest rate"
                                              className="font-medium w-[300px] text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                          />
                                        </span>
                                        <span className="ml-8">
                                          <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                            Loan Amount To
                                          </h3>
                                          <input
                                              type="number"
                                              value={depositTo}
                                              disabled={purpose === "view"}
                                              onChange={handleToChange}
                                              placeholder="Enter loan amount to"
                                              className="font-medium w-[300px] text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                          />
                                        </span>
                                    </div>
                                </div>

                                <div className="flex space-x-3 float-right mt-8">
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

export default AddRegularLoanInterestModal;