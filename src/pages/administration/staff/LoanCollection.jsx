import {useState} from 'react';
import {useDispatch} from "react-redux";
import {useAddLoanTenorMutation} from "../../../store/features/administration/api.js";
import {updateSnackbar} from "../../../store/snackbar/reducer.js";
import Layout from "../../Layout.jsx";
import {Button, Text} from "@chakra-ui/react";
import {Link as ReactLink} from "react-router-dom";
import StaffLoanTable from "../../../components/administration/staff/StaffLoanTable.jsx";
import AddLoanTenorModal from "../../../components/administration/loanTenor/AddLoanTenorModal.jsx";

const LoanCollection = () => {
    const [open, setOpen] = useState(false)
    const [checked, setChecked] = useState(true);
    const [tenor, setTenor] = useState("")
    const dispatch = useDispatch()
    const [addTenor] = useAddLoanTenorMutation()
    const handleOpen = () => {
        setOpen(true)
    }

    const handleAdd = ()=> {
        addTenor({
            body: {
                name: tenor,
                statusID: checked ? 1 : 0
            }
        }).then(res => {
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: res.data.message,success:true}));
            setOpen(!open)
            setTenor("")
        }).catch(err =>{
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message:err.data.message,success:false}));
        })
    }
    return (
        <Layout>
            <div className="px-2">
                <div className="flex justify-between px-0 py-4  pb-2 md:pt-3">
                    <div></div>
                    <div>
                        <Button variant="primary" onClick={handleOpen} bgColor="#00C795" borderRadius="4px" height="37px" size='md' as={ReactLink} w={'109px'}>
                            <Text color="white">Filter</Text>
                        </Button>
                    </div>
                </div>
                <div>
                    <StaffLoanTable />
                </div>
                <AddLoanTenorModal open={open} setOpen={setOpen} handleAdd={handleAdd} tenor={tenor} setTenor={setTenor} checked={checked} setChecked={setChecked}/>
            </div>
        </Layout>
    );
};

export default LoanCollection;