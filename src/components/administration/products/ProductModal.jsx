import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {getUserToken} from "../../../services/storage/index.js";
import axios from "axios";
import {updateSnackbar} from "../../../store/snackbar/reducer.js";
import * as Dialog from "@radix-ui/react-dialog";
import {Close} from "@mui/icons-material";
import DatePicker from "react-datepicker";
import {Checkbox, Divider} from "@mui/material";
import {useAddProductMutation} from "../../../store/features/administration/api.js";
import dayjs from "dayjs";

const ProductModal = ({open, setOpen, inputs, setInputs, id, status, startDate, setStartDate, endDate, setEndDate, asEndDate, setAsEndDate, selectedGender, isOptInProcessingFee, setIsOptInProcessingFee, selectedTenor, setSelectedTenor, purpose, handleAdd}) => {
    const [tenor, setTenor] = useState([])
    const [gender, setGender] = useState([])
    const [feeType, setFeeType] = useState([])
    const [feeFreq, setFeeFreq] = useState([])
    const [feePrincipal, setFeePrincipal] = useState([])
    const [rate, setRate] = useState([])
    const dispatch  = useDispatch()
    const token = getUserToken();
    const handleChecked = (event) => {
        setAsEndDate(event.target.checked);
    };
    const handleFeeChecked = (event) => {
        setIsOptInProcessingFee(event.target.checked);
    };
    const handleChange = (e, fieldName) => {
        const value = e.target.value;
        setInputs((values) => ({...values, [fieldName]: value}))
    };

    const handleGenderChange = (event) => {
        const selectedOption = event.target.value;
        const selectedOptionObject = tenor.find((option) => option.name === selectedOption);

        setSelectedTenor(selectedOption);
    };

    const fetchTenor = async () => {
        try {
            const response = await axios.get('http://prananettech-001-site27.ftempurl.com/api/Administration/LoanTenor/getallvalidLoanTenors', {
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
    const fetchInterest = async () => {
        try {
            const response = await axios.get('http://prananettech-001-site27.ftempurl.com/api/GeneralSetUp/getallvalidRegularLoanInterestRate', {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'XAPIKEY': '_*-+pgH7QzFH%^&!Jx4w46**fI@@#5Uzi4RvtTwlEXp_!*',
                    'authorization': `Bearer ${token}`
                }
            });
            setRate(response.data.data);
            console.log('Fetched state:', response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const fetchFeeType = async () => {
        try {
            const response = await axios.get('http://prananettech-001-site27.ftempurl.com/api/GeneralSetUp/getallvalidLateFeeTypes', {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'XAPIKEY': '_*-+pgH7QzFH%^&!Jx4w46**fI@@#5Uzi4RvtTwlEXp_!*',
                    'authorization': `Bearer ${token}`
                }
            });
            setFeeType(response.data.data);
            console.log('Fetched state:', response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const fetchFeePrincipal = async () => {
        try {
            const response = await axios.get('http://prananettech-001-site27.ftempurl.com/api/GeneralSetUp/getallvalidLateFeePrincipals', {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'XAPIKEY': '_*-+pgH7QzFH%^&!Jx4w46**fI@@#5Uzi4RvtTwlEXp_!*',
                    'authorization': `Bearer ${token}`
                }
            });
            setFeePrincipal(response.data.data);
            console.log('Fetched state:', response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
const fetchFeeFrequency = async () => {
        try {
            const response = await axios.get('http://prananettech-001-site27.ftempurl.com/api/GeneralSetUp/getallvalidFeeFrequencys', {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'XAPIKEY': '_*-+pgH7QzFH%^&!Jx4w46**fI@@#5Uzi4RvtTwlEXp_!*',
                    'authorization': `Bearer ${token}`
                }
            });
            setFeeFreq(response.data.data);
            console.log('Fetched state:', response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchTenor();
        fetchInterest()
        fetchFeeType()
        fetchFeePrincipal()
        fetchFeeFrequency()
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
                    <Dialog.Content className="data-[state=open]:animate-contentShow z-[200] fixed top-[50%] left-[50%] max-h-[99vh] w-[90vw] max-w-[900px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[45px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                        <Dialog.Title className="text-[24px] text-[#343434] font-bold -mt-8">Add Product</Dialog.Title>
                        {/*<Divider className="pt-4"/>*/}
                        <div className="mt-2">
                            <div className="py-4">
                                <div className="flex">
                                    <span>
                                      <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                        Product Name
                                      </h3>
                                      <input
                                          disabled={purpose === "view"}
                                          type="text"
                                          value={inputs.name}
                                          onChange={(event) => handleChange(event, "name")}
                                          placeholder="Enter name"
                                          className="font-medium w-[245px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                      />
                                    </span>
                                    <span className="ml-8">
                                      <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                        Amount (Start From)
                                      </h3>
                                      <input
                                          disabled={purpose === "view"}
                                          type="number"
                                          value={inputs.minimumamount}
                                          onChange={(event) => handleChange(event, "minimumamount")}
                                          placeholder="Enter Amount From"
                                          className="font-medium w-[245px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                      />
                                    </span>
                                    <span className="ml-8">
                                      <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                        Amount (To)
                                      </h3>
                                      <input
                                          type="number"
                                          disabled={purpose === "view"}
                                          value={inputs.maximumamount}
                                          onChange={(event) => handleChange(event, "maximumamount")}
                                          placeholder="Enter Amount to"
                                          className="font-medium w-[245px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                      />
                                    </span>
                                </div>
                            </div>
                            <div className="pb-4">
                                <div className="flex">
                                    <span>
                                      <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                        Tenor
                                      </h3>
                                      <select id="select" value={inputs.tenor}
                                              disabled={purpose === "view"}
                                              onChange={(event) => handleChange(event, "tenor")}
                                              className="font-medium w-[245px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex">
                                            <option value="" disabled>Select tenor</option>
                                          {tenor && tenor?.map((option) => (
                                              <option key={option.uniqueId} value={option.name}>
                                                  {option.name}
                                              </option>
                                          ))}
                                        </select>
                                    </span>
                                    <span className="ml-8">
                                      <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                       Start Date
                                      </h3>
                                         <input
                                             type="date"
                                             disabled={purpose === "view"}
                                             value={inputs.startDate}
                                             onChange={(event) => handleChange(event, "startDate")}
                                             placeholder="Enter start date"
                                             className="font-medium w-[300px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                         />
                                         {/*<DatePicker*/}
                                         {/*    className='border broder-gray-700 px-2 rounded-md py-3 text-[14px] focus:outline-none'*/}
                                         {/*    // closeOnScroll={true}*/}
                                         {/*    dateFormat="dd/MM/yyyy"*/}
                                         {/*    placeholderText="Select a date"*/}
                                         {/*    disabled={purpose === "view"}*/}
                                         {/*    selected={startDate}*/}
                                         {/*    onChange={(date) => setStartDate(date)}*/}
                                         {/*    showYearDropdown*/}
                                         {/*    showMonthDropdown*/}
                                         {/*    showDisabledMonthNavigation*/}
                                         {/*    dropdownMode="select"*/}
                                         {/*/>*/}
                                    </span>
                                    <span className="flex items-center ml-16 mt-4">
                                   <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap">
                                        Has End Date
                                    </h3>
                                     <Checkbox
                                         checked={asEndDate}
                                         disabled={purpose === "view"}
                                         sx={{
                                             '&.Mui-checked': {
                                                 color: "#00C796",
                                             },
                                         }}
                                         onChange={handleChecked}
                                         inputProps={{'aria-label': 'controlled'}}
                                     />
                                </span>
                                </div>
                            </div>
                            <div className="flex pb-4">
                                <span>
                                      <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                        Interest Rate
                                      </h3>
                                      <select id="select" value={inputs.interestRate}
                                              disabled={purpose === "view"}
                                              onChange={(event) => handleChange(event, "interestRate")}
                                              className="font-medium w-[245px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex">
                                            <option value="" disabled>Select interest rate</option>
                                          {rate && rate?.map((option) => (
                                              <option key={option.uniqueId} value={option.interestRate}>
                                                  {option.interestRate}
                                              </option>
                                          ))}
                                        </select>
                                    </span>
                                {
                                    asEndDate && (
                                        <span className="ml-8">
                                          <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                           End Date
                                          </h3>
                                            <input
                                                disabled={purpose === "view"}
                                                type="date"
                                                value={inputs.endDate}
                                                onChange={(event) => handleChange(event, "endDate")}
                                                placeholder="Enter start date"
                                                className="font-medium w-[300px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                            />
                                         {/*<DatePicker*/}
                                         {/*    className='border broder-gray-700  px-2 rounded-md py-3 text-[14px] focus:outline-none'*/}
                                         {/*    // closeOnScroll={true}*/}
                                         {/*    dateFormat="dd/MM/yyyy"*/}
                                         {/*    placeholderText="Select a date"*/}
                                         {/*    disabled={purpose === "view"}*/}
                                         {/*    selected={endDate}*/}
                                         {/*    onChange={(date) => setEndDate(date)}*/}
                                         {/*    showYearDropdown*/}
                                         {/*    showMonthDropdown*/}
                                         {/*    showDisabledMonthNavigation*/}
                                         {/*    dropdownMode="select"*/}
                                         {/*/>*/}
                                    </span>
                                    )
                                }
                            </div>
                            <Divider/>
                            <div className="pt-4">
                                <p className="font-[700] text-[#4A5D58] text-[16px] whitespace-nowrap">Loan
                                    Processing Fees</p>
                                <span className="flex items-center -ml-3">
                                     <Checkbox
                                         checked={isOptInProcessingFee}
                                         disabled={purpose === "view"}
                                         sx={{
                                             '&.Mui-checked': {
                                                 color: "#00C796",
                                             },
                                         }}
                                         onChange={handleFeeChecked}
                                         inputProps={{'aria-label': 'controlled'}}
                                     />
                                    <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap">
                                        Opt in loan processing fee
                                    </h3>
                                </span>
                                <div className="flex my-6">
                                    <span>
                                      <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                        Fixed Price
                                      </h3>
                                       <div className="input-container">
                                          <span className="percent-sign">NGN</span>
                                          <input
                                              disabled={purpose === "view"}
                                              type="text"
                                              className="percent-input font-medium w-[245px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                              value={inputs.fixedPrice}
                                              onChange={(event) => handleChange(event, "fixedPrice")}
                                          />
                                        </div>
                                    </span>
                                    <span className="ml-8">
                                      <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                        Principal
                                      </h3>
                                       <div className="input-container">
                                          <span className="percent-sign">%</span>
                                          <input
                                              disabled={purpose === "view"}
                                              type="text"
                                              className="percent-input font-medium w-[245px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                              value={inputs.principal}
                                              onChange={(event) => handleChange(event, "principal")}
                                              placeholder="Enter the fixed amount"
                                          />
                                        </div>
                                    </span>
                                </div>
                            </div>
                            <Divider/>
                            <div className="pt-4">
                                <p className="font-[700] text-[#4A5D58] text-[16px] whitespace-nowrap">Late fees (
                                    Penalties)</p>
                                <div className="flex my-6">
                                     <span>
                                      <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                        Late Fee Type
                                      </h3>
                                      <select id="select" value={inputs.lateFeeType}
                                              disabled={purpose === "view"}
                                              onChange={(event) => handleChange(event, "lateFeeType")}
                                              className="font-medium w-[245px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex">
                                            <option value="" disabled>Select fee type</option>
                                          {feeType && feeType?.map((option) => (
                                              <option key={option.uniqueId} value={option.name}>
                                                  {option.name}
                                              </option>
                                          ))}
                                        </select>
                                    </span>
                                    <span className="ml-8">
                                      <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                        Fixed Price
                                      </h3>
                                       <div className="input-container">
                                          <span className="percent-sign">NGN</span>
                                          <input
                                              disabled={purpose === "view"}
                                              type="text"
                                              className="percent-input font-medium w-[245px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                              value={inputs.fixedPrice}
                                              onChange={(event) => handleChange(event, "fixedPrice")}
                                          />
                                        </div>
                                    </span>
                                    <span className="ml-8">
                                      <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                        Late Fee Principal
                                      </h3>
                                      <select id="select" value={inputs.lateFeePrincipal}
                                              disabled={purpose === "view"}
                                              onChange={(event) => handleChange(event, "lateFeePrincipal")}
                                              className="font-medium w-[245px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex">
                                            <option value="" disabled>Select fee principal</option>
                                          {feePrincipal && feePrincipal?.map((option) => (
                                              <option key={option.uniqueId} value={option.name}>
                                                  {option.name}
                                              </option>
                                          ))}
                                        </select>
                                    </span>
                                </div>
                                <div className="flex my-6">
                                    <span>
                                      <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                        Grace period before late fees apply
                                      </h3>
                                      <input
                                          type="text"
                                          disabled={purpose === "view"}
                                          value={inputs.gracePeriod}
                                          onChange={(event) => handleChange(event, "gracePeriod")}
                                          placeholder="Enter the text"
                                          className="font-medium w-[345px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                      />
                                    </span>
                                    <span className="ml-8">
                                      <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                        Fee Frequency
                                      </h3>
                                      <select id="select" value={inputs.feeFrequency}
                                              disabled={purpose === "view"}
                                              onChange={(event) => handleChange(event, "feeFrequency")}
                                              className="font-medium w-[420px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex">
                                            <option value="" disabled>Select fee frequency</option>
                                          {feeFreq && feeFreq?.map((option) => (
                                              <option key={option.uniqueId} value={option.name}>
                                                  {option.name}
                                              </option>
                                          ))}
                                        </select>
                                    </span>
                                </div>
                            </div>
                            <div className="flex space-x-3 float-right">
                                <button className="bg-gray-300 rounded py-2 px-6 flex text-black mt-2"
                                        onClick={() => setOpen(!open)}>Close
                                </button>
                                {purpose !== "view" && <button className="bg-[#00C796] rounded py-2 px-12 flex text-white mt-2"
                                         onClick={handleAdd}>Save
                                </button>}
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

export default ProductModal;