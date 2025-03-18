import type { CSSProperties,  } from "react";
import type { Task, StyleSettings } from "../types/types";

// Функция для стилей карточки задачи
export const getTaskCardStyle = (task: Task, styleSettings: StyleSettings): CSSProperties => ({
    display: "flex",
    flexDirection: "column",
    minHeight: "200px",
    whiteSpace: "pre-line",
    wordWrap: "break-word",
    overflow: "hidden",
    padding: styleSettings.padding,
    backgroundColor: task.background?.color || styleSettings.bgColor,
    backgroundImage: task.background?.image?.url ? `url(${task.background.image.url})` : undefined,
    backgroundSize: task.background?.image?.size || "cover",
    backgroundPosition: task.background?.image?.position || "center",
    backgroundRepeat: "no-repeat",
    position: task.background?.image?.url ? "relative" : undefined,
});

// стили для body ТаскКард, нужен для флекса
export const getTaskCardBodyStyle = (): CSSProperties => ({
    display: "flex",
    flexDirection: "column",
    flex: 1,
    height: "100%",
});


// компонент для фона
export const TaskBackgroundOverlay = ({ task, styleSettings }: { task: Task; styleSettings: StyleSettings }) => {
    if (!task.background?.image?.url || task.background.image.opacity === undefined) return null;

    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: task.background.color || styleSettings.bgColor,
                opacity: (100 - task.background.image.opacity) / 100,
                zIndex: 0,
            }}
        />
    );
};
