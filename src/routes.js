import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/Header';

import Home from './pages/Home';
import Personagem from './pages/Personagem';

const Routes = () => {
    return(
        <BrowserRouter>
            <Header/>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/character/:id" component={Personagem} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;