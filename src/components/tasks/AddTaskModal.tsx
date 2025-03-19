import { useEffect, useState, KeyboardEvent } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../../slices/tasksSlice";
import { Form, Input, Modal, Tabs } from "antd";
import { validateTaskData } from "../../utils/taskActions"
import { BackgroundCustomizer } from "./BackgroundTaskCustomizer";
import type { Background } from "../../types/types";

interface AddTaskModalProps {
    open: boolean;
    onClose: () => void;
}

export const AddTaskModal = ({ open, onClose }: AddTaskModalProps) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [customBackground, setCustomBackground] = useState<Partial<Background>>({});

    const minTitleLength: number = 3;
    const minTextLength: number = 3;

    useEffect(() => {
        if (!open) {
            setTitle("");
            setText("");
            setTags([]);
        }
    }, [open]);

    const handleAddTask = () => {
        if (!validateTaskData(title, text)) return;
    
        dispatch(
            addTask({
                title,
                text,
                tags,
                background: customBackground,
            })
        );
        onClose();
    };

    const handleEnterKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        const activeElement = document.activeElement as HTMLTextAreaElement | HTMLInputElement;
        if (e.key === "Enter" && activeElement && activeElement.tagName !== "TEXTAREA") {
            e.preventDefault();
            handleAddTask();
        }
    };
  
    return (
        <Modal
            title="Add New Task"
            open={open}
            onCancel={onClose}
            onOk={handleAddTask}
            width={600}
        >
            <div onKeyDown={handleEnterKeyDown}>
                <Tabs
                    items={[
                        {
                            key: "content",
                            label: "Content",
                            children: (
                                <Form layout="vertical">
                                    <Form.Item label="Title" required>
                                        <Input
                                            placeholder={`Min ${minTitleLength} characters`}
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </Form.Item>

                                    <Form.Item label="Text" required>
                                        <Input.TextArea
                                            placeholder={`Min ${minTextLength} characters`}
                                            value={text}
                                            rows={7}
                                            onChange={(e) => setText(e.target.value)}
                                        />
                                    </Form.Item>

                                    <Form.Item label="Tags">
                                        <Input
                                            placeholder="Comma separated"
                                            value={tags.join(", ")}
                                            onChange={(e) =>
                                                setTags(e.target.value.split(",").map((tag) => tag.trim()))
                                            }
                                        />
                                    </Form.Item>
                                </Form>
                            ),
                        },
                        {
                            key: "background",
                            label: "Background",
                            children: (
                                <BackgroundCustomizer 
                                    initialColor={customBackground.color}
                                    initialImage={customBackground.image}
                                    onChange={(values) => { setCustomBackground({
                                            color: values.backgroundColor,
                                            image: values.backgroundImage
                                        });
                                    }} 
                                />
                            ),
                        },
                    ]}
                />
            </div>
        </Modal>
    );
};