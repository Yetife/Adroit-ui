import  {useState} from 'react';
import {Link as ReactLink} from "react-router-dom";
import Layout from "../../Layout.jsx";
import {Button, Text} from "@chakra-ui/react";
import StaffLoanTable from "../../../components/administration/staff/StaffLoanTable.jsx";
import FilterStaff from "../../../components/staff/FilterStaff.jsx";

const Loan = () => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(true)
    }

    const [filters, setFilters] = useState({
        applicationId: "",
        statusName: "",
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
                   <div></div>
                    <div>
                        <Button variant="primary" onClick={handleOpen} bgColor="#00C795" borderRadius="4px" height="37px" size='md' as={ReactLink} w={'109px'}>
                            <Text color="white">Filter</Text>
                        </Button>
                    </div>
                </div>
                <div>
                    <StaffLoanTable applicationId={filters.applicationId} statusName={filters.statusName}
                                    startDate={filters.startDate} endDate={filters.endDate} />
                </div>
                <FilterStaff open={open} setOpen={setOpen} handleFilter={handleFilter} />
            </div>
        </Layout>
    );
};

export default Loan;