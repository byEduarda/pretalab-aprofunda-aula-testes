export interface PostWithUserDTO {
    title: string;
    content: string;
    user: {
        name: string;
        email: string;
    }
}