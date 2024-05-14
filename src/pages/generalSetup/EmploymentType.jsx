import {Link as ReactLink, useNavigate} from "react-router-dom";
import {useState} from "react";
import Layout from "../Layout.jsx";
import Search from "../../components/reusables/Search.jsx";
import {Button, Text} from "@chakra-ui/react";
import EmploymentTypeTable from "../../components/generalSetup/employmentType/EmploymentTypeTable.jsx";
import AddEmploymentTypeModal from "../../components/generalSetup/employmentType/AddEmploymentTypeModal.jsx";
import {updateSnackbar} from "../../store/snackbar/reducer.js";
import {useAddEmploymentTypeMutation} from "../../store/features/generalSetup/api.js";
import {useDispatch} from "react-redux";

const EmploymentType = () => {
    const router = useNavigate()
    const [open, setOpen] = useState(false)
    const [checked, setChecked] = useState(true);
    const [type, setType] = useState("")
    const dispatch = useDispatch()
    const [addEmploymentType] = useAddEmploymentTypeMutation()
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);


    const handleSearch = (searchValue) => {
        setSearchTerm(searchValue);
    };

    const handleOpen = () => {
        setOpen(true)
    }
    const handleAdd = ()=> {
        setLoading(true)
        addEmploymentType({
            body: {
                name: type,
                statusID: checked ? 1 : 0
            }
        }).then(res => {
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: res.data.message,success:true}));
            setOpen(!open)
            setLoading(false)
            setType("")
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
                    <EmploymentTypeTable searchTerm={searchTerm}/>
                </div>
                <AddEmploymentTypeModal open={open} setOpen={setOpen} checked={checked} setChecked={setChecked} type={type} setType={setType} loading={loading} setLoading={setLoading} handleAdd={handleAdd}/>
            </div>
        </Layout>
    );
};

export default EmploymentType;