import {useState} from 'react';
import {Link as ReactLink, useNavigate} from "react-router-dom";
import Layout from "../Layout.jsx";
import Search from "../../components/reusables/Search.jsx";
import {Button, Text} from "@chakra-ui/react";
import AddRegularLoanChargeModal from "../../components/generalSetup/regularLoanCharges/AddRegularLoanChargeModal.jsx";
import RegularLoanChargesTable from "../../components/generalSetup/regularLoanCharges/RegularLoanChargesTable.jsx";

const RegularLoanCharges = () => {
    const router = useNavigate()
    const [open, setOpen] = useState(false)
    const [checked, setChecked] = useState(true);
    const [depositFrom, setDepositFrom] = useState("")
    const [selectedValue, setSelectedValue] = useState('');
    const [selectedLoan, setSelectedLoan] = useState('');
    const [depositTo, setDepositTo] = useState("")
    const [cAmount, setCAmount] = useState('')
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPer, setSelectedPer] = useState("");


    const handleSearch = (searchValue) => {
        setSearchTerm(searchValue);
    };

    const handleOpen = () => {
        setOpen(true)
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
                    <RegularLoanChargesTable searchTerm={searchTerm}/>
                </div>
                <AddRegularLoanChargeModal open={open} setOpen={setOpen} checked={checked} setChecked={setChecked} depositFrom={depositFrom} setDepositFrom={setDepositFrom}
                                           depositTo={depositTo} setDepositTo={setDepositTo} cAmount={cAmount} setCAmount={setCAmount} setSelectedPer={setSelectedPer} selectedPer={selectedPer}
                                           selectedValue={selectedValue} setSelectedValue={setSelectedValue} selectedLoan={selectedLoan} setSelectedLoan={setSelectedLoan}/>
            </div>
        </Layout>
    );
};

export default RegularLoanCharges;