import { Layout, Radio, Flex } from "antd";
import SearchWithTags from "./SearchWithTags.tsx";
import {useState} from "react";

const HeaderComponent = () => {
    //redux не нужен, это будет "локальная" переменная
    const [position, setPosition] = useState<'Current' | 'Archive'>('Current');

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
            <SearchWithTags />
        </Layout.Header>
    );
};

export default HeaderComponent;
