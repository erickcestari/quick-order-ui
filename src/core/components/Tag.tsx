import React from 'react'

interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string
  children: React.ReactNode
}

const Tag = ({ children, color, ...props }: TagProps) => {
  return (
    <div {...props} style={{ color, border: `1px solid ${color}`, borderRadius: "16px", textAlign:"center", ...props.style}}>
      {children}
    </div>
  )
}

export default Tag