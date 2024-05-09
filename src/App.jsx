
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Layout from './Layouts/Layout'
import Homepage from './Pages/Homepage'
import Categories from './Pages/Categories'
import Search from './Pages/Search'
import Gif from './Pages/Gif'
import Favourites from './Pages/Favourites'
import GifProvider from './Context/GifContext'



const router = createBrowserRouter([
  {
    element: <Layout/>,
    children:[
      {
        path: '/',
        element: <Homepage/>
      },
      {
        path: '/:categories',
        element: <Categories/>
      },
      {
        path: '/search/:query',
        element: <Search/>
      },
      {
        path: '/:type/:slug',
        element: <Gif/>
      },
      {
        path: '/favourites',
        element: <Favourites/>
      },

    ]
  }
])
function App() {
  return (
  <GifProvider>
      <RouterProvider router={router}/>
  </GifProvider>
  )
}

export default App
