import Layout from "../Layout.jsx";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {useAddStatusMutation} from "../../store/features/loanApplication/api.js";
import {updateSnackbar} from "../../store/snackbar/reducer.js";
import Search from "../../components/reusables/Search.jsx";
import {Button, Text} from "@chakra-ui/react";
import {Link as ReactLink} from "react-router-dom";
import LoanStatusTable from "../../components/loanApplication/loanStatus/LoanStatusTable.jsx";
import AddLoanStatusModal from "../../components/loanApplication/loanStatus/AddLoanStatusModal.jsx";
import RepaymentTable from "../../components/collection/repayment/RepaymentTable.jsx";

const Repayment = () => {
    const [open, setOpen] = useState(false)
    const [checked, setChecked] = useState(true);
    const [status, setStatus] = useState("")
    const dispatch = useDispatch()
    const [addStatus] = useAddStatusMutation()
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (searchValue) => {
        setSearchTerm(searchValue);
    };

    const handleOpen = () => {
        setOpen(true)
    }
    const handleAdd = ()=> {
        const user = JSON.parse(sessionStorage.getItem("userData"));

        addStatus({
            body: {
                name: status,
                status: checked ? "1" : "0",
                createdBy: user.FirstName
            }
        }).then(res => {
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: res.data.message,success:true}));
            setOpen(!open)
            setStatus("")
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
                    <RepaymentTable searchTerm={searchTerm} />
                </div>
                {/*<AddLoanStatusModal open={open} setOpen={setOpen} status={status} setStatus={setStatus} checked={checked} setChecked={setChecked} handleAdd={handleAdd}/>*/}
            </div>
        </Layout>
    );
};

export default Repayment;