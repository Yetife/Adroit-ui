import dayjs from "dayjs";
import {useEffect, useState} from "react";
import {repaymentDetail} from "../../services/api/authApiService.js";
import {useGetLoanRepaymentDetailQuery} from "../../store/features/loanApplication/api.js";
import {formatRepayment} from "../../components/reusables/formatAmount.js";

const LoanRepaymentDetails = () => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("aid");
    const category = "regular loan"
    const {data, isFetching, error} = useGetLoanRepaymentDetailQuery({id, category})
    const [totalRepaymentAmount, setTotalRepaymentAmount] = useState(0);
    const [totalPrincipalAmount, setTotalPrincipalAmount] = useState(0);
    const [totalInterestAmount, setTotalInterestAmount] = useState(0);

    const calculateTotal = (amountArray) => {
        const total = amountArray.reduce((acc, amount) => acc + amount, 0);
        return total;
    };

    useEffect(() => {
        if (data && data?.data) {
            const total = calculateTotal(
                data && data?.data.map(item => {
                    const amountString = String(item.principal); // Ensure it's a string
                    const amountValue = parseFloat(amountString.replace("N", "").replace(/,/g, ""));
                    return isNaN(amountValue) ? 0 : amountValue; // Handle non-numeric values
                })
            );
            setTotalPrincipalAmount(total);

            const interest = calculateTotal(
                data && data?.data.map(item => {
                    const amountString = String(item.interest); // Ensure it's a string
                    const amountValue = parseFloat(amountString.replace("N", "").replace(/,/g, ""));
                    return isNaN(amountValue) ? 0 : amountValue; // Handle non-numeric values
                })
            );
            setTotalInterestAmount(interest);

            const totalPayment = calculateTotal(
                data && data?.data.map(item => {
                    const amountString = String(item.totalPayment); // Ensure it's a string
                    const amountValue = parseFloat(amountString.replace("N", "").replace(/,/g, ""));
                    return isNaN(amountValue) ? 0 : amountValue; // Handle non-numeric values
                })
            );
            setTotalRepaymentAmount(totalPayment);
        }
    }, [data]);


    return (
        <div>
            <div>
                <table className="table-auto md:w-full px-20">
                    <thead>
                    <tr>
                        <th className="px-10 py-3 text-[16px] font-medium leading-4 tracking-wider text-[#4A5D58] text-left bg-gray-50">
                            Repayment Date
                        </th>
                        <th className="px-10 py-3 text-[16px] font-medium leading-4 tracking-wider text-[#4A5D58] text-left bg-gray-50">
                            Principal
                        </th>
                        <th className="px-10 py-3 text-[16px] font-medium leading-4 tracking-wider text-[#4A5D58] text-left bg-gray-50">
                            Interest
                        </th> <th className="px-10 py-3 text-[16px] font-medium leading-4 tracking-wider text-[#4A5D58] text-left bg-gray-50">
                            Total Payment
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white">
                    {
                        data && data?.data?.map((item, index) => (
                            <tr key={index}>
                                <td className="px-10 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <span
                                                    className="text-[16px] leading-5 text-[#4A5D58] font-medium">{dayjs(item.repaymentDate).format("YYYY/MM/DD")}</span>
                                </td>
                                <td className="px-10 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">&#8358;{formatRepayment(item.principal)}</span>
                                </td>
                                <td className="px-10 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">&#8358;{formatRepayment(item.interest)}</span>
                                </td><td className="px-10 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">&#8358;{formatRepayment(item.totalPayment)}</span>
                                </td>
                            </tr>
                        ))
                    }
                    <tr>
                        <td className="px-10 py-4 whitespace-no-wrap border-b border-t border-gray-200">
                            <span className="text-[16px] leading-5 text-[#4A5D58] font-semibold">Total</span>
                        </td>
                        <td className="px-10 py-4 whitespace-no-wrap border-b border-t border-gray-200">
                            <p className="text-[16px] leading-5 text-[#4A5D58] font-[600]">
                                &#8358;{formatRepayment(totalPrincipalAmount)}</p>
                        </td>
                        <td className="px-10 py-4 whitespace-no-wrap border-b border-t border-gray-200">
                            <span className="text-[16px] leading-5 text-[#4A5D58] font-semibold">&#8358;{formatRepayment(totalInterestAmount)}</span>
                        </td>
                        <td className="px-10 py-4 whitespace-no-wrap border-b border-t border-gray-200">
                            <span className="text-[16px] leading-5 text-[#4A5D58] font-semibold">&#8358;{formatRepayment(totalRepaymentAmount)}</span>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LoanRepaymentDetails;