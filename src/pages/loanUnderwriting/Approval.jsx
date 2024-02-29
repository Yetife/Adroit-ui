import {useEffect, useState} from 'react';
import Layout from "../Layout.jsx";
import Search from "../../components/reusables/Search.jsx";
import {Button, Text} from "@chakra-ui/react";
import {Link as ReactLink} from "react-router-dom";
import ApprovalTable from "../../components/loanUnderwritting/approval/ApprovalTable.jsx";
import FilterApproval from "../../components/loanUnderwritting/approval/FilterApproval.jsx";
import ApproveRestructureTable from "../../components/loanUnderwritting/approval/ApproveRestructureTable.jsx";
import ApproveTopUpTable from "../../components/loanUnderwritting/approval/ApproveTopUpTable.jsx";

const Approval = () => {
    const [open, setOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedOption, setSelectedOption] = useState('regularLoan');

    const handleOptionChange = (option) => {
        setSelectedOption(option);
        sessionStorage.setItem("radioOption", JSON.stringify(option));
    };

    useEffect(() => {
        const storedOption = sessionStorage.getItem('radioOption');
        if (storedOption !== 'regularLoan') {
            sessionStorage.setItem('radioOption', JSON.stringify('regularLoan'));
        } else {
            setSelectedOption(JSON.parse(storedOption));
        }
        // Add event listener to clear stored option when leaving the page
        const handleBeforeUnload = () => {
            sessionStorage.removeItem('radioOption');
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

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
                        <Button variant="primary" onClick={handleOpen} bgColor="#00C795" borderRadius="4px"
                                height="37px" size='md' as={ReactLink} w={'109px'}>
                            <Text color="white">Filter</Text>
                        </Button>
                    </div>
                </div>
                <div className="flex space-x-4 mt-4 justify-center">
                    <div>
                        <input
                            type="radio"
                            id="regularLoan"
                            name="tableOption"
                            value="regularLoan"
                            checked={selectedOption === 'regularLoan'}
                            onChange={() => handleOptionChange('regularLoan')}
                            className="cursor-pointer"
                        />
                        <label htmlFor="regularLoan" className="pl-1 font-semibold text-[#FF0909] text-[18px]">Regular
                            Loan</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="loanRestructure"
                            name="tableOption"
                            value="loanRestructure"
                            checked={selectedOption === 'loanRestructure'}
                            onChange={() => handleOptionChange('loanRestructure')}
                            className="cursor-pointer"
                        />
                        <label htmlFor="Loan Restructuring" className="pl-1 font-semibold text-[#00C795] text-[18px]">Loan
                            Restructuring</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="loanTopUp"
                            name="tableOption"
                            value="loanTopUp"
                            checked={selectedOption === 'loanTopUp'}
                            onChange={() => handleOptionChange('loanTopUp')}
                            className="cursor-pointer"
                        />
                        <label htmlFor="Loan Top-up" className="pl-1 pb-3 font-semibold text-[#1781BC] text-[18px]">Loan
                            Top-up</label>
                    </div>
                </div>
                <div>
                    { selectedOption === "regularLoan" && <ApprovalTable searchTerm={searchTerm} applicationId={filters.applicationId} name={filters.name}
                                    phone={filters.phone}
                                    startDate={filters.startDate} endDate={filters.endDate} email={filters.email}
                                    channel={filters.channel}/>}
                    { selectedOption === "loanRestructure" && <ApproveRestructureTable searchTerm={searchTerm} applicationId={filters.applicationId} name={filters.name}
                                    phone={filters.phone}
                                    startDate={filters.startDate} endDate={filters.endDate} email={filters.email}
                                    channel={filters.channel}/>}
                    { selectedOption === "loanTopUp" && <ApproveTopUpTable searchTerm={searchTerm} applicationId={filters.applicationId} name={filters.name}
                                    phone={filters.phone}
                                    startDate={filters.startDate} endDate={filters.endDate} email={filters.email}
                                    channel={filters.channel}/>}
                </div>
                <FilterApproval open={open} setOpen={setOpen} handleFilter={handleFilter}/>
            </div>
        </Layout>
    );
};

export default Approval;