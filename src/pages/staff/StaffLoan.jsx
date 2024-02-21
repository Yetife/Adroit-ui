import {useState} from 'react';
import {useDispatch} from "react-redux";
import {updateSnackbar} from "../../store/snackbar/reducer.js";
import Layout from "../Layout.jsx";
import {Button, Text} from "@chakra-ui/react";
import {Link as ReactLink} from "react-router-dom";
import StaffTable from "../../components/staff/StaffTable.jsx";
import StaffRequestLoanModal from "../../components/staff/StaffRequestLoanModal.jsx";
import FilterStaff from "../../components/staff/FilterStaff.jsx";
import {useAddStaffLoanMutation} from "../../store/features/staff/api.js";

const StaffLoan = () => {
    const [open, setOpen] = useState(false)
    const [openStaff, setOpenStaff] = useState(false)
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [inputs, setInputs] = useState({
        tenor: "",
        type: "",
        amount: 0,
        interestRate: 0,
        startDate: null,
        endDate: null,
        purpose: ""
    })

    const dispatch = useDispatch()
    const [addStaffLoan] = useAddStaffLoanMutation()
    const handleOpen = () => {
        setOpen(true)
    }

    const handleAdd = ()=> {
        const user = JSON.parse(sessionStorage.getItem("userData"));
        addStaffLoan({
            body: {
                staffId: user.UserId,
                personalEmail: user.email,
                officialEmail: user.email,
                firstName: user.FirstName,
                lastName: user.LastName,
                phoneNumber: "",
                interestRate: inputs.interestRate,
                loanType: inputs.type,
                loanAmount: inputs.amount,
                loanTenorid: inputs.tenor,
                startDate: startDate,
                endDate: endDate,
                purpose: inputs.purpose
            }
        }).then(res => {
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: res.data.message,success:true}));
            setOpenStaff(!openStaff)
            setInputs({
                tenor: 0,
                type: "",
                amount: 0,
                interestRate: 0,
                startDate: null,
                endDate: null,
                purpose: ""
            })
        }).catch(err =>{
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message:err.data.message,success:false}));
        })
    }

    const [filters, setFilters] = useState({
        applicationId: "",
        statusName: "",
        startDate: "",
        endDate: "",
    });

    const handleFilter = (newFilters) => {
        setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
    };

    return (
        <Layout>
            <div className="px-2">
                <div className="flex justify-between px-0 py-4  pb-2 md:pt-3">
                    <div></div>
                    <div className="flex">
                        <Button variant="primary" onClick={handleOpen} bgColor="#00C795" borderRadius="4px" height="37px" size='md' as={ReactLink} w={'109px'}>
                            <Text color="white">Filter</Text>
                        </Button>
                        <div className="ml-3">
                            <Button variant="primary" onClick={()=>setOpenStaff(true)} bgColor="#FFC327" borderRadius="4px" height="37px" size='md' as={ReactLink} w={'170px'}>
                                <Text color="white">Request a Loan</Text>
                            </Button>
                        </div>
                    </div>
                </div>
                <div>
                    <StaffTable applicationId={filters.applicationId} statusName={filters.statusName}
                                startDate={filters.startDate} endDate={filters.endDate} />
                </div>
                <StaffRequestLoanModal open={openStaff} setOpen={setOpenStaff} setInputs={setInputs} inputs={inputs}
                                       handleAdd={handleAdd} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}/>
                <FilterStaff open={open} setOpen={setOpen} handleFilter={handleFilter}/>
            </div>
        </Layout>
    );
};

export default StaffLoan;