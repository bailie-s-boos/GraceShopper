import React, { useEffect } from 'react'
import { Product, Order } from 'src/@types/redux-types'
import { connect } from 'react-redux'
import OrderDataTable from './OrderDataTable/OrderDataTable'
import { fetchOrders } from '../../store'
import { Link } from 'react-router-dom'
import { deleteCart } from '../../store/thunks'
import { getCartCount } from '../../store/actions'

const mapStateToProps = ({ orders, cartCount }: { orders: Order[]; cartCount: number }) => ({ orders, cartCount })

const mapDispatchToProps = (dispatch: any) => ({
  fetchOrders: () => dispatch(fetchOrders()),
  emptyCart: () => dispatch(deleteCart()),
  changeCartCount: (num: number) => dispatch(getCartCount(num))
})

const Order = ({
  orders,
  fetchOrders,
  emptyCart,
  changeCartCount
}: {
  orders: Order[]
  fetchOrders: any
  emptyCart: any
  changeCartCount: any
}) => {
  useEffect(() => {
    fetchOrders()
  }, [])

  const handleEmptyCart = () => {
    emptyCart()
      .then(() => changeCartCount(0))
      .catch(() => console.error('Failed to empty cart'))
  }
  const cart = orders.find(order => order.status === 'cart')
  const oldOrders = orders.filter(order => order.status !== 'cart')
  return (
    <div>
      {cart ? (
        <div>
          <h3>Your Cart</h3>
          <OrderDataTable key={cart.id} order={cart} isCart={true} />
          <div className="btn-group">
            <Link to={`/orders/${cart.id}/checkout`} className="btn btn-raised btn-success">
              Checkout
            </Link>
            <button className="btn btn-raised btn-danger" onClick={handleEmptyCart}>
              Empty Cart
            </button>
          </div>
        </div>
      ) : null}
      {oldOrders.length > 0
        ? oldOrders.map(order => (
            <div>
              <h4>Status: {order.status}</h4>
              <OrderDataTable key={order.id} order={order} isCart={false} />
            </div>
          ))
        : null}
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Order)
