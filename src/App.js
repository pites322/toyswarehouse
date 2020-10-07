import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import './App.css';
import Login from "./components/login/Login";
import Products from "./components/products/Products";
import Transactions from "./components/transactions/Transactions";
import Categories from "./components/categories/Categories";
import {connect, useDispatch} from "react-redux";
import mapDispatchToProps from "react-redux/lib/connect/mapDispatchToProps";
import {loadLocalToken} from "./store/actions/loginActions";





function App({loginData}) {
    const dispatch = useDispatch()
    let redirectPath = '/login'
    if (loginData.token){
        redirectPath = '/products'
    }else{
        const token = localStorage.getItem('token')
        if (token){
            dispatch(loadLocalToken(token))
        }

    }
    return (
      <div className="App">
          {/*<button name='login' onClick={redirect}>login</button>*/}
          {/*<button name='products' onClick={redirect}>products</button>*/}
      <Router>
          <Switch>
              <Route path='/login'>
                  <Redirect to={redirectPath} />
                  <Login/>
              </Route>
              <Route path='/products'>
                  <Redirect to={redirectPath} />
                  <Products/>
              </Route>
              <Route path='/transactions'>
                  <Transactions/>
              </Route>
              <Route path='/categories'>
                  <Categories/>
              </Route>
          </Switch>
      </Router>
    </div>
    );
}

const mapStatePoProps = state => {
    return {
        loginData: state.login
    }
}


export default connect(mapStatePoProps, null)(App);
