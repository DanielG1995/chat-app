

import './App.css'
import { Loading } from './components/ui/Loading'
import { RouterApp } from './routes/Router'
import useChatStore from './store/store'


function App() {
  const { loading } = useChatStore()
  return (
    <>
      <div className={`relative ${loading ? 'blur-lg' : ''} flex `}>
        <RouterApp />
      </div>
      <Loading />
    </>
  )
}

export default App
