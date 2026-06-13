import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') ?? 'Sites, Sistemas e Marcas que Vendem';
  const subtitle = searchParams.get('subtitle') ?? 'Creative Studio de tecnologia e criação — Boa Vista, BR';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#080809',
          padding: '80px',
          fontFamily: 'Georgia, serif',
        }}
      >
        {/* Top row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '32px',
              color: '#F5F3EE',
              letterSpacing: '-0.02em',
            }}
          >
            Arvex<span style={{ color: '#E63946' }}>.</span>
          </span>
          <span
            style={{
              fontSize: '11px',
              color: '#A8A59E',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontFamily: 'monospace',
            }}
          >
            ARV–01 / AGÊNCIA INTEGRADA
          </span>
        </div>

        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <h1
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '72px',
              fontWeight: 300,
              color: '#F5F3EE',
              lineHeight: 0.92,
              letterSpacing: '-0.02em',
              margin: 0,
              maxWidth: '900px',
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontFamily: 'sans-serif',
              fontSize: '20px',
              color: '#D7D5CE',
              margin: 0,
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            paddingTop: '24px',
          }}
        >
          <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#A8A59E', letterSpacing: '0.08em' }}>
            arvexagency.online
          </span>
          <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#A8A59E', letterSpacing: '0.08em' }}>
            BOA VISTA, RR · BRASIL
          </span>
        </div>

        {/* Red accent */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '600px',
            height: '400px',
            background: 'radial-gradient(ellipse at 100% 100%, rgba(197,39,50,0.12) 0%, transparent 65%)',
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
