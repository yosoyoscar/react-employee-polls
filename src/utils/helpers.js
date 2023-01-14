export function formatDate (timestamp) {
  const d = new Date(timestamp)
  const time = d.toLocaleTimeString('en-US')
  return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}

export function formatQuestion (question, author, authedUser) {
  //console.log('formatQuestion.question:', question);
  //console.log('formatQuestion.author:', author);
  //console.log('formatQuestion.authedUser:', authedUser);
  const { id, optionOne, optionTwo, timestamp } = question
  const { name, avatarURL } = author

  return {
    name,
    id,
    timestamp,
    optionOne,
    optionTwo,
    avatar: avatarURL,
    hasAnswered: optionOne.votes.includes(authedUser) || optionTwo.votes.includes(authedUser),
    hasVotedForOne: optionOne.votes.includes(authedUser),
    hasVotedForTwo: optionTwo.votes.includes(authedUser),
  }
}