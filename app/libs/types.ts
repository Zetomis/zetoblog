export interface UserInterface {
    id: string;
    email: string;
    username: string;
}

export interface BlogInterface {
    id: string;
    userId: string;
    content: string;
    title: string;
}

export interface CommentInterface {
    id: string;
    content: string;
    createdAt: string;
    userId: string;
    blogId: string;
}
