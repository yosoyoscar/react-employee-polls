import { connect } from "react-redux";
import QuestionCard from "./QuestionCard";

const Dashboard = (props) => {
  //console.log('Dashboard.props:', props);
  return (
    <div>
      <h3 className="center">NEW POLLS</h3>
      <ul className="dashboard-list">
        {
          props.questions
            .filter( (q) => !q.optionOne.votes.includes(props.authedUser) && !q.optionTwo.votes.includes(props.authedUser) )
            .map( (q) => (<li key={q.id}><QuestionCard id={q.id} /></li>))
        }
      </ul>
      <h3 className="center">DONE</h3>
      <ul className="dashboard-list">
        {
          props.questions
            .filter( (q) => q.optionOne.votes.includes(props.authedUser) || q.optionTwo.votes.includes(props.authedUser) )
            .map( (q) => (<li key={q.id}><QuestionCard id={q.id} /></li>))
        }
      </ul>
    </div>
  );
};

const mapStateToProps = ({ questions, authedUser }) => ({
  /*
  questions:  Object.keys(questions).map(key => {
                return questions[key];
              }),
  */
  questions:  Object.values(questions).sort( (a, b) => b.timestamp - a.timestamp),
  authedUser,
});

export default connect(mapStateToProps)(Dashboard);