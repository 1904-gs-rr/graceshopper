import React from 'react'
import {NavLink} from 'react-router-dom'
import axios from 'axios'
export default class Orders extends React.Component {
  constructor() {
    super()
    this.state = {
      orders: []
    }
  }
  async componentDidMount() {
    const {data} = await axios.get('/api/cart/history')
    this.setState({orders: data})
  }
  render() {
    return (
      <div>
        <h1>Orders</h1>
        {this.state.orders.map(order => (
          <NavLink to={`/orders/history/${order.id}`}>Go to {order.id}</NavLink>
        ))}
      </div>
    )
  }
}
