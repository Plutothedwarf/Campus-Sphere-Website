import type { ReactNode } from 'react'
import { useState } from 'react'

interface Tab {
  id: string
  label: string
  icon?: ReactNode
}

interface TabsProps {
  tabs: Tab[]
  defaultTab?: string
  onChange?: (id: string) => void
  children?: (activeTab: string) => ReactNode
}

export const Tabs = ({ tabs, defaultTab, onChange, children }: TabsProps) => {
  const [active, setActive] = useState(defaultTab || tabs[0]?.id)

  const handleClick = (id: string) => {
    setActive(id)
    onChange?.(id)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-1 p-1 bg-white/40 rounded-full border border-black/10 backdrop-blur-md">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleClick(tab.id)}
            className={[
              'flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest font-bold transition-all duration-200',
              active === tab.id
                ? 'bg-[#210100] text-[#FFFAED] shadow-sm'
                : 'text-[#210100] hover:bg-[#210100]/5',
            ].join(' ')}
          >
            {tab.icon && <span>{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>
      {children && children(active)}
    </div>
  )
}
