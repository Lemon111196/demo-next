import * as yup from "yup";
export const schema = yup.object().shape({
    username: yup.string()
        .required('Username is required')
        .max(20, 'Username must be at most 20 characters'),
    name: yup.string()
        .required('Name is required')
        .max(20, 'Name must be at most 20 characters'),
    password: yup.string()
        .required('Password is required')
        .min(3, 'Password must be at least 3 characters'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), undefined], 'Passwords must match')
        .required('Confirm Password is required')
})