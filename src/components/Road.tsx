/** A dashed road along the top edge with a small rig that drives along it as you scroll. Updated by Enhance. */
export function Road() {
  return (
    <div className="road" aria-hidden="true">
      <svg className="road__rig" viewBox="0 0 28 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square">
        <path d="M1 4h3M4 4v6M4 8h22M26 4v9H8V4zM5 10l-3 3" />
        <circle cx="12" cy="11" r="1.8" fill="currentColor" />
        <circle cx="19" cy="11" r="1.8" fill="currentColor" />
      </svg>
    </div>
  );
}
