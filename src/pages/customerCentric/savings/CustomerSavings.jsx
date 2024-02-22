import React, {useRef, useState} from 'react';
import Layout from "../../Layout.jsx";
import Search from "../../../components/reusables/Search.jsx";
import {Button, Text} from "@chakra-ui/react";
import {Link as ReactLink} from "react-router-dom";
import CustomerSavingsTable from "../../../components/customerCentric/savings/CustomerSavingsTable.jsx";
import FilterSavingsModal from "../../../components/customerCentric/savings/FilterSavingsModal.jsx";

const CustomerSavings = () => {
    const formRef = useRef(null);
    const [open, setOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("");
    const [dropdown, setDropDown] = useState("email")
    const handleOpen = () => {
        setOpen(true)
    }
    const handleSearch = (searchValue) => {
        setSearchTerm(searchValue);
    };

    const handleChange = (e) => {
        setDropDown(e.target.value);
        handleSearch(searchTerm, e.target.value); // Pass the selected dropdown value to handleSearch
    };

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        setSearchTerm(form.searchInput.value);
    };
    const [filters, setFilters] = useState({
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
                    <div className="flex">
                         <span>
                             <select
                                 id="select" value={dropdown}
                                 onChange={(event) => handleChange(event)}
                                 className="font-medium w-[150px] text-black h-[40px]  leading-relaxed py-1 rounded  border border-neutral-300 justify-between items-center gap-4 flex">
                                 <option value={'email'}>Email</option>
                                 <option value={'phone'}>Phone Number</option>
                                 <option value={'name'}>Customer Name</option>
                            </select>
                        </span>
                        <div className="ml-3 w-[200px]">
                            <form ref={formRef} onSubmit={handleEmailSubmit}>
                                <input
                                    type="text"
                                    name="searchInput"
                                    placeholder="Search for customer details by email"
                                    className="text-zinc-800 outline-zinc-500 outline-1 w-full border border-neutral-300 leading-relaxed bg-transparent pl-2 p-2 rounded"
                                    onKeyUp={(e) => {
                                        if (e.key === "Enter") {
                                            formRef.current.requestSubmit();
                                        }
                                    }}
                                />
                            </form>
                            {/*<Search search={searchTerm} setSearch={handleSearch} onKeyPress={handleKeyPress}/>*/}
                        </div>
                    </div>
                    <div>
                        <Button variant="primary" onClick={handleOpen} bgColor="#00C795" borderRadius="4px"
                                height="37px" size='md' as={ReactLink} w={'109px'}>
                            <Text color="white">Filter</Text>
                        </Button>
                    </div>
                </div>
                <div>
                    <CustomerSavingsTable searchTerm={searchTerm} dropDown={dropdown} statusName={filters.statusName}
                                          startDate={filters.startDate} endDate={filters.endDate} />
                </div>
                <FilterSavingsModal open={open} setOpen={setOpen} handleFilter={handleFilter} />
            </div>
        </Layout>
    )
};

export default CustomerSavings;