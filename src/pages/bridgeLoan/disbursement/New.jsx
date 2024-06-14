import {Link as ReactLink, useNavigate} from "react-router-dom";
import {useState} from "react";
import Layout from "../../Layout.jsx";
import Search from "../../../components/reusables/Search.jsx";
import {Button, Text} from "@chakra-ui/react";
import NewDisbursementTable from "../../../components/bridgeLoan/disbursement/new/NewDisbursementTable.jsx";
import UploadBulkModal from "../../../components/bridgeLoan/disbursement/new/UploadBulkModal.jsx";
import {getPermission} from "../../../components/reusables/getPermission.js";

const New = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [open, setOpen] = useState(false)
    const permissions = getPermission("Bridge Loan", "Disbursement_New");

    const handleSearch = (searchValue) => {
        setSearchTerm(searchValue);
    };

    return (
        <Layout>
            <div className="px-2">
                <div className="flex justify-between px-0 py-4  pb-2 md:pt-3">
                    <Search search={searchTerm} setSearch={handleSearch}/>
                    <div>
                        {permissions.canUpload && <Button variant="primary" borderColor="#00C795" marginRight="10px"
                                 bgColor="#135D54" borderRadius="4px" height="37px" size='md' as={ReactLink} w={'109px'}
                                 onClick={() => setOpen(true)}>
                            <Text color="white">Bulk Upload</Text>
                        </Button>}
                        {permissions.canAdd && <Button variant="primary" to={'/bridgeLoan/disbursement/new/add'} bgColor="#00C795"
                                 borderRadius="4px" height="37px" size='md' as={ReactLink} w={'109px'}>
                            <Text color="white">Add</Text>
                        </Button>}
                    </div>
                </div>
                <NewDisbursementTable searchTerm={searchTerm}/>
                <UploadBulkModal open={open} setOpen={setOpen} />
            </div>
        </Layout>
    );
};

export default New;