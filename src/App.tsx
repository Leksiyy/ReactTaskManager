import {Layout} from "antd";
import CardsContainer from "./components/CardsContainer.tsx";
import HeaderComponent from "./components/HeaderComponent.tsx";
import Settings from "./components/Settings.tsx";

function App() {

    return (
        <Layout style={{ minHeight: '100vh' }}>

            <HeaderComponent />

            <CardsContainer />

           <Settings />

        </Layout>
  )
}


export default App;
