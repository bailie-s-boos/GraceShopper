import React from 'react'
import { Product } from 'src/@types/redux-types'
import { connect } from 'react-redux'
import { putCartLineItem, deleteCart } from '../../../store/thunks'
import { getCartCount } from '../../../store/actions'

const mapDispatchToProps = (dispatch: any) => ({
  updateCart: (productId: number, quantity: number) => dispatch(putCartLineItem(productId, quantity)),
  changeCartCount: (num: number) => dispatch(getCartCount(num))
})

const mapStateToProps = ({ cartCount }: { cartCount: number }) => ({
  cartCount
})

const OrderRow = ({
  product,
  isCart,
  updateCart,
  changeCartCount,
  cartCount
}: {
  product: Product
  isCart: boolean
  updateCart: any
  changeCartCount: any
  cartCount: number
}) => {
  const handleUpdateCart = (productId: number, quantity: number) => {
    updateCart(productId, quantity).then(() => {
      if (quantity) {
        console.log(cartCount + quantity)
        changeCartCount(cartCount + quantity)
      } else {
        changeCartCount(cartCount - product.OrdersProducts.quantity)
      }
    })
  }
  return (
    <tr>
      <th>{product.id}</th>
      <th>{product.name}</th>
      <th>{product.price}</th>
      <th>
        {isCart ? (
          <button
            type="button"
            className="btn btn-info"
            disabled={product.OrdersProducts.quantity === 1}
            onClick={() => handleUpdateCart(product.id, -1)}
          >
            -
          </button>
        ) : null}
        {product.OrdersProducts.quantity}
        {isCart ? (
          <button type="button" className="btn btn-info" onClick={() => handleUpdateCart(product.id, 1)}>
            +
          </button>
        ) : null}
      </th>
      {isCart ? (
        <th>
          <button type="button" className="btn btn-raised btn-danger" onClick={() => handleUpdateCart(product.id, 0)}>
            🗑️
          </button>
        </th>
      ) : null}
    </tr>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderRow)
