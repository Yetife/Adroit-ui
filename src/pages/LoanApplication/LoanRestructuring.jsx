import {useState} from 'react';
import {useDispatch} from "react-redux";
import {useAddGenderMutation} from "../../store/features/generalSetup/api.js";
import {updateSnackbar} from "../../store/snackbar/reducer.js";
import Layout from "../Layout.jsx";
import Search from "../../components/reusables/Search.jsx";
import {Button, Text} from "@chakra-ui/react";
import {Link as ReactLink} from "react-router-dom";
import FilterLoanModal from "../../components/loanApplication/loanRestructuring/FilterLoanModal.jsx";
import LoanRestructuringTable from "../../components/loanApplication/loanRestructuring/LoanRestructuringTable.jsx";

const LoanRestructuring = () => {
    const [open, setOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (searchValue) => {
        setSearchTerm(searchValue);
    };

    const handleOpen = () => {
        setOpen(true)
    }
    const [filters, setFilters] = useState({
        statusName: "",
        bvn: "",
        email: "",
        customerRef: "",
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
                    <LoanRestructuringTable searchTerm={searchTerm} statusName={filters.statusName} bvn={filters.bvn} customerRef={filters.customerRef} email={filters.email}
                                            startDate={filters.startDate} endDate={filters.endDate}/>
                </div>
                <FilterLoanModal open={open} setOpen={setOpen} handleFilter={handleFilter}/>
            </div>
        </Layout>
    );
};

export default LoanRestructuring;