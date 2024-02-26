import {useEffect, useState} from "react";
import {Link as ReactLink} from "react-router-dom";
import {Button, Text} from "@chakra-ui/react";
import AddCommentModal from "../../components/loanUnderwritting/review/AddCommentModal.jsx";
import {useGetAllCommentQuery} from "../../store/features/loanApplication/api.js";
import dayjs from "dayjs";

const LoanActivity = () => {
    const [comment, setComment] = useState("")
    const [open, setOpen] = useState("")
    const initialState = {
        comment: "",
        newStatus: "All",
        oldStatus: "All"
    }
    const queryParams = new URLSearchParams(location.search);
    const appId = queryParams.get("aid");
    const {data, isFetching, error} = useGetAllCommentQuery(appId)


    return (
        <div>
            <div>
                {/*<div className="flex mt-8">*/}
                {/*     <span>*/}
                {/*      <h3 className="font-semibold text-[#4A5D58] text-[16px] whitespace-nowrap pb-3">*/}
                {/*        Search by Comment*/}
                {/*      </h3>*/}
                {/*      <input*/}
                {/*          type="text"*/}
                {/*          value={inputs.comment}*/}
                {/*          onChange={(event) => handleChange(event, "comment")}*/}
                {/*          placeholder="Enter amount"*/}
                {/*          className="font-medium w-[320px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"*/}
                {/*      />*/}
                {/*    </span>*/}
                {/*    <span className="ml-6">*/}
                {/*      <h3 className="font-semibold text-[#4A5D58] text-[16px] whitespace-nowrap pb-3">*/}
                {/*        Search by Old Application Status*/}
                {/*      </h3>*/}
                {/*         <select id="select" value={inputs.oldStatus}*/}
                {/*                 onChange={(event) => handleChange(event, "oldStatus")}*/}
                {/*                 className="font-medium w-[320px] h-[50px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex">*/}
                {/*             <option value={true}>All</option>*/}
                {/*             <option value={false}>False</option>*/}
                {/*        </select>*/}
                {/*    </span>*/}
                {/*    <span className="ml-6">*/}
                {/*      <h3 className="font-semibold text-[#4A5D58] text-[16px] whitespace-nowrap pb-3">*/}
                {/*       Search by New Application Status*/}
                {/*      </h3>*/}
                {/*         <select id="select" value={inputs.newStatus}*/}
                {/*                 onChange={(event) => handleChange(event, "newStatus")}*/}
                {/*                 className="font-medium w-[320px] h-[50px] text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex">*/}
                {/*              <option value={true}>All</option>*/}
                {/*             <option value={false}>False</option>*/}
                {/*        </select>*/}
                {/*    </span>*/}
                {/*    <div className="mt-9 ml-6">*/}
                {/*        <Button variant="primary" bgColor="#00C795" borderRadius="4px" height="49px" size='md' as={ReactLink} w={'109px'}>*/}
                {/*            <Text color="white">Search</Text>*/}
                {/*        </Button>*/}
                {/*    </div>*/}
                {/*</div>*/}

                <div className="mt-8">
                    <h3 className="font-semibold text-[#4A5D58] text-[16px] whitespace-nowrap pb-3">
                        View Rule Breakdown
                    </h3>
                    <div>
                        <Button variant="outline" borderColor="#4A5D58" marginRight="10px"
                                border={"1px solid #4A5D58"} borderRadius="4px" height="37px"
                                size='md' as={ReactLink} w={'239px'} onClick={()=>setOpen(true)} >
                            <Text color="#4A5D58">Add Comment</Text>
                        </Button>
                    </div>
                    <div className="mt-4">
                        {
                            data?.data.map((step, index) => (
                                <div className={'flex'} key={index}>
                                    <div className={'flex-col'}>
                                        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="0.5" y="0.5" width="18" height="18" stroke="#4A5D58"/>
                                        </svg>
                                        {index !== data?.data.length - 1 ? (
                                            <span className={'flex justify-center'}>
                                                <svg width="1" height="61" viewBox="0 0 1 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <line x1="0.5" y1="-2.18557e-08" x2="0.500003" y2="61" stroke="#4A5D58"/>
                                                </svg>
                                            </span>
                                        ) : null}
                                    </div>
                                    <div className={'ml-6'}>
                                        <span className="font-semibold text-[#4A5D58] text-[15px] whitespace-nowrap pt-1">{step.description}</span>
                                        <div className="flex space-x-3">
                                            <p className="font-medium text-[#4A5D58] text-[14px] whitespace-nowrap pt-1">Date: {dayjs(step.dateCreated).format('MMM DD, YYYY h:mmA')}</p>
                                            <p className="font-medium text-[#4A5D58] text-[14px] whitespace-nowrap pt-1">Action: System</p>
                                            <p className="font-medium text-[#4A5D58] text-[14px] whitespace-nowrap pt-1">Status: {step.status}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <AddCommentModal open={open} setOpen={setOpen} comment={comment} setComment={setComment}/>
        </div>
    );
};

export default LoanActivity;