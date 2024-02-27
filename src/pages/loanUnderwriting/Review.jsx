import {useState} from 'react';
import Layout from "../Layout.jsx";
import Search from "../../components/reusables/Search.jsx";
import {Button, Text} from "@chakra-ui/react";
import {Link as ReactLink, useNavigate} from "react-router-dom";
import ReviewTable from "../../components/loanUnderwritting/review/ReviewTable.jsx";
import FilterReview from "../../components/loanUnderwritting/review/FilterReview.jsx";

const Review = () => {
    const router = useNavigate()
    const [open, setOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedOption, setSelectedOption] = useState('regularLoan');

    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };
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
                    <div className="flex">
                        <div className="mr-3">
                            <Button variant="primary" bgColor="#FF0909" borderRadius="4px" height="37px"
                                    size='md' as={ReactLink} w={'209px'} onClick={()=>router('/loanUnderwriting/reassignedLoan')}>
                                <Text color="white">View Re-assigned Loan</Text>
                            </Button>
                        </div>
                        <Button variant="primary" onClick={handleOpen} bgColor="#00C795" borderRadius="4px" height="37px" size='md' as={ReactLink} w={'109px'}>
                            <Text color="white">Filter</Text>
                        </Button>
                    </div>
                </div>
                <div className="flex space-x-4 mt-4">
                    <div>
                        <input
                            type="radio"
                            id="table1"
                            name="tableOption"
                            value="regularLoan"
                            checked={selectedOption === 'regularLoan'}
                            onChange={() => handleOptionChange('regularLoan')}
                        />
                        <label htmlFor="regularLoan" className="pl-1 font-semibold text-[#4A5D58] text-[16px]">Regular Loan</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="table2"
                            name="tableOption"
                            value="table2"
                            checked={selectedOption === 'loanRestructuring'}
                            onChange={() => handleOptionChange('loanRestructuring')}
                        />
                        <label htmlFor="Loan Restructuring" className="pl-1 font-semibold text-[#4A5D58] text-[16px]">Loan Restructuring</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="loanTopUp"
                            name="tableOption"
                            value="loanTopUp"
                            checked={selectedOption === 'loanTopUp'}
                            onChange={() => handleOptionChange('loanTopUp')}
                        />
                        <label htmlFor="Loan Top-up" className="pl-1 pb-3 font-semibold text-[#4A5D58] text-[16px]">Loan Top-up</label>
                    </div>
                </div>
                <div>
                    { selectedOption === "regularLoan" && <ReviewTable searchTerm={searchTerm} applicationId={filters.applicationId} name={filters.name}
                                  phone={filters.phone}
                                  startDate={filters.startDate} endDate={filters.endDate} email={filters.email}
                                  channel={filters.channel}/>}
                </div>
                <FilterReview open={open} setOpen={setOpen} handleAdd={handleFilter}/>
            </div>
        </Layout>
    );
};

export default Review;