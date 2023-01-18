import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from "redux";
import reducer from "../reducers";
import middleware from "../middleware";
import { BrowserRouter as Router } from "react-router-dom";
import Login from '../components/Login';

const store = createStore(reducer, middleware);

describe('Login', () => {
  it('matches the snapshot', () => {
    var component = render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });

  it('Login shows select with users', () => {
    var component = render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    var usersSelect = component.getByTestId('users-select');
    expect(usersSelect).toBeInTheDocument();
  });
});