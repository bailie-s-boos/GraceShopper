import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import axios from 'axios'

import user from './user-reducer'
import categories from './categories-reducer'
import products from './products-reducer'
import product from './product-reducer'
import searchTerm from './searchTerm-reducer'
import order from './order-reducer'

const store = createStore(
  combineReducers({ user, categories, products, product, searchTerm, order }),
  applyMiddleware(thunkMiddleware)
)

export default store
