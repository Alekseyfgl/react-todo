import React from "react";

import './controls-bar.scss';

class ControlsBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            panelForSearch: '',
        }
    }

    onUpdateSearchChild = (e) => {
        const inputVal= e.target.value;

        this.setState({
            panelForSearch : inputVal,
        })

        this.props.onUpdateSearchApp(inputVal);
    }


    render() {
        const {changeDisplayedList} = this.props;


        return (
            <div className={'controls-bar'}>

                <input onChange={this.onUpdateSearchChild}
                       value={this.state.panelForSearch}
                       placeholder={'Search...'}
                    className={'controls-bar__input'}/>

                <button onClick={() => changeDisplayedList('all')} className={'controls-bar__btn'}>All tasks</button>
                <button onClick={() => changeDisplayedList('active')} className={'controls-bar__btn'}>Active tasks
                </button>
                <button onClick={() => changeDisplayedList('closed')} className={'controls-bar__btn'}> Closed tasks
                </button>
            </div>
        )

    }
}


export default ControlsBar;