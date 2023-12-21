import {useState} from 'react';
import {useDispatch} from "react-redux";
import {useAddDocumentSetupMutation} from "../../store/features/bridgeLoan/api.js";
import {updateSnackbar} from "../../store/snackbar/reducer.js";
import Layout from "../Layout.jsx";
import Search from "../../components/reusables/Search.jsx";
import {Button, Text} from "@chakra-ui/react";
import {Link as ReactLink} from "react-router-dom";
import DocumentationSetupTable from "../../components/bridgeLoan/documentationSetup/DocumentationSetupTable.jsx";
import AddDocumentationSetupModal from "../../components/bridgeLoan/documentationSetup/AddDocumentationSetupModal.jsx";

const Product = () => {
    const [open, setOpen] = useState(false)
    const [docName, setDocName] = useState("")
    const [checked, setChecked] = useState(true)
    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch()
    const [addSetup] = useAddDocumentSetupMutation()

    const handleSearch = (searchValue) => {
        setSearchTerm(searchValue);
    };
    const handleOpen = () => {
        setOpen(true)
    }

    const handleAdd = ()=> {
        addSetup({
            body: {
                name: docName,
                status: checked ? "1" : "0"
            }
        }).then(res => {
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: res.data.message,success:true}));
            setOpen(!open)
            setDocName("")
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
                            <Text color="white">Add New</Text>
                        </Button>
                    </div>
                </div>
                <div>
                    <DocumentationSetupTable searchTerm={searchTerm}/>
                </div>
                <AddDocumentationSetupModal open={open} setOpen={setOpen} checked={checked} setChecked={setChecked} docName={docName} setDocName={setDocName}  handleAdd={handleAdd}/>
            </div>
        </Layout>
    );
};

export default Product;