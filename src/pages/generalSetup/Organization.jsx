import {Link as ReactLink, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {useAddOrganizationMutation} from "../../store/features/generalSetup/api.js";
import {updateSnackbar} from "../../store/snackbar/reducer.js";
import Layout from "../Layout.jsx";
import Search from "../../components/reusables/Search.jsx";
import {Button, Text} from "@chakra-ui/react";
import AddOrganizationModal from "../../components/generalSetup/organization/AddOrganizationModal.jsx";
import OrganizationTable from "../../components/generalSetup/organization/OrganizationTable.jsx";

const Organization = () => {
    const router = useNavigate()
    const [open, setOpen] = useState(false)
    const [checked, setChecked] = useState(true);
    const [organization, setOrganization] = useState("")
    const dispatch = useDispatch()
    const [addOrganization] = useAddOrganizationMutation()

    const handleOpen = () => {
        setOpen(true)
    }

    const handleAdd = ()=> {
        addOrganization({
            body: {
                name: organization,
                statusID: checked ? 1 : 0
            }
        }).then(res => {
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: res.data.message,success:true}));
            setOpen(!open)
            setOrganization("")
        }).catch(err =>{
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message:err.data.message,success:false}));
        })
    }
    return (
        <Layout>
            <div className="px-2">
                <div className="flex justify-between px-0 py-4  pb-2 md:pt-3">
                    <Search />
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
                    <OrganizationTable />
                </div>
                <AddOrganizationModal open={open} setOpen={setOpen} checked={checked} setChecked={setChecked} organization={organization} setOrganization={setOrganization} handleAdd={handleAdd}/>
            </div>
        </Layout>
    );
};

export default Organization;