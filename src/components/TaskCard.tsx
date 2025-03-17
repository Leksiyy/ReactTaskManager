import { CheckOutlined, DeleteOutlined, EditOutlined, UndoOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Tag, Typography } from "antd";
import type { Task, StyleSettings } from "../types/types";
import { useDispatch } from "react-redux";
import { completeTask, deleteTask } from "../slices/tasksSlice"
import { useState } from "react";
import { EditTaskModal } from "./tasks/EditTaskModal";

const { Text } = Typography;



type TaskCardProps = {
    task: Task;
    styleSettings: StyleSettings;
}


export const TaskCard = ({task, styleSettings}: TaskCardProps) => {

    // TODO фоновая картинка.
    // TODO Поля updated, deleted? проверить на нулл для вывода

    const dispatch = useDispatch();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); 
    const tagsDisplayLength: number = 5;

    const handleRestore = () => {
        // TODO RESTORE action
    };

    const handleEdit = () => {
        setIsEditModalOpen(true);
    };;

    const handleDelete = () => {
        dispatch(deleteTask(task.id));
    };

    const handleComplete = () => {
        dispatch(completeTask(task.id));
    };


    return (
    <>
        <Card   
            title={<span style={{ fontSize: styleSettings.titleSize }}>{task.title}</span>}
            extra={<Button icon={<EditOutlined />} onClick={handleEdit}/>}
            style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                minHeight: '200px',
                whiteSpace: 'pre-line',
                wordWrap: 'break-word',
                overflow: 'hidden',
                backgroundColor: styleSettings.bgColor,
                padding: styleSettings.padding,      
            }}
            styles={{
                body: { 
                    display: 'flex', 
                    flexDirection: 'column', 
                    flex: 1, 
                    height: '100%' 
                }
            }}
            >
                <div style={{ flex: '1 0 auto' }}>
                    <p style={{ 
                        fontSize: styleSettings.descriptionSize,
                        marginTop: 0,
                        }}>{task.text}</p>
                </div>

                <div style={{ marginTop: 'auto' }}>

                    <Flex wrap="wrap" gap={4} style={{ marginTop: 10}}  >
                        {task.tags.map((tag) => (
                            <Tag key={tag}>{tag.length > tagsDisplayLength ? `${tag.slice(0, tagsDisplayLength)}...` : tag}</Tag>
                        ))}
                    </Flex>

                    <Flex justify="space-between" style={{ marginTop: 8, marginBottom: 8, marginLeft:-1 }}>
                        <Text keyboard>added: {task.createdAt}</Text>
                        <Text keyboard>updated: {task.updatedAt || "—"}</Text>

                        {/* {task.updatedAt ? <Text keyboard>updated: {task.updatedAt}</Text> : null}   <<-- Потом оставить это, и не выводить апдеитДате если там нулл? */}

                    </Flex>
                    
                    

                    <Flex justify="space-between" style={{ marginTop: 12}} >
                        {(task.isCompleted ?? false) || (task.isDeleted ?? false) ? (
                            <Button type="default" icon={<UndoOutlined/>} onClick={handleRestore} >Restore</Button>
                        ) : (
                            <Button type="primary" icon={<CheckOutlined/>} onClick={handleComplete} >Done</Button>
                        )}

                        {(task.isDeleted ?? false) ? (
                            <Button type="default" icon={<UndoOutlined />} onClick={handleRestore}>
                                Restore
                            </Button>
                        ) : (
                            <Button type="primary" danger icon={<DeleteOutlined />} onClick={handleDelete}>
                                Delete
                            </Button>
                        )}

                        {(task.isDeleted ?? false) && !(task.isCompleted ?? false) && (
                            <Button type="primary" icon={<CheckOutlined />} onClick={handleComplete}>
                                Done
                            </Button>
                        )}
                    </Flex>
                </div>
                    
        </Card>

        {/* Modal for Edit */}
        <EditTaskModal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} task={task} />
    </>
    )
}



