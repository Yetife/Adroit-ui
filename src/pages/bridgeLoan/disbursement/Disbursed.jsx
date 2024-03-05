import Search from "../../../components/reusables/Search.jsx";
import {Button, Text} from "@chakra-ui/react";
import {Link as ReactLink} from "react-router-dom";
import Layout from "../../Layout.jsx";
import {DisbursedTable} from "../../../components/bridgeLoan/disbursement/disbursed/DisbursedTable.jsx";
import DisburseBulkUpload from "../../../components/bridgeLoan/disbursement/disbursed/DisburseBulkUpload.jsx";
import {useState} from "react";
import FilterDisbursedModal from "../../../components/bridgeLoan/disbursement/disbursed/FilterDisbursedModal.jsx";

const Disbursed = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (searchValue) => {
        setSearchTerm(searchValue);
    };
    const [open, setOpen] = useState(false)
    const [openFilter, setOpenFilter] = useState(false)
    const [filters, setFilters] = useState({
        startDate: "",
        bvn: "",
    });

    const handleFilter = (newFilters) => {
        setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
    };
    return (
        <Layout>
            <div className="px-2">
                <div className="flex justify-between px-0 py-4  pb-2 md:pt-3">
                    <Search search={searchTerm} setSearch={handleSearch}/>
                    <div>
                        <Button variant="primary"borderColor="#00C795" marginRight="10px"
                                bgColor="#00C795" borderRadius="4px" height="37px" size='md' as={ReactLink} w={'109px'} onClick={()=>setOpenFilter(true)}>
                            <Text color="white">Filter</Text>
                        </Button>
                        <Button variant="primary" bgColor="#135D54" borderRadius="4px" height="37px" size='md'
                                as={ReactLink} w={'109px'} onClick={()=>setOpen(true)}>
                            <Text color="white">Upload</Text>
                        </Button>
                    </div>
                </div>

                <DisbursedTable searchTerm={searchTerm} startDate={filters.startDate} bvn={filters.bvn}/>
                <DisburseBulkUpload open={open} setOpen={setOpen}/>
                <FilterDisbursedModal open={openFilter} setOpen={setOpenFilter} handleFilter={handleFilter}/>
            </div>
        </Layout>
    );
};

export default Disbursed;