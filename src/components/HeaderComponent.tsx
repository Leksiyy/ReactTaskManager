import { Layout, Radio, Flex } from "antd";
import SearchWithTags from "./SearchWithTags.tsx";
import {useState} from "react";

type HeaderProps = {
    position: 'Current' | 'Archive';
    setPosition: (newPosition: 'Current' | 'Archive') => void;
};

const HeaderComponent = ({position, setPosition}: HeaderProps) => {

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
