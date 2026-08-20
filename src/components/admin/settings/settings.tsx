import { PageHeader } from '@/components/admin/ui/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
        {label}
      </label>
      {children}
    </div>
  );
}

function Input({ defaultValue }: { defaultValue: string }) {
  return (
    <input
      defaultValue={defaultValue}
      className="h-10 w-full rounded-sm border border-foreground/10 bg-white px-3.5 text-sm text-foreground outline-none transition-colors focus:border-foreground/25 focus:ring-2 focus:ring-ring/30"
    />
  );
}

function Toggle({
  label,
  description,
  defaultOn = true,
}: {
  label: string;
  description: string;
  defaultOn?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-6 py-1">
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <span
        aria-hidden
        className={
          defaultOn
            ? 'relative h-6 w-11 shrink-0 rounded-full bg-primary'
            : 'relative h-6 w-11 shrink-0 rounded-full bg-muted'
        }
      >
        <span
          className={`absolute top-0.5 size-5 rounded-full bg-white shadow transition-all ${
            defaultOn ? 'left-[22px]' : 'left-0.5'
          }`}
        />
      </span>
    </div>
  );
}

export function SettingsPage() {
  return (
    <div className="max-w-4xl space-y-6">
      <PageHeader
        title="Settings"
        description="Store profile, defaults and preferences for the Livo storefront."
        actions={<Button>Save changes</Button>}
      />

      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Store profile</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-5 sm:grid-cols-2">
          <Field label="Store name">
            <Input defaultValue="Livo" />
          </Field>
          <Field label="Contact email">
            <Input defaultValue="hello@livo.com" />
          </Field>
          <Field label="Currency">
            <Input defaultValue="USD ($)" />
          </Field>
          <Field label="Store timezone">
            <Input defaultValue="Europe/Copenhagen (GMT+2)" />
          </Field>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Toggle label="New order alerts" description="Email me the moment an order is placed." />
          <Separator />
          <Toggle
            label="Low stock warnings"
            description="Alert me when items fall below reorder point."
          />
          <Separator />
          <Toggle
            label="Review notifications"
            description="Let me know when a new review is submitted."
            defaultOn={false}
          />
          <Separator />
          <Toggle
            label="Weekly summary"
            description="A digest of revenue and orders every Monday."
          />
        </CardContent>
      </Card>

      <Card className="border-destructive/20 bg-white">
        <CardHeader>
          <CardTitle className="text-destructive">Danger zone</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Deactivate store</p>
            <p className="text-xs text-muted-foreground">
              Temporarily hide the storefront while you work behind the scenes.
            </p>
          </div>
          <Button variant="destructive">Deactivate</Button>
        </CardContent>
      </Card>
    </div>
  );
}
