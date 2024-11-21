import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  return (
    <div className="p-2">
      <h1 className='text-emerald-500 text-5xl'>Welcome Home!</h1>
    </div>
  )
}
