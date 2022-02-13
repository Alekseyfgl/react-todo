import React from "react";
import '../../other-style/other-them.scss'

const TasksCompletedAmount = (props) => {

    return (
        <p className="completed-count tasks-count_them ">
            Completed: <span className="completed-count__amount">{props.countListClosedTasks}</span>
        </p>
    )
}

export default TasksCompletedAmount;