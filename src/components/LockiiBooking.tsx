import Script from 'next/script';

/**
 * Embeds the client's Lockii booking widget. The widget id comes from the client's
 * Lockii dashboard (the data-lockii-id value in their embed snippet).
 */
export function LockiiBooking() {
  const widgetId = process.env.NEXT_PUBLIC_LOCKII_ID;

  if (!widgetId) {
    return (
      <div className="rounded-2xl border border-dashed border-electric/50 bg-panel/60 p-10 text-center">
        <p className="display text-3xl text-white">Live booking calendar</p>
        <p className="mx-auto mt-3 max-w-md text-mute">
          Availability and checkout appear here once the Lockii widget id is connected.
        </p>
      </div>
    );
  }

  return (
    <>
      <Script
        src="https://dash.lockii.app/widget.js"
        data-lockii-id={widgetId}
        data-analytics="on"
        strategy="afterInteractive"
      />
      <lockii-selector />
    </>
  );
}
