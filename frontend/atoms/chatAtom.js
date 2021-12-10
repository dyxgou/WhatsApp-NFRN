import { atom, selector } from "recoil"

export const chatState = atom({
  key : "chatAtomState",
  default : null
})


export const getChat = selector({
  key : "getChat",
  get : ({get}) => 
  {
    const chat = get(chatState)

    return chat
  }
})