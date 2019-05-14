import axios from 'axios'
import { ThunkDispatch } from 'redux-thunk'

import store from './store'
import * as actions from './actions'
import { User, Product, Category, Order } from 'src/@types/redux-types'
import { initialUser } from './user-reducer'
import { Dispatch } from 'redux'

export const fetchProducts = () => {
  return (dispatch: any) => {
    return axios
      .get('/api/products')
      .then(res => res.data)
      .then((products: Array<Product>) => dispatch(actions.getProducts(products)))
  }
}

export const searchProducts = () => {
  
  return (dispatch: any) => {
    return axios
      .get(`/api/products/search/${store.getState().searchTerm}`)
      .then(res => res.data)
      .then((products: Array<Product>) => {
        dispatch(actions.getProducts(products))
      })
  }
}

export const fetchProductsByCategory = (id: number) => {
  return (dispatch: any) => {
    return axios
      .get(`/api/categories/${id}/products`)
      .then(res => res.data)
      .then((category: Category) => dispatch(actions.getProducts(category.products)))
  }
}

export const fetchCategories = () => {
  return (dispatch: any) => {
    return axios
      .get('/api/categories')
      .then(res => res.data)
      .then((categories: Array<Category>) => dispatch(actions.getCategories(categories)))
  }
}

export const fetchProduct = (id: number) => {
  return (dispatch: any) => {
    return axios
      .get(`/api/products/${id}`)
      .then(res => res.data)
      .then((product: Product) => dispatch(actions.getProduct(product)))
  }
}

export const fetchLoggedInUser = () => {
  return (dispatch: any) => {
    return axios
      .get('auth/user')
      .then(res => res.data)
      .then((user: User) => dispatch(actions.getUser(user)))
  }
}

export const checkIfLoggedIn = () => {
  return (dispatch: any) => {
    axios
      .get('/auth')
      .then(res => {
        if (res.status === 204) {
          return initialUser
        }

        return res.data
      })
      .then((user: User) => dispatch(actions.getUser(user)))
  }
}

export const fetchOrder = (orderId: number) => {
  return (dispatch: any) => {
    axios
      .get(`/api/users/${store.getState().user.id}/orders/${orderId}`)
      .then(res => res.data)
      .then((order: Order) => dispatch(actions.getOrder(order)))
  }
}

export const fetchOrders = () => {
  return (dispatch: any) => {
    axios
      .get(`/api/users/${store.getState().user.id}/orders`)
      .then(res => {
        return res.data
      })
      .then((orders: Array<Order>) => dispatch(actions.getOrders(orders)))
  }
}

export const login = ({ name, password }: { name: string; password: string }) => {
  return (dispatch: any) => {
    return axios
      .put('/auth/login', { name, password })
      .then(res => res.data)
      .then((user: User) => dispatch(actions.getUser(user)))
  }
}

export const logout = () => {
  return (dispatch: any) => {
    return axios.delete('/auth').then(() => dispatch(actions.getUser(initialUser)))
  }
}

export const addItemToCart = (userId: number, product: Product) => {
  return (dispatch: any) => {
    console.log('inside thunk. making axios call', product)
    return axios
      .post(`/api/users/${userId}/orders`, product)
      .then(res => res.data)
      .then((count: number) => dispatch(actions.getCartCount(count)))
  }
}

export const checkoutOrder = (orderId: number) => {
  return (dispatch: Dispatch) => {
    return axios
      .put(`/api/users/${store.getState().user.id}/orders/${orderId}`, { orderId })
      .then(res => res.data)
      .then(() => dispatch(actions.getCartCount(0)))
  }
}

export const createNewUser = ({ name, password }: { name: string; password: string }) => {
  return (dispatch: any) => {
    return axios
      .post('/api/users', { name, password })
      .then(res => res.data)
      .then((user: User) => dispatch(actions.getUser(user)))
  }
}

export const putCartLineItem = (productId: number, quantity: number) => {
  return (dispatch: any) => {
    return axios
      .put(`/api/users/${store.getState().user.id}/products/${productId}`, { quantity }) //
      .then(res => {
        if (res.status === 204) dispatch(actions.updateCartLineItem(productId, quantity))
        else console.error('Failed to update cart')
      })
  }
}

export const deleteCart = () => {
  return (dispatch: any) => {
    return axios
      .delete(`/api/users/${store.getState().user.id}/orders`) //
      .then(() => dispatch(actions.emptyCart()))
  }
}

export const putPassword = (password: string) => {
  return (dispatch: any) => {
    return axios
      .put(`/auth/users/${store.getState().user.id}`, { password })
      .then(res => res.data)
      .then(user => dispatch(actions.getUser(user)))
  }
}
