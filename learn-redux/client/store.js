import { createStore , compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

import rootReducer from './reducers/index';
import comments from './data/comments';
import posts from './data/posts';


const defaultState = {
    posts,
    comments
}
const enhancers = compose(
    window.deToolsExtension ? window.devToolsExtension() : f => f 
);

const store = createStore(rootReducer, defaultState, enhancers);

if(module.hot) {
    module.hot.accept('./reducers/',() => {
        const nextRoutReducer = require('./reducers/index').default;
        store.replaceReducer(nextRoutReducer);
    });
}
export const history = syncHistoryWithStore(browserHistory, store);
export default store;