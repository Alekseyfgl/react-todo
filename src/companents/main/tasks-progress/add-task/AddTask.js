import React from "react";

import './add-task.scss'

class AddTask extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: ''
        }
    }

    onValueChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value,
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onTask(this.state.name);


        this.setState({
            name: '',
            salary: '',
        })

        e.target.reset();
    }



    render() {
        return (

            <div className="add-tasks">
                <form onSubmit={this.onSubmit}
                    className={'add-tasks__form'}>
                    <input onChange={this.onValueChange}
                           name={'name'}
                           type="text" className="add-tasks__input" placeholder="+ add a task, press Enter to save"/>
                    <button type={'submit'}
                            className="add-tasks__button">Add
                    </button>
                </form>
            </div>

        )
    }
}

export default AddTask;