import {useState} from 'react';
import {useDispatch} from "react-redux";
import {useAddDocumentSetupMutation} from "../../store/features/bridgeLoan/api.js";
import {updateSnackbar} from "../../store/snackbar/reducer.js";
import Layout from "../Layout.jsx";
import Search from "../../components/reusables/Search.jsx";
import {Button, Text} from "@chakra-ui/react";
import {Link as ReactLink} from "react-router-dom";
import DocumentationSetupTable from "../../components/bridgeLoan/documentationSetup/DocumentationSetupTable.jsx";
import ProductModal from "../../components/administration/products/ProductModal.jsx";

const Product = () => {
    const [open, setOpen] = useState(false)
    const [docName, setDocName] = useState("")
    const [asEndDate, setAsEndDate] = useState(false)
    const [isOptInProcessingFee, setIsOptInProcessingFee] = useState(false)
    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch()
    const [addSetup] = useAddDocumentSetupMutation()
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState("");
    const initialState = {
        name: "",
        minimumamount: 0,
        maximumamount: 0,
        startDate: new Date(),
        endDate: new Date(),
        lateFeePrincipal: "",
        fixedPrice: 0,
        gracePeriod: "",
        principal: 0,
        tenor: "",
        interestRate: "",
    }
    const [inputs, setInputs] = useState(initialState)

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
                <ProductModal open={open} setOpen={setOpen} inputs={inputs} setInputs={setInputs} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}
                              asEndDate={asEndDate} setAsEndDate={setAsEndDate} setIsOptInProcessingFee={setIsOptInProcessingFee} isOptInProcessingFee={isOptInProcessingFee} handleAdd={handleAdd}/>
            </div>
        </Layout>
    );
};

export default Product;