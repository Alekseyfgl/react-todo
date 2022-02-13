import React from "react";

import './content.scss'

import TasksProgress from "../tasks-progress/TasksProgress";
import TasksCompleted from "../tasks-completed/TasksCompleted";


class Content extends React.Component {

    state = {
        listClosedTasks: [],
    }



    onListClosedTasks= (newClosedTasks) => {
        // console.log('tasksList', tasksList);
        // console.log('blaaaaa',newClosedTasks)

        this.setState({
            listClosedTasks: newClosedTasks,
        });
    }


    render() {

        return (
            <main className="content">
                <TasksProgress onListClosedTasks={this.onListClosedTasks}/>
                <TasksCompleted listClosedTasks={this.state.listClosedTasks}/>
            </main>
        )

    }
}

export default Content;