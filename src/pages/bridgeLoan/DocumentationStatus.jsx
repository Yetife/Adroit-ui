import {useState} from "react";
import {useDispatch} from "react-redux";
import {useAddDocumentStatusMutation} from "../../store/features/bridgeLoan/api.js";
import {updateSnackbar} from "../../store/snackbar/reducer.js";
import Layout from "../Layout.jsx";
import Search from "../../components/reusables/Search.jsx";
import {Button, Text} from "@chakra-ui/react";
import {Link as ReactLink} from "react-router-dom";
import AddDocumentationStatusModal
    from "../../components/bridgeLoan/documentationStatus/AddDocumentationStatusModal.jsx";
import DocumentationStatusTable from "../../components/bridgeLoan/documentationStatus/DocumentationStatusTable.jsx";

const DocumentationStatus = () => {
    const [open, setOpen] = useState(false)
    const [docStatus, setDocStatus] = useState("")
    const [checked, setChecked] = useState(true)
    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch()
    const [addSetup] = useAddDocumentStatusMutation()

    const handleSearch = (searchValue) => {
        setSearchTerm(searchValue);
    };
    const handleOpen = () => {
        setOpen(true)
    }

    const handleAdd = ()=> {
        const user = JSON.parse(sessionStorage.getItem("userData"));
        addSetup({
            body: {
                name: docStatus,
                createdBy: user.FirstName,
                status: checked ? "1" : "0"
            }
        }).then(res => {
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: res.data.message,success:true}));
            setOpen(!open)
            setDocStatus("")
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
                    <DocumentationStatusTable searchTerm={searchTerm}/>
                </div>
                <AddDocumentationStatusModal open={open} setOpen={setOpen} checked={checked} setChecked={setChecked} docStatus={docStatus} setDocStatus={setDocStatus} handleAdd={handleAdd}/>
            </div>
        </Layout>
    );
};

export default DocumentationStatus;