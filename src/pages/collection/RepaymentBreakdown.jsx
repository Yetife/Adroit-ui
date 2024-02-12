import dayjs from "dayjs";

const RepaymentBreakdown = () => {
    const data = [
        {
            status: "Pending",
            principal: "20,000.00",
            interest: "20,000.00",
            lateFee: "120,000.00",
            outstanding: "10,000.00",
            dueDate: "July 21, 2023",
            paid: "6,500.00",
            repaymentDate: "N/A",
        },
        {
            status: "Pending",
            principal: "20,000.00",
            interest: "20,000.00",
            lateFee: "120,000.00",
            outstanding: "10,000.00",
            dueDate: "July 21, 2023",
            paid: "6,500.00",
            repaymentDate: "N/A",
        },
        {
            status: "Pending",
            principal: "20,000.00",
            interest: "20,000.00",
            lateFee: "120,000.00",
            outstanding: "10,000.00",
            dueDate: "July 21, 2023",
            paid: "6,500.00",
            repaymentDate: "N/A",
        },
    ]
    return (
        <div>
            <div>
                <table className="table-auto md:w-full px-20">
                    <thead>
                    <tr>
                        <th className="px-2 py-3 text-[16px] font-medium leading-4 tracking-wider text-[#4A5D58] truncate text-left bg-gray-50">
                            Status
                        </th>
                        <th className="px-2 py-3 text-[16px] font-medium leading-4 tracking-wider text-[#4A5D58] truncate text-left bg-gray-50">
                            Principal
                        </th>
                        <th className="px-2 py-3 text-[16px] font-medium leading-4 tracking-wider text-[#4A5D58] truncate text-left bg-gray-50">
                            Interest
                        </th>
                        <th className="px-2 py-3 text-[16px] font-medium leading-4 tracking-wider text-[#4A5D58] truncate text-left bg-gray-50">
                            Late Fee
                        </th>
                        <th className="px-2 py-3 text-[16px] font-medium leading-4 tracking-wider text-[#4A5D58] truncate text-left bg-gray-50">
                            Outstanding
                        </th>
                        <th className="px-2 py-3 text-[16px] font-medium leading-4 tracking-wider text-[#4A5D58] truncate text-left bg-gray-50">
                             Due Date
                        </th>
                        <th className="px-2 py-3 text-[16px] font-medium leading-4 tracking-wider text-[#4A5D58] truncate text-left bg-gray-50">
                            Paid
                        </th>
                        <th className="px-2 py-3 text-[16px] font-medium leading-4 tracking-wider text-[#4A5D58] truncate text-left bg-gray-50">
                            Repayment Date
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white">
                    {
                        data.map((item, index) => (
                            <tr key={index}>
                                <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <span
                                        className="text-[16px] leading-5 text-[#4A5D58] font-medium">{item.status}</span>
                                </td>
                                <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <span
                                        className="text-[16px] leading-5 text-[#4A5D58] font-medium">{item.principal}</span>
                                </td>
                                <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <span
                                        className="text-[16px] leading-5 text-[#4A5D58] font-medium">{item.interest}</span>
                                </td>
                                <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <span
                                        className="text-[16px] leading-5 text-[#4A5D58] font-medium">{item.lateFee}</span>
                                </td>
                                <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <span
                                        className="text-[16px] leading-5 text-[#4A5D58] font-medium">{item.outstanding}</span>
                                </td>
                                <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <span
                                        className="text-[16px] leading-5 text-[#4A5D58] font-medium">{dayjs(item.dueDate).format("YYYY/MM/DD")}</span>
                                </td>
                                <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <span
                                        className="text-[16px] leading-5 text-[#4A5D58] font-medium">{item.paid}</span>
                                </td>
                                <td className="px-2 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <span
                                        className="text-[16px] leading-5 text-[#4A5D58] font-medium">{item.repaymentDate}</span>
                                </td>
                            </tr>
                        ))
                    }
                    <tr>
                        <td className="px-2 py-4 whitespace-no-wrap border-b border-t border-gray-200">
                            <span className="text-[16px] leading-5 text-[#4A5D58] font-semibold">Total</span>
                        </td>
                        <td className="px-2 py-4 whitespace-no-wrap border-b border-t border-gray-200">
                            <span
                                className="text-[16px] leading-5 text-[#4A5D58] font-semibold">gghdgh</span>
                        </td>
                        <td className="px-2 py-4 whitespace-no-wrap border-b border-t border-gray-200">
                            <span className="text-[16px] leading-5 text-[#4A5D58] font-semibold">hhsdh</span>
                        </td>
                        <td className="px-2 py-4 whitespace-no-wrap border-b border-t border-gray-200">
                            <span
                                className="text-[16px] leading-5 text-[#4A5D58] font-semibold">hhdh</span>
                        </td>
                        <td className="px-2 py-4 whitespace-no-wrap border-b border-t border-gray-200">
                            <span
                                className="text-[16px] leading-5 text-[#4A5D58] font-semibold">hhdh</span>
                        </td>
                        <td className="px-2 py-4 whitespace-no-wrap border-b border-t border-gray-200">
                            <span
                                className="text-[16px] leading-5 text-[#4A5D58] font-semibold">hhdh</span>
                        </td>
                        <td className="px-2 py-4 whitespace-no-wrap border-b border-t border-gray-200">
                            <span
                                className="text-[16px] leading-5 text-[#4A5D58] font-semibold">hhdh</span>
                        </td>
                        <td className="px-2 py-4 whitespace-no-wrap border-b border-t border-gray-200">
                            <span
                                className="text-[16px] leading-5 text-[#4A5D58] font-semibold">hhdh</span>
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

export default RepaymentBreakdown;