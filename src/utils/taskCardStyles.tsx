import type { CSSProperties,  } from "react";
import type { Task, StyleSettings } from "../types/types";

export const getTaskCardStyle = (task: Task, styleSettings: StyleSettings, isHovered: boolean): CSSProperties => {
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

    // анимация наведения
    style.transition = "all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)";
    style.transform = isHovered ? 'translateY(-5px)' : 'translateY(0)';
    style.boxShadow = isHovered
        ? '0 6px 16px rgba(0, 0, 0, 0.12)'
        : '0 4px 12px rgba(0, 0, 0, 0.08)';
     
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
export const TaskBackgroundOverlay = ({ task }: { task: Task }) => {
    if (!task.background?.image?.url) return null;

    const backgroundStyle: CSSProperties = {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url(${task.background.image.url})`,
        backgroundSize: task.background.image.size || "cover",
        backgroundPosition: task.background.image.position || "center",
        backgroundRepeat: "no-repeat",
        opacity: task.background.image.opacity !== undefined ? task.background.image.opacity / 100 : 1,
        zIndex: -1,
        pointerEvents: "none",
    };

    return <div style={backgroundStyle} />;
};


export const getStatusTagStyle = (): CSSProperties => ({
    fontSize: 10,
    padding: "0px 6px",
    height: "auto",

});

export const getTaskTitleStyle = (fontSize: number): CSSProperties => ({
    maxWidth: "80%",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    fontSize,    // фонтсайз передаем в параметры метода, он определяется в сеттингс и передается через редакс
});

export const getFooterTagStyle = (): CSSProperties => ({
    fontSize: "12px",
    padding: "0px 4px",
});


export const getRestoreBtnStyle = (): CSSProperties => ({
    backgroundColor: '#e6fffb',
    borderColor: '#5cdbd3',
    color: '#006d75',
});