import {useState} from 'react';
import {Link as ReactLink, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {updateSnackbar} from "../../store/snackbar/reducer.js";
import Layout from "../Layout.jsx";
import Search from "../../components/reusables/Search.jsx";
import {Button, Text} from "@chakra-ui/react";
import LgaTable from "../../components/generalSetup/LgaTable.jsx";
import AddLgaModal from "../../components/generalSetup/AddLgaModal.jsx";
import {useAddStateMutation} from "../../store/features/generalSetup/api.js";
import StateTable from "../../components/generalSetup/StateTable.jsx";
import AddStateModal from "../../components/generalSetup/AddStateModal.jsx";

const State = () => {
    const router = useNavigate()
    const [open, setOpen] = useState(false)
    const [checked, setChecked] = useState(true);
    const [state, setState] = useState("")
    const dispatch = useDispatch()
    const [addState] = useAddStateMutation()
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (searchValue) => {
        setSearchTerm(searchValue);
    };

    const handleOpen = () => {
        setOpen(true)
    }

    const handleAdd = ()=> {
        addState({
            body: {
                name: state,
                statusID: checked ? 1 : 0
            }
        }).then(res => {
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: res.data.message,success:true}));
            setOpen(!open)
            setState("")
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
                    <StateTable searchTerm={searchTerm}/>
                </div>
                <AddStateModal open={open} setOpen={setOpen} checked={checked} setChecked={setChecked} state={state} setState={setState} handleAdd={handleAdd}/>
            </div>
        </Layout>
    );
};

export default State;