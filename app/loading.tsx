import React from 'react'
import Image from 'next/image'
import spinergif from '@/assets/loader.gif'

export default function MainLoading() {
  return (
    <div
        style={{
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh',
            }}
        >
        <Image src={spinergif} alt='loading...'/>
    </div>
  )
}
