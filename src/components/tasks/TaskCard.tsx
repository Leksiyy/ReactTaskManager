import { CheckOutlined, DeleteOutlined, EditOutlined, UndoOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Tag, Typography } from "antd";
import type { Task, StyleSettings } from "../../types/types";
import { useDispatch } from "react-redux";
import { completeTask, deleteTask, restoreTask } from "../../slices/tasksSlice"
import { useState } from "react";
import { EditTaskModal } from "./EditTaskModal";
import { getTaskCardBodyStyle, getTaskCardStyle, TaskBackgroundOverlay } from "../../utils/taskCardStyles";


const { Text } = Typography;


type TaskCardProps = {
    task: Task;
    styleSettings: StyleSettings;
}


// TODO Поля updated, deleted? проверить на нулл для вывода


export const TaskCard = ({task, styleSettings}: TaskCardProps) => {
    const dispatch = useDispatch();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); 
    const tagsDisplayLength: number = 7;

    const handleRestore = () => dispatch(restoreTask(task.id));
    const handleEdit = () => setIsEditModalOpen(true);
    const handleDelete = () => dispatch(deleteTask(task.id));
    const handleComplete = () => dispatch(completeTask(task.id));


    return (
        <>
            <Card   
                title={<span style={{ fontSize: styleSettings.titleSize }}>{task.title}</span>}
                extra={<Button icon={<EditOutlined />} onClick={handleEdit}/>}
                style={getTaskCardStyle(task, styleSettings)}
                styles={{ body: getTaskCardBodyStyle() }}
            >
                <TaskBackgroundOverlay task={task} styleSettings={styleSettings} />
                
                <div className="task-card-text-container">
                    <div className="task-card-scrollable-text">
                        <p 
                            className="task-card-text" 
                            style={{ fontSize: styleSettings.descriptionSize }}
                        >
                            {task.text}
                        </p>
                    </div>
                </div>
    
                <div className="task-card-bottom">
                    <Flex wrap="wrap" gap={4} style={{ marginTop: 10 }}>
                        {task.tags.map((tag, index) => (
                            <Tag key={`${task.id}-${index}`}>
                                {tag.length > tagsDisplayLength ? `${tag.slice(0, tagsDisplayLength)}...` : tag}
                            </Tag>
                        ))}
                    </Flex>
    
                    <Flex justify="space-between" style={{ marginTop: 8, marginBottom: 8, marginLeft:-1 }}>
                        <Text keyboard>added: {task.createdAt}</Text>
                        <Text keyboard>updated: {task.updatedAt || "—"}</Text>

                        {/* {task.updatedAt ? <Text keyboard>updated: {task.updatedAt}</Text> : null}   <<-- Потом оставить это, и не выводить апдеитДате если там нулл? */}
                    </Flex>
                    
                    <Flex justify="space-between" style={{ marginTop: 12 }}>
                        {task.isCompleted ? (
                            <Button type="default" icon={<UndoOutlined />} onClick={handleRestore}>
                                Restore
                            </Button>
                        ) : (
                            <Button type="primary" icon={<CheckOutlined />} onClick={handleComplete}>
                                Done
                            </Button>
                        )}
    
                        {task.isDeleted ? ( !task.isCompleted &&
                            <Button type="default" icon={<UndoOutlined />} onClick={handleRestore}>
                                Restore
                            </Button>
                        ) : (
                            <Button type="primary" danger icon={<DeleteOutlined />} onClick={handleDelete}>
                                Delete
                            </Button>
                        )}
                    </Flex>
                </div>            
            </Card>

            <EditTaskModal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} task={task} />

        </>
    )
}



