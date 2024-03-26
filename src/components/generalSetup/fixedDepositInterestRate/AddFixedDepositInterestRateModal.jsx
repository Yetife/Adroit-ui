import * as Dialog from "@radix-ui/react-dialog";
import {Checkbox} from "@mui/material";
import {Close} from "@mui/icons-material";
import axios from "axios";
import {useEffect, useState} from "react";
import {getUserToken} from "../../../services/storage/index.js";

const AddFixedDepositInterestRateModal = ({open, setOpen, checked, setChecked, depositFrom, setDepositFrom, depositTo, setDepositTo, rate, setRate, selectedValue, setSelectedValue, purpose, handleAdd}) => {
   const [tenor, setTenor] = useState("")
    const token = getUserToken();

    // const formatNumber = (input) => {
    //     const fmt = input.replaceAll(",", '')
    //     setTargetAmount(fmt.replaceAll("₦ ", ""))
    //     const numericValue = input.replace(/[^0-9]/g, '');
    //     const formattedValue = "₦ " + numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    //     return formattedValue;
    // };
    //
    // const handleChange = (input) => {
    //     const formattedValue = formatNumber(input);
    //     setValueA(formattedValue);
    // };

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };
    const handleFromChange = (e) => {
        setDepositFrom(e.target.value)
    };
    const handleToChange = (e) => {
        setDepositTo(e.target.value)
    };
    const handleTenor = (e) => {
        setSelectedValue(e.target.value)
    };

    const fetchData = async () => {
        const baseUrl = import.meta.env.VITE_APP_BASE_URL
        try {
            const response = await axios.get(`${baseUrl}/GeneralSetUp/getallvalidFixedDepositTenors`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
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
    }, []);

    const numbersOnlyRegex =  /^[0-9]+(\.[0-9]*)?$/;

    const handleRateChange = (e) => {
        const userInput = e.target.value;

        if (numbersOnlyRegex.test(userInput) || userInput === "") {
            setRate(userInput);
        }
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
                    <Dialog.Content className="data-[state=open]:animate-contentShow z-[200] fixed top-[50%] left-[50%] max-h-[98vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[45px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                        <Dialog.Title className="text-[24px] text-[#343434] font-bold -mt-8">{purpose === "edit" ? "Edit" : purpose === "view" ? "View" : "Add"}</Dialog.Title>
                        {/*<Divider className="pt-4"/>*/}
                        <div className="mt-1">
                            <div>
                                <span className="ml-8">
                                  <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                    Loan Amount From
                                  </h3>
                                  <input
                                      type="number"
                                      value={depositFrom}
                                      disabled={purpose === "view"}
                                      onChange={handleFromChange}
                                      placeholder="Enter from amount"
                                      className="font-medium w-full text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                  />
                                </span>

                                <span className="ml-8 mt-4">
                                  <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                    Loan Amount To
                                  </h3>
                                  <input
                                      type="number"
                                      value={depositTo}
                                      disabled={purpose === "view"}
                                      onChange={handleToChange}
                                      placeholder="Enter to amount"
                                      className="font-medium w-full text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                  />
                                </span>

                                <span className="ml-8 mt-4">
                                  <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                    Interest Rate
                                  </h3>
                                  <input
                                      type="text"
                                      value={rate}
                                      disabled={purpose === "view"}
                                      onChange={handleRateChange}
                                      placeholder="Enter interest rate"
                                      className="font-medium w-full text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                  />
                                </span>
                                <span className="ml-8">
                                          <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                            Tenor
                                          </h3>
                                             <select id="select" value={selectedValue} onChange={handleTenor}
                                                     disabled={purpose === "view"}
                                                     style={{
                                                         width: '100%',
                                                         padding: '10px',
                                                         border: '1px solid #ccc',
                                                         borderRadius: '4px'
                                                     }}>
                                                <option value="" disabled>Select tenor</option>
                                                 {tenor && tenor?.map((option) => (
                                                     <option key={option.id} value={option.days}>
                                                         {option.days}
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
                                         sx={{
                                             '&.Mui-checked': {
                                                 color: "#00C796",
                                             },
                                         }}
                                         onChange={handleChange}
                                         inputProps={{'aria-label': 'controlled'}}
                                     />
                                </span>
                                </div>
                                <div className="flex space-x-3 float-right mt-4">
                                    <button className="bg-gray-300 rounded py-2 px-6 flex text-black"
                                            onClick={() => setOpen(!open)}>Close
                                    </button>
                                    {purpose !== "view" &&
                                        <button className="bg-[#00C796] rounded py-2 px-6 flex text-white "
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

export default AddFixedDepositInterestRateModal;