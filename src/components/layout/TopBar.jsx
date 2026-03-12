import { SidebarTrigger } from './Sidebar'

export default function TopBar({ onMenuClick, title }) {
  return (
    <header
      className="sticky top-0 z-20 flex h-16 shrink-0 items-center gap-4 border-b border-border bg-card/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-card/80 lg:px-6"
      role="banner"
    >
      <SidebarTrigger onClick={onMenuClick} />
      <h1 className="text-lg font-semibold tracking-tight text-foreground lg:text-xl">
        {title}
      </h1>
    </header>
  )
}
