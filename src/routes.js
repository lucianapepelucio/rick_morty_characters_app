import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/Header';

import Home from './pages/Home';
import Character from './pages/Character';
import Error from './pages/Error';

const Routes = () => {
    return(
        <BrowserRouter>
            <Header/>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/character/:id" component={Character} />
                <Route path="*" component={Error} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;