import React from "react";


const TasksUncompletedAmount = ({todoTasks}) => {

    return (
        <p className="tasks-count tasks-count_them">To Do
            <span className="tasks-count__amount">: {todoTasks}</span>
        </p>
    )
}

export default TasksUncompletedAmount