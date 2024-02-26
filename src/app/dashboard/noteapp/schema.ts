import * as yup from "yup";
export const schema = yup.object().shape({
    title: yup.string()
        .required('Title is required'),
    content: yup.string()
        .required('Content is required')
})