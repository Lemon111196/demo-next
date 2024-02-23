"use client"
import { Button, Checkbox, CircularProgress, FormControlLabel, IconButton, InputAdornment, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import PersonIcon from '@mui/icons-material/Person';
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from './style.module.css'

export default function LoginPage() {

  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const formDefaultValues = {
    username: '',
    password: '',
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
  };
  //!Go dashboard
  const gotoDashboard = () => {
    router.push('/')
  }
  return (
    <div className={styles.loginContainer}>
      <div className={styles.wrapper}>
        <h1 className={styles.header}>Log in</h1>
        <Controller
          control={control}
          name="username"
          render={({ field }) =>
            <TextField
              className={styles.input}
              {...field}
              color="secondary"
              label="Username"
              variant="filled"
              sx={{ input: { color: 'white' } }}
              InputLabelProps={{
                style: { color: '#fff' },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleBtn} edge="end">
                      <PersonIcon className={styles.icon}></PersonIcon>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />}
        />

        {errors.username && (
          <span className={styles.error}>{errors?.username?.message?.toString()}</span>
        )}
        <div className={styles.inputForm}>
          <Controller
            control={control}
            name="password"
            render={({ field }) =>
              <TextField
                className={styles.input}
                {...field}
                color="secondary"
                type={showPassword ? 'text' : 'password'}
                label="Password"
                variant="filled"
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
        </div>
        {errors.password && (
          <span className={styles.error}>{errors?.password?.message?.toString()}</span>
        )}
        <div className="checkbox-wrapper">
          <div className={styles.checkbox}>
            <FormControlLabel control={<Checkbox sx={{ color: "white" }} color="secondary" />} label="Remember me" />
            <p><Link className={styles.link} href='/auth/register'>Forgot Password? </Link></p>
          </div>
          <Button color="secondary"
            type="submit"
            variant="contained"
            className={styles.btn}
            onClick={handleSubmit(gotoDashboard)}
            disabled={loading}
          >{loading ? <CircularProgress color="success" /> : 'Log in'}</Button>
        </div>
        <p className={styles.register}>Don't you have an account?<Link className={styles.link} href='/auth/register'>Register</Link></p>
      </div>
    </div>
  )
}
