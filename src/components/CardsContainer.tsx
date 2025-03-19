import { Content } from "antd/es/layout/layout";
import { TaskCard } from "./tasks/TaskCard";
import { useState } from "react";
import { AddTaskModal } from "./tasks/AddTaskModal";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { AddTaskButton} from "./tasks/AddTaskButton.tsx";
import {SearchQuery} from "../types/types.ts";

type CardsContainerProps = {
    position: 'Current' | 'Archive';
};

const CardsContainer = ({ position }: CardsContainerProps) => {
    const tasks = useSelector((state: RootState) => state.tasks.tasks);
    const settings = useSelector((state: RootState) => state.settings);
    const searchQuery: SearchQuery = useSelector((state: RootState) => state.search);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleShowModal = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const filteredTasks = tasks.filter(task => {
        const matchesPosition = position === 'Current'
            ? !task.isDeleted && !task.isCompleted
            : task.isDeleted || task.isCompleted;

        const matchesSearchString = searchQuery.searchString
            ? task.title.includes(searchQuery.searchString) ||
            task.text.includes(searchQuery.searchString) ||
            task.tags.some(tag => tag.includes(searchQuery.searchString))
            : true;

        const matchesTags = searchQuery.searchTags.length > 0
            ? searchQuery.searchTags.some(tag =>
                (tag === "у шапці" && task.title.includes(searchQuery.searchString)) ||
                (tag === "описі" && task.text.includes(searchQuery.searchString)) ||
                (tag === "тегах" && task.tags.some(t => t.includes(searchQuery.searchString)))
            )
            : true;

        return matchesPosition && matchesSearchString && matchesTags;
    });

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
                    // gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gridTemplateColumns: `repeat(auto-fill, ${settings.cardWidth}px)`,
                    gap: '16px',
                    padding: '24px',
                    background: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
            >
                {position === "Current" && <AddTaskButton onClick={handleShowModal} />}

                {/* Здесь будут карточки */}
                {filteredTasks.map(task =>
                    <TaskCard 
                        key={task.id}
                        task={task}
                        styleSettings={settings}
                    />
                )}
            </div>


            <AddTaskModal open={isModalVisible} onClose={handleCloseModal} />

        </Content>
    );
};

export default CardsContainer;