import { useState } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";
import { useNavigate } from "react-router-dom";

const QuestionNew = (props) => {
  const navigate = useNavigate();
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");

  const handleChangeOptionOne = (e) => {
    setOptionOne(e.target.value);
  };

  const handleChangeOptionTwo = (e) => {
    setOptionTwo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.dispatch(handleAddQuestion(optionOne, optionTwo));
    navigate("/");
  };

  return (
    <div>
      <h3 className="center">Would You Rather</h3>
      <h4 className="center">Create Tour Own Poll</h4>
      <form className="new-tweet" onSubmit={handleSubmit}>
        <input type="text"
          placeholder="Option One"
          className="textarea"
          value={optionOne}
          onChange={handleChangeOptionOne}
          data-testid="option-one"
        />
        <input type="text"
          placeholder="Option Two"
          className="textarea"
          value={optionTwo}
          onChange={handleChangeOptionTwo}
          data-testid="option-two"
        />
        <button className="btn" type="submit" disabled={optionOne === "" || optionTwo === ""} data-testid="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default connect()(QuestionNew);