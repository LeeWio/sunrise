import { Card } from '@heroui/react';

export default function TimelinePage() {
  return (
    <div className="border-default-200 relative ml-4 space-y-8 border-l py-4 pl-8">
      {[1, 2, 3].map((item) => (
        <div key={item} className="relative">
          <div className="border-primary bg-background absolute top-4 -left-[41px] h-5 w-5 rounded-full border" />
          <Card className="w-full">
            <Card.Content>
              <div className="flex flex-col gap-2">
                <span className="text-default-400 text-xs">February {item}, 2026</span>
                <h3 className="text-lg font-semibold">Timeline Event {item}</h3>
                <p className="text-default-500">
                  This is a placeholder for a timeline event description.
                </p>
              </div>
            </Card.Content>
          </Card>
        </div>
      ))}
    </div>
  );
}
