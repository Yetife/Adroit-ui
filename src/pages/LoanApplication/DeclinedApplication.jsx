import Layout from "../Layout.jsx";
import {useState} from "react";
import Search from "../../components/reusables/Search.jsx";
import {Button, Text} from "@chakra-ui/react";
import {Link as ReactLink} from "react-router-dom";
import DeclinedTable from "../../components/loanApplication/declined/DeclinedTable.jsx";
import FilterDeclined from "../../components/loanApplication/declined/FilterDeclined.jsx";

const DeclinedApplication = () => {
    const [open, setOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (searchValue) => {
        setSearchTerm(searchValue);
    };

    const handleOpen = () => {
        setOpen(true)
    }
    const [filters, setFilters] = useState({
        applicationId: "",
        phone: "",
        name: "",
        email: "",
        channel: "",
        startDate: "",
        endDate: "",
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
                        <Button variant="primary" onClick={handleOpen} bgColor="#00C795" borderRadius="4px" height="37px" size='md' as={ReactLink} w={'109px'}>
                            <Text color="white">Filter</Text>
                        </Button>
                    </div>
                </div>
                <div>
                    <DeclinedTable searchTerm={searchTerm} applicationId={filters.applicationId} name={filters.name} phone={filters.phone}
                                   startDate={filters.startDate} endDate={filters.endDate} email={filters.email} channel={filters.channel} />
                </div>
                <FilterDeclined open={open} setOpen={setOpen} handleFilter={handleFilter}/>
            </div>
        </Layout>
    );
};

export default DeclinedApplication;