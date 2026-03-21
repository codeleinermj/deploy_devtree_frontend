import type { SocialNetwork } from "../Types"
import { CSS } from "@dnd-kit/utilities"
import { useSortable} from "@dnd-kit/sortable"

type DevTreeLinkProps = {
    link: SocialNetwork
}
export default function DevTreeLink({link}: DevTreeLinkProps) {

  const {attributes, listeners, setNodeRef, transform, transition} = useSortable ({
    id: link.id
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return (
    <li
    ref={setNodeRef}
    style={style}
    className="bg-white/5 border border-white/10 px-5 py-3 flex items-center gap-4 rounded-xl cursor-grab hover:border-cyan-400/30 transition-colors"
    {...attributes}
    {...listeners}
    >
        <div
            className="w-10 h-10 bg-cover bg-center brightness-200"
            style={{ backgroundImage: `url('/social/icon_${link.name}.svg')` }}>
        </div>
        <p className="capitalize text-gray-300">Visita mi: <span className="font-bold text-white"> {link.name}</span></p>
    </li>
  )
}


