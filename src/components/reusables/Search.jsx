import {SearchOutlined} from "@mui/icons-material";
import {InputAdornment, TextField} from "@mui/material";

const Search = ({search, setSearch}) => {
    return (
        <div>
            <TextField
                size="small"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchOutlined fontSize="small" />
                        </InputAdornment>
                    ),
                }}
                variant="outlined"
                className={"tw-w-[306px] md:tw-w-[271px]"}
            />
        </div>
    );
};

export default Search;