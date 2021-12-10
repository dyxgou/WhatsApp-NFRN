import { atom , selector } from "recoil"


export const contactsAtoms = atom({
  key : "contactsAtomState",
  default : []
})


export const getContacts = selector({
  key : "getContactsState",
  get : ({ get }) => 
  {
    const contacts = get(contactsAtoms)
    return contacts
  }
})