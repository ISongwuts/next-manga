import React from 'react'

type Props = {
    label: string
}

function SectionLabel({ label }: Props) {
  return (
    <div className='w-full text-start border-b-2 border-black dark:border-white py-4'>
        <span className='text-xl font-bold'>{ label }</span>
    </div>
  )
}

export default SectionLabel