import {useState} from 'react';
import {Link as ReactLink, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useAddGenderMutation} from "../../../store/features/generalSetup/api.js";
import {updateSnackbar} from "../../../store/snackbar/reducer.js";
import Layout from "../../Layout.jsx";
import Search from "../../../components/reusables/Search.jsx";
import {Button, Text} from "@chakra-ui/react";
import GenderTable from "../../../components/generalSetup/gender/GenderTable.jsx";
import AddGenderModal from "../../../components/generalSetup/gender/AddGenderModal.jsx";
import DocumentationStagesTable
    from "../../../components/bridgeLoan/generalSetup/documentationStages/DocumentationStagesTable.jsx";
import AddDocumentStagesModal
    from "../../../components/bridgeLoan/generalSetup/documentationStages/AddDocumentStagesModal.jsx";
import search from "../../../components/reusables/Search.jsx";
import {useAddDocumentationStageMutation} from "../../../store/features/bridgeLoan/api.js";

const DocumentStages = () => {
    const router = useNavigate()
    const [open, setOpen] = useState(false)
    const [checked, setChecked] = useState(true);
    const [stages, setStages] = useState("")
    const dispatch = useDispatch()
    const [searchTerm, setSearchTerm] = useState("");
    const [addStages] = useAddDocumentationStageMutation()

    const handleOpen = () => {
        setOpen(true)
    }

    const handleSearch = (searchValue) => {
        setSearchTerm(searchValue);
    };
    const handleAdd = ()=> {
        const user = JSON.parse(sessionStorage.getItem("userData"));
        addStages({
            body: {
                name: stages,
                createdBy: user.FirstName + " " +  user.LastName,
                status: checked ? "1" : "0"
            }
        }).then(res => {
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: res.data.message,success:true}));
            setOpen(!open)
            setStages("")
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
                    <DocumentationStagesTable searchTerm={searchTerm}/>
                </div>
                <AddDocumentStagesModal open={open} setOpen={setOpen} stages={stages} setStages={setStages} checked={checked} setChecked={setChecked} handleAdd={handleAdd}/>
            </div>
        </Layout>
    );
};

export default DocumentStages;