import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {addingItem} from '../store/cart'

class SingleProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      product: {}
    }
  }
  async componentDidMount() {
    const {data} = await axios.get(
      `/api/products/${this.props.match.params.id}`
    )
    this.setState({product: data})
  }
  render() {
    const product = this.state.product
    return (
      <div>
        <h1>{product.name}</h1>
        <img src={product.imageUrl} />
        <h2>Quantity: {product.quantity}</h2>
        <button type="button" onClick={() => this.props.addToCart(product)}>
          Add to cart
        </button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addToCart: item => dispatch(addingItem(item))
  }
}

export default connect(null, mapDispatchToProps)(SingleProduct)
