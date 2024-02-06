import {SearchOutlined} from "@mui/icons-material";
import {InputAdornment, TextField} from "@mui/material";
import {useRef} from "react";

const Search = ({search, setSearch, handleSubmit}) => {
    const formRef = useRef(null);

    return (
        <div>
            <form ref={formRef} onSubmit={handleSubmit}>
                <TextField
                    size="small"
                    placeholder="Search"
                    value={search}
                    onKeyUp={(e) => {
                        if (e.key === "Enter") {
                            formRef.current.requestSubmit();
                        }
                    }}
                    onChange={(e) => setSearch(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchOutlined fontSize="small"/>
                            </InputAdornment>
                        ),
                    }}
                    variant="outlined"
                    className={"tw-w-[306px] md:tw-w-[271px]"}
                />
            </form>
        </div>
);
};

export default Search;