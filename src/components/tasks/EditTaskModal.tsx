import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editTask } from "../../slices/tasksSlice";
import { Form, Input, Modal } from "antd";
import { validateTaskData } from "../../utils/taskActions";
import type { Background, Task } from "../../types/types";
import { BackgroundCustomizer } from "./BackgroundTaskCustomizer";

interface EditTaskModalProps {
    open: boolean;
    onClose: () => void;
    task: Task;
}

export const EditTaskModal = ({ open, onClose, task }: EditTaskModalProps) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState(task.title);
    const [text, setText] = useState(task.text);
    const [tagInput, setTagInput] = useState(task.tags.join(", "));
    const [tags, setTags] = useState<string[]>(task.tags);
    const [background, setBackground] = useState(task.background);

    useEffect(() => {
        if (open) {
            setTitle(task.title);
            setText(task.text);
            setTagInput(task.tags.join(", "));
            setTags(task.tags);
            setBackground(task.background);
        }
    }, [open, task]);

    const handleEditTask = () => {
        if (!validateTaskData(title, text)) {
            return;
        }
        
        const processedTags = tagInput
            .split(",")
            .map(tag => tag.trim())
            .filter(tag => tag !== "");
            
        dispatch(editTask({ 
            taskId: task.id, 
            updatedData: { 
                title, 
                text, 
                tags: processedTags,
                background 
            } 
        }));
        onClose();
    };

    return (
        <Modal
            title="Edit Task"
            open={open}
            onCancel={onClose}
            onOk={handleEditTask}
        >
            <Form layout="vertical">
                <Form.Item label="Title" required>
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Form.Item>
                <Form.Item label="Text" required>
                    <Input.TextArea
                        value={text}
                        rows={7}
                        onChange={(e) => setText(e.target.value)}
                    />
                </Form.Item>
                <Form.Item label="Tags">
                    <Input
                        placeholder="Comma separated"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                    />
                </Form.Item>

                <Form.Item label="Background Customization">
                    <BackgroundCustomizer
                        initialColor={background?.color}
                        initialImage={background?.image}
                        onChange={(values) => {
                            const newBackground: Background = {
                                color: values.backgroundColor,
                                image: values.backgroundImage
                              };
                              setBackground(newBackground); 
                        }}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};