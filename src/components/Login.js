import { connect } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";

const Login = (props) => {
	console.log('Login.props:', props);
	const [user, setUser] = useState('');
	const navigate = useNavigate();

	const handleUserSelect = (e) => {
		setUser(e.target.value);
	};

	const handleLogin = (e) => {
		e.preventDefault();
		props.dispatch(setAuthedUser(user));
		navigate(`/`);
	};

	return (
		<div>
			<header className="App-header">
				<h3>EMPLOYEE POLLS LOGIN</h3>
				<h5>Who are you?</h5>
				<select className="textarea" value={user} onChange={handleUserSelect}>
					<option value={0} key={0}></option>
				{
					props.users.map( (user) => <option value={user.id} key={user.id}>{user.name}</option>)
				}
				</select>
				<button className="btn" type="submit" onClick={handleLogin} disabled={!user}>
					Login
				</button>
			</header>
		</div>
		);
}

const mapStateToProps = ({ users, authedUser }) => ({
  users: Object.values(users),
  authedUser,
});

export default connect(mapStateToProps)(Login);