import {Link as ReactLink, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {updateSnackbar} from "../../../store/snackbar/reducer.js";
import Layout from "../../Layout.jsx";
import Search from "../../../components/reusables/Search.jsx";
import {Button, Text} from "@chakra-ui/react";
import AddTenorModal from "../../../components/bridgeLoan/generalSetup/tenor/AddTenorModal.jsx";
import TenorTable from "../../../components/bridgeLoan/generalSetup/tenor/TenorTable.jsx";
import {useAddTenorMutation} from "../../../store/features/bridgeLoan/api.js";

const Tenor = () => {
    const router = useNavigate()
    const [open, setOpen] = useState(false)
    const [checked, setChecked] = useState(true);
    const [tenor, setTenor] = useState("")
    const dispatch = useDispatch()
    const [searchTerm, setSearchTerm] = useState("");
    const [addTenor] = useAddTenorMutation()

    const handleOpen = () => {
        setOpen(true)
    }

    const handleSearch = (searchValue) => {
        setSearchTerm(searchValue);
    };
    const handleAdd = ()=> {
        addTenor({
            body: {
                name: tenor,
                status: checked ? "1" : "0"
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
                        <Button variant="outline" borderColor="#00C795" marginRight="10px"
                                border={"1px solid #00C796"}  borderRadius="4px" height="37px"
                                size='md' as={ReactLink} w={'109px'} onClick={()=>router(-1)}>
                            <Text color="#00C795">Back</Text>
                        </Button>
                        <Button variant="primary" onClick={handleOpen} bgColor="#00C795" borderRadius="4px" height="37px" size='md' as={ReactLink} w={'109px'}>
                            <Text color="white">Add</Text>
                        </Button>
                    </div>
                </div>
                <div>
                    <TenorTable searchTerm={searchTerm}/>
                </div>
                <AddTenorModal open={open} setOpen={setOpen} checked={checked} setChecked={setChecked} tenor={tenor} setTenor={setTenor} handleAdd={handleAdd}/>
            </div>
        </Layout>
    );
};

export default Tenor;