import {Link as ReactLink, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {updateSnackbar} from "../../../store/snackbar/reducer.js";
import Layout from "../../Layout.jsx";
import Search from "../../../components/reusables/Search.jsx";
import {Button, Text} from "@chakra-ui/react";
import {useAddFacilityTypeMutation} from "../../../store/features/bridgeLoan/api.js";
import TenorTable from "../../../components/bridgeLoan/generalSetup/tenor/TenorTable.jsx";
import AddFacilityTypeModal from "../../../components/bridgeLoan/generalSetup/facilityType/AddFacilityTypeModal.jsx";
import FacilityTypeTable from "../../../components/bridgeLoan/generalSetup/facilityType/FacilityTypeTable.jsx";

const FacilityType = () => {
    const router = useNavigate()
    const [open, setOpen] = useState(false)
    const [checked, setChecked] = useState(true);
    const [type, setType] = useState("")
    const dispatch = useDispatch()
    const [searchTerm, setSearchTerm] = useState("");
    const [addFacility] = useAddFacilityTypeMutation()

    const handleOpen = () => {
        setOpen(true)
    }

    const handleSearch = (searchValue) => {
        setSearchTerm(searchValue);
    };
    const handleAdd = ()=> {
        addFacility({
            body: {
                name: type,
                status: checked ? "1" : "0"
            }
        }).then(res => {
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: res.data.message,success:true}));
            setOpen(!open)
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
                    <FacilityTypeTable searchTerm={searchTerm}/>
                </div>
                <AddFacilityTypeModal open={open} setOpen={setOpen} checked={checked} setChecked={setChecked} type={type} setType={setType} handleAdd={handleAdd}/>
            </div>
        </Layout>
    );
};

export default FacilityType;