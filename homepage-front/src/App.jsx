import Header from './components/Header'
import PageTransitionLayout from './components/PageTransitionLayout'

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex min-h-0 flex-1 flex-col pt-18">
        <PageTransitionLayout />
      </main>
    </div>
  )
}

export default App
