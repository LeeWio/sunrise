'use client';

import { Modal, Tabs, Input, Button, Form, Link, TextField, Label } from '@heroui/react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  initialMode?: 'login' | 'sign-up';
}

export function AuthModal({ isOpen, onOpenChange, initialMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'sign-up'>(initialMode);

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
    }
  }, [isOpen, initialMode]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Backdrop className="bg-background/20 backdrop-blur-md">
        <Modal.Container placement="center">
          <Modal.Dialog className="bg-background/80 border-default-200 border shadow-2xl backdrop-blur-xl sm:max-w-[400px]">
            <Modal.CloseTrigger />
            <Modal.Header className="border-default-100/50 flex flex-col gap-1 border-b pb-4">
              <Modal.Heading className="text-xl font-bold">
                {mode === 'login' ? 'Welcome Back' : 'Create Account'}
              </Modal.Heading>
              <p className="text-default-500 text-sm">
                {mode === 'login'
                  ? 'Enter your credentials to access your account'
                  : 'Join Sunrise to start your personal life log'}
              </p>
            </Modal.Header>
            <Modal.Body className="pt-6 pb-8">
              {mode === 'login' ? (
                <Form className="flex flex-col gap-4">
                  <TextField isRequired name="email" type="email">
                    <Label>Email</Label>
                    <Input placeholder="Enter your email" />
                  </TextField>
                  <TextField isRequired name="password" type="password">
                    <Label>Password</Label>
                    <Input placeholder="Enter your password" />
                  </TextField>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <Link
                      className="cursor-pointer text-primary text-small"
                      onPress={() => setMode('sign-up')}
                    >
                      Need an account?
                    </Link>
                    <Link href="#" className="text-primary text-small">
                      Forgot password?
                    </Link>
                  </div>
                  <Button fullWidth variant="primary" type="submit" className="mt-4">
                    Login
                    <ArrowRight size={16} />
                  </Button>
                </Form>
              ) : (
                <Form className="flex flex-col gap-4">
                  <TextField isRequired name="name">
                    <Label>Name</Label>
                    <Input placeholder="Enter your name" />
                  </TextField>
                  <TextField isRequired name="email" type="email">
                    <Label>Email</Label>
                    <Input placeholder="Enter your email" />
                  </TextField>
                  <TextField isRequired name="password" type="password">
                    <Label>Password</Label>
                    <Input placeholder="Create a password" />
                  </TextField>
                  <div className="mt-2 flex justify-start gap-2">
                    <Link
                      className="cursor-pointer text-primary text-small"
                      onPress={() => setMode('login')}
                    >
                      Already have an account?
                    </Link>
                  </div>
                  <Button fullWidth variant="primary" type="submit" className="mt-4">
                    Sign Up
                    <ArrowRight size={16} />
                  </Button>
                </Form>
              )}
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
