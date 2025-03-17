import { message } from "antd";

export const validateTaskData = (title: string, text: string) => {
    const minTitleLength = 3;
    const minTextLength = 3;

    if (title.length < minTitleLength || text.length < minTextLength) {
        message.error(`Title and Text must be at least ${minTitleLength} and ${minTextLength} characters`);
        return false;
    }

    return true;
};