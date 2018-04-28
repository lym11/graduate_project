import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/pages/Home'
import Order from '../components/pages/Order'
import Self from '../components/pages/Self'
import Location from '../components/pages/Location'
import MyAddress from '../components/pages/MyAdress'
import EditAddress from '../components/pages/EditAddress'
import SellerDetail from '../components/pages/SellerDetail'
import OrderDetail from '../components/pages/OrderDetail'
import Collect from '../components/pages/Collect'
import ConfirmOrder from '../components/pages/ConfirmOrder'
import AddAddress from '../components/pages/AddAdress'
Vue.use(Router)

const routes = [
  {path: '/my_app/home', name: 'home', component: Home},
  {path: '/my_app/order', name: 'order', component: Order},
  {path: '/my_app/self', name: 'self', component: Self},
  {path: '/my_app/location', name: 'location', component: Location},
  {path: '/my_app/my_address', name: 'myAddress', component: MyAddress},
  {path: '/my_app/edit_address', name: 'editAddress', component: EditAddress},
  {path: '/my_app/home/seller_detail', name: 'sellerDetail', component: SellerDetail},
  {path: '/my_app/order/order_detail', name: 'orderDetail', component: OrderDetail},
  {path: '/my_app/my_collect', name: 'collect', component: Collect},
  {path: '/my_app/confirm_order', name: 'confirmOrder', component: ConfirmOrder},
  {path: '/my_app/add_address', name: 'addAddress', component: AddAddress}
]
let router = new Router({
  routes,
  linkActiveClass: 'active'
})
router.push('/my_app/home')
export default router
