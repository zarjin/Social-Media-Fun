import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const password = watch('password', '');

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await registerUser(data);
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-5rem)] px-4 py-8">
      <div className="w-full max-w-md p-8 space-y-8 bg-[#16213e] rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#e94560]">Register</h1>
          <p className="mt-2 text-gray-300">Create your account to get started</p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-300">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                {...register('firstName', { 
                  required: 'First name is required',
                  minLength: {
                    value: 3,
                    message: 'First name must be at least 3 characters'
                  },
                  maxLength: {
                    value: 15,
                    message: 'First name must be at most 15 characters'
                  }
                })}
                className="mt-1 block w-full px-3 py-2 bg-[#1a1a2e] border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-[#e94560] focus:border-[#e94560]"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-500">{errors.firstName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-300">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                {...register('lastName', { 
                  required: 'Last name is required',
                  minLength: {
                    value: 3,
                    message: 'Last name must be at least 3 characters'
                  },
                  maxLength: {
                    value: 15,
                    message: 'Last name must be at most 15 characters'
                  }
                })}
                className="mt-1 block w-full px-3 py-2 bg-[#1a1a2e] border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-[#e94560] focus:border-[#e94560]"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-500">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              className="mt-1 block w-full px-3 py-2 bg-[#1a1a2e] border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-[#e94560] focus:border-[#e94560]"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register('password', { 
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters'
                }
              })}
              className="mt-1 block w-full px-3 py-2 bg-[#1a1a2e] border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-[#e94560] focus:border-[#e94560]"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword', { 
                required: 'Please confirm your password',
                validate: value => value === password || 'Passwords do not match'
              })}
              className="mt-1 block w-full px-3 py-2 bg-[#1a1a2e] border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-[#e94560] focus:border-[#e94560]"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#e94560] hover:bg-[#e94560]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e94560] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Registering...
                </span>
              ) : (
                'Register'
              )}
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-300">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-[#e94560] hover:text-[#e94560]/80">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
