import { atom , selector } from "recoil"

export const userAtom = atom({
  key : "userAtomState",
  default : null
})


export const getUser = selector({
  key : "getUsersState",
  get : ({ get }) => 
  {
    const user = get(userAtom)

    return user
  }
}) 