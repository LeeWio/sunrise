'use client'

import React from 'react'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Tooltip,
  ButtonGroup,
  Button,
  useDisclosure,
} from '@heroui/react'

import { SignIn } from './sign-in'
import { SignUp } from './sign-up'

import { useAppDispatch } from '@/hooks/store'
import { useAuth } from '@/hooks/use-auth'
import { removeAuthuser } from '@/feature/slice/auth-slice'

export const ChevronDownIcon = () => {
  return (
    <svg
      fill="none"
      height="14"
      viewBox="0 0 24 24"
      width="14"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.9188 8.17969H11.6888H6.07877C5.11877 8.17969 4.63877 9.33969 5.31877 10.0197L10.4988 15.1997C11.3288 16.0297 12.6788 16.0297 13.5088 15.1997L15.4788 13.2297L18.6888 10.0197C19.3588 9.33969 18.8788 8.17969 17.9188 8.17969Z"
        fill="currentColor"
      />
    </svg>
  )
}

export const AuthForm = () => {
  // get current user
  const auth = useAuth()

  const dispatch = useAppDispatch()

  const {
    isOpen: isSignUpOpen,
    onOpen: onSignUpOpen,
    onOpenChange: onSignUpOpenChange,
  } = useDisclosure()

  const {
    isOpen: isSignInOpen,
    onOpen: onSignInOpen,
    onOpenChange: onSignInOpenChange,
  } = useDisclosure()

  const [selectedOption, setSelectedOption] = React.useState(
    new Set(['SignIn'])
  )

  const descriptionsMap = {
    SignIn: 'Log in to your account',
    SignUp: 'Create a new account',
  }

  const labelsMap = {
    SignUp: 'Sign Up',
    SignIn: 'Sign In',
  }

  // Convert the Set to an Array and get the first value.
  const selectedOptionValue = Array.from(selectedOption)[0] as
    | 'SignUp'
    | 'SignIn'

  return (
    <>
      {auth && auth.userDetail && auth.isAuthenticated ? (
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              className="transition-transform"
              size="sm"
              src={auth.userDetail.avatar}
            />
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem
              key="profile"
              className="h-14 gap-2"
              textValue={'profile'}
            >
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{auth.userDetail.username}</p>
            </DropdownItem>
            <DropdownItem key="settings" textValue={'My Settings'}>
              My Settings
            </DropdownItem>

            <DropdownItem key="team_settings" textValue={'Team Settings'}>
              Team Settings
            </DropdownItem>
            <DropdownItem key="analytics" textValue={'Analytics'}>
              Analytics
            </DropdownItem>
            <DropdownItem key="system" textValue={'System'}>
              System
            </DropdownItem>
            <DropdownItem key="configurations" textValue={'Configurations'}>
              Configurations
            </DropdownItem>
            <DropdownItem key="help_and_feedback" textValue={'Help & Feedback'}>
              Help & Feedback
            </DropdownItem>
            <DropdownItem key="use_info" textValue={'User Info'}>
              <Tooltip
                closeDelay={0}
                content={
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">IP:</span>
                  </div>
                }
                delay={0}
                placement="left"
              >
                User Info
              </Tooltip>
            </DropdownItem>
            <DropdownItem
              key="logout"
              color="danger"
              onPress={() => dispatch(removeAuthuser())}
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <ButtonGroup variant="flat">
          <Button
            onPress={
              selectedOptionValue === 'SignIn' ? onSignInOpen : onSignUpOpen
            }
          >
            {labelsMap[selectedOptionValue]}
          </Button>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button isIconOnly>
                <ChevronDownIcon />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="auth options"
              className="max-w-[300px]"
              selectedKeys={selectedOption}
              selectionMode="single"
              onSelectionChange={setSelectedOption as any}
            >
              <DropdownItem
                key="SignIn"
                description={descriptionsMap['SignIn']}
              >
                {labelsMap['SignIn']}
              </DropdownItem>
              <DropdownItem
                key="SignUp"
                description={descriptionsMap['SignUp']}
              >
                {labelsMap['SignUp']}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </ButtonGroup>
      )}

      <SignIn
        isSignInOpen={isSignInOpen}
        onSignInOpenChange={onSignInOpenChange}
        onSignUpOpen={onSignUpOpen}
      />

      <SignUp
        isSignUpOpen={isSignUpOpen}
        onSignInOpen={onSignInOpen}
        onSignUpOpenChange={onSignUpOpenChange}
      />
    </>
  )
}
