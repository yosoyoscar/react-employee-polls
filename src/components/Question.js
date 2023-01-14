import { connect } from "react-redux";
import { formatQuestion, formatDate } from "../utils/helpers";
import {
  TiThumbsUp,
  TiThumbsDown,
} from "react-icons/ti";
import { handleAnswerQuestion } from "../actions/questions";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

const Question = (props) => {
  console.log('Question.props:', props);

  const handleVoteOne = (e) => {
    e.preventDefault();

    props.dispatch(
      handleAnswerQuestion({
        qid: props.question.id,
        authedUser: props.authedUser,
        answer: 'optionOne',
      })
    );
  };

  const handleVoteTwo = (e) => {
    e.preventDefault();

    props.dispatch(
      handleAnswerQuestion({
        qid: props.question.id,
        authedUser: props.authedUser,
        answer: 'optionTwo',
      })
    );
  };

  if (props.question === null) {
    return <p>This Poll doesn't exist</p>;
  }

  const {
    name,
    avatar,
    timestamp,
    optionOne,
    optionTwo,
    hasAnswered,
    hasVotedForOne,
    hasVotedForTwo,
  } = props.question;

  return (
    <div className="question">
      <img src={avatar} alt={`Avatar of ${name}`} className="avatar" />
      <div className="tweet-info">
        <div>
          <span>{name}</span>
          <div>{formatDate(timestamp)}</div>
          <p>Would You Rather</p>
          <div><span>Option One: </span>
          { hasAnswered && hasVotedForOne && <TiThumbsUp className="question-icon green"/> }
          { hasAnswered && !hasVotedForOne && <TiThumbsDown className="question-icon red"/> }
          {optionOne.text}
          { !hasAnswered && (<p><button className="btn" onClick={handleVoteOne}>Vote Option One</button></p>) }
          </div>
          <div><span>Option Two: </span>
          { hasAnswered && hasVotedForTwo && <TiThumbsUp className="question-icon green"/> }
          { hasAnswered && !hasVotedForTwo && <TiThumbsDown className="question-icon red"/> }
          {optionTwo.text}
          { !hasAnswered && (<p><button className="btn" onClick={handleVoteTwo}>Vote Option Two</button></p>) }
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users, questions }, props) => {
  const { id } = props.router.params;
  const question = questions[id];

  return {
    authedUser,
    question: question
      ? formatQuestion(question, users[question.author], authedUser)
      : null,
  };
};

export default withRouter(connect(mapStateToProps)(Question));
