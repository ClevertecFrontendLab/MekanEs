export interface ClientFeedback {
    message: string | null;
    rating: number;
}
export interface ServerFeedback extends ClientFeedback {
    id: string;
    fullName: string | null;
    imageSrc: string | null;
    createdAt: string;
}

export interface FeedbackSlice {
    feedbacks: ServerFeedback[];
    newFeedback: ClientFeedback | undefined;
}
