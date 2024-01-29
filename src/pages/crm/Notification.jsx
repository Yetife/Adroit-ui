import {useState} from 'react';
import Layout from "../Layout.jsx";
import Search from "../../components/reusables/Search.jsx";
import NotificationTable from "../../components/crm/notification/NotificationTable.jsx";

const Notification = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (searchValue) => {
        setSearchTerm(searchValue);
    };

    return (
        <Layout>
            <div className="px-2">
                <div className="flex justify-between px-0 py-4  pb-2 md:pt-3">
                    <Search search={searchTerm} setSearch={handleSearch}/>
                    <div>

                    </div>
                </div>
                <div>
                    <NotificationTable searchTerm={searchTerm} />
                </div>
            </div>
        </Layout>
    )
};

export default Notification;