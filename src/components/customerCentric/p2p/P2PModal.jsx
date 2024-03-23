import * as Dialog from "@radix-ui/react-dialog";
import dayjs from "dayjs";
import {Close} from "@mui/icons-material";
import {useGetP2PByIdQuery, useUpdateRepaymentMutation} from "../../../store/features/customerCentric/api.js";
import {CircularProgress, ThemeProvider} from "@mui/material";
import themes from "../../reusables/theme.jsx";
import {updateSnackbar} from "../../../store/snackbar/reducer.js";
import {useDispatch} from "react-redux";

const P2PModal = ({open, setOpen, id}) => {
    const {data, isFetching, error} =  useGetP2PByIdQuery(id)
    const [updateRepayment] = useUpdateRepaymentMutation()
    const dispatch = useDispatch()

    function formatRepayment(amount) {
        const number = parseFloat(amount);
        if (isNaN(number)) {
            return '';
        }
        const formattedNumber = number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return formattedNumber;
    }

    const updatePayment = (id) => {
        updateRepayment({
            body: {
                id: id
            }
        }).then(res => {
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message: res.data.message,success:true}));
        }).catch(err =>{
            dispatch(updateSnackbar({type:'TOGGLE_SNACKBAR_OPEN',message:err.data.message,success:false}));
        })
    }

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
                    <Dialog.Content className="data-[state=open]:animate-contentShow z-[200] fixed top-[40%] left-[50%] max-h-[85vh] w-[95vw] max-w-[720px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white px-[45px] pt-[40px] pb-[20px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                        <Dialog.Title className="text-[24px] text-[#343434] font-bold -mt-8">P2P Loan</Dialog.Title>
                        {/*<Divider className="pt-4"/>*/}
                        <div>
                            {
                                isFetching ? <ThemeProvider theme={themes}>
                                    <CircularProgress color={"waveGreen"}
                                                      sx={{display: "flex", margin: "auto", justifyContent: "center"}}/>
                                </ThemeProvider> : <div className="flex mt-4 space-x-4">
                                    <div>
                                        <div className="rounded-[5px] px-4 py-2"
                                             style={{border: "1px solid #C9D4D1", background: "#FFF"}}>
                                            <p className="text-[14px] leading-5 text-[#007970] font-[600]">Lender
                                                Details</p>
                                            <div className="flex space-x-4 py-1">
                                                <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-[500]">Name:</p>
                                                <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-[500] capitalize">{data?.data.lenderDetails?.firstName + " " + data?.data.lenderDetails?.lastName}</p>
                                            </div>
                                            <div className="flex space-x-4 py-1">
                                                <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-[500]">Email
                                                    Address:</p>
                                                <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-[500]">{data?.data.lenderDetails?.emailAddress}</p>
                                            </div>
                                            <div className="flex space-x-4 py-1">
                                                <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-[500]">Phone
                                                    Number:</p>
                                                <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-[500]">{data?.data.lenderDetails?.phoneNumber}</p>
                                            </div>
                                        </div>
                                        <div className="rounded-[5px] my-3 px-4 py-2"
                                             style={{border: "1px solid #C9D4D1", background: "#FFF"}}>
                                            <p className="text-[14px] leading-5 text-[#007970] font-[600]">Borrower
                                                Details</p>
                                            <div className="flex space-x-4 py-1">
                                                <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-[500]">Name:</p>
                                                <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-[500] capitalize">{data?.data.borrowerDetails?.firstName + " " + data?.data.borrowerDetails?.lastName}</p>
                                            </div>
                                            <div className="flex space-x-4 py-1">
                                                <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-[500]">Email Address:</p>
                                                <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-[500]">{data?.data.borrowerDetails?.emailAddress}</p>
                                            </div>
                                            <div className="flex space-x-4 py-1">
                                                <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-[500]">Phone
                                                    Number:</p>
                                                <p className="text-[13px] font-[inter] leading-5 text-[#4A5D58] font-[500]">{data?.data.borrowerDetails?.phoneNumber}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between">
                                            <div>
                                                <div className="flex space-x-4 py-1">
                                                    <p className="text-[12px] font-[inter] leading-5 text-[#007970] font-[500]">Tenor:</p>
                                                    <p className="text-[12px] font-[inter] leading-5 text-[#4A5D58] font-[500]">{data?.data.tenor}</p>
                                                </div>
                                                <div className="flex space-x-4 py-1">
                                                    <p className="text-[12px] font-[inter] leading-5 text-[#007970] font-[500]">Start
                                                        Date:</p>
                                                    <p className="text-[12px] font-[inter] leading-5 text-[#4A5D58] font-[500]">{dayjs(data?.data.startDate).format("YYYY/MM/DD")}</p>
                                                </div>
                                                <div className="flex space-x-4 py-1">
                                                    <p className="text-[12px] font-[inter] leading-5 text-[#007970] font-[600]">End
                                                        Date:</p>
                                                    <p className="text-[12px] font-[inter] leading-5 text-[#4A5D58] font-[500]">{dayjs(data?.data.endDate).format("YYYY/MM/DD")}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[12px] font-[inter] leading-5 text-[#007970] font-[600]">Date
                                                    Requested:</p>
                                                <p className="text-[12px] font-[inter] leading-5 text-[#4A5D58] font-[500]">{dayjs(data?.data.p2pDateCreated).format('YYYY-MM-DD HH:mm:ss')}</p>
                                            </div>
                                        </div>
                                        <div className="custom-scroll-bar overflow-auto max-h-[10rem] rounded-[5px] my-4 p-2 "
                                             style={{
                                                 border: "1px solid #C9D4D1",
                                                 background: "#FFF",
                                                 // boxShadow: "0px 6px 19px 0px rgba(0, 0, 0, 0.15)"
                                             }}>
                                            <table className="">
                                                <thead>
                                                <tr>
                                                    <th className="py-1 px-3 text-[12px] font-medium leading-4 text-[#007970] text-left border-b truncate">
                                                        Repayment Date
                                                    </th>
                                                    <th className="py-1 px-3 text-[12px] font-medium leading-4 text-[#007970] text-left border-b">
                                                        Amount
                                                    </th>
                                                    <th className="py-1 px-3 text-[12px] font-medium leading-4 text-[#007970] text-left border-b truncate">
                                                        Repayment Status
                                                    </th>
                                                </tr>
                                                </thead>
                                                <tbody className="bg-white h-[10rem]">
                                                {
                                                    data?.data?.repaymentDetail?.length > 0 && data?.data?.repaymentDetail.map((item, index) => (
                                                        <tr key={index}>
                                                            <td className="py-1 px-3 whitespace-no-wrap border-b border-gray-200">
                                                                    <span
                                                                        className="text-[12px] leading-5 text-[#4A5D58] font-medium">{dayjs(item?.actualRepaymentDate).format("YYYY/MM/DD")}</span>
                                                            </td>
                                                            <td className="py-1 px-3 whitespace-no-wrap border-b border-gray-200">
                                                                    <span
                                                                        className="text-[12px] leading-5 text-[#4A5D58] font-medium">&#8358;{formatRepayment(item?.monthlyRepaymentAmount)}</span>
                                                            </td>
                                                            <td
                                                                className="py-1 px-3 whitespace-no-wrap border-b border-gray-200">
                                                                {item?.repaymentStatus === "Paid" && <span
                                                                    className="text-[12px] leading-5 text-[#4A5D58] font-medium">Paid</span>}
                                                                {item?.repaymentStatus === "Not Paid" && <span
                                                                    className="text-[12px] leading-5 text-[#00C795] font-medium cursor-pointer" onClick={()=>updatePayment(item?.monthlyRepaymentId)}>Mark as Paid</span>}
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                                </tbody>
                                            </table>
                                        </div>
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

export default P2PModal;