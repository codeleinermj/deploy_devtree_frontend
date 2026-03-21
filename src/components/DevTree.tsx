import { useEffect, useState } from "react"
import type { SocialNetwork, User } from "../Types"
import NavigationTabs from "./NavigationTabs"
import { Link, Outlet } from "react-router-dom"
import { Toaster } from "sonner"
import {DndContext, closestCenter} from "@dnd-kit/core"
import type { DragEndEvent } from '@dnd-kit/core';
import {SortableContext, verticalListSortingStrategy,arrayMove} from "@dnd-kit/sortable"
import DevTreeLink from "./DevTreeLink"
import { useQueryClient } from "@tanstack/react-query"
import Header from "./Header"


type DevTreeProps = {
    data: User
}

export default function DevTree({data} : DevTreeProps) {
    //const [enabledLinks, setEnabledLinks] = useState<SocialNetwork[]>(JSON.parse(data.links).filter((item: SocialNetwork) => item.enabled))
    const allLinks = Array.isArray(data.links) ? data.links : JSON.parse(data.links || "[]")
    const [enabledLinks, setEnabledLinks] = useState<SocialNetwork[]>(allLinks.filter((item: SocialNetwork) => item.enabled))
    //.......................

   /* useEffect(() =>{
        setEnabledLinks(JSON.parse(data.links).filter((item: SocialNetwork) => item.enabled))
    },[data])*/

    useEffect(() =>{
    const allLinks = Array.isArray(data.links) ? data.links : JSON.parse(data.links || "[]")
    setEnabledLinks(allLinks.filter((item: SocialNetwork) => item.enabled))
},[data])
    
   /* const links = Array.isArray(data.links) ? data.links : JSON.parse(data.links || "[]")
    const [enabledLinks, setEnabledLinks] = useState<SocialNetwork[]>(links.filter((item: SocialNetwork) => item.enabled))

    useEffect(() =>{
    const links = Array.isArray(data.links) ? data.links : JSON.parse(data.links || "[]")
    setEnabledLinks(links.filter((item: SocialNetwork) => item.enabled))
}   ,[data])*/

    const queryClient = useQueryClient()
    const handleDragEnd = (e: DragEndEvent)=> {
        const {active, over} = e

        if (over && over.id) {
        const prevIndex = enabledLinks.findIndex(link => link.id === active.id)
        const newIndex = enabledLinks.findIndex(link => link.id === over.id)
        const order = arrayMove(enabledLinks, prevIndex,newIndex)
        setEnabledLinks(order)
        
        //const disabledLinks : SocialNetwork[] = JSON.parse(data.links).filter((item: SocialNetwork) => !item.enabled)
        const allLinks = Array.isArray(data.links) ? data.links : JSON.parse(data.links || "[]")
        const disabledLinks : SocialNetwork[] = allLinks.filter((item: SocialNetwork) => !item.enabled)
        //.............

        const links = order.concat(disabledLinks)
        queryClient.setQueryData(["user"], (prevData: User) =>{
            return{
                ...prevData,
                links: JSON.stringify(links)
            }
        })

    }
}

  return (
    <>
            <Header/>

            <div className="bg-dark-900 min-h-screen py-10">
                <main className="mx-auto max-w-6xl px-6 lg:px-8">

                    <NavigationTabs/>

                    <div className="flex justify-end">
                        <Link
                            className="font-bold text-right text-cyan-400 hover:text-cyan-300 text-lg transition-colors"
                            to={`/${data.handle} `}
                            target="_blank"
                            rel="noreferrer noopener"
                        >Visitar Mi Perfil / {data.handle}</Link>
                    </div>

                    <div className="flex flex-col md:flex-row gap-10 mt-10">
                        <div className="flex-1">
                            <Outlet />
                        </div>
                        <div className="w-full md:w-96 glass glow-border px-5 py-10 space-y-6">
                            <p className="text-xl text-center text-white font-bold">{data.handle}</p>
                            {data.image &&
                            <img src={data.image} alt="Imagen Perfil" className="mx-auto max-w-[250px] rounded-xl"/>
                            }

                             <p className="text-center text-lg font-black text-gray-300">{data.description}</p>

                       <DndContext
                       collisionDetection={closestCenter}
                       onDragEnd={handleDragEnd}
                       >

                            <div className="mt-10 flex flex-col gap-4">
                                <SortableContext
                                    items={enabledLinks}
                                    strategy={verticalListSortingStrategy}
                                >

                                     {enabledLinks.map(link => (
                                        <DevTreeLink key={link.name} link={link}/>
                                    ))}
                                </SortableContext>
                            </div>

                        </DndContext>
                        </div>
                    </div>
                </main>
            </div>
            <Toaster position="top-right" theme="dark" />
    </>

  )
}
