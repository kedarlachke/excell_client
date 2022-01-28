import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import '../src/exceladminsrc/style/custom.css'
//import 'semantic-ui-css/semantic.min.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware ,compose } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
//import AppRouter from './router';
import Header from '../src/exceladminsrc/Components/Header/Header';
import SidebarMenu from '../src/exceladminsrc/Components/Header/SidebarMenu';
import SidebarPushable from '../src/exceladminsrc/Components/Header/SidebarPushable';


import Main from './components/FormComponents/Main';
import HeaderJWT from '../src/exceladminsrc/Components/Header/HeaderJWT';
import MainJWT from './components/FormComponents/MainJWT';
import { BrowserRouter } from 'react-router-dom';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
const history = createHistory();
const middleware = routerMiddleware(history);
const createStoreWithMiddleware = compose(applyMiddleware(reduxThunk,middleware))(createStore);
const store = createStoreWithMiddleware(reducers);
const ClientFor ="COOKIE";
//const ClientFor ="TOKEN";


//const ENVG=require('dotenv').config();


class App extends Component {
  render() {
   /* return (
      <div className="App">
      <Header />
     <Main/>
       </div>
           <Provider store={store}>
    <ConnectedRouter   history={history}>
   <div>
   <DashBoard/>
  </div>
    </ConnectedRouter >
    </Provider>
    );*/
	
	 if(ClientFor=="COOKIE")
  {
  return (
    <Provider store={store}>
    <ConnectedRouter   history={history}>
    <div>
   

<Header/>

            {/* <Header setSideBarVisibility={this.setSideBarVisibility} sideBarVisible={this.state.sideBarVisible} />
            <Main setSideBarVisibility={this.setSideBarVisibility} sideBarVisible={this.state.sideBarVisible} />  */}

 <Main/>
 </div>

    </ConnectedRouter >
    </Provider>
  );
  }

  if(ClientFor=="TOKEN")
  {
  return (
    <Provider store={store}>
    <ConnectedRouter   history={history}>
   <div>
      <HeaderJWT />
     <MainJWT/>
  </div>
    </ConnectedRouter >
    </Provider>
  );
	
	
	
  }
}
}
export default App;
/*
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware ,compose } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import AppRouter from './router';
import Header from './components/FormComponents/Header';
import Main from './components/FormComponents/Main';
import DashBoard from '../exceladminsrc/Components/DashBoard/dashBoard';
import HeaderJWT from './components/FormComponents/HeaderJWT';
import MainJWT from './components/FormComponents/MainJWT';
import { BrowserRouter } from 'react-router-dom';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
const history = createHistory();
const middleware = routerMiddleware(history);
const createStoreWithMiddleware = compose(applyMiddleware(reduxThunk,middleware))(createStore);
const store = createStoreWithMiddleware(reducers);
const ClientFor ="COOKIE";




const App = () => {

  if(ClientFor=="COOKIE")
  {
  return (
    <Provider store={store}>
    <ConnectedRouter   history={history}>
   <div>
    <Header />
     <Main/>
  </div>
    </ConnectedRouter >
    </Provider>
  );
  }

  if(ClientFor=="TOKEN")
  {
  return (
    <Provider store={store}>
    <ConnectedRouter   history={history}>
   <div>
    <HeaderJWT />
     <MainJWT/>
  </div>
    </ConnectedRouter >
    </Provider>
  );
  }




};

export default App;


*/