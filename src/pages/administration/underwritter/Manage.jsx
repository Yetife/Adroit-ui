import   {useState} from 'react';
import {useDispatch} from "react-redux";
import { useAddManageMutation} from "../../../store/features/administration/api.js";
import {updateSnackbar} from "../../../store/snackbar/reducer.js";
import Layout from "../../Layout.jsx";
import Search from "../../../components/reusables/Search.jsx";
import {Button, Text} from "@chakra-ui/react";
import {Link as ReactLink} from "react-router-dom";
import LevelTable from "../../../components/administration/underwritter/level/LevelTable.jsx";
import AddManageModal from "../../../components/administration/underwritter/manage/AddManageModal.jsx";
import ManageTable from "../../../components/administration/underwritter/manage/ManageTable.jsx";

const Manage = () => {
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const [addLevel] =  useAddManageMutation()
    const [searchTerm, setSearchTerm] = useState("");
    const initialState = {
        staff: "",
        firstName: "",
        lastName: "",
        emailAddress: "",
        middleName: "",
        phoneNumber: "",
        level: "",
    }
    const [inputs, setInputs] = useState(initialState)

    const handleSearch = (searchValue) => {
        setSearchTerm(searchValue);
    };


    const handleOpen = () => {
        setOpen(true)
    }

    const handleAdd = ()=> {
        addLevel({
            body: {
                firstName: inputs.firstName,
                lastName: inputs.lastName,
                emailAddress: inputs.emailAddress,
                middleName: inputs.middleName,
                phoneNumber: inputs.phoneNumber,
                level: inputs.level,
            }
        }).then(res => {
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: res.data.message,success:true}));
            setOpen(!open)
            setInputs({
                staff: "",
                firstName: "",
                lastName: "",
                emailAddress: "",
                middleName: "",
                phoneNumber: "",
                level: "",
            })
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
                        <Button variant="primary" onClick={handleOpen} bgColor="#00C795" borderRadius="4px" height="37px" size='md' as={ReactLink} w={'109px'}>
                            <Text color="white">Add</Text>
                        </Button>
                    </div>
                </div>
                <div>
                    <ManageTable searchTerm={searchTerm}/>
                </div>
                <AddManageModal open={open} setOpen={setOpen} handleAdd={handleAdd} inputs={inputs} setInputs={setInputs} />
            </div>
        </Layout>
    );
};

export default Manage;