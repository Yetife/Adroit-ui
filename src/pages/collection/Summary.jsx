import {useState} from 'react';
import Layout from "../Layout.jsx";
import Search from "../../components/reusables/Search.jsx";
import {Button, Text} from "@chakra-ui/react";
import {Link as ReactLink} from "react-router-dom";
import SummaryTable from "../../components/collection/summary/SummaryTable.jsx";

const Summary = () => {
    const [open, setOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("");
    const [inputs, setInputs] = useState({
        startDate: "",
        endDate: ""
    })

    const handleChange = (e, fieldName) => {
        const value = e.target.value;
        setInputs((values) => ({...values, [fieldName]: value}))
    };

    const handleSearch = (searchValue) => {
        setSearchTerm(searchValue);
    };

    const handleOpen = () => {
        setOpen(true)
    }

    return (
        <Layout>
            <div className="px-2">
                <div className="flex justify-between px-0 py-4  pb-2 md:pt-3">
                    <Search search={searchTerm} setSearch={handleSearch}/>
                    <div className="flex space-x-2 items-center">
                        <div className="flex space-x-2 items-center">
                            <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap">
                                Start Date
                            </h3>
                            <input
                                type="date"
                                value={inputs.startDate}
                                onChange={(event) => handleChange(event, "startDate")}
                                placeholder="Enter start date"
                                className="font-medium w-[160px] text-black leading-relaxed px-2 py-1 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                            />
                        </div>
                        <div className="flex space-x-2 items-center">
                            <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap">
                                End Date
                            </h3>
                            <input
                                type="date"
                                value={inputs.endDate}
                                onChange={(event) => handleChange(event, "endDate")}
                                placeholder="Enter end date"
                                className="font-medium w-[160px] text-black leading-relaxed px-2 py-1 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                            />
                        </div>
                        <Button variant="primary" onClick={handleOpen} bgColor="#00C795" borderRadius="4px"
                                height="37px" size='md' as={ReactLink} w={'109px'}>
                            <Text color="white">View</Text>
                        </Button>
                    </div>
                </div>
                <div>
                    <SummaryTable searchTerm={searchTerm}/>
                </div>
                {/*<AddLoanStatusModal open={open} setOpen={setOpen} status={status} setStatus={setStatus} checked={checked} setChecked={setChecked} handleAdd={handleAdd}/>*/}
            </div>
        </Layout>
    );
};

export default Summary;