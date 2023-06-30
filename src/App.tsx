import Header from "./Header"
import Row from "./Row"

function App() {
  return (
    <div className="mx-auto w-90 relative h-screen">
      <Header />
      <main className="grid grid-rows-5 gap-2 my-2">
        <Row guess="te" />
        <Row guess="tes" />
        <Row guess="test" />
        <Row guess="test" />
        <Row guess="" />
      </main>
    </div>
  )
}

export default App
