import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../slices/tasksSlice";
import { Form, Input, message, Modal } from "antd";


interface AddTaskModalProps {
    open: boolean,
    onClose: ()=> void;
}


export const AddTaskModal = ({open, onClose }: AddTaskModalProps) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [tags, setTags] = useState<string[]>([]);

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
        if(title.length < minTitleLength || text.length < minTextLength) {
            message.error(`Title and Text must be at least ${minTitleLength} and ${minTextLength} characters`);
            return;
        }
        dispatch(addTask({ title, text, tags}));
        onClose();
    }

    const handleEnterKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") {
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
        >
             <div onKeyDown={handleEnterKeyDown}>
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
            </div>
        </Modal>
    );
};