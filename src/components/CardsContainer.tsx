import { Content } from "antd/es/layout/layout";
import { TaskCard } from "./TaskCard";
import { useState } from "react";


const Tasks = [
    {
        id: "1",
        title: "card title 1",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
        createdAt: new Date().toLocaleDateString(),
        updatedAt: new Date().toLocaleDateString(),
        tags: ["zxc", "test", "qwe"]
    },
    {
        id: "2",
        title: "card title 2",
        text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium ",
        createdAt: new Date().toLocaleDateString(),
        updatedAt: new Date().toLocaleDateString(),
        tags: ["23", "12", "gh"]
    },
]

// Потом вынести методы?
const handleEdit = (id: string) => {
    console.log("Edit task", id);
};

const handleDelete = (id: string) => {
    console.log("Delete task", id);
};

const handleComplete = (id: string) => {
    console.log("Complete task", id);
};

const handleRestore = (id: string) => {
    console.log("Restore task", id);
};




const CardsContainer = () => {
    const [tasks, setTasks] = useState(Tasks);

    return (
        <Content
            style={{
                padding: '24px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'start',
                background: '#f5f5f5',
            }}
        >
            <div
                style={{
                    width: '100%',
                    maxWidth: '1200px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '16px',
                    padding: '24px',
                    background: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
            >
                {/* Здесь будут карточки */}
                {Tasks.map(task => 
                    <TaskCard 
                        key={task.id}
                        task={task}
                        onEdit={handleEdit} 
                        onDelete={handleDelete} 
                        onComplete={handleComplete} 
                        onRestore={handleRestore}
                    />
                )}
                             
            </div>
        </Content>
    );
};

export default CardsContainer;