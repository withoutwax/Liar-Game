import React from 'react';

class Select extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerNum: null,
            spyMode: null,
            theme: "",
            vocab: "",
            liar: 1,
            buttonDisabled: [],
            displayStatus: "플레이어를 선택해주세요",
            buttonDisabledText: "확인했습니다!",
            beginGame: false,
            showCardStatus: false
        }
    }

    // Update State
    componentWillMount = () => {
        // TODO: Uncomment after testing. This code updates data with Global Setting
        if (this.props.globalState.playerNum === "" || this.props.globalState.theme === "") {
            this.setState({
                playerNum: 3,
                spyMode: false,
                theme: "food",
                vocab: "",
                playerState: false
            });
        } else {
            this.setState({
                playerNum: this.props.globalState.playerNum,
                spyMode: this.props.globalState.spyMode,
                theme: this.props.globalState.theme
            });
        }
    }

    componentDidMount = () => {
        const chosenTheme = {
            "food": require('../data/food.json'),
            "place": require('../data/place.json'),
            "occupation": require('../data/occupation.json'),
            "biblecharacter": require('../data/biblecharacter.json')
        }
        let data = chosenTheme[this.state.theme].kr; // Currently only set to Korean

        // Generate a random number to choose the menu
        let randomIndex = Math.floor(Math.random() * data.length);
        let chooseLiar = Math.floor(Math.random() * this.state.playerNum);

        this.setState({ 
            vocab: data[randomIndex],
            liar: chooseLiar
        });
    }
    showCard = (event) => {
        let button = Number(event.target.id);
        
        if (this.state.buttonDisabled.includes(button) === false) {

            this.setState({
                buttonDisabled: this.state.buttonDisabled.concat(button)
            });
        }

        let card = event.target.className;
        
        if (card.includes("no-liar")) {
            this.setState({
                displayStatus: `당신은 라이어가 아닙니다. 이번에 선택된 단어는:`,
                playerState: false
            });
        } else {
            this.setState({
                displayStatus: `당신은`,
                playerState: true
            });
        }

        // Hide player select card during check
        this.setState({
            showCardStatus: true
        })
    }

    resetDisplayStatus = (event) => {
        if (this.state.buttonDisabled.length === this.state.playerNum) {
            // All Player has been selected
            console.log("모든 플레이어가 선택 되었습니다");

            // Begin Timer
            this.setState({ 
                displayStatus: "게임이 시작되었습니다!",
                beginGame: true 
            });
            this.props.nextStage(2);
            this.props.setVocab(this.state.vocab);
            
        } else {
            if (this.state.playerNum - this.state.buttonDisabled.length === 1) {
                console.log("One player left");
                this.setState({buttonDisabledText: "게임 시작!"});
            }
            this.setState({displayStatus: "플레이어를 선택해주세요"})
        }

        // Show player select card after check
        this.setState({
            showCardStatus: false
        });
    }

    render() {
        console.log("render()");
        // console.log("PROPS:", this.props);
        let defaultText = "선택하세요";
        // console.log(this.state.buttonDisabled.includes(0));
        console.log("THIS.STATE", this.state);
        
        let playersCard = []
        for (let i = 0; i < this.state.playerNum; i++) {
            if (i === this.state.liar) {
                playersCard.push(<button className={`playersCard liar ${this.state.buttonDisabled.includes(i) ? 'disabled' : ''}`} disabled={this.state.buttonDisabled.includes(i) ? true : false} key={i} id={i} onClick={this.showCard}>{defaultText}</button>)
            } else {
                playersCard.push(<button className={`playersCard no-liar ${this.state.buttonDisabled.includes(i) ? 'disabled' : ''}`} disabled={this.state.buttonDisabled.includes(i) ? true : false} key={i} id={i} onClick={this.showCard}>{defaultText}</button>)
            }
        }
        console.log(this.state.buttonDisabled.length);
        let textView;
        if (this.state.buttonDisabled.length > 0 && this.state.showCardStatus === true) {
            textView = this.state.playerState ? <span className="red">라이어 입니다.</span> : <span className="green"><br/>{this.state.vocab}</span>;
        } else {
            textView = null;
        }
        let nextButton = this.state.displayStatus === "플레이어를 선택해주세요" ? `` : <button onClick={this.resetDisplayStatus}>{this.state.buttonDisabledText}</button>;

        return (
            <div>
                <div>
                    <h2>{this.state.displayStatus} {textView}</h2>
                    { nextButton }
                </div>
                {this.state.showCardStatus ? '' : playersCard }
            </div>
        );
    }
}

export default Select;