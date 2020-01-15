import React from 'react';
import './OrderHistory.css';

class OrderHistory extends React.Component {

    state = {
        orders: [],
        showProducts: false,
        productInfo: []
    }

    getDateParse = date => {
        let time = new Date(date);
        return `${time.getDate()}.${time.getMonth()}.${time.getFullYear()}`;
    }

    showOrderedProucts = index => {
        let { orders } = this.state, currentIndex = index;
        this.setState({
            showProducts: true
        })
        if (orders.length > 0) {
            this.setState({
                productInfo: orders[currentIndex].productsInfo
            })
        }
    }

    componentDidMount() {
        let req = new Request(`${window.location.protocol}//${window.location.host}/api/v1/orders/?token=674e3a8b-fd97-4534-8b01-ade4618a757c`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer ' + localStorage.token
            }),
        })
        fetch(req)
            .then(res => res.json())
            .then(orders => this.setState({ orders }))
            .catch(error => console.log(error))
    }

    render() {
        const { orders, showProducts,  productInfo } = this.state;
        return (
            <div id="order-history" className="table-list">
                <h2>Պատվերների պատմություն</h2>
                <p>Այստեղ այն պատվերներն են, որտեղ Դուք տեղադրել եք Ձեր հաշվի ստեղծման պահից</p>
                {orders.length > 0 ?
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Ամսաթիվ</th>
                                <th>Ընդհանուր Գին</th>
                                <th>Վճարում</th>
                                <th>Կարգավիճակ</th>
                                <th>Ապրանքներ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((elem, index) => (

                                <tr key={elem._id}>
                                    <td>{elem.order_number}</td>
                                    <td>{this.getDateParse(elem.created_at)}</td>
                                    <td>{elem.commonPrice}</td>
                                    <td>{elem.payment_service}</td>
                                    <td>{elem.status}</td>
                                    <td className="get-ordered-products" onClick={event => this.showOrderedProucts(index)}> Տեսնել Ապրանքները </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    : <p> Դուք դեռ չունեք գնումներ, <a href={window.location.protocol + "//" + window.location.hostname + ':' + (window.location.port ? window.location.port : '')}>Կատարեք Առաջինը</a></p>}
                    {showProducts && <div>
                        <h2 className="ordered-product-header"> Տվյալներ ապրանքի մասին </h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Քանակ</th>
                                    <th>Աջ աչք</th>
                                    <th>Ձախ աչք</th>
                                    <th>Գին</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productInfo.length && productInfo.map(product => (
                                        <tr key={product._id}>
                                            <td>{product._id}</td>
                                            <td>{product.productCount}</td>
                                            <td>{product.left_eye ? product.left_eye : ''}</td>
                                            <td>{product.right_eye ? product.right_eye : ''}</td>
                                            <td></td>
                                        </tr>
                                        )
                                    ) 
                                }
                            </tbody>
                        </table>
                    </div>}
            </div>
        )
    }
}

export default OrderHistory;