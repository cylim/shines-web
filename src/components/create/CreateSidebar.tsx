
const items = [
  { title: 'Step 1: Start'},
  { title: 'Step 2: Avatar Image'},
  { title: 'Step 3: Content'},
  { title: 'Step 4: Audio'},
  { title: 'Step 5: Preview'},
]

const CreateSidebarItem = ({item, index, step} : {item: any, index: number, step: number}) => {
  const isActive = index === step

  return <li className={isActive ? 'bg-blue-500 text-white px-4 py-2 rounded-md': ''}>{item.title}</li>
}

export const CreateSidebar = ({step} : {step: number}) => {


  return <div className="w-1/4">
    <ul className="space-y-2">
      {items.map((item, i) => <CreateSidebarItem item={item} key={i} index={i} step={step} />)}
    </ul>
  </div>
}