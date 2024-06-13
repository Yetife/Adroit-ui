import Layout from "../Layout.jsx";
import Search from "../../components/reusables/Search.jsx";
import {Button, Text} from "@chakra-ui/react";
import {Link as ReactLink, useNavigate} from "react-router-dom";
import BankTable from "../../components/generalSetup/bank/BankTable.jsx";
import {useState} from "react";
import AddBankModal from "../../components/generalSetup/bank/AddBankModal.jsx";
import {updateSnackbar} from "../../store/snackbar/reducer.js";
import {useDispatch} from "react-redux";
import {useAddBanksMutation} from "../../store/features/generalSetup/api.js";
import {getPermission} from "../../components/reusables/getPermission.js";

const Bank = () => {
    const router = useNavigate()
    const [open, setOpen] = useState(false)
    const [checked, setChecked] = useState(true);
    const [bankName, setBankName] = useState("")
    const [bankCode, setBankCode] = useState("")
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const [addBanks] = useAddBanksMutation()
    const [searchTerm, setSearchTerm] = useState("");
    // const permissions = getPermission("General Setup", "General setup");
    const permissions = getPermission("General Setup", "General setup");

    if (permissions) {
        console.log("Permissions for 'Customer' page in 'Loan Application' module:", permissions);
    } else {
        console.log("Permissions not found");
    }

    const handleSearch = (searchValue) => {
        setSearchTerm(searchValue);
    };

    const handleOpen = () => {
        setOpen(true)
    }
    const handleAdd = ()=> {
        console.log("addd")
        setLoading(true)
        addBanks({
            body: {
                name: bankName,
                bankCode: bankCode,
                statusID: checked ? 1 : 0
            }
        }).then(res => {
            console.log(bankName)
            console.log(checked)
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: res.data.message,success:true}));
            setLoading(false)
            setOpen(!open)
            setBankName("")
            setBankCode("")
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
                        <Button variant="outline" borderColor="#00C795" marginRight="10px"
                                border={"1px solid #00C796"}  borderRadius="4px" height="37px"
                                size='md' as={ReactLink} w={'109px'} onClick={()=>router(-1)}>
                            <Text color="#00C795">Back</Text>
                        </Button>
                        {permissions.canAdd && <Button variant="primary" onClick={handleOpen} bgColor="#00C795" borderRadius="4px"
                                 height="37px" size='md' as={ReactLink} w={'109px'}>
                            <Text color="white">Add</Text>
                        </Button>}
                    </div>
                </div>
                <div>
                    <BankTable searchTerm={searchTerm}/>
                </div>
                <AddBankModal open={open} setOpen={setOpen} checked={checked} setChecked={setChecked} bankName={bankName}
                              setBankName={setBankName} bankCode={bankCode} setBankCode={setBankCode} handleAdd={handleAdd} loading={loading} setLoading={setLoading}/>
            </div>
        </Layout>
    );
};

export default Bank;