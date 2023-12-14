import {Link as ReactLink, useNavigate} from "react-router-dom";
import {useState} from "react";
import Layout from "../Layout.jsx";
import Search from "../../components/reusables/Search.jsx";
import {Button, Text} from "@chakra-ui/react";
import AddRegularLoanInterestRateModal from "../../components/generalSetup/AddRegularLoanInterestRateModal.jsx";
import RegularLoanInterestRateTable from "../../components/generalSetup/RegularLoanInterestRateTable.jsx";

const RegularLoanInterestRate = () => {
    const router = useNavigate()
    const [open, setOpen] = useState(false)
    const [checked, setChecked] = useState(true);
    const [depositFrom, setDepositFrom] = useState("")
    const [depositTo, setDepositTo] = useState("")
    const [rate, setRate] = useState("")

    const handleOpen = () => {
        setOpen(true)
    }

    return (
        <Layout>
            <div className="px-2">
                <div className="flex justify-between px-0 py-4  pb-2 md:pt-3">
                    <Search />
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
                    <RegularLoanInterestRateTable />
                </div>
                <AddRegularLoanInterestRateModal open={open} setOpen={setOpen} checked={checked} setChecked={setChecked} depositFrom={depositFrom} setDepositFrom={setDepositFrom} depositTo={depositTo} setDepositTo={setDepositTo} rate={rate} setRate={setRate} />
            </div>
        </Layout>
    );
};

export default RegularLoanInterestRate;