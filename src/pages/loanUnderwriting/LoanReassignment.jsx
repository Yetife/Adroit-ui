import {useState} from 'react';
import {useDispatch} from "react-redux";
import {useAddGenderMutation} from "../../store/features/generalSetup/api.js";
import {updateSnackbar} from "../../store/snackbar/reducer.js";
import Layout from "../Layout.jsx";
import Search from "../../components/reusables/Search.jsx";
import {Button, Text} from "@chakra-ui/react";
import {Link as ReactLink} from "react-router-dom";
import ReassignTable from "../../components/loanUnderwritting/loanReassignment/ReassignTable.jsx";
import FilterLoanReassignment from "../../components/loanUnderwritting/loanReassignment/FilterLoanReassignment.jsx";

const LoanReassignment = () => {
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
                    <ReassignTable searchTerm={searchTerm} applicationId={filters.applicationId} name={filters.name} phone={filters.phone}
                                   startDate={filters.startDate} endDate={filters.endDate} email={filters.email} channel={filters.channel} />
                </div>
                <FilterLoanReassignment open={open} setOpen={setOpen} handleFilter={handleFilter}/>
            </div>
        </Layout>
    );
};

export default LoanReassignment;