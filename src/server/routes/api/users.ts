import express = require('express')
import User from '../../models/user'
import Order, { Status } from '../../models/order'
import OrdersProducts from '../../models/ordersProducts'
import Product from '../../models/product'
const route = express.Router()

// get orders associated with a user by id
route.get(
  '/:id/orders',
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(req.params.id)
    if (req.params.id === '-1') {
      if (!req.session!.order) {
        req.session!.order = []
      }
      const cart = [
        {
          id: -1,
          status: Status.Cart,
          userId: -1,
          products: req.session!.order
        }
      ]
      res.send(cart)
    } else {
      Order.findAll({
        where: {
          userId: req.params.id
        },
        include: [
          {
            model: Product
          }
        ]
      })
        .then(orders => res.send(orders))
        .catch(next)
    }
  }
)

route.post(
  '/',
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    return User.createUser({ name: req.body.name, password: req.body.password })
      .then(user => res.send(user))
      .catch(next)
  }
)

//get specific order for user
route.get(
  '/:userId/orders/:orderId',
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(req.params.userId)
    if (req.params.userId === '-1') {
      if (!req.session!.order) {
        req.session!.order = []
      }
      const cart = {
        id: -1,
        status: Status.Cart,
        userId: -1,
        products: req.session!.order
      }

      res.send(cart)
    } else {
      Order.findOne({
        where: {
          userId: req.params.userId,
          id: req.params.orderId
        },
        include: [
          {
            model: Product
          }
        ]
      })
        .then(order => res.send(order))
        .catch(next)
    }
  }
)

route.put(
  '/:userId/orders/:orderId',
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Order.checkoutCart(req.params.userId)
      .then(() => res.sendStatus(204))
      .catch(next)
  }
)

route.post(
  '/:userId/orders',
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log('post route hit')
    // Check if a user is logged in.
    if (req.params.userId === '-1') {
      console.log('no user logged in')
      // No user. We have ourselves a guest. Guest
      // will add items to cart and the data will
      //be stored on the session.

      // Check if the session already contains
      // an order.
      if (!req.session!.order) {
        // If there is no order on the session, initialize one.
        // Subsequent selected products will be stored here.
        req.session!.order = []
      }
      const productExists = req.session!.order.find(
        (product: Product) => product.id === req.body.id
      )
      let totalQuantity = req.session!.order.reduce(
        (acc: number, item: any) => {
          acc += item.OrdersProducts.quantity
          return acc
        },
        1
      )

      if (productExists) {
        productExists.OrdersProducts.quantity += 1
        res.send(`${totalQuantity}`)
      } else {
        req.body.OrdersProducts = { quantity: 1 }
        req.session!.order.push(req.body)
        res.send(`${totalQuantity}`)
      }
      //res.send(`${req.session!.order.length}`)
    } else {
      // We have a logged in user, and a selected product.
      const userId = req.params.userId
      const product = req.body
      // Find the associated order that exists as an open cart,
      // and add to that cart.
      Order.addToCart(userId, product.id)
        .then(cartId => OrdersProducts.findAll({ where: { orderId: cartId } }))
        .then(orderProducts => res.send(`${orderProducts.length}`))
        .catch(next)
    }
  }
)

export default route
