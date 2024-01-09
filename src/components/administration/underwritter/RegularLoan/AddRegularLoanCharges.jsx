import {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {updateSnackbar} from "../../../../store/snackbar/reducer.js";
import axios from "axios";
import * as Dialog from "@radix-ui/react-dialog";
import {Close} from "@mui/icons-material";
import {
    useAddRegularLoanChargesMutation,
    useEditRegularLoanChargesMutation
} from "../../../../store/features/administration/api.js";
import {getUserToken} from "../../../../services/storage/index.js";

const AddRegularLoanCharges = ({open, setOpen, cAmount, setCAmount, depositFrom, setDepositFrom, selectedValue, setSelectedValue, selectedLoan, setSelectedLoan, selectedPer, setSelectedPer, depositTo, setDepositTo, purpose, id}) => {
    const [type, setType] = useState([]);
    const [tenor, setTenor] = useState([]);
    const per = [{name: true}, {name: false}]
    const dispatch = useDispatch()
    const [addLoan] = useAddRegularLoanChargesMutation()
    const [editLoan] = useEditRegularLoanChargesMutation()
    const token = getUserToken();



    const handleFromChange = (e) => {
        setDepositFrom(e.target.value)
    };
    const handleToChange = (e) => {
        setDepositTo(e.target.value)
    };
    const handleCAmountChange = (e) => {
        setCAmount(e.target.value)
    };
    const handlePercentageChange = (e) => {
        setSelectedPer(e.target.value);
    };

    const handleSelectChange = (event) => {
        const selectedOption = event.target.value;
        setSelectedValue(selectedOption);
    };
    const handleLoanChange = (event) => {
        const selectedOption = event.target.value;
        setSelectedLoan(selectedOption);
    };

    const handleAdd = ()=> {
        if (!id){
            addLoan({
                body: {
                    loanAmountFrom: depositFrom,
                    loanAmountTo: depositTo,
                    chargeAmount: cAmount,
                    loanTenorid: selectedLoan,
                    isPercentage: Boolean(selectedPer),
                    employmentTypeId: selectedValue,
                }
            }).then(res => {
                dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: res.data.message,success:true}));
                setOpen(!open)
                setCAmount("")
                setDepositTo("")
                setDepositFrom("")
                setSelectedValue("")
                setSelectedLoan("")
                setSelectedPer(false)
            }).catch(err =>{
                dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message:err.data.message,success:false}));
            })
        }else{
            editLoan({
                body: {
                    loanAmountFrom: depositFrom,
                    loanAmountTo: depositTo,
                    chargeAmount: cAmount,
                    loanTenorid: selectedLoan,
                    isPercentage: Boolean(selectedPer),
                    employmentTypeId: selectedValue,
                    uniqueId: id
                }
            }).then(res => {
                dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: res.data.message,success:true}));
                setOpen(!open)
                setCAmount("")
                setDepositTo("")
                setDepositFrom("")
                setSelectedValue("")
                setSelectedLoan("")
                setSelectedPer(false)
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
    const fetchTenor = async () => {
        try {
            const response = await axios.get('http://prananettech-001-site27.ftempurl.com/api/Administration/LoanTenor/getallvalidLoanTenors',{
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'XAPIKEY': import.meta.env.VITE_APP_ENCRYPTION_KEY,
                    'authorization': `Bearer ${token}`
                }
            });
            setTenor(response.data.data);
            console.log('Fetched state:', response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
        fetchTenor()
    }, []);

    // const fetchType = async () => {
    //     try {
    //         const response = await axios.get(`http://prananettech-001-site27.ftempurl.com/api/GeneralSetUp/getRegularLoanChargebyid/id?id=${id}`);
    //         setSelectedValue(response.data?.data.employmentTypeId)
    //         setSelectedLoan(response.data?.data.loanTenorid)
    //         setSelectedPer(response.data?.data.isPercentage)
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
                    <Dialog.Content className="data-[state=open]:animate-contentShow z-[200] fixed top-[40%] left-[50%] max-h-[85vh] w-[90vw] max-w-[720px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[45px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
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
                                             <select id="select" value={selectedValue} disabled={purpose === "view"}
                                                     onChange={handleSelectChange}
                                                     className="font-medium w-[300px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                                     style={{ width: '100%', padding: '14px', border: '1px solid #ccc', borderRadius: '4px' }}>
                                                <option value="" disabled>Select type</option>
                                                 {type && type?.map((option) => (
                                                     <option key={option.id} value={option.name}>
                                                         {option.name}
                                                     </option>
                                                 ))}
                                            </select>
                                        </span>
                                        <span className="ml-8">
                                          <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                            Charge Amount
                                          </h3>
                                          <input
                                              type="text"
                                              value={cAmount}
                                              disabled={purpose === "view"}
                                              onChange={handleCAmountChange}
                                              placeholder="Enter charge amount"
                                              className="font-medium w-[300px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                          />
                                        </span>
                                        <span className="ml-8">
                                          <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                            Loan Amount From
                                          </h3>
                                          <input
                                              type="text"
                                              value={depositFrom}
                                              disabled={purpose === "view"}
                                              onChange={handleFromChange}
                                              placeholder="Enter loan amount from"
                                              className="font-medium w-[300px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                          />
                                        </span>
                                    </div>
                                    <div className="px-6">
                                        <span className="ml-8">
                                          <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                           Loan Tenor
                                          </h3>
                                             <select id="select" value={selectedLoan} disabled={purpose === "view"}
                                                     className="font-medium w-[300px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                                     onChange={handleLoanChange}
                                                     style={{ width: '100%', padding: '14px', border: '1px solid #ccc', borderRadius: '4px' }}>
                                                <option value="" disabled>Select loan tenor</option>
                                                 {tenor && tenor?.map((option) => (
                                                     <option key={option.id} value={option.name}>
                                                         {option.name}
                                                     </option>
                                                 ))}
                                            </select>
                                        </span>

                                        <span className="ml-8">
                                          <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                            IsPercentage
                                          </h3>
                                             <select id="select" disabled={purpose === "view"} value={selectedPer} onChange={handlePercentageChange}
                                                     className="font-medium w-[300px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                                     style={{ width: '100%', padding: '14px', border: '1px solid #ccc', borderRadius: '4px' }}>
                                                 <option value={true}>True</option>
                                                 <option value={false}>False</option>
                                            </select>
                                        </span>

                                        <span className="ml-8">
                                          <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                            Loan Amount To
                                          </h3>
                                          <input
                                              type="text"
                                              value={depositTo}
                                              disabled={purpose === "view"}
                                              onChange={handleToChange}
                                              placeholder="Enter loan amount to"
                                              className="font-medium w-[300px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                          />
                                        </span>
                                    </div>
                                </div>
                                <div className="flex space-x-3 float-right my-4">
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

export default AddRegularLoanCharges;