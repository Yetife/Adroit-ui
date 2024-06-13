import {useState} from 'react';
import {Link as ReactLink, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {
    useAddFixedDepositInterestRateMutation
} from "../../store/features/generalSetup/api.js";
import {updateSnackbar} from "../../store/snackbar/reducer.js";
import Layout from "../Layout.jsx";
import Search from "../../components/reusables/Search.jsx";
import {Button, Text} from "@chakra-ui/react";
import FixedDepositInterestRateTable from "../../components/generalSetup/fixedDepositInterestRate/FixedDepositInterestRateTable.jsx";
import AddFixedDepositInterestRateModal from "../../components/generalSetup/fixedDepositInterestRate/AddFixedDepositInterestRateModal.jsx";
import {getPermission} from "../../components/reusables/getPermission.js";

const FixedDepositInterestRate = () => {
    const router = useNavigate()
    const [open, setOpen] = useState(false)
    const [checked, setChecked] = useState(true);
    const [depositFrom, setDepositFrom] = useState("")
    const [depositTo, setDepositTo] = useState("")
    const [selectedValue, setSelectedValue] = useState("")
    const [rate, setRate] = useState("")
    const dispatch = useDispatch()
    const [addInterestRate] = useAddFixedDepositInterestRateMutation()
    const [searchTerm, setSearchTerm] = useState("");
    const permissions = getPermission("General Setup", "General setup");

    const handleSearch = (searchValue) => {
        setSearchTerm(searchValue);
    };

    const handleOpen = () => {
        setOpen(true)
    }

    const handleAdd = ()=> {
        addInterestRate({
            body: {
                loanAmountFrom: parseFloat(depositFrom),
                loanAmountTo: parseFloat(depositTo),
                interestRate: rate,
                fixedDepositTenor: selectedValue,
                status: checked ? 1 : 0
            }
        }).then(res => {
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: res.data.message,success:true}));
            setOpen(!open)
            setDepositFrom("")
            setDepositTo("")
            setRate("")
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
                    <FixedDepositInterestRateTable searchTerm={searchTerm}/>
                </div>
                <AddFixedDepositInterestRateModal open={open} setOpen={setOpen} checked={checked} setChecked={setChecked} depositFrom={depositFrom}
                                                  setDepositFrom={setDepositFrom} depositTo={depositTo} setDepositTo={setDepositTo} rate={rate} setRate={setRate}
                                                  selectedValue={selectedValue} setSelectedValue={setSelectedValue} handleAdd={handleAdd}/>
            </div>
        </Layout>
    );
};

export default FixedDepositInterestRate;