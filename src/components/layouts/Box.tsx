
export const Box = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <div className={`box-wrapper w-96 min-w-min max-w-sm lg:max-w-[900px] lg:w-[900px] ${className}`}>
    {children}
  </div>
}

export default Box