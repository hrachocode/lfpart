import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import allReducers  from './reducers';
import Development from './development/Development';
import BrowserWidth from './browserWidth/BrowserWidth';
import Header  from './components/header/Header';
import Footer from './components/footer/Footer';
import NotFound from './components/notFound/NotFound';
import DetailPage from './components/detailPage/DetailPage';
import Products from './components/products/Products';
import Account from './components/account/Account';
import Authentication from './components/authentication/Authentication';
import forgotPassword from './components/authentication/forgotPassword/forgotPassword';
import resetPassword from './components/authentication/resetPassword/resetPassword';
import Payment from './components/payment/Payment';
import Refund from './components/aboutUs/Refund';
import Shipment from './components/aboutUs/Shipment';
import './App.css'

const store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const App = () => (
	<Provider store={store}>
		<BrowserWidth />
		<BrowserRouter>
			<Header/>
			<Switch>
				<Route path="/" component={Development} exact />
				<Redirect from={'/account/'} to={'/account'} strict exact/>
				<Route path="/account" component={Account} exact />
				<Redirect from={'/account/basket/'} to={'/account/basket'} strict exact  />
				<Route path="/account/basket" component={Account} exact/>
				<Redirect from={'/account/wishlist/'} to={'/account/wishlist'} strict exact  />
				<Route path="/account/wishlist" component={Account} exact/>
				<Redirect from={'/account/personal-info/'} to={'/account/personal-info'} strict exact />
				<Route path="/account/personal-info" component={Account} exact/>
				<Redirect  from={'/account/order-history/'} to={'/account/order-history'} strict exact />
				<Route path="/account/order-history" component={Account} exact/>

				<Redirect from={'/account/authentication/'} to={'/account/authentication'} strict exact />
				<Route path="/authentication" component={Authentication} exact/>

				<Redirect from={'/account/forgot-password'} to={'/account/forgot-password'} strict exact />
				<Route path="/forgot-password" component={forgotPassword} exact/>

				<Redirect from={'/account/reset-password'} to={'/account/reset-password'} strict exact />
				<Route path="/reset-password" component={resetPassword} exact/>

				<Redirect from={'/account/filter/:id/'} to={'/account/filter/:id'} strict exact />
				<Route path="/products/glasses/:id" component={Products} exact/>
				<Route path="/products/contact-lens/:id" component={Products} exact/>
				<Route path="/products/eye-lens/:id" component={Products} exact/>
				<Route path="/products/care/:id" component={Products} exact/>
				<Route path="/products/detail/:slug" component={DetailPage} exact/>
				<Redirect from={'/products/detail/:slug/'} to={'/account/detail/:slug'} strict exact />
				<Route path="/payment-fail" component={Payment} exact/>
				<Redirect from={'/payment-fail/'} to={'/payment-fail'} strict exact />
				<Route path="/refund" component={Refund} exact/>
				<Redirect from={'/refund/'} to={'/refund'} strict exact />
				<Route path="/shipment" component={Shipment} exact/>
				<Redirect from={'/shipment/'} to={'/shipment'} strict exact />
				<Route component={NotFound}/>
			</Switch>
			<Footer/>
		</BrowserRouter>
	</Provider>
)

export default App;