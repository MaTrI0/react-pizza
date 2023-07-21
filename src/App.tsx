import './scss/app.scss'

import Home from './pages/Home'
import NotFound from './pages/NotFound'
import FullPizzaInfo from './pages/FullPizzaInfo'
import { Route, Routes } from 'react-router-dom'
import Cart from './pages/Cart'
import MainLayout from './layouts/Main.layout'
import LoginModule from "./components/Auth/LoginPage";
import AdminPage from "./pages/Admin";

function App() {
	return (
		<Routes>
			<Route path='/' element={<MainLayout />}>
				<Route path='' element={<Home />} />
				<Route path='cart' element={<Cart />} />
				<Route path='login' element={<LoginModule />} />
				<Route path='admin' element={<AdminPage />} />
				<Route path='pizza/:id' element={<FullPizzaInfo />} />
				<Route path='*' element={<NotFound />} />
			</Route>
		</Routes>
	)
}

export default App
