import {useState} from 'react';
import Layout from "../Layout.jsx";
import Search from "../../components/reusables/Search.jsx";
import {Button, Text} from "@chakra-ui/react";
import {Link as ReactLink, useNavigate} from "react-router-dom";
import ReviewTable from "../../components/loanUnderwritting/review/ReviewTable.jsx";
import FilterReview from "../../components/loanUnderwritting/review/FilterReview.jsx";
import ReviewRestructureTable from "../../components/loanUnderwritting/review/ReviewRestructureTable.jsx";
import ReviewTopupTable from "../../components/loanUnderwritting/review/ReviewTopupTable.jsx";

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
                <div className="flex space-x-4 mt-4 justify-center">
                    <div>
                        <input
                            type="radio"
                            id="regularLoan"
                            name="tableOption"
                            value="regularLoan"
                            checked={selectedOption === 'regularLoan'}
                            onChange={() => handleOptionChange('regularLoan')}
                        />
                        <label htmlFor="regularLoan" className="pl-1 font-semibold text-[#FF0909] text-[18px]">Regular Loan</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="loanRestructuring"
                            name="tableOption"
                            value="loanRestructuring"
                            checked={selectedOption === 'loanRestructuring'}
                            onChange={() => handleOptionChange('loanRestructuring')}
                        />
                        <label htmlFor="Loan Restructuring" className="pl-1 font-semibold text-[#00C795] text-[18px]">Loan Restructuring</label>
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
                        <label htmlFor="Loan Top-up" className="pl-1 pb-3 font-semibold text-[#1781BC] text-[18px]">Loan Top-up</label>
                    </div>
                </div>
                <div>
                    { selectedOption === "regularLoan" && <ReviewTable searchTerm={searchTerm} applicationId={filters.applicationId} name={filters.name}
                                  phone={filters.phone}
                                  startDate={filters.startDate} endDate={filters.endDate} email={filters.email}
                                  channel={filters.channel}/>}
                    { selectedOption === "loanRestructuring" && <ReviewRestructureTable searchTerm={searchTerm} applicationId={filters.applicationId} name={filters.name}
                                                                       phone={filters.phone}
                                                                       startDate={filters.startDate} endDate={filters.endDate} email={filters.email}
                                                                       channel={filters.channel}/>}
                    { selectedOption === "loanTopUp" && <ReviewTopupTable searchTerm={searchTerm} applicationId={filters.applicationId} name={filters.name}
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