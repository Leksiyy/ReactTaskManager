import { CheckOutlined, DeleteOutlined, EditOutlined, UndoOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Tag } from "antd";
import type { Task, StyleSettings } from "../../types/types";
import { useDispatch } from "react-redux";
import { completeTask, deleteTask, restoreTask } from "../../slices/tasksSlice"
import { useState } from "react";
import { EditTaskModal } from "./EditTaskModal";
import { getTaskCardBodyStyle, getTaskCardStyle, TaskBackgroundOverlay, getStatusTagStyle, getTaskTitleStyle, getFooterTagStyle, getRestoreBtnStyle } from "../../utils/taskCardStyles";



type TaskCardProps = {
    task: Task;
    styleSettings: StyleSettings;
}


// TODO Поля updated, deleted? проверить на нулл для вывода


export const TaskCard = ({task, styleSettings}: TaskCardProps) => {
    const dispatch = useDispatch();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); 
    const [isHovered, setIsHovered] = useState(false); 
    const tagsDisplayLength: number = 7;


    const handleRestore = () => dispatch(restoreTask(task.id));
    const handleEdit = () => setIsEditModalOpen(true);
    const handleDelete = () => dispatch(deleteTask(task.id));
    const handleComplete = () => dispatch(completeTask(task.id));

    const cardStyle = getTaskCardStyle(task, styleSettings, isHovered);

    return (
        <>
            <Card
               title={
                <Flex justify="space-between" align="center" style={{ width: "100%" }}>
                    <span style={getTaskTitleStyle(styleSettings.titleSize)}>
                        {task.title}
                    </span>

                    <Flex gap={4} style={{ flexShrink: 0, userSelect: 'none' }}>
                        {task.isCompleted && (
                            <Tag color="success" style={getStatusTagStyle()}>Completed</Tag>
                        )}
                        {task.isDeleted && (
                            <Tag color="error" style={getStatusTagStyle()}>Deleted</Tag>
                        )}
                        {!task.isCompleted && !task.isDeleted && (
                            <Tag color="processing" style={getStatusTagStyle()}>Active</Tag>
                        )}
                    </Flex>

                </Flex>
                }
                extra={<Button icon={<EditOutlined />} onClick={handleEdit} />}
                style={cardStyle}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                styles={{ title: { padding: 0 }, body: getTaskCardBodyStyle() }}
            >

                <TaskBackgroundOverlay task={task} />
                
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
                            <Tag key={`${task.id}-${index}`} style={getFooterTagStyle()}>
                                {tag.length > tagsDisplayLength ? `${tag.slice(0, tagsDisplayLength)}...` : tag}
                            </Tag>
                        ))}
                    </Flex>
                        
                    
                    <Flex justify="space-between" style={{ marginTop: 6, marginBottom: 6, marginLeft:0, marginRight: -5 }}>
                        <Tag  style={getFooterTagStyle()}>added: {task.createdAt}</Tag >
                        
                        {(() => {
                            if (task.deletedAt) {
                                return <Tag style={getFooterTagStyle()}>deleted: {task.deletedAt}</Tag>;
                            }
                            
                            if (task.completedAt) {
                                return <Tag style={getFooterTagStyle()}>completed: {task.completedAt}</Tag>;
                            }
                            
                            if (task.updatedAt) {
                                return <Tag style={getFooterTagStyle()}>updated: {task.updatedAt}</Tag>;
                            }
                            
                            return null;
                        })()}
                        
                    </Flex>
                    
                    <Flex justify="space-between" style={{ marginTop: 8 }}>
                        {task.isCompleted ? (
                            
                            <Button type="default" size="small" style={getRestoreBtnStyle()} icon={<UndoOutlined />} onClick={handleRestore}>
                                Restore
                            </Button>
                        ) : (
                            <Button type="primary" size="small" icon={<CheckOutlined />} onClick={handleComplete}>
                                Done
                            </Button>
                        )}
    
                        {task.isDeleted ? ( !task.isCompleted &&
                            <Button type="default" size="small" style={getRestoreBtnStyle()} icon={<UndoOutlined />} onClick={handleRestore}>
                                Restore
                            </Button>
                        ) : (
                            <Button type="primary" size="small" danger icon={<DeleteOutlined />} onClick={handleDelete}>
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



