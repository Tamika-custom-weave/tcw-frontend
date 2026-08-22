/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const size = {
  width: 180,
  height: 180,
};

export const contentType = 'image/png';

export default function Icon() {
  try {
    const logoData = readFileSync(join(process.cwd(), 'public', 'tamikas-logo.png'));
    const base64Logo = `data:image/png;base64,${logoData.toString('base64')}`;

    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ffffff',
          }}
        >
          {/* Using <img> with a base64 string works in ImageResponse */}
          <img
            src={base64Logo}
            width={160}
            height={160}
            style={{ objectFit: 'contain' }}
            alt="Tamika Custom Weave Logo"
          />
        </div>
      ),
      {
        ...size,
      }
    );
  } catch (error) {
    console.error("Failed to generate apple-icon", error);
    // Fallback if fs fails
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1E1E1E',
            color: '#D4AF37',
            fontSize: 48,
            fontWeight: 'bold',
            fontFamily: 'monospace',
          }}
        >
          TCW
        </div>
      ),
      { ...size }
    );
  }
}
