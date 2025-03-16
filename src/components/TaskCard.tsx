import { CheckOutlined, DeleteOutlined, EditOutlined, UndoOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Tag, Typography } from "antd";
import type { Task, StyleSettings } from "../types/types";

const { Text } = Typography;



type TaskCardProps = {
    task: Task;
    styleSettings: StyleSettings;

    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onComplete: (id: string) => void;
    onRestore: (id: string) => void;
}


export const TaskCard = ({task, styleSettings, onEdit, onDelete, onComplete, onRestore}: TaskCardProps) => {

        // TODO фоновая картинка.
    // TODO Поля updated, deleted? проверить на нулл для вывода

    const tagsDisplayLength: number = 5;

    return <Card   
        title={<span style={{ fontSize: styleSettings.titleSize }}>{task.title}</span>}
        extra={<Button icon={<EditOutlined />} 
        onClick={() => onEdit(task.id)} />}
        style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            minHeight: '200px',
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
                <p style={{ fontSize: styleSettings.descriptionSize }}>{task.text}</p>
            </div>

            <div style={{ marginTop: 'auto' }}>

                <Flex wrap="wrap" gap={4} style={{ marginTop: 10}}  >
                    {task.tags.map((tag) => (
                        <Tag key={tag}>{tag.length > tagsDisplayLength ? `${tag.slice(0, 5)}...` : tag}</Tag>
                    ))}
                </Flex>

                <Flex justify="space-between" style={{ marginTop: 8, marginBottom: 8, marginLeft:-1 }}>
                    <Text keyboard>added: {task.createdAt}</Text>
                    <Text keyboard>updated: {task.updatedAt || "—"}</Text>

                    {/* {task.updatedAt ? <Text keyboard>updated: {task.updatedAt}</Text> : null}   <<-- Потом оставить это, и не выводить апдеитДате если там нулл? */}

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



