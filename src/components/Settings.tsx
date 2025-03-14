import { useState } from "react";
import {Card, FloatButton, Input, Modal, Select, Slider} from "antd";
import {SettingOutlined} from "@ant-design/icons";

const { Option } = Select;

interface SettingsState {
    bgColor: string;
    padding: number;
    titleSize: number;
    descriptionSize: number;
}

export default function Settings() {
    const [settings, setSettings] = useState<SettingsState>({
        bgColor: "#ffffff",
        padding: 16,
        titleSize: 20,
        descriptionSize: 14,
    });

    const handleChange = (key: keyof SettingsState, value: string | number) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
        <FloatButton onClick={showModal} icon={<SettingOutlined />} type="default" style={{ insetInlineEnd: 24 }} />

        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <div style={{ padding: 24 }}>
                <h2>Налаштування картки</h2>
                <Card style={{ maxWidth: 400 }}>
                    <div>
                        <label>Колір фону</label>
                        <Input
                            type="color"
                            value={settings.bgColor}
                            onChange={(e) => handleChange("bgColor", e.target.value)}
                        />
                    </div>

                    <div style={{ marginTop: 16 }}>
                        <label>Внутрішній відступ</label>
                        <Slider
                            min={0}
                            max={50}
                            value={settings.padding}
                            onChange={(value) => handleChange("padding", value)}
                        />
                    </div>

                    <div style={{ marginTop: 16 }}>
                        <label>Розмір тексту шапки</label>
                        <Select
                            value={settings.titleSize}
                            onChange={(value) => handleChange("titleSize", value)}
                            style={{ width: "100%" }}
                        >
                            <Option value={16}>Малий</Option>
                            <Option value={20}>Середній</Option>
                            <Option value={24}>Великий</Option>
                        </Select>
                    </div>

                    <div style={{ marginTop: 16 }}>
                        <label>Розмір тексту опису</label>
                        <Select
                            value={settings.descriptionSize}
                            onChange={(value) => handleChange("descriptionSize", value)}
                            style={{ width: "100%" }}
                        >
                            <Option value={12}>Малий</Option>
                            <Option value={14}>Середній</Option>
                            <Option value={18}>Великий</Option>
                        </Select>
                    </div>
                </Card>

                <h3 style={{ marginTop: 24 }}>Попередній перегляд</h3>
                <Card
                    style={{
                        backgroundColor: settings.bgColor,
                        padding: settings.padding,
                    }}
                >
                    <h2 style={{ fontSize: settings.titleSize }}>Заголовок</h2>
                    <p style={{ fontSize: settings.descriptionSize }}>Опис картки</p>
                </Card>
            </div>
        </Modal>
        </>
    );
}
