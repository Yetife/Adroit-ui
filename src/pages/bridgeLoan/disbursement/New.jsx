import {Link as ReactLink, useNavigate} from "react-router-dom";
import {useState} from "react";
import Layout from "../../Layout.jsx";
import Search from "../../../components/reusables/Search.jsx";
import {Button, Text} from "@chakra-ui/react";
import NewDisbursementTable from "../../../components/bridgeLoan/disbursement/new/NewDisbursementTable.jsx";

const New = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (searchValue) => {
        setSearchTerm(searchValue);
    };

    return (
        <Layout>
            <div className="px-2">
                <div className="flex justify-between px-0 py-4  pb-2 md:pt-3">
                    <Search search={searchTerm} setSearch={handleSearch}/>
                    <div>
                        <Button variant="primary"borderColor="#00C795" marginRight="10px"
                                bgColor="#00C795" borderRadius="4px" height="37px" size='md' as={ReactLink} w={'109px'}>
                            <Text color="white">Bulk Upload</Text>
                        </Button>
                        <Button variant="primary" to={'/bridgeLoan/disbursement/new/add'} bgColor="#00C795" borderRadius="4px" height="37px" size='md' as={ReactLink} w={'109px'}>
                            <Text color="white">Add</Text>
                        </Button>
                    </div>
                </div>
                <NewDisbursementTable searchTerm={searchTerm}/>
            </div>
        </Layout>
    );
};

export default New;