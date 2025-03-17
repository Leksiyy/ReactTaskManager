import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editTask } from "../../slices/tasksSlice";
import { Form, Input, Modal } from "antd";
import { validateTaskData } from "../../utils/taskActions";
import type { Task } from "../../types/types";

interface EditTaskModalProps {
    open: boolean;
    onClose: () => void;
    task: Task;
}

export const EditTaskModal = ({ open, onClose, task }: EditTaskModalProps) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState(task.title);
    const [text, setText] = useState(task.text);
    const [tags, setTags] = useState<string[]>(task.tags);

    useEffect(() => {
        if (open) {
            setTitle(task.title);
            setText(task.text);
            setTags(task.tags);
        }
    }, [open, task]);

    const handleEditTask = () => {
        if (!validateTaskData(title, text)) {
            return;
        }
        dispatch(editTask({ taskId: task.id, updatedData: { title, text, tags } }));
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
                        onChange={(e) => setText(e.target.value)}
                    />
                </Form.Item>
                <Form.Item label="Tags">
                    <Input
                        value={tags.join(", ")}
                        onChange={(e) =>
                            setTags(e.target.value.split(",").map((tag) => tag.trim()))
                        }
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};
