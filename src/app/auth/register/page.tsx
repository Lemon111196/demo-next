"use client"

import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import styles from './style.module.css'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from './schema'
import { Button, IconButton, InputAdornment, TextField } from '@mui/material'
import Link from 'next/link'
import { useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { IForm } from './interface'
import { apiService } from '@/src/services'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { AuthActions } from '@/src/store/authStore/authReducer'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const router = useRouter();


  const formDefaultValues = {
    username: '',
    name: '',
    password: '',
    confirmPassword: '',
  }
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: formDefaultValues
  })

  //!Show password
  const toggleBtn = () => {
    setShowPassword(!showPassword);
  }
  const toggleBtnConfirm = () => {
    setShowConfirmPassword(!showConfirmPassword);
  }

  //!Create a new account
  const createAccount: SubmitHandler<IForm> = async (data) => {
    console.log(data);
    try {
      dispatch(AuthActions.setRegister(true));
      const response = await apiService.post(`/auth/register`, data)
      if (response.status === 200) {
        toast.success('Account registered successfully');
        router.push('/auth/login')
      }
    } catch (error) {
      toast.error('Error registering account');
    }
  }

  return (
    <div className={styles.registerContainer}>
      <div className={styles.formWrapper}>
        <h1 className={styles.header}>Sign up</h1>
        <div className={styles.inputForm}>
          <Controller
            control={control}
            name="username"
            render={({ field }) =>
              <TextField
                {...field}
                className={styles.input}
                name="username"
                color="secondary"
                id="filled-basic"
                label="Username"
                variant="filled"
                sx={{ input: { color: 'white' } }}
                InputLabelProps={{
                  style: { color: '#fff' },
                }}
              />}
          />
          {errors.username && (
            <span className={styles.error}>{errors?.username?.message?.toString()}</span>
          )}
        </div>
        <div className={styles.inputForm}>
          <Controller
            control={control}
            name="name"
            render={({ field }) =>
              <TextField
                className={styles.input}
                {...field}
                name="name"
                color="secondary"
                id="filled-basic"
                label="Name"
                variant="filled"
                sx={{ input: { color: 'white' } }}
                InputLabelProps={{
                  style: { color: '#fff' },
                }}
              />}
          />
          {errors.name && (
            <span className={styles.error}>{errors?.name?.message?.toString()}</span>
          )}
        </div>
        <div className={styles.inputForm}>
          <Controller
            control={control}
            name="password"
            render={({ field }) =>
              <TextField
                className={styles.input}
                {...field}
                name="password"
                color="secondary"
                id="filled-basic"
                label="Password"
                variant="filled"
                type={showPassword ? 'text' : 'password'}
                sx={{ input: { color: 'white' } }}
                InputLabelProps={{
                  style: { color: '#fff' },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={toggleBtn} edge="end">
                        {showPassword ? <VisibilityIcon className={styles.icon} /> : <VisibilityOffIcon className={styles.icon} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />}
          />
          {errors.password && (
            <span className={styles.error}>{errors?.password?.message?.toString()}</span>
          )}
        </div>
        <div className={styles.inputForm}>
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field }) =>
              <TextField
                className={styles.input}
                {...field}
                name="confirmPassword"
                inputProps={{ style: { color: `white` } }}
                color="secondary"
                id="filled-basic"
                label="Confirm Password"
                variant="filled"
                type={showConfirmPassword ? 'text' : 'password'}
                sx={{ input: { color: 'white' } }}
                InputLabelProps={{
                  style: { color: '#fff' },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={toggleBtnConfirm} edge="end">
                        {showConfirmPassword ? <VisibilityIcon className={styles.icon} /> : <VisibilityOffIcon className={styles.icon} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />}
          />
          {errors.confirmPassword && (
            <span className={styles.error}>{errors?.confirmPassword?.message?.toString()}</span>
          )}
        </div>
        <div>
          <Button
            onClick={handleSubmit(createAccount)}
            color="secondary"
            type="submit"
            variant="contained"
            className={styles.btn}
          >Register</Button>
        </div>
        <p className={styles.back}>Already have an account?<Link className={styles.link} href='/auth/login'>Sign in</Link></p>
      </div>
    </div>
  )
}
