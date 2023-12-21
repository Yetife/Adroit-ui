import Search from "../../../components/reusables/Search.jsx";
import {Button, Text} from "@chakra-ui/react";
import {Link as ReactLink} from "react-router-dom";
import Layout from "../../Layout.jsx";
import {DisbursedTable} from "../../../components/bridgeLoan/disbursement/disbursed/DisbursedTable.jsx";

const Disbursed = () => {
    return (
        <Layout>
            <div className="px-2">
                <div className="flex justify-between px-0 py-4  pb-2 md:pt-3">
                    <Search/>
                    <div>
                        <Button variant="primary"borderColor="#00C795" marginRight="10px"
                                bgColor="#135D54" borderRadius="4px" height="37px" size='md' as={ReactLink} w={'109px'}>
                            <Text color="white">Filter</Text>
                        </Button>
                        <Button variant="primary" bgColor="#00C795" borderRadius="4px" height="37px" size='md' as={ReactLink} w={'109px'}>
                            <Text color="white">Upload</Text>
                        </Button>
                    </div>
                </div>

                <DisbursedTable />
            </div>
        </Layout>
    );
};

export default Disbursed;