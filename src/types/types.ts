

export type Background = {
    color?: string;
    image?: {
      url?: string;
      opacity?: number;
      size?: string;
      position?: string;
    };
}

export type Task = {
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

    background?: Background;
};


export type StyleSettings = {
    bgColor: string;
    padding: number;
    titleSize: number;
    descriptionSize: number;
    
    cardWidth: number;
    cardHeight: number;
}

export type SearchQuery = {
    searchString: string;
    searchTags: string[];
}