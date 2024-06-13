import {Link as ReactLink, useNavigate} from "react-router-dom";
import {useState} from "react";
import Layout from "../Layout.jsx";
import Search from "../../components/reusables/Search.jsx";
import {Button, Text} from "@chakra-ui/react";
import AddLgaModal from "../../components/generalSetup/AddLgaModal.jsx";
import LgaTable from "../../components/generalSetup/LgaTable.jsx";
import {getPermission} from "../../components/reusables/getPermission.js";

const Lga = () => {
    const router = useNavigate()
    const [open, setOpen] = useState(false)
    const [checked, setChecked] = useState(true);
    const [lga, setLga] = useState("")
    const [selectedValue, setSelectedValue] = useState('');
    const [searchTerm, setSearchTerm] = useState("");
    const permissions = getPermission("General Setup", "General setup");


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
                        {permissions.canAdd && <Button variant="primary" onClick={handleOpen} bgColor="#00C795" borderRadius="4px"
                                 height="37px" size='md' as={ReactLink} w={'109px'}>
                            <Text color="white">Add</Text>
                        </Button>}
                    </div>
                </div>
                <div>
                    <LgaTable searchTerm={searchTerm}/>
                </div>
                <AddLgaModal open={open} setOpen={setOpen} checked={checked} setChecked={setChecked} lga={lga} setLga={setLga} selectedValue={selectedValue} setSelectedValue={setSelectedValue}/>
            </div>
        </Layout>
    );
};

export default Lga;