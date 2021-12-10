import { atom , selector } from "recoil";


export const contactAtom = atom({
  key : "contactState",
  default : null
})

export const getContact = selector({
  key : "getContact",
  get : ({ get }) => {
    const contact = get(contactAtom)

    return contact
  }
})