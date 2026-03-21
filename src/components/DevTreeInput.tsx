import { Switch } from '@headlessui/react'
import type { DevTreeLink } from "../Types"
import { classNames } from '../utils'

type DevtreeInputProps = {
  item: DevTreeLink
  handleUrlchange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleEnableLink: (socialNetwork: string)=> void
}

export default function DevTreeInput({ item, handleUrlchange , handleEnableLink}: DevtreeInputProps) {

  return (
    <div className="glass border border-white/10 p-4 flex items-center gap-3 hover:border-white/20 transition-colors">
      <div
        className="w-10 h-10 bg-cover bg-center flex-shrink-0 brightness-200"
        style={{ backgroundImage: `url('/social/icon_${item.name}.svg')` }}
      ></div>
      <input
        type="text"
        className="flex-1 bg-white/5 border border-white/10 rounded-xl p-2 text-white placeholder-gray-500 text-sm focus:border-cyan-400/40 focus:ring-1 focus:ring-cyan-400/20 transition-colors"
        value={item.url}
        onChange={handleUrlchange}
        name={item.name}
        placeholder={`URL de ${item.name}`}
      />

      <Switch
        checked={item.enabled}
        onChange={() => handleEnableLink(item.name)}
        className={classNames(
          item.enabled ? 'bg-cyan-500' : 'bg-gray-700',
          'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-400/30 focus:ring-offset-2 focus:ring-offset-dark-900'
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            item.enabled ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
          )}
        />
      </Switch>
    </div>
  )
}
