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
import ProductsTable from "../../components/administration/products/ProductsTable.jsx";
import dayjs from "dayjs";
import {useAddProductMutation} from "../../store/features/administration/api.js";
import {getPermission} from "../../components/reusables/getPermission.js";

const Product = () => {
    const [open, setOpen] = useState(false)
    const [asEndDate, setAsEndDate] = useState(false)
    const [isOptInProcessingFee, setIsOptInProcessingFee] = useState(false)
    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch()
    const [addProduct] = useAddProductMutation()
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const initialState = {
        name: "",
        minimuimamount: 0,
        maximuimamount: 0,
        startDate: new Date(),
        endDate: new Date(),
        lateFeePrincipal: "",
        lateFeeType: "",
        fixedPrice: 0,
        gracePeriod: "",
        principal: 0,
        tenor: "",
        interestRate: "",
        feeFrequency: "",
    }
    const [inputs, setInputs] = useState(initialState)
    const permissions = getPermission("Administration", "Product");

    const handleSearch = (searchValue) => {
        setSearchTerm(searchValue);
    };
    const handleOpen = () => {
        setOpen(true)
    }

    const handleAdd = () => {
        const user = JSON.parse(sessionStorage.getItem("userData"));
        addProduct({
            body: {
                name: inputs.name,
                minimuimamount: inputs.minimumamount,
                maximuimamount: inputs.maximumamount,
                startdate: dayjs(inputs.startDate).format('YYYY-MM-DD'),
                enddate: asEndDate ? dayjs(inputs.endDate).format('YYYY-MM-DD') : "2000-01-01",
                lateFeePrincipal: inputs.lateFeePrincipal,
                lateFeeType: inputs.lateFeeType,
                fixedPrice: inputs.fixedPrice,
                gracePeriod: inputs.gracePeriod,
                principal: inputs.principal,
                tenor: inputs.tenor,
                interestRate: inputs.interestRate,
                isOptInProcessingFee: isOptInProcessingFee,
                asEndDate: asEndDate,
                feeFrequency: inputs.feeFrequency,
            }
        }).then(res => {
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: res.data.message,success:true}));
            setOpen(!open)
            setInputs({
                name: "",
                minimuimamount: 0,
                maximuimamount: 0,
                startDate: new Date(),
                endDate: new Date(),
                lateFeePrincipal: "",
                lateFeeType: "",
                fixedPrice: 0,
                gracePeriod: "",
                principal: 0,
                tenor: "",
                interestRate: "",
                feeFrequency: "",
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
                        {permissions.canAdd && <Button variant="primary" onClick={handleOpen} bgColor="#00C795" borderRadius="4px"
                                 height="37px" size='md' as={ReactLink} w={'109px'}>
                            <Text color="white">Add New</Text>
                        </Button>}
                    </div>
                </div>
                <div>
                    <ProductsTable searchTerm={searchTerm}/>
                </div>
                <ProductModal open={open} setOpen={setOpen} inputs={inputs} setInputs={setInputs} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}
                              asEndDate={asEndDate} setAsEndDate={setAsEndDate} setIsOptInProcessingFee={setIsOptInProcessingFee} purpose="add" isOptInProcessingFee={isOptInProcessingFee} handleAdd={handleAdd}/>
            </div>
        </Layout>
    );
};

export default Product;