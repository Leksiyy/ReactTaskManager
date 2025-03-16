import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../slices/tasksSlice";
import { Input, Modal } from "antd";





interface AddTaskModalProps {
    visible: boolean,
    onClose: ()=> void;
}

export const AddTaskModal = ({visible, onClose }: AddTaskModalProps) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [tags, setTags] = useState<string[]>([]);

    const handleAddTask = () => {
        dispatch(addTask({ title, text, tags}));
        onClose();
    }

    return (
        <Modal
            title="Add New Task"
            visible={visible}
            onCancel={onClose}
            onOk={handleAddTask}
        >
            <Input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ marginBottom: 16 }}
            />
            <Input.TextArea
                placeholder="Text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{ marginBottom: 16 }}
            />
            <Input
                placeholder="Tags (comma separated)"
                value={tags.join(", ")}
                onChange={(e) => setTags(e.target.value.split(",").map(tag => tag.trim()))}
                style={{ marginBottom: 16 }}
            />
        </Modal>
    );

}