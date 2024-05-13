import {useEffect, useState} from 'react';
import * as Dialog from "@radix-ui/react-dialog";
import {Button, Text} from "@chakra-ui/react";
import {Link as ReactLink} from "react-router-dom";
import {Close} from "@mui/icons-material";
import dayjs from "dayjs";
import {formatRepayment} from "../../../components/reusables/formatAmount.js";
import {updateSnackbar} from "../../../store/snackbar/reducer.js";
import {
    useGetLoanRepaymentPlanQuery, useManuallyRepayMutation,
    useManualRepaymentMutation
} from "../../../store/features/customerCentric/api.js";
import {useDispatch} from "react-redux";
import {Divider} from "@mui/material";

const RepaymentScheduleModal = ({open, setOpen, id, loanId, name}) => {
    const queryParams = new URLSearchParams(location.search);
    const custId = queryParams.get("id");
    const [totalRepaymentAmount, setTotalRepaymentAmount] = useState(0);
    const [manualRepayment] =  useManualRepaymentMutation()
    const [manuallyRepay] =  useManuallyRepayMutation()
    const dispatch = useDispatch()
    const {data, isFetching, error} =  useGetLoanRepaymentPlanQuery(custId)
    const [tabItem, setTabItem] = useState("schedule")
    const [inputs, setInputs] = useState({
        amount: "",
        comment: "",
    })

    const handleTab = (item) =>{
        setTabItem(item)
    }

    const handleChange = (e, fieldName) => {
        const value = e.target.value;
        setInputs((values) => ({...values, [fieldName]: value}))
    };
    const handleSubmit = () => {
        manualRepayment({
            body: {
                customerId: custId,
                repaymentId: id,
                loanApplicationId: loanId,
                amount: totalRepaymentAmount.toString()
            }
        }).then(res => {
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: res.data.message,success:true}));
            setOpen(!open)
        }).catch(err =>{
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message:err.data.message,success:false}));
        })
    }
    const handleRepay = () => {
        const user = JSON.parse(sessionStorage.getItem("userData"));
        manuallyRepay({
            body: {
                loanApplicationId: loanId,
                processedBy: user.UserId,
                comment: inputs.comment,
                amountPaid: +inputs.amount
            }
        }).then(res => {
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: res.data.message,success:true}));
            setOpen(!open)
        }).catch(err =>{
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message:err.data.message,success:false}));
        })
    }

    const handleRest = () => {
        setInputs({
            amount: "",
            comment: ""
        })
    }

    const calculateTotal = (amountArray) => {
        const total = amountArray.reduce((acc, amount) => acc + amount, 0);
        return total;
    };

    useEffect(() => {
        if (data?.data && data?.data) {
            const total = calculateTotal(
                data?.data.map(item => {
                    const amountString = String(item.repaymentAmount); // Ensure it's a string
                    const amountValue = parseFloat(amountString.replace("N", "").replace(/,/g, ""));
                    return isNaN(amountValue) ? 0 : amountValue; // Handle non-numeric values
                })
            );
            setTotalRepaymentAmount(total);
        }
    }, [data?.data]);
    return (
        <div>
            <Dialog.Root
                open={Boolean(open)}
                onOpenChange={(open) => {
                    !open && setOpen(undefined);
                }}
            >
                <Dialog.Portal>
                    <Dialog.Overlay className="bg-black bg-opacity-20 z-[100] data-[state=open]:animate-overlayShow fixed inset-0" />
                    <Dialog.Content className="data-[state=open]:animate-contentShow z-[200] fixed top-[45%] left-[50%] max-h-[87vh] w-[90vw] max-w-[420px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[45px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                        <Dialog.Title className="text-[24px] text-[#343434] font-bold -mt-8">Loan Repayment</Dialog.Title>
                        {/*<Divider className="pt-4"/>*/}
                        <div className="mt-6">
                            <div className="flex justify-between cursor-pointer">
                                <p className={`${tabItem === "schedule" ? "border-b-4 border-b-[#00C795] pb-2 px-4 font-[700]" : ""} text-[16] font-[500]`} onClick={()=>handleTab("schedule")}>Repayment Schedule</p>
                                <p className={`${tabItem === "debit" ? "border-b-4 border-b-[#00C795] pb-2 px-8 font-[700]" : ""} text-[16] font-[500]`} onClick={()=>handleTab("debit")}>Manual Debit</p>
                            </div>
                            <Divider/>
                            { tabItem === "schedule" && <div>
                                <p className="text-[16px] pt-3 leading-5 text-[#3A3A3A] font-[700] pb-1">Customer Name: <span className="font-[500]">{name}</span></p>
                                <div
                                    className="custom-scroll-bar overflow-auto h-[200px]  rounded-[5px] my-3 p-3"
                                    style={{
                                        border: "1px solid #C9D4D1",
                                        background: "#FFF",
                                        // boxShadow: "0px 6px 19px 0px rgba(0, 0, 0, 0.15)"
                                    }}>
                                    <table className="scroll-container table-auto">
                                        <thead>
                                        <tr>
                                            <th className="py-1 px-8 text-[14px] font-medium leading-4 text-[#007970]  border-b truncate">
                                                Repayment Date
                                            </th>
                                            <th className="py-1 px-8 text-[14px] font-medium leading-4 text-[#007970] border-b">
                                                Amount
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody className="bg-white">
                                        {
                                            data?.data?.length && data?.data?.map((item, index) => (
                                                <tr key={index}>
                                                    <td className="py-1 px-8 whitespace-no-wrap border-b border-gray-200">
                                                    <span
                                                        className="text-[14px] leading-5 text-[#4A5D58] font-medium">{dayjs(item?.repaymentDate).format("YYYY/MM/DD")}</span>
                                                    </td>
                                                    <td className="py-1 px-8 whitespace-no-wrap border-b border-gray-200">
                                                    <span
                                                        className="text-[14px] leading-5 text-[#4A5D58] font-medium">&#8358;{formatRepayment(item?.repaymentAmount)}</span>
                                                    </td>


                                                </tr>
                                            ))
                                        }
                                        </tbody>
                                    </table>
                                    <p className="text-[16px] pt-3 pl-2 leading-5 text-[#4A5D58] font-[700]">
                                        Total Amount: &#8358;{totalRepaymentAmount.toLocaleString("en-US", {
                                        // style: "currency",
                                        // currency: "NGN"
                                    })}
                                    </p>
                                </div>
                                <div className="flex tw-items-center m-auto tw-text-center mt-10">
                                    <Button variant="primary" bgColor="#00C795" borderRadius="4px"
                                            height="40px" size='md' as={ReactLink} w={'340px'} onClick={handleSubmit}>
                                        <Text color="white">Debit Customer Account Now</Text>
                                    </Button>
                                </div>
                                <div className="flex tw-items-center m-auto tw-text-center mt-4">
                                    <Button variant="outline" borderColor="#135D54"
                                            border={"1px solid #135D54"} borderRadius="4px"
                                            onClick={() => setOpen(!open)}
                                            height="40px" size='md' as={ReactLink} w={'340px'}>
                                        <Text color="#135D54">Close</Text>
                                    </Button>
                                </div>
                            </div>}
                            {
                                tabItem === "debit" &&
                                <div>
                                    <p className="text-[16px] pt-3 leading-5 text-[#3A3A3A] font-[700]">Customer
                                        Name: <span className="font-[500]">{name}</span></p>
                                    <div>
                                        <span className="ml-8">
                                          <h3 className="font-semibold text-[#4A5D58] text-[14px] whitespace-nowrap pb-3">
                                           Amount Paid
                                          </h3>
                                          <input
                                              type="number"
                                              value={inputs.amount}
                                              onChange={(event) => handleChange(event, "amount")}
                                              placeholder="Enter amount"
                                              className="font-medium w-full text-black leading-relaxed px-4 py-2 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                          />
                                        </span>
                                    </div>
                                    <div className="mt-6">
                                        <p className="text-[16px] leading-5 text-[#4A5D58] font-[600] pb-3">Comments</p>
                                        <textarea id="message" name="message" rows="4" cols="50"
                                                  value={inputs.comment}
                                                  onChange={(event) => handleChange(event, "comment")}
                                                  placeholder="Add comment"
                                                  className="font-medium w-full text-black leading-relaxed px-4 py-3 rounded  border border-neutral-300 justify-between items-center gap-4 flex"
                                        ></textarea>
                                    </div>
                                    <div className="flex mt-6">
                                        <Button variant="outline" borderColor="#4B4B4B" borderRadius="4px"
                                                border={"1px solid #4B4B4B"}
                                                onClick={handleRest}
                                                height="45px" size='md' as={ReactLink} w={'160px'}>
                                            <Text color="#4A5D58">Reset</Text>
                                        </Button>
                                        <Button className="ml-2" variant="primary" bgColor="#00C795" borderRadius="4px"
                                                height="45px" size='md' as={ReactLink} w={'160px'}
                                                onClick={handleRepay}>
                                            <Text color="white">Submit</Text>
                                        </Button>
                                    </div>
                                </div>
                            }

                        </div>
                        <Dialog.Close asChild>
                            <button
                                className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[20px] right-[40px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                                aria-label="Close"
                            >
                                <Close/>
                            </button>
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    );
};

export default RepaymentScheduleModal;