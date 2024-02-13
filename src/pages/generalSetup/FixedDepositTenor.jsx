import  {useState} from 'react';
import {Link as ReactLink, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useAddFixedDepositTenorMutation} from "../../store/features/generalSetup/api.js";
import {updateSnackbar} from "../../store/snackbar/reducer.js";
import Layout from "../Layout.jsx";
import Search from "../../components/reusables/Search.jsx";
import {Button, Text} from "@chakra-ui/react";
import AddFixedDepositTenorModal from "../../components/generalSetup/fixedDepositTenor/AddFixedDepositTenorModal.jsx";
import FixedDepositTenorTable from "../../components/generalSetup/fixedDepositTenor/FixedDepositTenorTable.jsx";

const FixedDepositTenor = () => {
    const router = useNavigate()
    const [open, setOpen] = useState(false)
    const [checked, setChecked] = useState(true);
    const [tenorName, setTenorName] = useState("")
    const [tenorDesc, setTenorDesc] = useState("")
    const [tenorCode, setTenorCode] = useState("")
    const [tenorDays, setTenorDays] = useState("")
    const dispatch = useDispatch()
    const [addTenor] = useAddFixedDepositTenorMutation()
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (searchValue) => {
        setSearchTerm(searchValue);
    };

    const handleOpen = () => {
        setOpen(true)
    }

    const handleAdd = ()=> {
        addTenor({
            body: {
                name: tenorName,
                code: tenorCode,
                description: tenorDesc,
                days: tenorDays,
                status: checked ? 1 : 0
            }
        }).then(res => {
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: res.data.message,success:true}));
            setOpen(!open)
            setTenorName("")
            setTenorCode("")
            setTenorDays("")
            setTenorDesc("")
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
                    <FixedDepositTenorTable searchTerm={searchTerm}/>
                </div>
                <AddFixedDepositTenorModal open={open} setOpen={setOpen} checked={checked} setChecked={setChecked} tenorName={tenorName} setTenorName={setTenorName} tenorCode={tenorCode} setTenorCode={setTenorCode} tenorDesc={tenorDesc}
                                           setTenorDesc={setTenorDesc} tenorDays={tenorDays} setTenorDays={setTenorDays} handleAdd={handleAdd}/>
            </div>
        </Layout>
    );
};

export default FixedDepositTenor;