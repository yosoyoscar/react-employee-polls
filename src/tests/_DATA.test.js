import {
  _saveQuestion,
  _saveQuestionAnswer,
} from '../utils/_DATA.js'

describe('_DATA.js', () => {
	// write an async unit test for _saveQuestion to verify that the saved question is returned
	// and all expected fields are populated when correctly formatted data is passed to the function.
    it('verify _saveQuestion returns the question properly populated if correctly formatted data is passed', async() => {
        var validQuestion = {
			optionOneText: 'Option 1',
			optionTwoText: 'Option 2',
			author: 'sarahedo'
        };
        var result = await _saveQuestion(validQuestion);
        expect(result.optionOne.text).toEqual('Option 1');
        expect(result.optionTwo.text).toEqual('Option 2');
        expect(result.author).toEqual('sarahedo');
    });

    it('verify _saveQuestion returns an error if incorrect data is passed', async() => {
    	// write an async unit test for _saveQuestion to verify that an error is returned
    	// if incorrect data is passed to the function.
        var invalidQuestion = {
			optionOneText: 'Option 1',
			optionTwoText: '',
			author: 'sarahedo'
        };
        await expect(_saveQuestion(invalidQuestion)).rejects.toEqual('Please provide optionOneText, optionTwoText, and author');
    });

    it('verify _saveQuestionAnswer returns the saved question answer properly populated if correctly formatted data is passed', async() => {
    	// write an async unit test for _saveQuestionAnswer to verify that the saved question answer is returned
    	// and all expected fields are populated when correctly formatted data is passed to the function.
        var validQuestionAnswer = {
			authedUser: 'sarahedo',
			qid: '8xf0y6ziyjabvozdd253nd',
			answer: 'optionOne'
        };
        var result = await _saveQuestionAnswer(validQuestionAnswer);
        expect(result).toEqual(true);
    });

    it('verify _saveQuestionAnswer returns an error if incorrect data is passed', async() => {
        // write an async unit test for _saveQuestionAnswer to verify that an error is returned
        // if incorrect data is passed to the function.
        var invalidQuestionAnswer = {
            authedUser: 'sarahedo',
            qid: '',
            answer: 'optionOne'
        };
        await expect(_saveQuestionAnswer(invalidQuestionAnswer)).rejects.toEqual('Please provide authedUser, qid, and answer');
    });

});