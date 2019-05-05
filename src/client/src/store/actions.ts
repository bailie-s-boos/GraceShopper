import { Product, Category, ReduxTypes, User } from 'src/@types/redux-types'

// types

export const GET_PRODUCTS = Symbol('redux get products')
export const GET_USER = Symbol('redux get user')
export const GET_CATEGORIES = Symbol('redux get categories')

// action creators

export const getProducts: ReduxTypes.ActionCreator = (products: Array<Product>) => ({ type: GET_PRODUCTS, products })
export const getUser: ReduxTypes.ActionCreator = (user: User) => ({ type: GET_USER, user })
export const getCategories: ReduxTypes.ActionCreator = (categories: Array<Category>) => ({ type: GET_CATEGORIES, categories })