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
        <h1>Order History</h1>
        {!this.state.orders.length ? (
          <h1>You do not have any placed orders</h1>
        ) : (
          <ul>
            {this.state.orders.map(order => (
              <NavLink to={`/orders/history/${order.id}`}>
                <li key={order.id}>
                  Order {order.id} Order Date : {order.updatedAt}
                </li>
              </NavLink>
            ))}
          </ul>
        )}
      </div>
    )
  }
}
