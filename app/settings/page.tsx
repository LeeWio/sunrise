import { Switch, Card, Button } from '@heroui/react';

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Appearance</h2>
        <Card>
          <Card.Content className="flex flex-row items-center justify-between">
            <div className="flex flex-col">
              <span className="text-md">Dark Mode</span>
              <span className="text-default-500 text-small">Toggle dark mode theme</span>
            </div>
            <Switch defaultSelected aria-label="Dark Mode" />
          </Card.Content>
        </Card>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Data Management</h2>
        <Card>
          <Card.Content className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-md">Export Data</span>
                <span className="text-default-500 text-small">Download all your logs</span>
              </div>
              <Button variant="outline">Export</Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-danger text-md">Delete Account</span>
                <span className="text-default-500 text-small">Permanently remove all data</span>
              </div>
              <Button variant="ghost" className="text-danger hover:bg-danger/10">
                Delete
              </Button>
            </div>
          </Card.Content>
        </Card>
      </section>
    </div>
  );
}
