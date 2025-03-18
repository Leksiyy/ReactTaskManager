import {Button, Input, Select, Space} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store.ts";
import {SearchQuery} from "../types/types.ts";
import {setSearchString, setSearchTags} from "../slices/searchSlice.ts";

const tagOptions = ["у шапці", "описі", "тегах"];

const SearchWithTags: React.FC = () => {

    //TODO: потом переместить в место общения с сервером
    const searchQuery: SearchQuery = useSelector((state: RootState) => state.search);

    const dispatch = useDispatch();

    const handleSearch = (searchString: string) => {
        dispatch(setSearchString(searchString));
        console.log("searchString: " + searchString);
    };

    const handleTagChange = (tags: string[]) => {
        dispatch(setSearchTags(tags));
        console.log("tags: ", tags);
    };

    return (
        <Space>
            <Input
                placeholder="Введіть пошуковий запит..."
                value={searchQuery.searchString}
                onChange={(e) => handleSearch(e.target.value)}
                allowClear
            />
            <Select
                mode="multiple"
                style={{
                    minWidth: "200px",
                    width: "100%",
                    display: "flex",
                    alignItems: "center"
                }}
                placeholder="Шукати у..."
                value={searchQuery.searchTags}
                onChange={handleTagChange}
            >
                {tagOptions.map((tag) => (
                    <Select.Option key={tag} value={tag}>
                        {tag}
                    </Select.Option>
                ))}
            </Select>
            <Button type="primary" icon={<SearchOutlined />}>
                Search
            </Button>
        </Space>
    );
};

export default SearchWithTags;