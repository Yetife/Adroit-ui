import next from '../../assets/next.svg'
import previous from '../../assets/previous.svg'

const Pagination = ({ totalCount, onPageChange, onRowsPerPageChange, page, rowsPerPage, rowsPerPageOptions }) => {
    const numPages = Math.ceil(totalCount / rowsPerPage);
    const pages = Array.from({ length: numPages }, (_, index) => index + 1);

    // Calculate the correct start and end indices
    const startIndex = Math.min((page - 1) * rowsPerPage + 1, totalCount);
    const endIndex = Math.min(startIndex + rowsPerPage - 1, totalCount);

    const visiblePages = [];
    const ellipsis = '...';

    if (numPages <= 10) {
        visiblePages.push(...pages);
    } else {
        if (page <= 5) {
            visiblePages.push(...pages.slice(0, 7), ellipsis, numPages);
        } else if (page >= numPages - 4) {
            visiblePages.push(1, ellipsis, ...pages.slice(numPages - 7, numPages));
        } else {
            visiblePages.push(1, ellipsis, ...pages.slice(page - 3, page + 2), ellipsis, numPages);
        }
    }

    return (
        <div className="w-full flex justify-between items-center my-1">
            <div className="ml-4 flex items-center">
                <span className="text-[#3A3A3A] text-[13px] font-medium font-[Inter]">Rows per page </span>
                <select value={rowsPerPage} onChange={onRowsPerPageChange} className="border-[0.5px] border-[#BFBFBF] rounded ml-2">
                    {rowsPerPageOptions.map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            {pageSize}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex items-center mr-10">
                <div className="text-[#3A3A3A] text-[13px] font-medium font-[Inter]">
                    {startIndex}-{endIndex} of {totalCount}
                </div>
                <ul className="pagination ml-4">
                    <li>
                        <img src={previous} onClick={() => onPageChange(page - 1)}
                             className={page === 1 ? "disabled" : "active"}  alt={"previous"}/>
                    </li>
                    {pages.map((pageNumber) => (
                        <li key={pageNumber}>
                            {pageNumber === ellipsis ? (
                                ellipsis
                            ) : (
                                <p
                                    onClick={() => onPageChange(pageNumber)}
                                    className={pageNumber === page ? "active" : "disabled"}
                                >
                                    {pageNumber}
                                </p>
                            )}
                        </li>
                    ))}
                    <li>
                        <img src={next} onClick={() => onPageChange(page + 1)}
                                    className={page === numPages ? "disabled" : "active"} alt={"next"}/>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Pagination;