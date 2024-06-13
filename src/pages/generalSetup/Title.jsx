import {useState} from 'react';
import {Link as ReactLink, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useAddTitleMutation} from "../../store/features/generalSetup/api.js";
import {updateSnackbar} from "../../store/snackbar/reducer.js";
import Layout from "../Layout.jsx";
import Search from "../../components/reusables/Search.jsx";
import {Button, Text} from "@chakra-ui/react";
import AddTitleModal from "../../components/generalSetup/title/AddTitleModal.jsx";
import TitleTable from "../../components/generalSetup/title/TitleTable.jsx";
import {getPermission} from "../../components/reusables/getPermission.js";

const Title = () => {
    const router = useNavigate()
    const [open, setOpen] = useState(false)
    const [checked, setChecked] = useState(true);
    const [title, setTitle] = useState("")
    const dispatch = useDispatch()
    const [addTitle] = useAddTitleMutation()
    const [searchTerm, setSearchTerm] = useState("");
    const permissions = getPermission("General Setup", "General setup");

    const handleSearch = (searchValue) => {
        setSearchTerm(searchValue);
    };

    const handleOpen = () => {
        setOpen(true)
    }

    const handleAdd = ()=> {
        addTitle({
            body: {
                name: title,
                statusID: checked ? 1 : 0
            }
        }).then(res => {
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: res.data.message,success:true}));
            setOpen(!open)
            setTitle("")
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
                    <TitleTable searchTerm={searchTerm}/>
                </div>
                <AddTitleModal open={open} setOpen={setOpen} checked={checked} setChecked={setChecked} title={title} setTitle={setTitle} handleAdd={handleAdd}/>
            </div>
        </Layout>
    );
};

export default Title;