import {Link as ReactLink, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {useAddResidencyMutation} from "../../store/features/generalSetup/api.js";
import {updateSnackbar} from "../../store/snackbar/reducer.js";
import Layout from "../Layout.jsx";
import Search from "../../components/reusables/Search.jsx";
import {Button, Text} from "@chakra-ui/react";
import DependentsTable from "../../components/generalSetup/noOfDependents/DependentsTable.jsx";
import AddResidentModal from "../../components/generalSetup/residency/AddResidentModal.jsx";
import ResidencyTable from "../../components/generalSetup/residency/ResidencyTable.jsx";

const Residency = () => {
    const router = useNavigate()
    const [open, setOpen] = useState(false)
    const [checked, setChecked] = useState(true);
    const [resident, setResident] = useState("")
    const dispatch = useDispatch()
    const [addResidency] = useAddResidencyMutation()

    const handleOpen = () => {
        setOpen(true)
    }

    const handleAdd = ()=> {
        addResidency({
            body: {
                name: resident,
                statusID: checked ? 1 : 0
            }
        }).then(res => {
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: res.data.message,success:true}));
            setOpen(!open)
            setResident("")
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
                    <ResidencyTable />
                </div>
                <AddResidentModal open={open} setOpen={setOpen} checked={checked} setChecked={setChecked} resident={resident} setResident={setResident} handleAdd={handleAdd}/>
            </div>
        </Layout>
    );
};

export default Residency;