'use client';

import { Group, Button } from '@mantine/core';
import Link from 'next/link';
import Image from 'next/image';

export function Header() {
  return (
    <div className="w-full pt-[21px] flex justify-center">
      <div style={{ 
        width: '890px',
        height: '80px',
        borderRadius: '122px',
        border: '1px solid #FCFCFC',
        display: 'flex',
        alignItems: 'center',
        background: 'white',
        padding: '0 26px',
        position: 'relative',
        boxShadow: '0px 4px 50px 0px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{
          width: '838px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Group gap={26}>
            <div style={{
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={44}
                height={44}
              />
            </div>
            <Group gap={48}>
              <Link href="/" style={{ color: '#111827', textDecoration: 'none', fontSize: '16px' }}>Home</Link>
              {/* Temporarily removed unimplemented routes */}
            </Group>
          </Group>
          <Link href="/?create=true" style={{ textDecoration: 'none' }}>
            <Button
              size="md"
              style={{
                backgroundColor: '#9333EA',
                color: 'white',
                height: '48px',
                padding: '0 24px',
                fontSize: '16px',
                borderRadius: '24px',
                fontWeight: 500
              }}
            >
              Create Jobs
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 