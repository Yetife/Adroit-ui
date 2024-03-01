import Search from "../../../components/reusables/Search.jsx";
import {Button, Text} from "@chakra-ui/react";
import {Link as ReactLink} from "react-router-dom";
import Layout from "../../Layout.jsx";
import ReturnedTable from "../../../components/bridgeLoan/disbursement/returned/ReturnedTable.jsx";
import {useState} from "react";

const Returned = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (searchValue) => {
        setSearchTerm(searchValue);
    };
    return (
        <Layout>
            <div className="px-2">
                <div className="flex justify-between px-0 py-4  pb-2 md:pt-3">
                    <Search search={searchTerm} setSearch={handleSearch}/>

                    {/*<div>*/}
                    {/*    <Button variant="primary" bgColor="#00C795" borderRadius="4px" height="37px" size='md' as={ReactLink} w={'109px'}>*/}
                    {/*        <Text color="white">Add</Text>*/}
                    {/*    </Button>*/}
                    {/*</div>*/}
                </div>

                <ReturnedTable searchTerm={searchTerm}/>
            </div>
        </Layout>
    );
};

export default Returned;