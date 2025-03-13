import { useState } from "react";
import {Button, Input, Select, Space} from "antd";
import {SearchOutlined} from "@ant-design/icons";

const tagOptions = ["у шапці", "описі", "тегах"];

interface SearchWithTagsProps {
    onSearch: (query: string, tags: string[]) => void;
}

const SearchWithTags: React.FC<SearchWithTagsProps> = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const handleSearch = (value: string) => {
        setSearchQuery(value);
        onSearch(value, selectedTags);
    };

    const handleTagChange = (tags: string[]) => {
        setSelectedTags(tags);
        onSearch(searchQuery, tags);
    };

    return (
        <Space>
            <Input
                placeholder="Введіть пошуковий запит..."
                value={searchQuery}
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
                value={selectedTags}
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