import { Link } from "@nextui-org/react"
import NextLink from "next/link"
import { useSearchParams } from "next/navigation"

const SidebarItem = ({ item, fallback }: { item: any, fallback: string }) =>{
  const params = useSearchParams()
  const isActive = (params.get('tab') || fallback) === item.url

  return <Link as={NextLink} href={`?tab=${item.url}`} className={`text-lg font-semibold px-4 py-2  ${isActive ? 'bg-blue-500 text-white rounded-md': ''}`}>{item.title}</Link>
}

export const Sidebar = ({ items, fallback, children }: { items: any, fallback: string, children: React.ReactNode }) =>{
  return <div className="w-1/4">
    <div className="flex flex-col gap-3">
      {children}
      {items.map((i: any) => <SidebarItem item={i} key={i.title} fallback={fallback} />)}
    </div>
  </div>
}