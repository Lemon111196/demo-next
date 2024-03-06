export interface INote {
    _id: string;
    title: string,
    content: string,
    status: string,
}
export interface IForm {
    loading: boolean,
    notes: INote[]
    error: null | string,
}
