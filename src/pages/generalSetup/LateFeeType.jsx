import {Link as ReactLink, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {useAddLateFeeTypesMutation, useAddMaritalStatusMutation} from "../../store/features/generalSetup/api.js";
import {updateSnackbar} from "../../store/snackbar/reducer.js";
import Layout from "../Layout.jsx";
import Search from "../../components/reusables/Search.jsx";
import {Button, Text} from "@chakra-ui/react";
import AddLateFeeTypeModal from "../../components/generalSetup/lateFeeType/AddLateFeeTypeModal.jsx";
import LateFeeTypeTable from "../../components/generalSetup/lateFeeType/LateFeeTypeTable.jsx";

const LateFeeType = () => {
    const router = useNavigate()
    const [open, setOpen] = useState(false)
    const [checked, setChecked] = useState(true);
    const [feeType, setFeeType] = useState("")
    const dispatch = useDispatch()
    const [addStatus] = useAddLateFeeTypesMutation()
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (searchValue) => {
        setSearchTerm(searchValue);
    };


    const handleOpen = () => {
        setOpen(true)
    }

    const handleAdd = ()=> {
        addStatus({
            body: {
                name: feeType,
                statusID: checked ? 1 : 0
            }
        }).then(res => {
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: res.data.message,success:true}));
            setOpen(!open)
            setFeeType("")
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
                    <LateFeeTypeTable searchTerm={searchTerm}/>
                </div>
                <AddLateFeeTypeModal open={open} setOpen={setOpen} handleAdd={handleAdd} feeType={feeType} setFeeType={setFeeType} checked={checked} setChecked={setChecked}/>
            </div>
        </Layout>
    );
};

export default LateFeeType;