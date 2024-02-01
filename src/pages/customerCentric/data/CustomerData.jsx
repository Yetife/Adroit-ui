import React, {useState} from 'react';
import Layout from "../../Layout.jsx";
import Search from "../../../components/reusables/Search.jsx";
import {Button, Text} from "@chakra-ui/react";
import {Link as ReactLink} from "react-router-dom";
import CustomerDataTable from "../../../components/customerCentric/data/CustomerDataTable.jsx";
import FilterDataModal from "../../../components/customerCentric/data/FilterDataModal.jsx";

const CustomerData = () => {
    const [open, setOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("");
    const [dropdown, setDropDown] = useState("email")
    const [inputs, setInputs] = useState({
        status: "",
        startDate: "",
        endDate: "",
    })

    const handleOpen = () => {
        setOpen(true)
    }
    const handleSearch = (searchValue) => {
        setSearchTerm(searchValue);
    };

    const handleChange = (e) => {
        setDropDown(e.target.value)
    }

    return (
        <Layout>
            <div className="px-2">
                <div className="flex justify-between px-0 py-4  pb-2 md:pt-3">
                    <div className="flex">
                         <span>
                             <select
                                 id="select" value={dropdown}
                                 onChange={(event) => handleChange(event, "identityType")}
                                 className="font-medium w-[150px] text-black h-[40px]  leading-relaxed py-1 rounded  border border-neutral-300 justify-between items-center gap-4 flex">
                                 <option value={'email'}>Email</option>
                                 <option value={'phone'}>Phone Number</option>
                                  <option value={'name'}>Customer Name</option>
                            </select>
                        </span>
                        <div className="ml-3 w-[200px]">
                            <Search search={searchTerm} setSearch={handleSearch}/>
                        </div>
                    </div>
                    <div>
                        <Button variant="primary" onClick={handleOpen} bgColor="#00C795" borderRadius="4px" height="37px" size='md' as={ReactLink} w={'109px'}>
                            <Text color="white">Filter</Text>
                        </Button>
                    </div>
                </div>
                <div>
                    <CustomerDataTable searchTerm={searchTerm}/>
                </div>
                <FilterDataModal open={open} setOpen={setOpen} inputs={inputs} setInputs={setInputs}/>
            </div>
        </Layout>
    )
};

export default CustomerData;