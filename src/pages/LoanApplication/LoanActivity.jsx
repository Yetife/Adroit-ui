import {useState} from "react";
import {Link as ReactLink} from "react-router-dom";
import {Button, Text} from "@chakra-ui/react";

const LoanActivity = () => {
    const initialState = {
        comment: "",
        newStatus: "All",
        oldStatus: "All"
    }
    const [inputs, setInputs] = useState(initialState)
    const handleChange = (e, fieldName) => {
        const value = e.target.value;
        setInputs((values) => ({...values, [fieldName]: value}))
    };
    return (
        <div>
            <div>
                <div className="flex mt-8">
                     <span className="ml-8">
                      <h3 className="font-semibold text-[#4A5D58] text-[16px] whitespace-nowrap pb-3">
                        Search by Comment
                      </h3>
                      <input
                          type="text"
                          value={inputs.comment}
                          onChange={(event) => handleChange(event, "comment")}
                          placeholder="Enter amount"
                          className="font-medium w-[320px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                      />
                    </span>
                    <span className="ml-6">
                      <h3 className="font-semibold text-[#4A5D58] text-[16px] whitespace-nowrap pb-3">
                        Search by Old Application Status
                      </h3>
                         <select id="select" value={inputs.oldStatus}
                                 onChange={(event) => handleChange(event, "oldStatus")}
                                 className="font-medium w-[320px] h-[50px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex">
                             <option value={true}>All</option>
                             <option value={false}>False</option>
                        </select>
                    </span>
                    <span className="ml-6">
                      <h3 className="font-semibold text-[#4A5D58] text-[16px] whitespace-nowrap pb-3">
                       Search by New Application Status
                      </h3>
                         <select id="select" value={inputs.newStatus}
                                 onChange={(event) => handleChange(event, "newStatus")}
                                 className="font-medium w-[320px] h-[50px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex">
                              <option value={true}>All</option>
                             <option value={false}>False</option>
                        </select>
                    </span>
                    <div className="mt-9 ml-6">
                        <Button variant="primary" bgColor="#00C795" borderRadius="4px" height="49px" size='md' as={ReactLink} w={'109px'}>
                            <Text color="white">Search</Text>
                        </Button>
                    </div>
                </div>
            </div>
            Activity
        </div>
    );
};

export default LoanActivity;