import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

import { signUpUser } from '../config/firebaseConfig';

import { useTheme } from '@/components/theme-provider';
import ClipLoader from 'react-spinners/ClipLoader';

// Validation schema
const SignUpSchema = Yup.object().shape({
  name: Yup.string().required('Full name is required'),
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

export function SignUpForm({ className, ...props }) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  const handleSignUp = async (values, { setSubmitting, setErrors }) => {
    try {
      setLoading(true);
      const location = await getLocation();
      console.log('User location:', location);

      await signUpUser(values.name, values.email, values.password, location);

      setLoading(false);
      // Show success toast
      toast({
        title: 'Success',
        description: 'Your account has been created successfully!',
      });
    } catch (error) {
      setLoading(false);

      let errorMessage = 'Something went wrong. Please try again later.';

      if (error.message.includes('email-already-in-use')) {
        errorMessage = 'This email is already in use. Try another one.';
      } else if (error.message.includes('invalid-email')) {
        errorMessage = 'Invalid email address. Please enter a valid email.';
      }
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={SignUpSchema}
      onSubmit={handleSignUp}
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
          noValidate // disable browser default validation
          {...props}
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Create an account</h1>
            <p className="text-balance text-sm text-muted-foreground">
              Enter your details below to sign up for an account
            </p>
          </div>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.name && !!errors.name}
              />
              {touched.name && errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>

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
              <Label htmlFor="password">Password</Label>
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
                <span> Sign Up</span>
              )}
            </Button>
          </div>
          <div className="text-center text-sm">
            Already have an account?{' '}
            <Link className="underline underline-offset-4" to="/login">
              Log in
            </Link>
          </div>
        </form>
      )}
    </Formik>
  );
}
