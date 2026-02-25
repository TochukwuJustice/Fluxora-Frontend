import React, { useState } from 'react';
import CreateStreamModal from "../components/CreateStreamModal";
import StreamCreatedModal from "../components/Streams/StreamCreatedModal";

// ── Types ────────────────────────────────────────────────────────────────────
interface Stream {
  id: string;
  recipient: string;
  rate: string;
  status: string;
}

// ── Empty State Component ─────────────────────────────────────────────────────
function StreamsEmptyState({ onCreateStream }: { onCreateStream?: () => void }) {
  return (
    <div style={emptyWrapper} role="region" aria-label="No streams empty state">
      <div style={emptyContainer}>

        {/* Icon box with play triangle */}
        <div style={iconBox}>
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M11 8.5L23 16L11 23.5V8.5Z"
              fill="url(#playGradient)"
              stroke="rgba(94,211,243,0.4)"
              strokeWidth="1"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient id="playGradient" x1="11" y1="8.5" x2="23" y2="23.5" gradientUnits="userSpaceOnUse">
                <stop stopColor="#5ED3F3" />
                <stop offset="1" stopColor="#2DD4BF" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Title */}
        <h2 style={emptyTitle}>No streams yet</h2>

        {/* Description */}
        <p style={emptyDescription}>
          Create your first stream to start sending USDC to recipients over time.
          Perfect for grants, salaries, and vesting schedules.
        </p>

        {/* Create stream button */}
        <button
          style={createButton}
          onClick={() => onCreateStream?.()}
          aria-label="Create a new stream"
          onMouseOver={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              '0 0 24px rgba(45,212,191,0.45)';
            (e.currentTarget as HTMLButtonElement).style.filter = 'brightness(1.1)';
          }}
          onMouseOut={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              '0 0 14px rgba(45,212,191,0.25)';
            (e.currentTarget as HTMLButtonElement).style.filter = 'brightness(1)';
          }}
        >
          <span style={plusIcon} aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1v10M1 6h10" stroke="#fff" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
          </span>
          Create stream
        </button>

      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function Streams() {
  // Replace with real stream data from API/wallet
  const [streams] = useState<Stream[]>([]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [createdStream, setCreatedStream] = useState({
    id: "529",
    url: "https://fluxora.io/stream/529",
  });

  const handleCreateStream = () => {
    setIsCreateModalOpen(true);
  };

  const handleStreamCreated = () => {
    setCreatedStream({ id: "529", url: "https://fluxora.io/stream/529" });
    setIsSuccessModalOpen(true);
  };

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Streams</h1>
      <p style={{ color: 'var(--muted)' }}>
        Create and manage USDC streams. Set rate, duration, and cliff from the treasury.
      </p>

      {streams.length === 0 ? (
        <StreamsEmptyState onCreateStream={handleCreateStream} />
      ) : (
        <div style={tableWrap}>
          <table style={table}>
            <thead>
              <tr>
                <th>Stream</th>
                <th>Recipient</th>
                <th>Rate</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {streams.map((stream) => (
                <tr key={stream.id}>
                  <td>{stream.id}</td>
                  <td>{stream.recipient}</td>
                  <td>{stream.rate}</td>
                  <td>{stream.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <CreateStreamModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onStreamCreated={handleStreamCreated}
      />
      <StreamCreatedModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        streamId={createdStream.id}
        streamUrl={createdStream.url}
        onCreateAnother={() => {
          setIsSuccessModalOpen(false);
          setIsCreateModalOpen(true);
        }}
      />
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const emptyWrapper: React.CSSProperties = {
  marginTop: '1.5rem',
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  borderRadius: 12,
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '64px 24px',
};

const emptyContainer: React.CSSProperties = {
  textAlign: 'center',
  maxWidth: '480px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const iconBox: React.CSSProperties = {
  width: '72px',
  height: '72px',
  marginBottom: '24px',
  background: 'linear-gradient(135deg, rgba(94,211,243,0.08) 0%, rgba(45,212,191,0.12) 100%)',
  borderRadius: '20px',
  border: '1px solid rgba(94,211,243,0.15)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 0 24px rgba(45,212,191,0.08)',
};

const emptyTitle: React.CSSProperties = {
  fontSize: '20px',
  fontWeight: 700,
  color: '#FFFFFF',
  margin: '0 0 12px 0',
};

const emptyDescription: React.CSSProperties = {
  fontSize: '14px',
  lineHeight: 1.6,
  color: '#99A1AF',
  margin: '0 0 28px 0',
  maxWidth: '400px',
};

const createButton: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  padding: '12px 20px',
  minHeight: '44px',
  borderRadius: '8px',
  border: 'none',
  background: 'linear-gradient(135deg, #2DD4BF 0%, #0EA5A0 100%)',
  color: '#FFFFFF',
  fontSize: '14px',
  fontWeight: 500,
  cursor: 'pointer',
  boxShadow: '0 0 14px rgba(45,212,191,0.25)',
  transition: 'all 0.2s ease',
};

const plusIcon: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '18px',
  height: '18px',
  background: 'rgba(255,255,255,0.2)',
  borderRadius: '4px',
  flexShrink: 0,
};

const tableWrap: React.CSSProperties = {
  marginTop: "1.5rem",
  background: "var(--surface)",
  border: "1px solid var(--border)",
  borderRadius: 12,
  overflow: "hidden",
};

const table: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
};

