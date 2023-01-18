import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from "redux";
import reducer from "../reducers";
import middleware from "../middleware";
import { BrowserRouter as Router } from "react-router-dom";
import Nav from '../components/Nav';

const store = createStore(reducer, middleware);

describe('Nav', () => {
  it('matches the snapshot', () => {
    var component = render(
      <Provider store={store}>
        <Router>
          <Nav />
        </Router>
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });

  it('Nav shows all links', () => {
    var component = render(
      <Provider store={store}>
        <Router>
          <Nav />
        </Router>
      </Provider>
    );
    const linkHome = screen.getByText(/Home/i);
    expect(linkHome).toBeInTheDocument();
    const linkNewPoll = screen.getByText(/New Poll/i);
    expect(linkNewPoll).toBeInTheDocument();
    const linkLeaderboard = screen.getByText(/Leaderboard/i);
    expect(linkLeaderboard).toBeInTheDocument();
  });
});