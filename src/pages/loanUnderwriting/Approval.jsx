import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {useAddGenderMutation} from "../../store/features/generalSetup/api.js";
import {updateSnackbar} from "../../store/snackbar/reducer.js";
import Layout from "../Layout.jsx";
import Search from "../../components/reusables/Search.jsx";
import {Button, Text} from "@chakra-ui/react";
import {Link as ReactLink} from "react-router-dom";
import CustomerTable from "../../components/loanApplication/customer/CustomerTable.jsx";
import FilterCustomer from "../../components/loanApplication/customer/FilterCustomer.jsx";
import ApprovalTable from "../../components/loanUnderwritting/approval/ApprovalTable.jsx";
import FilterApproval from "../../components/loanUnderwritting/approval/FilterApproval.jsx";

const Approval = () => {
    const [open, setOpen] = useState(false)
    const [checked, setChecked] = useState(true);
    const initialState = {
        applicationId: "",
        email: "",
        bvn: "",
        status: "",
        startDate: "",
        endDate: "",
    }
    const [inputs, setInputs] = useState(initialState)
    const dispatch = useDispatch()
    const [addStatus] = useAddGenderMutation()
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (searchValue) => {
        setSearchTerm(searchValue);
    };

    const handleOpen = () => {
        setOpen(true)
    }
    const handleAdd = ()=> {
        addStatus({
            body: {
                name: status,
                statusID: checked ? 1 : 0
            }
        }).then(res => {
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: res.data.message,success:true}));
            setOpen(!open)
        }).catch(err =>{
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message:err.data.message,success:false}));
        })
    }
    return (
        <Layout>
            <div className="px-2">
                <div className="flex justify-between px-0 py-4  pb-2 md:pt-3">
                    <Search search={searchTerm} setSearch={handleSearch}/>
                    <div>
                        <Button variant="primary" onClick={handleOpen} bgColor="#00C795" borderRadius="4px" height="37px" size='md' as={ReactLink} w={'109px'}>
                            <Text color="white">Filter</Text>
                        </Button>
                    </div>
                </div>
                <div>
                    <ApprovalTable searchTerm={searchTerm} />
                </div>
                <FilterApproval open={open} setOpen={setOpen} handleAdd={handleAdd}/>
            </div>
        </Layout>
    );
};

export default Approval;