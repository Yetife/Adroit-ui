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

    const activity = [
        {
            name: "Requires manual review according to matching rules criteria",
            date: "Sept 12, 2023 2:19PM",
            action: "System",
            status: "UNDER REVIEW"
        },{
            name: "Requires manual review according to matching rules criteria",
            date: "Sept 12, 2023 2:19PM",
            action: "System",
            status: "UNDER REVIEW"
        },{
            name: "Requires manual review according to matching rules criteria",
            date: "Sept 12, 2023 2:19PM",
            action: "System",
            status: "UNDER REVIEW"
        },
    ]

    return (
        <div>
            <div>
                <div className="flex mt-8">
                     <span>
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

                <div className="mt-8">
                    <h3 className="font-semibold text-[#4A5D58] text-[16px] whitespace-nowrap pb-3">
                        View Rule Breakdown
                    </h3>
                    <div className="mt-4">
                        {
                            activity.map((step, index) => (
                                <div className={'flex'} key={index}>
                                    <div className={'flex-col'}>
                                        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="0.5" y="0.5" width="18" height="18" stroke="#4A5D58"/>
                                        </svg>
                                        {index !== activity.length - 1 ? (
                                            <span className={'flex justify-center'}>
                                                <svg width="1" height="61" viewBox="0 0 1 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <line x1="0.5" y1="-2.18557e-08" x2="0.500003" y2="61" stroke="#4A5D58"/>
                                                </svg>
                                            </span>
                                        ) : null}
                                    </div>
                                    <div className={'ml-6'}>
                                        <span className="font-semibold text-[#4A5D58] text-[15px] whitespace-nowrap pt-1">{step.name}</span>
                                        <div className="flex space-x-3">
                                            <p className="font-medium text-[#4A5D58] text-[14px] whitespace-nowrap pt-1">Date: {step.date}</p>
                                            <p className="font-medium text-[#4A5D58] text-[14px] whitespace-nowrap pt-1">Action: {step.action}</p>
                                            <p className="font-medium text-[#4A5D58] text-[14px] whitespace-nowrap pt-1">Status: {step.status}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoanActivity;