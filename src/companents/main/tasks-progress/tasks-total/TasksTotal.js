import React from "react";

import './tasks-total.scss'



const TasksTotal = ({totalTask}) => {

    return (
        <p className="total-tasks">Total:
            <span className="total-tasks__amount"> {totalTask}</span>
        </p>
    )
}

export default TasksTotal;
