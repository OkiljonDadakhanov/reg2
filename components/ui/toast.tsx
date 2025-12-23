import * as React from "react"
import { cn } from "@/lib/utils"

export type ToastProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "destructive"
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export type ToastActionElement = React.ReactElement

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return React.createElement(
    "div",
    { className: "fixed top-0 inset-x-0 z-[100] flex flex-col items-center space-y-4 sm:justify-start" },
    children,
  )
}

const ToastViewport = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "z-[100] fixed bottom-0 inset-x-0 flex flex-col items-center space-y-4 sm:justify-start sm:p-6",
          className,
        )}
        {...props}
      />
    )
  },
)
ToastViewport.displayName = "ToastViewport"

const Toast = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("bg-white border shadow-sm rounded-md flex items-center justify-between py-2 px-4", className)}
      {...props}
    />
  )
})
Toast.displayName = "Toast"

const ToastTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    return <p ref={ref} className={cn("text-sm font-semibold", className)} {...props} />
  },
)
ToastTitle.displayName = "ToastTitle"

const ToastDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    return <p ref={ref} className={cn("text-sm text-gray-500", className)} {...props} />
  },
)
ToastDescription.displayName = "ToastDescription"

const ToastClose = React.forwardRef<HTMLButtonElement, React.HTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => {
    return (
      <button ref={ref} className={cn("text-gray-500 hover:text-gray-700 focus:outline-none", className)} {...props}>
        <span className="sr-only">Close</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    )
  },
)
ToastClose.displayName = "ToastClose"

export { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose }

