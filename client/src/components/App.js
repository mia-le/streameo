import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import StreamList from "./streams/StreamList";
import StreamCreate from "./streams/StreamCreate";
import StreamEdit from "./streams/StreamEdit";
import StreamDelete from "./streams/StreamDelete";
import StreamShow from "./streams/StreamShow";
import Header from "./Header";
import history from "../history";
import Error404 from "./Error404";
import Footer from "./Footer";
//568590835476-js9v9okl2fpcr1oludo0d8phorm5d9fp.apps.googleusercontent.com
const App = () => {
  return (
    <div className="ui container">
      <div
        style={{
          position: "fixed",
          left: 0,
          zIndex: -400,
          top: 0,
          width: "100%",
          height: "100vh",
          opacity: "0.6",
          background:
            "url('https://www.toptal.com/designers/subtlepatterns/patterns/food.png')",
          // background:
          //   "url('https://media.istockphoto.com/vectors/vector-fast-food-pattern-fast-food-seamless-background-vector-id941391600?b=1&k=6&m=941391600&s=612x612&w=0&h=IPQzgBn4LjcwxtvzTtnyEeYP36MasrfRT-xmGARRfy4=')",
        }}
      />
      {/* change BrowserRouter to plain Router so that we can use our custom history */}
      <Router history={history}>
        <div
          style={{
            paddingTop: "4em",
          }}
        >
          <Header />
          {/* Switch only show the first route out of all routes that matches*/}
          <Switch>
            <Route path="/" exact component={StreamList} />
            <Route path="/streams/new" exact component={StreamCreate} />
            {/* putting ":" makes it a variable in the url */}
            <Route path="/streams/edit/:id" exact component={StreamEdit} />
            <Route path="/streams/delete/:id" exact component={StreamDelete} />
            <Route path="/streams/:id" exact component={StreamShow} />
            <Route path="*" component={Error404} />
          </Switch>
          <Footer />
        </div>
      </Router>
    </div>
  );
};

export default App;
