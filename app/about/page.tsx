'use client'

import { Button, Card, CardBody, CardHeader, Chip } from '@heroui/react'
import { addToast } from '@heroui/react'

import {
  setColor,
  setRadius,
  setToastPlacement,
  setVariant,
  setMaxVisibleToasts,
} from '@/feature/slice/toast-slice'
import { useAppDispatch } from '@/hooks/store'
import { useGetallQuery } from '@/feature/api/tag-api'

export default function AboutPage() {
  const dispatch = useAppDispatch()

  // Fetch tags with pagination
  const { data, isLoading, isError, error, refetch } = useGetallQuery()

  // Handle tag fetching errors
  if (isError) {
    return
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">About Page</h1>
        <Button color="primary" disabled={isLoading} onPress={() => refetch()}>
          {isLoading ? 'Loading...' : 'Refresh Tags'}
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-lg">Loading tags...</p>
        </div>
      ) : isError ? (
        <div className="p-4 bg-danger/10 border border-danger rounded-lg">
          <p className="text-danger font-semibold">Error loading tags</p>
          <p>
            {error && typeof error === 'object' && 'data' in error
              ? (error as any)?.message || 'An error occurred'
              : 'An error occurred'}
          </p>
        </div>
      ) : data ? (
        <>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Tag List</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map(tag => (
              <Card key={tag.tid} className="shadow-sm">
                <CardHeader className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{tag.name}</h3>
                    <small className="text-default-500">@{tag.slug}</small>
                  </div>
                  <Chip size="sm">{tag.name}</Chip>
                </CardHeader>
                <CardBody>
                  <p className="text-default-700">{tag.description}</p>
                  <div className="mt-3 pt-3 border-t border-divider">
                    <small className="text-default-500">
                      Created: {new Date(tag.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-40">
          <p className="text-lg">No tags available</p>
        </div>
      )}

      <div className="mt-8 pt-6 border-t border-divider">
        <h2 className="text-2xl font-semibold mb-4">Toast Examples</h2>

        <Button
          onPress={() =>
            addToast({
              title: 'This is a toast',
            })
          }
        >
          Show Toast
        </Button>

        {/* 用于登陆成功 */}
        <Button
          variant="flat"
          onPress={() =>
            addToast({
              title: 'Toast title',
              description: 'Toast displayed successfully',
              icon: (
                <svg height={24} viewBox="0 0 24 24" width={24}>
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit={10}
                    strokeWidth={1.5}
                  >
                    <path
                      d="M11.845 21.662C8.153 21.662 5 21.088 5 18.787s3.133-4.425 6.845-4.425c3.692 0 6.845 2.1 6.845 4.4s-3.134 2.9-6.845 2.9z"
                      data-name="Stroke 1"
                    />
                    <path
                      d="M11.837 11.174a4.372 4.372 0 10-.031 0z"
                      data-name="Stroke 3"
                    />
                  </g>
                </svg>
              ),
            })
          }
        >
          Custom Icon
        </Button>
        <Button
          variant="flat"
          onPress={() => {
            addToast({
              title: 'Toast Title',
              description: 'Toast Description',
              timeout: 1000,
              shouldShowTimeoutProgress: true,
            })
          }}
        >
          Show Timeout Progress (3000ms)
        </Button>

        {/* Toast Color Examples */}
        <div className="flex gap-2 mt-4">
          <Button onPress={() => dispatch(setColor('default'))}>
            Set Default Color
          </Button>
          <Button onPress={() => dispatch(setColor('primary'))}>
            Set Primary Color
          </Button>
          <Button onPress={() => dispatch(setColor('success'))}>
            Set Success Color
          </Button>
          <Button onPress={() => dispatch(setColor('warning'))}>
            Set Warning Color
          </Button>
          <Button onPress={() => dispatch(setColor('danger'))}>
            Set Danger Color
          </Button>
        </div>

        {/* Toast Placement Examples */}
        <div className="flex gap-2 mt-4">
          <Button onPress={() => dispatch(setToastPlacement('top-left'))}>
            Top Left Placement
          </Button>
          <Button onPress={() => dispatch(setToastPlacement('top-center'))}>
            Top Center Placement
          </Button>
          <Button onPress={() => dispatch(setToastPlacement('top-right'))}>
            Top Right Placement
          </Button>
          <Button onPress={() => dispatch(setToastPlacement('bottom-left'))}>
            Bottom Left Placement
          </Button>
          <Button onPress={() => dispatch(setToastPlacement('bottom-center'))}>
            Bottom Center Placement
          </Button>
          <Button onPress={() => dispatch(setToastPlacement('bottom-right'))}>
            Bottom Right Placement
          </Button>
        </div>

        {/* Toast Radius Examples */}
        <div className="flex gap-2 mt-4">
          <Button onPress={() => dispatch(setRadius('none'))}>
            Set No Radius
          </Button>
          <Button onPress={() => dispatch(setRadius('sm'))}>
            Set Small Radius
          </Button>
          <Button onPress={() => dispatch(setRadius('md'))}>
            Set Medium Radius
          </Button>
          <Button onPress={() => dispatch(setRadius('lg'))}>
            Set Large Radius
          </Button>
          <Button onPress={() => dispatch(setRadius('full'))}>
            Set Extra Large Radius
          </Button>
        </div>

        {/* Toast Variant Examples */}
        <div className="flex gap-2 mt-4">
          <Button onPress={() => dispatch(setVariant('solid'))}>
            Set Solid Variant
          </Button>
          <Button onPress={() => dispatch(setVariant('bordered'))}>
            Set Bordered Variant
          </Button>
          <Button onPress={() => dispatch(setVariant('flat'))}>
            Set Flat Variant
          </Button>
        </div>

        {/* Max Visible Toasts Examples */}
        <div className="flex gap-2 mt-4">
          <Button onPress={() => dispatch(setMaxVisibleToasts(3))}>
            Set Max 3 Toasts
          </Button>
          <Button onPress={() => dispatch(setMaxVisibleToasts(5))}>
            Set Max 5 Toasts
          </Button>
          <Button onPress={() => dispatch(setMaxVisibleToasts(10))}>
            Set Max 10 Toasts
          </Button>
        </div>
      </div>
    </div>
  )
}
