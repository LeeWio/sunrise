import { Card, Separator } from '@heroui/react';

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="h-[200px]">
        <Card.Header className="flex gap-3">
          <div className="flex flex-col">
            <Card.Title>Recent Activity</Card.Title>
            <Card.Description>Your latest logs</Card.Description>
          </div>
        </Card.Header>
        <Separator />
        <Card.Content>
          <p className="text-default-500">No recent activity recorded.</p>
        </Card.Content>
      </Card>

      <Card className="h-[200px]">
        <Card.Header className="flex gap-3">
          <div className="flex flex-col">
            <Card.Title>Writing Streak</Card.Title>
            <Card.Description>Keep it up!</Card.Description>
          </div>
        </Card.Header>
        <Separator />
        <Card.Content className="flex items-center justify-center">
          <p className="text-primary text-4xl font-bold">0 Days</p>
        </Card.Content>
      </Card>

      <Card className="h-[200px]">
        <Card.Header className="flex gap-3">
          <div className="flex flex-col">
            <Card.Title>Quick Stats</Card.Title>
            <Card.Description>Lifetime summary</Card.Description>
          </div>
        </Card.Header>
        <Separator />
        <Card.Content>
          <div className="flex h-full items-center justify-between">
            <div className="w-full text-center">
              <p className="text-2xl font-semibold">0</p>
              <p className="text-default-500 text-xs">Entries</p>
            </div>
            <div className="w-full text-center">
              <p className="text-2xl font-semibold">0</p>
              <p className="text-default-500 text-xs">Words</p>
            </div>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}
