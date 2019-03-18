/* Next.js / MUI integration here: https://github.com/mui-org/material-ui/tree/master/examples/nextjs */

import App, { Container } from "next/app";
import Head from "next/head";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import CssBaseline from "@material-ui/core/CssBaseline";
import JssProvider from "react-jss/lib/JssProvider";
import withNProgress from "next-nprogress";
import NProgress from "next-nprogress/component";
import getPageContext from "../lib/getPageContext";
import MainHeader from '../src/components/MainHeader';

import withRedux from "next-redux-wrapper";
import rootReducer from "../src/reducers";
import {createStore, applyMiddleware} from "redux";
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../src/sagas';
import withReduxSaga from 'next-redux-saga';

import {Provider} from "react-redux";

import "../src/App.css";
import "semantic-ui-css/semantic.min.css";



/**
* @param {object} initialState
* @param {boolean} options.isServer indicates whether it is a server side or client side
* @param {Request} options.req NodeJS Request object (not set when client applies initialState from server)
* @param {Request} options.res NodeJS Request object (not set when client applies initialState from server)
* @param {boolean} options.debug User-defined debug mode param
* @param {string} options.storeKey This key will be used to preserve store in global namespace for safe HMR 
*/
const makeStore = (initialState, options) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(sagaMiddleware),
  );
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};


class MyApp extends App {
  constructor(props) {
    super(props);
    this.pageContext = getPageContext();
  }

  
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }


  render() {
    const {Component, pageProps, store} = this.props;

    return (
      <Container>
        <Head>
          <title>Twitter Clone</title>
        </Head>
        {/* Wrap every page in Jss and Theme providers */}
        <JssProvider
          registry={this.pageContext.sheetsRegistry}
          generateClassName={this.pageContext.generateClassName}
        >
          {/* MuiThemeProvider makes the theme available down the React
              tree thanks to React context. */}
          <MuiThemeProvider
            theme={this.pageContext.theme}
            sheetsManager={this.pageContext.sheetsManager}
          >
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {/* Pass pageContext to the _document though the renderPage enhancer
                to render collected styles on server side. */}
            
            <Container>
              <Provider store={store}>
                <MainHeader
                  pageContext={this.pageContext}
                />
                <Component
                  pageContext={this.pageContext}
                  {...pageProps}
                />
              </Provider>
            </Container>
          </MuiThemeProvider>
        </JssProvider>
        <NProgress
          color="#e34234"
          spinner={true}
        />
      </Container>
    );
  }
}


const msDelay = 200;
const configOptions = { trickleSpeed: 50 };
export default withNProgress(msDelay, configOptions)(
  withRedux(makeStore)(
    withReduxSaga(MyApp)
  )
);

