import {Component} from "react";

class DisplayAnswers extends Component {
    state = {
        answers1: 0,
        answers2: 0,
        answers3: 3,
        answers4: 0,
    };

    nextQuestion = () => {
        this.props.answerQuestion();
    };

    render() {
        const {answers1, answers2, answers3, answers4} = this.state;
        const allAnswers = answers1 + answers2 + answers3 + answers4;

        return (
            <div>
                <div>
                    A: {answers1}
                </div>
                <div>
                    B: {answers2}
                </div>
                <div>
                    C: {answers3}
                </div>
                <div>
                    D: {answers4}
                </div>
                <div>
                    Total: {allAnswers}
                </div>
                <button onClick={this.nextQuestion}>Next question</button>
            </div>
        );
    }

}

class InputQuestion extends Component {
    state = {
        q: "",
        a1: "",
        a2: "",
        a3: "",
        a4: "",
    };

    render() {
        const allDataAvailable = this.state.q !== "" && this.state.a1 !== "" && this.state.a2 !== "" && this.state.a3 !== "" && this.state.a4 !== "";

        return (
            <div>
                <h1>
                    Trivia Giver
                </h1>
                <div>
                    <label htmlFor="question">Question:</label>
                    <input type="text" onChange={this.changeField("q")}
                           value={this.state.q} className="question"
                           id="question"/>
                </div>
                <div>
                    <div>
                        <label htmlFor="answer1">Answer A:</label>
                        <input type="text" onChange={this.changeField("a1")}
                               className="answer answer1"
                               id="answer1"/>
                    </div>
                    <div>
                        <label htmlFor="answer2">Answer B:</label>
                        <input type="text" onChange={this.changeField("a2")}
                               className="answer answer2"
                               id="answer2"/>
                    </div>
                    <div>
                        <label htmlFor="answer3">Answer C:</label>
                        <input type="text" onChange={this.changeField("a3")}
                               className="answer answer3"
                               id="answer3"/>
                    </div>
                    <div>
                        <label htmlFor="answer4">Answer D:</label>
                        <input type="text" onChange={this.changeField("a4")}
                               className="answer answer4"
                               id="answer4"/>
                    </div>
                </div>
                <button onClick={this.sendData} disabled={!allDataAvailable}>Send question to trivia taker</button>
            </div>
        );
    }


    changeField = (stateField) => {
        return (e) => {
            const val = e.target.value;
            this.setState((state) => {
                state[stateField] = val;
                return state;
            });
        };
    };

    sendData = () => {
        alert("Sending q&a");
        this.props.waitForQuestion();
    }
}

export default class TriviaGiver extends Component {
    state = {
        isInputtingQuestion: true,
    };

    changeToDisplayAnswers = () => {
        this.setState({isAnswering: false});
    };

    changeToInputQuestion = () => {
        this.setState({isAnswering: true});
    };

    render() {
        if (this.state.isInputtingQuestion) {
            return <InputQuestion changeToDisplayAnswers={this.changeToDisplayAnswers}/>;
        } else {
            return <DisplayAnswers changeToInputQuestion={this.changeToInputQuestion}/>;
        }
    }
}
