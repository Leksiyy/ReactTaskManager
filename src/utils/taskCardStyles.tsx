import type { CSSProperties,  } from "react";
import type { Task, StyleSettings } from "../types/types";

export const getTaskCardStyle = (task: Task, styleSettings: StyleSettings): CSSProperties => {
    const style: CSSProperties = {};
    style.display = "flex";
    style.flexDirection = "column";
    style.minHeight = "200px";
    style.whiteSpace = "pre-line";
    style.wordWrap = "break-word";
    style.overflow = "hidden";
    style.padding = styleSettings.padding;
    style.backgroundColor = task.background && task.background.color ? task.background.color : styleSettings.bgColor;
    style.width = styleSettings.cardWidth;
    style.height = styleSettings.cardHeight;
    
    if (task.background && task.background.image && task.background.image.url) {
        style.backgroundImage = `url(${task.background.image.url})`;
        style.backgroundSize = task.background.image.size || "cover";
        style.backgroundPosition = task.background.image.position || "center";
        style.backgroundRepeat = "no-repeat";
    }
    
    return style;
};

// стили для body ТаскКард, нужен для флекса 
export const getTaskCardBodyStyle = (): CSSProperties => {
    const style: CSSProperties = {};
    style.display = "flex";
    style.flexDirection = "column";
    style.flex = 1;
    style.height = "100%";
    style.padding = "16px";
    style.overflow = "hidden";
    return style;
};

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
                pointerEvents: "none",
            }}
        />
    );
};
