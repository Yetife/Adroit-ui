import {useState} from "react";
import Layout from "../Layout.jsx";
import Search from "../../components/reusables/Search.jsx";
import {Button, Text} from "@chakra-ui/react";
import {Link as ReactLink} from "react-router-dom";
import DocumentationSetupTable from "../../components/bridgeLoan/documentationSetup/DocumentationSetupTable.jsx";
import AddDocumentModal from "../../components/bridgeLoan/documentation/AddDocumentModal.jsx";
import DocumentationTable from "../../components/bridgeLoan/documentation/documentationTable.jsx";

const Documentation = () => {
    const [open, setOpen] = useState(false)
    const [selectedType, setSelectedType] = useState("")
    const [selectedTenor, setSelectedTenor] = useState("")
    const [selectedFiles, setSelectedFiles] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState("")
    const [searchTerm, setSearchTerm] = useState("");
    const initialState = {
        lender: "",
        obName: "",
        dateOfBirth: null,
        valueDate: null,
        maturityDate: null,
        comment: "",
    }
    const [inputs, setInputs] = useState(initialState)

    const handleSearch = (searchValue) => {
        setSearchTerm(searchValue);
    };
    const handleOpen = () => {
        setOpen(true)
    }

    // const handleAdd = async ()=> {
    //     try {
    //         const user = JSON.parse(sessionStorage.getItem("userData"));
    //
    //         const formData = new FormData();
    //         formData.append('Lender', inputs.lender);
    //         formData.append('ObligorName', inputs.obName);
    //         formData.append('ObligorDob', inputs.dateOfBirth);
    //         formData.append('FacilityType', selectedType)
    //         formData.append('InterestRate', selectedType);
    //         formData.append('DocumentationStatus', selectedStatus);
    //         formData.append('ValueDate', inputs.valueDate);
    //         formData.append('MaturityDate', inputs.maturityDate);
    //         formData.append('Comment', inputs.comment);
    //         formData.append('CreatedBy', user.FirstName);
    //         // ... other form data
    //         const token = getUserToken();
    //         const baseUrl = import.meta.env.VITE_APP_BASE_URL;
    //
    //         const res = await fetch(`${baseUrl}/BridgeLoan/Documentation/add`, {
    //             method: 'POST',
    //             body: formData,
    //             headers: {
    //                 'Accept': 'multipart/form-data',
    //                 'XApiKey': import.meta.env.VITE_APP_ENCRYPTION_KEY,
    //                 // 'Content-Type': 'multipart/form-data',
    //                 'Authorization': `Bearer ${token}`
    //             },
    //         });
    //
    //         if (res.status === 200) {
    //             // File uploaded successfully, handle the response
    //             const data = await res.json();
    //             console.log('File uploaded:', data);
    //         }
    //         dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: res.data.message,success:true}));
    //     } catch (error) {
    //         dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message:error.data.message,success:false}));
    //     }
    // }
    //     addSetup({
    //         body: {
    //             name: docName,
    //             status: checked ? "1" : "0"
    //         }
    //     }).then(res => {
    //         dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: res.data.message,success:true}));
    //         setOpen(!open)
    //         setDocName("")
    //     }).catch(err =>{
    //         dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message:err.data.message,success:false}));
    //     })

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
                    <DocumentationTable searchTerm={searchTerm}/>
                </div>
                <AddDocumentModal open={open} setOpen={setOpen} inputs={inputs} setInputs={setInputs} setSelectedType={setSelectedType} selectedType={selectedType} selectedStatus={selectedStatus}
                                  setSelectedStatus={setSelectedStatus} selectedTenor={selectedTenor} setSelectedTenor={setSelectedTenor} selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} />
            </div>
        </Layout>
    );
};

export default Documentation;