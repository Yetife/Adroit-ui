import {Link as ReactLink, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {updateSnackbar} from "../../store/snackbar/reducer.js";
import Layout from "../Layout.jsx";
import Search from "../../components/reusables/Search.jsx";
import {Button, Text} from "@chakra-ui/react";
import AddLoanTenorModal from "../../components/administration/loanTenor/AddLoanTenorModal.jsx";
import {useAddLoanTenorMutation} from "../../store/features/administration/api.js";
import LoanTenorTable from "../../components/administration/loanTenor/LoanTenorTable.jsx";

const LoanTenor = () => {
    const router = useNavigate()
    const [open, setOpen] = useState(false)
    const [checked, setChecked] = useState(true);
    const [tenor, setTenor] = useState("")
    const dispatch = useDispatch()
    const [addTenor] = useAddLoanTenorMutation()
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (searchValue) => {
        setSearchTerm(searchValue);
    };


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
                    <Search search={searchTerm} setSearch={handleSearch}/>
                    <div>
                        <Button variant="primary" onClick={handleOpen} bgColor="#00C795" borderRadius="4px" height="37px" size='md' as={ReactLink} w={'109px'}>
                            <Text color="white">Add</Text>
                        </Button>
                    </div>
                </div>
                <div>
                    <LoanTenorTable searchTerm={searchTerm}/>
                </div>
                <AddLoanTenorModal open={open} setOpen={setOpen} handleAdd={handleAdd} tenor={tenor} setTenor={setTenor} checked={checked} setChecked={setChecked}/>
            </div>
        </Layout>
    );
};

export default LoanTenor;