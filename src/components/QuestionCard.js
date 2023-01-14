import { connect } from "react-redux";
import { formatQuestion, formatDate } from "../utils/helpers";
import { Link } from "react-router-dom";

const QuestionCard = (props) => {

  if (props.question === null) {
    return <p>This Poll doesn't exist</p>;
  }

  const {
    name,
    avatar,
    timestamp,
    optionOne,
    optionTwo,
    id,
  } = props.question;

  return (
    <Link to={`/question/${id}`} className="tweet">
      <img src={avatar} alt={`Avatar of ${name}`} className="avatar" />
      <div className="tweet-info">
        <div>
          <span>{name}</span>
          <div>{formatDate(timestamp)}</div>
          <p>{optionOne.text}</p>
          <p>{optionTwo.text}</p>
        </div>
      </div>
    </Link>
  );
};

const mapStateToProps = ({ authedUser, users, questions }, { id }) => {
  const question = questions[id];

  return {
    authedUser,
    question: question
      ? formatQuestion(question, users[question.author], authedUser)
      : null,
  };
};

export default connect(mapStateToProps)(QuestionCard);
