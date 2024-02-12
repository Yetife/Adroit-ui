import {Link as ReactLink, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {useAddResidentialStatusMutation} from "../../store/features/generalSetup/api.js";
import {updateSnackbar} from "../../store/snackbar/reducer.js";
import Layout from "../Layout.jsx";
import Search from "../../components/reusables/Search.jsx";
import {Button, Text} from "@chakra-ui/react";
import OrganizationTable from "../../components/generalSetup/organization/OrganizationTable.jsx";
import AddOrganizationModal from "../../components/generalSetup/organization/AddOrganizationModal.jsx";
import AddResidentialStatusModal from "../../components/generalSetup/residentialStatus/AddResidentialStatusModal.jsx";
import ResidentialStatusTable from "../../components/generalSetup/residentialStatus/ResidentialStatusTable.jsx";

const ResidentialStatus = () => {
    const router = useNavigate()
    const [open, setOpen] = useState(false)
    const [checked, setChecked] = useState(true);
    const [residential, setResidential] = useState("")
    const dispatch = useDispatch()
    const [addResidential] = useAddResidentialStatusMutation()
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (searchValue) => {
        setSearchTerm(searchValue);
    };

    const handleOpen = () => {
        setOpen(true)
    }

    const handleAdd = ()=> {
        addResidential({
            body: {
                name: residential,
                statusID: checked ? 1 : 0
            }
        }).then(res => {
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: res.data.message,success:true}));
            setOpen(!open)
            setResidential("")
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
                    <ResidentialStatusTable searchTerm={searchTerm}/>
                </div>
                <AddResidentialStatusModal open={open} setOpen={setOpen} checked={checked} setChecked={setChecked} residential={residential} setResidential={setResidential} handleAdd={handleAdd}/>
            </div>
        </Layout>
    );
};

export default ResidentialStatus;