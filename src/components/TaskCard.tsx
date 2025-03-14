import { CheckOutlined, DeleteOutlined, EditOutlined, UndoOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Tag, Typography } from "antd";
import { useState } from "react";

const { Text } = Typography;

// Тип лучше вынести и экспортировать, если он будет использоваться в других модулях.
type Task = {
    id: string,
    title: string,
    text: string,
    createdAt: string,
    updatedAt?: string,
    deletedAt?: string,
    completedAt?: string,
    isCompleted?: boolean,
    isDeleted?: boolean,
    tags: string[],
};

type TaskCardProps = {
    task: Task;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onComplete: (id: string) => void;
    onRestore: (id: string) => void;
}


export const TaskCard = ({task, onEdit, onDelete, onComplete, onRestore}: TaskCardProps) => {

    // TODO Добавить фоновый цвет или картинка.
    // TODO Обрезание текста в теге

    return <Card   
        title={task.title}
        extra={<Button icon={<EditOutlined />} 
        onClick={() => onEdit(task.id)} />}
        style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            minHeight: '200px' 
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
                <p>{task.text}</p>
            </div>

            <div style={{ marginTop: 'auto' }}>
                <Flex justify="space-between" style={{ marginTop: 8, marginBottom: 8, marginLeft:-1 }}>
                    <Text keyboard>added: {task.createdAt}</Text>
                    <Text keyboard>updated: {task.updatedAt || "—"}</Text>
                </Flex>
                
                <Flex wrap="wrap" gap={4} style={{ marginTop: 10}}  >
                    {task.tags.map((tag) => (
                        <Tag key={tag}>#{tag}</Tag>
                    ))}
                </Flex>

                <Flex justify="space-between" style={{ marginTop: 12}} >
                    {(task.isCompleted ?? false) || (task.isDeleted ?? false) ? (
                        <Button type="default" icon={<UndoOutlined/>} onClick={()=> onRestore(task.id)} >Restore</Button>
                    ) : (
                        <Button type="primary" icon={<CheckOutlined/>} onClick={() => onComplete(task.id)} >Done</Button>
                    )}

                    {(task.isDeleted ?? false) ? (
                        <Button type="default" icon={<UndoOutlined />} onClick={() => onRestore(task.id)}>
                            Restore
                        </Button>
                    ) : (
                        <Button type="primary" danger icon={<DeleteOutlined />} onClick={() => onDelete(task.id)}>
                            Delete
                        </Button>
                    )}

                    {(task.isDeleted ?? false) && !(task.isCompleted ?? false) && (
                        <Button type="primary" icon={<CheckOutlined />} onClick={() => onComplete(task.id)}>
                            Done
                        </Button>
                    )}
                </Flex>
            </div>
                   
    </Card>
}



