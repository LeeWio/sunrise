'use client';

import {
  Modal,
  Input,
  Button,
  Form,
  Link,
  TextField,
  Label,
} from '@heroui/react';
import { ArrowRight } from 'lucide-react';
import { useState, useCallback, useEffect, useTransition } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  initialMode?: 'login' | 'sign-up';
}

function LoginForm({ onSwitchToSignUp }: { onSwitchToSignUp: () => void }) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      startTransition(() => {
        // TODO: 接入登录 API
      });
    },
    [],
  );

  return (
    <Form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <TextField isRequired name="email" type="email">
        <Label>Email</Label>
        <Input placeholder="Enter your email" autoComplete="email" />
      </TextField>
      <TextField isRequired name="password" type="password">
        <Label>Password</Label>
        <Input placeholder="Enter your password" autoComplete="current-password" />
      </TextField>
      <div className="mt-2 flex items-center justify-between gap-2">
        <Link
          className="cursor-pointer text-primary text-small"
          onPress={onSwitchToSignUp}
          aria-label="切换到注册"
        >
          Need an account?
        </Link>
        <Link href="#" className="text-primary text-small" aria-label="忘记密码">
          Forgot password?
        </Link>
      </div>
      <Button
        fullWidth
        variant="primary"
        type="submit"
        className="mt-4"
        isDisabled={isPending}
      >
        {isPending ? 'Logging in…' : 'Login'}
        <ArrowRight size={16} />
      </Button>
    </Form>
  );
}

function SignUpForm({ onSwitchToLogin }: { onSwitchToLogin: () => void }) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      startTransition(() => {
        // TODO: 接入注册 API
      });
    },
    [],
  );

  return (
    <Form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <TextField isRequired name="name">
        <Label>Name</Label>
        <Input placeholder="Enter your name" autoComplete="name" />
      </TextField>
      <TextField isRequired name="email" type="email">
        <Label>Email</Label>
        <Input placeholder="Enter your email" autoComplete="email" />
      </TextField>
      <TextField isRequired name="password" type="password">
        <Label>Password</Label>
        <Input placeholder="Create a password" autoComplete="new-password" />
      </TextField>
      <div className="mt-2 flex justify-start gap-2">
        <Link
          className="cursor-pointer text-primary text-small"
          onPress={onSwitchToLogin}
          aria-label="切换到登录"
        >
          Already have an account?
        </Link>
      </div>
      <Button
        fullWidth
        variant="primary"
        type="submit"
        className="mt-4"
        isDisabled={isPending}
      >
        {isPending ? 'Signing up…' : 'Sign Up'}
        <ArrowRight size={16} />
      </Button>
    </Form>
  );
}

const HEADINGS = {
  login: {
    title: 'Welcome Back',
    description: 'Enter your credentials to access your account',
  },
  'sign-up': {
    title: 'Create Account',
    description: 'Join Sunrise to start your personal life log',
  },
} as const;

export function AuthModal({
  isOpen,
  onOpenChange,
  initialMode = 'login',
}: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'sign-up'>(initialMode);

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
    }
  }, [isOpen, initialMode]);

  const switchToSignUp = useCallback(() => setMode('sign-up'), []);
  const switchToLogin = useCallback(() => setMode('login'), []);

  const { title, description } = HEADINGS[mode];

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Backdrop className="bg-background/20 backdrop-blur-md">
        <Modal.Container placement="center">
          <Modal.Dialog className="bg-background/80 border-default-200 border shadow-2xl backdrop-blur-xl sm:max-w-[400px]">
            <Modal.CloseTrigger />
            <Modal.Header className="border-default-100/50 flex flex-col gap-1 border-b pb-4">
              <Modal.Heading className="text-xl font-bold">{title}</Modal.Heading>
              <p className="text-default-500 text-sm">{description}</p>
            </Modal.Header>
            <Modal.Body className="pt-6 pb-8">
              {mode === 'login' ? (
                <LoginForm onSwitchToSignUp={switchToSignUp} />
              ) : (
                <SignUpForm onSwitchToLogin={switchToLogin} />
              )}
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
