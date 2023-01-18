import { connect } from "react-redux";
import { formatQuestion, formatDate } from "../utils/helpers";
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
    optionOnePercentage,
    optionTwoPercentage,
  } = props.question;

  return (
    <div className="question">
      <img src={avatar} alt={`Avatar of ${name}`} className="avatar" />
      <div className="tweet-info">
        <div>
          <span>Poll by {name}</span>
          <div>{formatDate(timestamp)}</div>
          <p>Would You Rather</p>
          <div className="question-option">
            <p>
              Option One: <strong>{optionOne.text}</strong>
            </p>
            <p>
              Option One has received {optionOne.votes.length} votes so far, {optionOnePercentage}% of voters.
              { hasAnswered && hasVotedForOne && <span className="red">You voted for this option</span> }  
            </p>
            { !hasAnswered && (<p><button className="btn-vote" onClick={handleVoteOne}>Vote</button></p>) }
          </div>
          <div className="question-option">
            <p>
              Option Two: <strong>{optionTwo.text}</strong>
            </p>
            <p>
              Option Two has received {optionTwo.votes.length} votes so far, {optionTwoPercentage}% of voters.
              { hasAnswered && hasVotedForTwo && <span className="red"> You voted for this option</span> }  
            </p>
            { !hasAnswered && (<p><button className="btn-vote" onClick={handleVoteTwo}>Vote</button></p>) }
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
