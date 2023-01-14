import { connect } from "react-redux";

const Leaderboard = (props) => {
  console.log('Leaderboard.props:', props);
  return (
    <div>
      <h3 className="center">POLLS LEADERBOARD</h3>
      <table className="leaderboard-table">
      <tbody>
        <tr>
          <th>User</th>
          <th>Answered</th>
          <th>Created</th>
        </tr>
        {
          props.dashboard.sort( (u1, u2) => (u2.ranking - u1.ranking) )
            .map( (user) => (
              <tr key={user.id} className="leaderboard-tr">
                <td>
                  <img src={user.avatarURL} alt={`Avatar of ${user.name}`} className="avatar" />
                  <span>{user.name}</span>
                </td>
                <td className="center">{user.numAnswers}</td>
                <td className="center">{user.numQuestions}</td>
              </tr>
            ))
        }
      </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = ({ users, questions, authedUser }) => {
  const dashboard = Object.values(users);
  const arrayQuestions = Object.values(questions);

  dashboard.forEach( (user) => {
    user.numQuestions = arrayQuestions.filter( (q) => q.author === user.id ).length;
    user.numAnswers = arrayQuestions.filter( (q) => q.optionOne.votes.includes(user.id) || q.optionTwo.votes.includes(user.id) ).length;
    user.ranking = user.numQuestions + user.numAnswers;
  }) 
  /*
  const usersWithCounts =
    Object.values(users).map( (user) => {
          id: user.id,
          name: user.name,
          avatarURL: user.avatarURL,
          answered: user.answers.length,
          created: user.questions.length,
          total: user.answers.length + user.questions.length,
        });
        */
  return {
    dashboard,
    authedUser,
  }
};

export default connect(mapStateToProps)(Leaderboard);