import { Layout, Radio, Flex } from "antd";
import SearchWithTags from "./SearchWithTags.tsx";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { setSearchResults} from "../slices/searchSlice.ts";


type HeaderProps = {
    position: 'Current' | 'Archive';
    setPosition: (newPosition: 'Current' | 'Archive') => void;
};

const HeaderComponent = ({position, setPosition}: HeaderProps) => {

    //TODO: потом переместить в место общения с сервером
    const searchResults = useAppSelector((state) => state.search);

    const dispatch = useAppDispatch();

    const handleSearch = (query: string, tags: string[]) => {
        dispatch(setSearchResults({ query, tags }));
        console.log("🔍 Поиск:", query, "📌 С фильтрами:", tags); // отладка
    };

    return (
        <Layout.Header
            style={{
                minHeight: '120px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '20px',
            }}
        >
            <Flex>
                <Radio.Group value={position} onChange={(e) => setPosition(e.target.value)}>
                    <Radio.Button value="Current">Поточні</Radio.Button>
                    <Radio.Button value="Archive">Архів</Radio.Button>
                </Radio.Group>
            </Flex>
            <SearchWithTags onSearch={handleSearch} />
        </Layout.Header>
    );
};

export default HeaderComponent;
