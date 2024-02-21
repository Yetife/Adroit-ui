import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {useAddLoanTenorMutation} from "../../../store/features/administration/api.js";
import {updateSnackbar} from "../../../store/snackbar/reducer.js";
import Layout from "../../Layout.jsx";
import {Button, Text} from "@chakra-ui/react";
import {Link as ReactLink} from "react-router-dom";
import StaffLoanTable from "../../../components/administration/staff/StaffLoanTable.jsx";
import AddLoanTenorModal from "../../../components/administration/loanTenor/AddLoanTenorModal.jsx";
import FilterStaff from "../../../components/staff/FilterStaff.jsx";
import DisburseStaffLoanTable from "../../../components/administration/staff/DisburseStaffLoanTable.jsx";

const DisbursedLoan = () => {
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
                    <DisburseStaffLoanTable applicationId={filters.applicationId} statusName={filters.statusName}
                                    startDate={filters.startDate} endDate={filters.endDate} />
                </div>
                <FilterStaff open={open} setOpen={setOpen} handleFilter={handleFilter} />
            </div>
        </Layout>
    );
};

export default DisbursedLoan;