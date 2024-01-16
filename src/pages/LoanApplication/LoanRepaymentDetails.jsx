import dayjs from "dayjs";
import {useEffect, useState} from "react";
import {repaymentDetail} from "../../services/api/authApiService.js";

const LoanRepaymentDetails = () => {
    const queryParams = new URLSearchParams(location.search);
    const appId = queryParams.get("aid");
    const [data, setData] = useState({})

    useEffect(() => {
        repaymentDetail({loanApplicationId: appId}).then(res=>{
            setData(res.data)
        })
    }, []);

    return (
        <div>
            <div>
                <table className="table-auto md:w-full px-20">
                    <thead>
                    <tr>
                        <th className="px-10 py-3 text-[16px] font-medium leading-4 tracking-wider text-[#4A5D58] text-left bg-gray-50">
                            Repayment Date
                        </th>
                        <th className="px-10 py-3 text-[16px] font-medium leading-4 tracking-wider text-[#4A5D58] text-left text-gray-900 bg-gray-50">
                            Principal
                        </th>
                        <th className="px-10 py-3 text-[16px] font-medium leading-4 tracking-wider text-[#4A5D58] text-left text-gray-900 bg-gray-50">
                            Interest
                        </th> <th className="px-10 py-3 text-[16px] font-medium leading-4 tracking-wider text-[#4A5D58] text-left text-gray-900 bg-gray-50">
                            Total Payment
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white">
                    <tr>
                        <td className="px-10 pb-8 pt-4 whitespace-no-wrap  border-gray-200">
                            <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{dayjs(data.repaymentDate).format("MMMM D[th], YYYY")}</span>
                        </td>
                        <td className="px-10 pb-8 pt-4 whitespace-no-wrap  border-gray-200">
                            <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.principal}</span>
                        </td>
                        <td className="px-10 pb-8 pt-4 whitespace-no-wrap  border-gray-200">
                            <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.interest}</span>
                        </td>
                        <td className="px-10 pb-8 pt-4 whitespace-no-wrap  border-gray-200">
                            <span className="text-[16px] leading-5 text-[#4A5D58] font-medium">{data?.totalPayment}</span>
                        </td>
                    </tr>
                    <tr>
                        <td className="px-10 py-4 whitespace-no-wrap border-b border-t border-gray-200">
                            <span className="text-[16px] leading-5 text-[#4A5D58] font-semibold">Total</span>
                        </td>
                        <td className="px-10 py-4 whitespace-no-wrap border-b border-t border-gray-200">
                            <span className="text-[16px] leading-5 text-[#4A5D58] font-semibold">{data?.principal}</span>
                        </td>
                        <td className="px-10 py-4 whitespace-no-wrap border-b border-t border-gray-200">
                            <span className="text-[16px] leading-5 text-[#4A5D58] font-semibold">{data?.interest}</span>
                        </td>
                        <td className="px-10 py-4 whitespace-no-wrap border-b border-t border-gray-200">
                            <span className="text-[16px] leading-5 text-[#4A5D58] font-semibold">{data?.totalPayment}</span>
                        </td>
                    </tr>
                    </tbody>
                </table>
                {/*<p className="text-[16px] pt-8 pl-8 leading-5 text-[#4A5D58] font-[600]">*/}
                {/*    Total Repayment Amount: {totalRepaymentAmount.toLocaleString("en-US", {*/}
                {/*    style: "currency",*/}
                {/*    currency: "NGN"*/}
                {/*})}*/}
                {/*</p>*/}
            </div>
        </div>
    );
};

export default LoanRepaymentDetails;