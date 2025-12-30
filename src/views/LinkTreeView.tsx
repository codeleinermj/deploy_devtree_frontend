import { useEffect, useState } from "react"
import { social } from "../data/social"
import DevTreeInput from "../components/DevTreeInput"
import { isValidUrl } from "../utils"
import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProfile } from "../api/DevTreeAPI"
import type { SocialNetwork, User } from "../Types"


export default function LinkTreeView() {
  const [devTreeLinks, setDevTreeLinks] = useState(social)


  const queryClient = useQueryClient()
  const user: User = queryClient.getQueryData(["user"])!

  const {mutate} = useMutation({
      mutationFn: updateProfile,
      onError:(error) =>{
        toast.error(error.message)
      },
      onSuccess:() =>{
        toast.success("Actualizado correctamente")
      }
  })
  
  useEffect(() => {
    const updateData = devTreeLinks.map(item =>{
      //const userlink = JSON.parse(user.links).find((link: SocialNetwork  )=> link.name === item.name)
      const userlink = (Array.isArray(user.links) ? user.links : JSON.parse(user.links || "[]")).find((link: SocialNetwork  )=> link.name === item.name)
      if(userlink){
        return {...item, url: userlink.url, enabled: userlink.enabled}
      }
      return item
    })
   setDevTreeLinks(updateData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const handleUrlchange= (e: React.ChangeEvent<HTMLInputElement>) =>{
  const updateLinks = devTreeLinks.map(link =>link.name === e.target.name ? {...link, url: e.target.value}: link)
  setDevTreeLinks(updateLinks)

// ← AGREGADO ESTO
    queryClient.setQueryData(["user"], (prevData: User) => {
        return {
            ...prevData,
            links: JSON.stringify(updateLinks)
        }
    })
  
}
  //const links : SocialNetwork[] = JSON.parse(user.links)
  const links : SocialNetwork[] = Array.isArray(user.links) ? user.links : JSON.parse(user.links || "[]")

  const handleEnableLink = (socialNetwork : string) =>{
    const updateLinks = devTreeLinks.map(link =>{
      if (link.name === socialNetwork) {
        if(isValidUrl(link.url)){
          return {...link, enabled : ! link.enabled}
        }else{
          toast.error("URL no valida")
        }
      }
      return link
     })
    setDevTreeLinks(updateLinks)
    
     let updateItems: SocialNetwork[] = [] 

    const selectedSocialNetwork = updateLinks.find(link => link.name === socialNetwork)
     if (selectedSocialNetwork?.enabled){
      const id = links.filter(links => links.id).length +1
      if(links.some(link => link.name === socialNetwork)){
        updateItems = links.map(link => {
          if(link.name === socialNetwork){
            return {
              ...link,
              enabled: true,
              id
            }
          }else{
            return link
          }
        })
         
      }else {
        const newItem={
          ...selectedSocialNetwork,
          id
        } 
        updateItems = [...links,newItem] 
      }
     }else{
      const indexToUpdate = links.findIndex(link => link.name === socialNetwork)
      updateItems = links.map(link => {
        if(link.name === socialNetwork){
          return {
            ...link,
            id: 0,
            enabled: false
          }
        }else if (link.id > indexToUpdate && (indexToUpdate !==0 && link.id ===1)){
          return {
            ...link,
            id: link.id -1
          }
        }else{
          return link 
        }
      })
    }

    queryClient.setQueryData(["user"],(prevData: User) => {
      return {
        ...prevData,
        links: JSON.stringify(updateItems)
      }
    })
  }

  return (

    <>
        <div className="space-y-5">
          {devTreeLinks.map( item =>(
            <DevTreeInput
            key={item.name}
            item={item}
            handleUrlchange={handleUrlchange}
            handleEnableLink={handleEnableLink}
            />
            ))}
            <button className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded font-bold" onClick={() => mutate(queryClient.getQueryData(["user"])!
)} >
              Guardar Cambios</button>
        </div>
    </>
  )
}
