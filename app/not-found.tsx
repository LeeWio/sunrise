import { GhostIcon } from '@/components/icons'

export default function NotFound() {
  return (
    <div className="h-full flex flex-col justify-center items-center gap-8 px-4 sm:px-8 md:px-16">
      <div className="flex items-center space-x-6 sm:space-x-8 md:space-x-12">
        <div className="text-6xl sm:text-8xl md:text-9xl font-extrabold ">
          4
        </div>
        <GhostIcon className="w-16 sm:w-20 md:w-24" />
        <div className="text-6xl sm:text-8xl md:text-9xl font-extrabold ">
          4
        </div>
      </div>

      <div className="text-4xl sm:text-5xl md:text-6xl font-semibold text-center ">
        Boo! Page missing!
      </div>

      <div className="text-2xl sm:text-3xl md:text-4xl text-center ">
        Whoops! This page must be a ghost - it&apos;s not here!
      </div>
    </div>
  )
}
