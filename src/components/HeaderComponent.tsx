import { Layout, Radio, Flex } from "antd";
import SearchWithTags from "./SearchWithTags.tsx";
import {useState} from "react";

const HeaderComponent = ({ position, setPosition }: { position: 'Current' | 'Archive', setPosition: React.Dispatch<React.SetStateAction<'Current' | 'Archive'>> }) => {
    const [searchResults, setSearchResults] = useState<{ query: string; tags: string[] }>({ query: "", tags: [] });

    const handleSearch = (query: string, tags: string[]) => {
        setSearchResults({ query, tags });
        console.log("🔍 Поиск:", query, "📌 С фильтрами:", tags); // отладка
    };

    return (
        <Layout.Header style={{
            minHeight: '120px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '20px'
        }}>
            <Flex>
                <Radio.Group value={position} onChange={(e) => setPosition(e.target.value)}>
                    <Radio.Button value="Current">Поточні</Radio.Button>
                    <Radio.Button value="Archive">Архів</Radio.Button>
                </Radio.Group>
            </Flex>
            <SearchWithTags onSearch={handleSearch}/>
        </Layout.Header>
    );
};

export default HeaderComponent;