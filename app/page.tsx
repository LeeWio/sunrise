'use client'

import { Button } from '@heroui/react'
import { addToast } from '@heroui/react'

import {
  setColor,
  setToastPlacement,
  setVariant,
  setMaxVisibleToasts,
  setRadius,
} from '@/feature/slice/toast-slice'
import { useAppDispatch } from '@/hooks/store'
export default function Home() {
  const dispatch = useAppDispatch()

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="flex flex-col gap-2">
        <Button
          onPress={() =>
            addToast({
              title: 'This is a toast',
            })
          }
        >
          Show Toast
        </Button>

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
        <div className="flex gap-2">
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
        <div className="flex gap-2">
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
        <div className="flex gap-2">
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
        <div className="flex gap-2">
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
        <div className="flex gap-2">
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
    </section>
  )
}
