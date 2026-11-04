import Script from 'next/script';

/**
 * Embeds the client's Lockii booking widget. The widget id comes from the client's
 * Lockii dashboard (the data-lockii-id value in their embed snippet).
 */
export function LockiiBooking() {
  const widgetId = process.env.NEXT_PUBLIC_LOCKII_ID;

  if (!widgetId) {
    return (
      <div className="placeholder">
        <h3 className="display">Booking preview, not yet connected</h3>
        <p>
          This is a demonstration website. Live availability, payment and collection access are not enabled. The Lockii
          booking calendar will appear here once the owner connects their account.
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
