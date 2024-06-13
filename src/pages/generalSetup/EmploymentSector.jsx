import {Link as ReactLink, useNavigate} from "react-router-dom";
import {useState} from "react";
import Layout from "../Layout.jsx";
import Search from "../../components/reusables/Search.jsx";
import {Button, Text} from "@chakra-ui/react";
import EmploymentSectorTable from "../../components/generalSetup/employmentSector/EmploymentSectorTable.jsx";
import AddEmploymentSectorModal from "../../components/generalSetup/employmentSector/AddEmploymentSectorModal.jsx";
import {updateSnackbar} from "../../store/snackbar/reducer.js";
import {useDispatch} from "react-redux";
import {useAddEmploymentSectorMutation} from "../../store/features/generalSetup/api.js";
import {getPermission} from "../../components/reusables/getPermission.js";

const EmploymentSector = () => {
    const router = useNavigate()
    const [open, setOpen] = useState(false)
    const [checked, setChecked] = useState(true);
    const dispatch = useDispatch()
    const [sector, setSector] = useState("")
    const [addEmploymentSector] = useAddEmploymentSectorMutation()
    const [searchTerm, setSearchTerm] = useState("");
    const permissions = getPermission("General Setup", "General setup");


    const handleSearch = (searchValue) => {
        setSearchTerm(searchValue);
    };

    const handleOpen = () => {
        setOpen(true)
    }
    const handleAdd = ()=> {
        addEmploymentSector({
            body: {
                name: sector,
                statusID: checked ? 1 : 0
            }
        }).then(res => {
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: res.data.message,success:true}));
            setOpen(!open)
            setSector("")
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
                    <EmploymentSectorTable searchTerm={searchTerm}/>
                </div>
                <AddEmploymentSectorModal open={open} setOpen={setOpen} checked={checked} setChecked={setChecked} sector={sector} setSector={setSector} handleAdd={handleAdd}/>
            </div>
        </Layout>
    );
};

export default EmploymentSector;