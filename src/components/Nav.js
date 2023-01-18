import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";

const Nav = (props) => {
  //console.log('Nav.props:', props);
  const navUser = props.authedUser
                  ? props.users.filter( (user) => user.id === props.authedUser)[0]
                  : null;
  const name = navUser ? navUser.name : '';
  const avatarURL = navUser ? navUser.avatarURL : '';
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    props.dispatch(setAuthedUser(null));
    navigate(`/login`);
  };

  return (
    <nav className="nav">
      { (true || name) && (
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/new">New Poll</Link>
          </li>
          <li>
            <Link to="/leaderboard">Leaderboard</Link>
          </li>
          {
            navUser && <li className="nav-user">
              <img src={avatarURL} alt={`Avatar of ${name}`} className="avatar" />
              <p>{ name }</p>
              <button onClick={handleLogout}>Logout</button>
            </li>
          }
        </ul>
        )
      }
    </nav>
  );
};

const mapStateToProps = ({ users, authedUser }) => ({
  users: Object.values(users),
  authedUser,
});

export default connect(mapStateToProps)(Nav);