import {useState} from 'react';
import {Link as ReactLink, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useAddInterestRateMutation} from "../../../store/features/bridgeLoan/api.js";
import {updateSnackbar} from "../../../store/snackbar/reducer.js";
import Layout from "../../Layout.jsx";
import Search from "../../../components/reusables/Search.jsx";
import {Button, Text} from "@chakra-ui/react";
import AddInterestRateModal from "../../../components/bridgeLoan/generalSetup/interestRate/AddInterestRateModal.jsx";
import InterestRateTable from "../../../components/bridgeLoan/generalSetup/interestRate/InterestRateTable.jsx";
import {getPermission} from "../../../components/reusables/getPermission.js";

const InterestRate = () => {
    const router = useNavigate()
    const [open, setOpen] = useState(false)
    const [checked, setChecked] = useState(true);
    const [rate, setRate] = useState("")
    const dispatch = useDispatch()
    const [searchTerm, setSearchTerm] = useState("");
    const [addTenor] = useAddInterestRateMutation()
    const permissions = getPermission("Bridge Loan", "General_Setup");

    const handleOpen = () => {
        setOpen(true)
    }

    const handleSearch = (searchValue) => {
        setSearchTerm(searchValue);
    };
    const handleAdd = ()=> {
        const user = JSON.parse(sessionStorage.getItem("userData"));
        addTenor({
            body: {
                name: rate,
                createdBy: user.FirstName + " " +  user.LastName,
                status: checked ? "1" : "0"
            }
        }).then(res => {
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: res.data.message,success:true}));
            setOpen(!open)
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
                    <InterestRateTable searchTerm={searchTerm}/>
                </div>
                <AddInterestRateModal open={open} setOpen={setOpen} checked={checked} setChecked={setChecked} rate={rate} setRate={setRate} handleAdd={handleAdd}/>
            </div>
        </Layout>
    );
};

export default InterestRate;