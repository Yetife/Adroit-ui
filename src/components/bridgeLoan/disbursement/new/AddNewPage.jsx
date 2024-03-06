import Layout from "../../../../pages/Layout.jsx";
import {Link as ReactLink, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {getUserToken} from "../../../../services/storage/index.js";
import {useAddDisbursementMutation} from "../../../../store/features/bridgeLoan/api.js";
import {updateSnackbar} from "../../../../store/snackbar/reducer.js";
import {useDispatch} from "react-redux";
import {fetchProcessed} from "../../../../store/documentationSlice.js";
import {MuiTelInput} from "mui-tel-input";

const AddNewPage = () => {
    const router = useNavigate()
    const [gender, setGender] = useState([])
    const [selectedGender, setSelectedGender] = useState("")
    const [selectedId, setSelectedId] = useState('');
    const [phone, setPhone] = useState("");
    const initialState = {
        surname: "",
        firstName: "",
        middleName: "",
        email: "",
        houseNo: "",
        streetName: "",
        city: "",
        state: "",
        date: "",
        bvn: "",
        idNo: "",
        idDate: "",
        transferAmt: "",
        narration: "",
        repayment: "",
        phoneNumber: "",
    }
    const [inputs, setInputs] = useState(initialState)
    const dispatch  = useDispatch()
    const [addDisbursement] = useAddDisbursementMutation()
    const token = getUserToken();

    const handleChange = (e, fieldName, isNumeric = false) => {
        const value = e.target.value;
        if (fieldName === "bvn"){
            const numericRegex = /^\d{0,11}$/;

            if ((isNumeric && numericRegex.test(value)) || !isNumeric) {
                setInputs((values) => ({ ...values, [fieldName]: value }));
            }
        }else {
            setInputs((values) => ({...values, [fieldName]: value}))
        }
    };
    const handleGenderChange = (event) => {
        const selectedOption = event.target.value;
        const selectedOptionObject = gender.find((option) => option.name === selectedOption);

        setSelectedGender(selectedOption);
        setSelectedId(selectedOptionObject ? selectedOptionObject.id : '');
    };

    const fetchGender = async () => {
        const baseUrl = import.meta.env.VITE_APP_BASE_URL
        try {
            const response = await axios.get(`${baseUrl}/GeneralSetUp/getallvalidGenders`, {
                headers: {
                    'Content-Type': "application/json",
                    'Accept': "application/json",
                    'XAPIKEY': import.meta.env.VITE_APP_ENCRYPTION_KEY,
                    'authorization': `Bearer ${token}`
                }
            });
            setGender(response.data.data);
            console.log('Fetched state:', response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchGender();
    }, []);

    const handlePhoneChange = (e, isNumeric= false) => {
        const numericRegex = /^\d{0,11}$/;
        if ((isNumeric && numericRegex.test(e.target.value)) || !isNumeric) {
            setPhone(e.target.value)
        }
    }
    const handleAdd = () => {
        const user = JSON.parse(sessionStorage.getItem("userData"));

        addDisbursement({
            body: {
                surname: inputs.surname,
                firstname: inputs.firstName,
                middlename: inputs.middleName,
                email: inputs.email,
                gender: selectedGender,
                houseNo: inputs.houseNo,
                streetName: inputs.streetName,
                city: inputs.city,
                state: inputs.state,
                dob: inputs.date,
                bvn: inputs.bvn,
                idNo: inputs.idNo,
                idDateIssued: inputs.idDate,
                phoneno: phone,
                transferAmount: inputs.transferAmt,
                preferredNaration: inputs.narration,
                repaymentDate: inputs.repayment,
                createdBy: user.FirstName,

            }
        }).then(res => {
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: res.data.message,success:true}));
            router('/bridgeLoan/disbursement/new')
            dispatch(fetchProcessed())

        }).catch(err =>{
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message:err.data.message,success:false}));
        })
    }
    return (
        <Layout>
            <div className="flex space-x-3 float-right mb-4">
                <button className="bg-[#00C796] rounded py-2 px-10 flex text-white mt-2"
                        onClick={()=>router(-1)}>Back
                </button>
            </div>
            <div
                className="scroll-container inline-block w-full align-middle c-border shadow sm:rounded-lg mt-8 pl-8">
                <div className="py-12">
                    <div className="flex">
                        <span>
                          <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                            Surname
                          </h3>
                          <input
                              type="text"
                              value={inputs.surname}
                              onChange={(event) => handleChange(event, "surname")}
                              placeholder="Enter surname"
                              className="font-medium w-[220px] text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                          />
                        </span>
                        <span className="ml-8">
                          <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                            First Name
                          </h3>
                          <input
                              type="text"
                              value={inputs.firstName}
                              onChange={(event) => handleChange(event, "firstName")}
                              placeholder="Enter firstName"
                              className="font-medium w-[220px] text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                          />
                        </span>
                        <span className="ml-8">
                          <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                            Middle Name
                          </h3>
                          <input
                              type="text"
                              value={inputs.middleName}
                              onChange={(event) => handleChange(event, "middleName")}
                              placeholder="Enter middleName"
                              className="font-medium w-[220px] text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                          />
                        </span>
                        <span className="ml-8">
                          <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                            Email Address
                          </h3>
                          <input
                              type="text"
                              value={inputs.email}
                              onChange={(event) => handleChange(event, "email")}
                              placeholder="Enter name"
                              className="font-medium w-[220px] text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                          />
                        </span>
                    </div>
                </div>
                <div className="pb-12">
                    <div className="flex">
                     <span>
                          <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                           Gender
                          </h3>
                             <select id="select" value={selectedGender}
                                     onChange={handleGenderChange}
                                     className="font-medium w-[220px] text-black leading-relaxed px-4 py-2 h-[52px] rounded  border border-neutral-300 justify-between items-center gap-4 flex">
                                <option value="" disabled>Select gender</option>
                                 {gender && gender?.map((option) => (
                                     <option key={option.uniqueId} value={option.name}>
                                         {option.name}
                                     </option>
                                 ))}
                            </select>
                        </span>
                        <span className="ml-8">
                          <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                            House No.
                          </h3>
                          <input
                              type="text"
                              value={inputs.houseNo}
                              onChange={(event) => handleChange(event, "houseNo")}
                              placeholder="Enter house number"
                              className="font-medium w-[220px] text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                          />
                        </span>
                        <span className="ml-8">
                          <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                            Street Name
                          </h3>
                          <input
                              type="text"
                              value={inputs.streetName}
                              onChange={(event) => handleChange(event, "streetName")}
                              placeholder="Enter street name"
                              className="font-medium w-[220px] text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                          />
                        </span>
                        <span className="ml-8">
                          <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                            City
                          </h3>
                          <input
                              type="text"
                              value={inputs.city}
                              onChange={(event) => handleChange(event, "city")}
                              placeholder="Enter city"
                              className="font-medium w-[220px] text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                          />
                        </span>
                    </div>
                </div>
                <div className="pb-12">
                    <div className="flex">
                    <span>
                      <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                        State
                      </h3>
                      <input
                          type="text"
                          value={inputs.state}
                          onChange={(event) => handleChange(event, "state")}
                          placeholder="Enter state"
                          className="font-medium w-[220px] text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                      />
                    </span>
                        <span className="ml-8">
                          <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                            Date Of Birth
                          </h3>
                           <input
                               type="date"
                               value={inputs.date}
                               onChange={(event) => handleChange(event, "date")}
                               placeholder="Enter date"
                               className="font-medium w-[220px] text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300"
                           />
                        </span>
                        <span className="ml-8">
                          <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                            BVN
                          </h3>
                          <input
                              type="number"
                              value={inputs.bvn}
                              onChange={(event) => handleChange(event, "bvn", true)}
                              placeholder="Enter bvn"
                              className="font-medium w-[220px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                          />
                        </span>
                        <span className="ml-8">
                          <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                            ID No. (International Passport Only)
                          </h3>
                          <input
                              type="text"
                              value={inputs.idNo}
                              onChange={(event) => handleChange(event, "idNo")}
                              placeholder="Enter id number"
                              className="font-medium w-[235px] text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                          />
                        </span>
                    </div>
                </div>
                <div className="pb-8">
                    <div className="flex">
                        <span>
                          <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                            ID Date issued
                          </h3>
                          <input
                              type="date"
                              value={inputs.idDate}
                              onChange={(event) => handleChange(event, "idDate")}
                              placeholder="Enter id date"
                              className="font-medium w-[220px] text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                          />
                        </span>
                        <span className="ml-8">
                          <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                            Transfer Amount
                          </h3>
                          <input
                              type="text"
                              value={inputs.transferAmt}
                              onChange={(event) => handleChange(event, "transferAmt")}
                              placeholder="Enter transfer amount"
                              className="font-medium w-[220px] text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                          />
                        </span>
                        <span className="ml-8">
                          <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                            Preferred Narration
                          </h3>
                          <input
                              type="text"
                              value={inputs.narration}
                              onChange={(event) => handleChange(event, "narration")}
                              placeholder="Enter preferred narration"
                              className="font-medium w-[220px] text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                          />
                        </span>
                        <span className="ml-8">
                          <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                            Repayment Date
                          </h3>
                          <input
                              type="date"
                              value={inputs.repayment}
                              onChange={(event) => handleChange(event, "repayment")}
                              placeholder="Enter repayment date"
                              className="font-medium w-[220px] text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300"
                          />
                        </span>
                    </div>
                    <div className="mt-8">
                        <span>
                            <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                Phone Number
                            </h3>
                              <input
                                  type="number"
                                  value={phone}
                                  onChange={(e) => handlePhoneChange(e, true)}
                                  placeholder="Enter phone"
                                  className="font-medium w-[220px] text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                              />
                        </span>
                    </div>

                </div>
            </div>
            <div className="flex space-x-3 float-right mb-6">
                <button className="bg-[#00C796] rounded py-2 px-10 flex text-white mt-8"
                        onClick={handleAdd}>Add
                </button>
            </div>
        </Layout>
    );
};

export default AddNewPage;