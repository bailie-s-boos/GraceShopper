import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchProduct } from '../../store'
import { Product } from 'src/@types/redux-types'
import ProductItem from '../Home/ProductList/ProductItem'

const mapStateToProps = ({ product }: { product: Product }) => {
  return { product }
}

const mapDispatchToProps = (dispatch: any) => ({
  fetchProduct: (productId: number) => dispatch(fetchProduct(productId))
})

const Product = ({ product, fetchProduct, match }: { product: Product; fetchProduct: any; match: any }) => {
  useEffect(() => {
    fetchProduct(match.params.id)
  }, [])
  return <ProductItem product={product} />
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product)
