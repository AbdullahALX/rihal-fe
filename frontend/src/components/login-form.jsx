import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

import { signInUser } from '../config/firebaseConfig';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/components/theme-provider';

import ClipLoader from 'react-spinners/ClipLoader';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

const getLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          reject(error.message);
        }
      );
    } else {
      reject('Geolocation is not supported by this browser.');
    }
  });
};

export function LoginForm({ className, ...props }) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  const handleLogin = async (values, { setSubmitting, setErrors }) => {
    try {
      setLoading(true);
      // Get current location
      const location = await getLocation();
      console.log('Location retrieved:', location);

      // Call the signInUser
      await signInUser(values.email, values.password, location);

      // Successfully logged in
      setLoading(false);
      toast({
        title: 'Login Successful',
        description: 'Welcome back!',
      });
    } catch (error) {
      // setErrors({ email: error.message });
      setLoading(false);
      toast({
        title: 'Login Failed',
        description: 'incorrect email or password',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={handleLogin}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <form
          className={cn('flex flex-col gap-6', className)}
          onSubmit={handleSubmit}
          noValidate // Disable browser default validation
          {...props}
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Login to your account</h1>
            <p className="text-balance text-sm text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="user@crimify.com"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.email && !!errors.email}
              />
              {touched.email && errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  onClick={() =>
                    toast({
                      title: 'You should remember it',
                      description: 'JK, coming soon :)',
                    })
                  }
                  className="ml-auto text-sm underline-offset-4 hover:underline cursor-pointer"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.password && !!errors.password}
              />
              {touched.password && errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>
            <Button type="submit" className="w-full">
              {loading ? (
                <ClipLoader
                  color={theme === 'dark' ? 'black' : 'white'}
                  size={20}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                <span>Login</span>
              )}
            </Button>
          </div>
          <div className="text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link className="underline underline-offset-4" to="/sign-up">
              Sign up
            </Link>
          </div>
        </form>
      )}
    </Formik>
  );
}
