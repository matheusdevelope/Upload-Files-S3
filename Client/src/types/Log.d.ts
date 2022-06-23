export interface ILog {
    id?: string;
    requester: string;
    type: string;
    sector: string;
    data: string;
    created_at?: Date;
}

export interface IPaginationLog {
    take: number;
    skip: number;
    keyword: string;
}