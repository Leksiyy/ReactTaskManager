import {Layout} from "antd";
import {useState} from "react";
import CardsContainer from "./components/CardsContainer.tsx";
import HeaderComponent from "./components/HeaderComponent.tsx";
import Settings from "./components/Settings.tsx";

function App() {
    const [position, setPosition] = useState<'Current' | 'Archive'>('Current');


    return (
        <Layout style={{ minHeight: '100vh' }}>

            <HeaderComponent position={position} setPosition={setPosition} />

            <CardsContainer />

            <Settings />

        </Layout>
  )
}


export default App;
