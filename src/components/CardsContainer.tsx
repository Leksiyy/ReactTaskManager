import { Content } from "antd/es/layout/layout";
import { TaskCard } from "./TaskCard";
import { useState } from "react";
import { AddTaskModal } from "./AddTaskModal";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { AddTaskButton } from "./AddTaskButton";


// Методы потом уберу
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
    const tasks = useSelector((state: RootState) => state.tasks.tasks);
    const settings = useSelector((state: RootState) => state.settings);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleShowModal = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

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
                <AddTaskButton onClick={handleShowModal} />

                {/* Здесь будут карточки */}
                {tasks.map(task => 
                    <TaskCard 
                        key={task.id}
                        task={task}
                        styleSettings={settings}
                        onEdit={handleEdit} 
                        onDelete={handleDelete} 
                        onComplete={handleComplete} 
                        onRestore={handleRestore}
                    />
                )}
            </div>


            <AddTaskModal open={isModalVisible} onClose={handleCloseModal} />

        </Content>
    );
};

export default CardsContainer;