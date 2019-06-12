import React from 'react'
import {connect} from 'react-redux'
import {getProducts} from '../store/products'
import {NavLink} from 'react-router-dom'

class AllProducts extends React.Component {
  constructor() {
    super()
  }
  componentDidMount() {
    this.props.getProducts()
  }
  render() {
    return (
      <div>
        <h1>All Products</h1>
        {this.props.products.map(product => {
          return (
            <div key={product.id}>
              <NavLink to={`/products/${product.id}`}>
                <h2>{product.name}</h2>
              </NavLink>
              <img src={product.imageUrl} />
              <p>Quantity: {product.quantity}</p>
              <p>Price: $ {product.price}</p>
              <button>Add to cart</button>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => {
      return dispatch(getProducts())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
