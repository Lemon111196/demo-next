export interface INote {
    id: string;
    title: string,
    content: string,
    status: any,
}
export interface IForm {
    loading: boolean,
    notes: INote[]
    error: null | string,
}
