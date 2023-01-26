import { ICategory } from "./ICategory"

export type IContact = {
  id: string
  name: string
  email: string
  phone: string
  category: ICategory
}

export type DomainContact = {
  id?: string
  name: string
  email: string
  phone: string
  categoryId: string
}

export type PersistenceContact = {
  id: string
  name: string
  email: string
  phone: string
  category_id: string
  category_name?: string
}