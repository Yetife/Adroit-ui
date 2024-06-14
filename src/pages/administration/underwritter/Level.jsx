import {Link as ReactLink} from "react-router-dom";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {useAddLevelMutation} from "../../../store/features/administration/api.js";
import {updateSnackbar} from "../../../store/snackbar/reducer.js";
import Layout from "../../Layout.jsx";
import Search from "../../../components/reusables/Search.jsx";
import {Button, Text} from "@chakra-ui/react";
import AddLevelModal from "../../../components/administration/underwritter/level/AddLevelModal.jsx";
import LevelTable from "../../../components/administration/underwritter/level/LevelTable.jsx";
import {getPermission} from "../../../components/reusables/getPermission.js";

const Level = () => {
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const [addLevel] = useAddLevelMutation()
    const [searchTerm, setSearchTerm] = useState("");
    const initialState = {
        name: "",
        minimumAmount: "",
        maximumAmount: "",
    }
    const [inputs, setInputs] = useState(initialState)
    const permissions = getPermission("Administration", "Underwriter_Level");

    const handleSearch = (searchValue) => {
        setSearchTerm(searchValue);
    };


    const handleOpen = () => {
        setOpen(true)
    }

    const handleAdd = ()=> {
        const user = JSON.parse(sessionStorage.getItem("userData"));
        addLevel({
            body: {
                name: inputs.name,
                minimuimAmount: inputs.minimumAmount,
                maximuimAmount: inputs.maximumAmount,
                createdby: user.FirstName + " " + user.LastName
            }
        }).then(res => {
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: res.data.message,success:true}));
            setOpen(!open)
            setInputs({})
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
                        {permissions.canAdd && <Button variant="primary" onClick={handleOpen} bgColor="#00C795" borderRadius="4px"
                                 height="37px" size='md' as={ReactLink} w={'109px'}>
                            <Text color="white">Add</Text>
                        </Button>}
                    </div>
                </div>
                <div>
                    <LevelTable searchTerm={searchTerm}/>
                </div>
                <AddLevelModal open={open} setOpen={setOpen} handleAdd={handleAdd} inputs={inputs} setInputs={setInputs} />
            </div>
        </Layout>
    );
};

export default Level;