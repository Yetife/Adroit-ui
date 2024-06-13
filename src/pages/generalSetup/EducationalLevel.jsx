import {Link as ReactLink, useNavigate} from "react-router-dom";
import {useState} from "react";
import Layout from "../Layout.jsx";
import Search from "../../components/reusables/Search.jsx";
import {Button, Text} from "@chakra-ui/react";
import EducationalLevelTable from "../../components/generalSetup/educationalLevel/EducationalLevelTable.jsx";
import AddEducationLevelModal from "../../components/generalSetup/educationalLevel/AddEducationLevelModal.jsx";
import {updateSnackbar} from "../../store/snackbar/reducer.js";
import {useDispatch} from "react-redux";
import {useAddEducationalLevelMutation} from "../../store/features/generalSetup/api.js";
import {getPermission} from "../../components/reusables/getPermission.js";

const EducationalLevel = () => {
    const router = useNavigate()
    const [open, setOpen] = useState(false)
    const [checked, setChecked] = useState(true);
    const [level, setLevel] = useState("")
    const dispatch = useDispatch()
    const [addEducationalLevel] = useAddEducationalLevelMutation()
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const permissions = getPermission("General Setup", "General setup");


    const handleSearch = (searchValue) => {
        setSearchTerm(searchValue);
    };

    const handleOpen = () => {
        setOpen(true)
    }
    const handleAdd = ()=> {
        setLoading(true)
        addEducationalLevel({
            body: {
                name: level,
                statusID: checked ? 1 : 0
            }
        }).then(res => {
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: res.data.message,success:true}));
            setOpen(!open)
            setLoading(false)
            setLevel("")
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
                    <EducationalLevelTable searchTerm={searchTerm}/>
                </div>
                <AddEducationLevelModal open={open} setOpen={setOpen} level={level} setLevel={setLevel} checked={checked} setChecked={setChecked}
                                       loading={loading} setLoading={setLoading} handleAdd={handleAdd}/>
            </div>
        </Layout>
    );
};

export default EducationalLevel;
