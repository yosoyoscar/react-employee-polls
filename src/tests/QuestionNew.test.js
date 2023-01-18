import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from "redux";
import reducer from "../reducers";
import middleware from "../middleware";
import { BrowserRouter as Router } from "react-router-dom";
import QuestionNew from '../components/QuestionNew';

const store = createStore(reducer, middleware);

describe('QuestionNew', () => {
  it('matches the snapshot', () => {
    var component = render(
      <Provider store={store}>
        <Router>
          <QuestionNew />
        </Router>
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });

  it('will check submit button is enabled if both questions are informed', () => {
    var component = render(
      <Provider store={store}>
        <Router>
          <QuestionNew />
        </Router>
      </Provider>
    );

    var option1 = component.getByTestId('option-one');
    fireEvent.change(option1, { target: { value: 'My option One' } });
    var option2 = component.getByTestId('option-two');
    fireEvent.change(option2, { target: { value: 'My option Two' } });
    expect(component.getByTestId('submit-button')).not.toHaveAttribute('disabled');
  });

  it('will check submit button is disabled if a question is emptys', () => {
    var component = render(
      <Provider store={store}>
        <Router>
          <QuestionNew />
        </Router>
      </Provider>
    );

    var option1 = component.getByTestId('option-one');
    fireEvent.change(option1, { target: { value: 'My option One' } });
    var option2 = component.getByTestId('option-two');
    fireEvent.change(option2, { target: { value: '' } });
    expect(component.getByTestId('submit-button')).toHaveAttribute('disabled');
  });

})