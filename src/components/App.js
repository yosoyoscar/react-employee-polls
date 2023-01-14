import '../App.css';
import { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import LoadingBar from "react-redux-loading-bar";
import { Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import Dashboard from "./Dashboard";
import Question from "./Question";
import Login from "./Login";
import NotFound404 from "./NotFound404";
import Leaderboard from "./Leaderboard";
import QuestionNew from "./QuestionNew";

const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);
  return (
    <Fragment>
      <LoadingBar />
      <div className="container">
        <Nav />
        {props.loading === true
         ? null
         : (
          <Routes>
            <Route path="/" exact element={<Dashboard />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/question/:id" element={<Question />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/new" element={<QuestionNew />}/>
            <Route path="*" element={<NotFound404 />} />
          </Routes>
          )
        }
      </div>
    </Fragment>
  );
}

const mapStateToProps = ({ users, authedUser }) => ({
  authedUser,
  loading: authedUser === null && !users,
});

export default connect(mapStateToProps)(App);