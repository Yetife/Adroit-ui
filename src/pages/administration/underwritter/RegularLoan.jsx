import {Link as ReactLink} from "react-router-dom";
import {useState} from "react";
import Layout from "../../Layout.jsx";
import {Button, Text} from "@chakra-ui/react";
import RegularLoanTab from "../../../components/reusables/RegularLoanTab.jsx";
import RegularLoanInterestTable
    from "../../../components/administration/underwritter/RegularLoan/RegularLoanInterestTable.jsx";
import AddRegularLoanInterestModal
    from "../../../components/administration/underwritter/RegularLoan/AddRegularLoanInterestModal.jsx";
import AddRegularLoanCharges
    from "../../../components/administration/underwritter/RegularLoan/AddRegularLoanCharges.jsx";
import RegularLoanChargeTable
    from "../../../components/administration/underwritter/RegularLoan/RegularLoanChargeTable.jsx";

const RegularLoan = () => {
    const [open, setOpen] = useState(false)
    const [depositFrom, setDepositFrom] = useState("")
    const [depositTo, setDepositTo] = useState("")
    const [selectedValue, setSelectedValue] = useState('');
    const [rate, setRate] = useState("")
    const [searchTerm, setSearchTerm] = useState("");
    const [tabValue, setTabValue] = useState('interest')
    const [depositFro, setDepositFro] = useState("")
    const [depositT, setDepositT] = useState("")
    const [cAmount, setCAmount] = useState('')
    const [selectedType, setSelectedType] = useState('');
    const [selectedLoan, setSelectedLoan] = useState('');
    const [selectedPer, setSelectedPer] = useState(false);



    const getTabState = (tabvalue) => {
        setTabValue(tabvalue)
    }
    const handleOpen = () => {
        setOpen(true)
    }

    return (
        <Layout>
            <div className="px-2">
                <div className="flex justify-between px-0 py-4  pb-2 md:pt-6">
                    <RegularLoanTab getTabState={getTabState}/>
                    <div>
                        <Button variant="primary" onClick={handleOpen} bgColor="#00C795" borderRadius="4px" height="37px" size='md' as={ReactLink} w={'109px'}>
                            <Text color="white">Add</Text>
                        </Button>
                    </div>
                </div>
                {tabValue === "charges" ? (
                    <div>
                        <RegularLoanChargeTable/>
                    </div>
                ) :  (
                    <div>
                        <RegularLoanInterestTable />
                    </div>
                )
                }
                {tabValue === "charges" ? (
                    <AddRegularLoanCharges open={open} setOpen={setOpen} depositFrom={depositFro} setDepositFrom={setDepositFro}
                    depositTo={depositT} setDepositTo={setDepositT} cAmount={cAmount} setCAmount={setCAmount} setSelectedValue={setSelectedType}
                                           selectedValue={selectedType} selectedLoan={selectedLoan} setSelectedLoan={setSelectedLoan} setSelectedPer={setSelectedPer} selectedPer={selectedPer} />
                ) : (
                    <AddRegularLoanInterestModal open={open} setOpen={setOpen} depositFrom={depositFrom} setDepositFrom={setDepositFrom}
                                                 depositTo={depositTo} setDepositTo={setDepositTo} rate={rate} setRate={setRate} selectedValue={selectedValue} setSelectedValue={setSelectedValue}/>
                )}
            </div>
        </Layout>
    );
};

export default RegularLoan;