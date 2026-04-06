"use client";

import { Card, Button, Chip } from "@heroui/react";
import { House, BroadcastSignal } from "../components/icons";
import { MomentCard } from "../features/moments/components/moment-card";

const moments = [
  {
    id: 1,
    user: {
      name: "Wei Li",
      avatar: "https://i.pravatar.cc/150?u=sunrise",
      handle: "@weili",
    },
    content: "The sunrise today was absolutely breathtaking. Ready to start the day with some coding! 🌅",
    image: "https://heroui.com/images/card-example-4.jpeg",
    timestamp: "2 hours ago",
    tags: ["Nature", "Morning"],
  },
  {
    id: 2,
    user: {
      name: "Sunrise Bot",
      avatar: "https://i.pravatar.cc/150?u=bot",
      handle: "@sunrise_bot",
    },
    content: "New tech post available: 'Building Modern UI with HeroUI & Next.js'. Check it out in the Tech Hub!",
    timestamp: "5 hours ago",
    tags: ["Tech", "Announcement"],
  },
  {
    id: 3,
    user: {
      name: "Wei Li",
      avatar: "https://i.pravatar.cc/150?u=sunrise",
      handle: "@weili",
    },
    content: "Listening to some lo-fi beats while working on the new design system. 🎧",
    timestamp: "1 day ago",
    tags: ["Music", "Focus"],
    isInteractive: true,
  },
  {
    id: 4,
    user: {
      name: "Sarah Chen",
      avatar: "https://i.pravatar.cc/150?u=sarah",
      handle: "@sarahc",
    },
    content: "Just finished a long hike. The view from the top was worth every step! ⛰️",
    image: "https://heroui.com/images/card-example-3.jpeg",
    timestamp: "3 days ago",
    tags: ["Adventure", "Hiking"],
  },
  {
    id: 5,
    user: {
      name: "Tech Enthusiast",
      avatar: "https://i.pravatar.cc/150?u=tech",
      handle: "@techo",
    },
    content: "Trying out the new Tailwind CSS v4 features. The configuration is so much cleaner now! 🚀",
    timestamp: "4 days ago",
    tags: ["Coding", "Tailwind"],
  },
  {
    id: 6,
    user: {
      name: "Wei Li",
      avatar: "https://i.pravatar.cc/150?u=sunrise",
      handle: "@weili",
    },
    content: "Coffee and code - the perfect Sunday morning. ☕💻",
    image: "https://heroui.com/images/card-example-2.jpeg",
    timestamp: "1 week ago",
    tags: ["Life", "Developer"],
  },
  {
    id: 7,
    user: {
      name: "Community",
      avatar: "https://i.pravatar.cc/150?u=community",
      handle: "@community",
    },
    content: "Welcoming all new members to the Sunrise digital space! Share your first moment today.",
    timestamp: "2 weeks ago",
    tags: ["Welcome", "Social"],
  },
  {
    id: 8,
    user: {
      name: "Wei Li",
      avatar: "https://i.pravatar.cc/150?u=sunrise",
      handle: "@weili",
    },
    content: "Reflecting on the progress of this project. It's been an amazing journey so far. ✨",
    timestamp: "3 weeks ago",
    tags: ["Reflection", "Mindset"],
  },
];

export default function Home() {
  return (
    <div className="flex w-full flex-col gap-8">
      <header className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Chip color="accent" variant="soft" size="sm" className="flex items-center gap-1">
            <BroadcastSignal className="h-3 w-3" />
            <Chip.Label>Live Feed</Chip.Label>
          </Chip>
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Latest Moments</h1>
        <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          Capture and share daily life, spontaneous moments, and technical insights in your personal digital space.
        </p>
      </header>

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {moments.map((moment) => (
          <MomentCard key={moment.id} {...moment} />
        ))}

        {/* 占位卡片：引导发布 */}
        <Card className="flex min-h-[300px] items-center justify-center border-2 border-dashed border-zinc-200 bg-transparent p-6 dark:border-zinc-800">
          <Card.Content className="flex flex-col items-center justify-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900">
               <House className="h-8 w-8 text-zinc-400" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-zinc-800 dark:text-zinc-200">Ready to share?</p>
              <p className="text-small text-zinc-500">Add a moment to your feed.</p>
            </div>
            <Button variant="ghost" radius="full" className="mt-2 flex items-center gap-2">
              Share a Moment
            </Button>
          </Card.Content>
        </Card>
      </section>

      {/* 底部填充，以便更好地测试滚动效果 */}
      <footer className="mt-12 flex h-32 items-center justify-center text-zinc-400">
        <p>© 2026 Sunrise Digital Space · Keep shining.</p>
      </footer>
    </div>
  );
}
