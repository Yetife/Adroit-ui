import dayjs from "dayjs";
import { useGetAllCommentQuery } from "../../store/features/loanApplication/api";
import { Divider } from "@mui/material";

const LoanComments = () => {
    const queryParams = new URLSearchParams(location.search);
    const appId = queryParams.get("aid");
    const {data, isFetching, error} = useGetAllCommentQuery(appId)

    return (
        <div>
            {
                data?.data.map((item)=> (
                    <div className="pt-4">
                        <span className="font-normal text-[#4A5D58] text-[15px] whitespace-nowrap">{item.description}</span>
                        <div className="flex justify-between mb-4">
                            <div></div>
                            <p className="font-bold text-[#4A5D58] text-[14px] whitespace-nowrap pt-1">{dayjs(item.dateCreated).format('DD MMM, YYYY h:mmA')}</p>
                        </div>
                        <Divider />
                    </div>
                ))
            }
        </div>
    )
}

export default LoanComments