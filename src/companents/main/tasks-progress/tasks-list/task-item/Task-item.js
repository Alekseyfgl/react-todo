import React from "react";


class Task extends React.Component {
    constructor(props) {
        super(props);

        this.myRef = React.createRef();

        this.state = {
            name: this.props.name,
            toggleInputBtn: false,
        }
    }

    componentDidUpdate(prevState) {
        const {toggleInputBtn} = this.state;
        if (toggleInputBtn !== prevState.toggleInputBtn) {
            //если у нас стоит интуп, то только тогда ставим фокус, инпут стоит когда toggleInputBtn === true
            if (toggleInputBtn === true) {
                this.myRef.current.focus();
            }
        }
    }


    //через делегирование на LI (+ onclick вешать на li) + здесь есть баг при нажатии на корзинку межу 2-мя палочками свг не срабатывает клик
    // delAction = (e) => {
    //     const {id, delTask,} = this.props
    //     const target = e.target;
    //
    //     // console.log(target);
    //
    //     if (target.classList.contains('btn-delete') || target.classList.contains('btn-delete__svg') || target.classList.contains('btn-delete__path')) {
    //
    //
    //         delTask(id);
    //     }
    // }


    //более длинный вариант, если делать короче то проп (id) + callback можно прокинуть при переборе массива
    delAction = () => {
        const {id, delTask,} = this.props

        delTask(id);
    }




    onRenameInputChild = (e) => {
        const {id} = this.props;
        const inputVal = e.target.value;

        this.setState({
            name: inputVal,
        })

        this.props.onRenameTask(id, inputVal, e);
    }




    onToggleInput = () => {
        this.setState({
            toggleInputBtn: !this.state.toggleInputBtn,
        })
    }

    onToggleInputForBlur = () => {
        this.setState({
            toggleInputBtn: !this.state.toggleInputBtn,
            name: this.props.name ? this.props.name : 'no title',
        })
    }


    render() {
        const {isActive,isImportant} = this.props
        const { toggleInputBtn} = this.state;

        // console.log(toggleInputBtn);

        let classForImportant = 'btn-important';
        if (isImportant) {
            classForImportant += ' active';
        }

        const finalTask = toggleInputBtn ?
            <input
                onBlur={this.onToggleInputForBlur}
                onChange={this.onRenameInputChild}
                value={this.state.name}
                // defaultValue={name}

                ref={this.myRef}

                className="tasks-list__title"
            /> :
            <p>{this.state.name}</p>;


        return (
            <li
                className={isActive ? 'tasks-list__item tasks-list_them' : 'tasks-list__item tasks-list_them active'}>

                <div className="tasks-list__wr-title">

                <span onClick={this.props.closeTask}

                      className={isActive ? 'tasks-list__status' : 'tasks-list__status active'}>

                    <svg className="check-mark-container__svg" viewBox="0 0 10 9">
                        <path
                            d="M3.39644 8.0821L0.14644 4.8321C-0.0488135 4.63684 -0.0488135 4.32026 0.14644 4.12499L0.853531 3.41788C1.04878 3.2226 1.36539 3.2226 1.56064 3.41788L3.75 5.60721L8.43935 0.917877C8.63461 0.722623 8.95121 0.722623 9.14646 0.917877L9.85355 1.62499C10.0488 1.82024 10.0488 2.13682 9.85355 2.3321L4.10355 8.08212C3.90828 8.27737 3.5917 8.27737 3.39644 8.0821Z">
                        </path>
                    </svg>
                </span>
                    {finalTask}
                </div>


                <div className="btns-edit">

                    <button onClick={this.props.toggleImportant}
                            className={classForImportant}>
                        <svg className={'btn-important__svg'} viewBox="0 0 576 512">
                            <path className={'btn-important__path'}
                                  d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z">

                            </path>
                        </svg>
                    </button>

                    <button onClick={(e) => this.onToggleInput(e)}

                            className="btn-edit">
                        <svg viewBox="0 0 20 20">
                            <path
                                d="M9.16669 3.33335H3.33335C2.89133 3.33335 2.4674 3.50895 2.15484 3.82151C1.84228 4.13407 1.66669 4.55799 1.66669 5.00002V16.6667C1.66669 17.1087 1.84228 17.5326 2.15484 17.8452C2.4674 18.1578 2.89133 18.3333 3.33335 18.3333H15C15.442 18.3333 15.866 18.1578 16.1785 17.8452C16.4911 17.5326 16.6667 17.1087 16.6667 16.6667V10.8334"
                                stroke="#5A7FFF"/>
                            <path
                                d="M15.4167 2.08333C15.7482 1.75181 16.1978 1.56556 16.6667 1.56556C17.1355 1.56556 17.5852 1.75181 17.9167 2.08333C18.2482 2.41485 18.4345 2.86449 18.4345 3.33333C18.4345 3.80217 18.2482 4.25181 17.9167 4.58333L10 12.5L6.66669 13.3333L7.50002 9.99999L15.4167 2.08333Z"
                                stroke="#5A7FFF"/>
                        </svg>
                    </button>


                    <button onClick={this.delAction}
                            className="btn-delete">
                        <svg className="btn-delete__svg" viewBox="0 0 20 20">
                            <path className="btn-delete__path"
                                  d="M12.6667 18.6666H7.33332C6.44926 18.6666 5.60142 18.3155 4.9763 17.6903C4.35117 17.0652 3.99998 16.2174 3.99998 15.3333V7.33331C3.99998 7.1565 4.07022 6.98693 4.19525 6.86191C4.32027 6.73688 4.48984 6.66665 4.66665 6.66665C4.84346 6.66665 5.01303 6.73688 5.13806 6.86191C5.26308 6.98693 5.33332 7.1565 5.33332 7.33331V15.3333C5.33332 15.8637 5.54403 16.3725 5.9191 16.7475C6.29418 17.1226 6.80289 17.3333 7.33332 17.3333H12.6667C13.1971 17.3333 13.7058 17.1226 14.0809 16.7475C14.4559 16.3725 14.6667 15.8637 14.6667 15.3333V7.33331C14.6667 7.1565 14.7369 6.98693 14.8619 6.86191C14.9869 6.73688 15.1565 6.66665 15.3333 6.66665C15.5101 6.66665 15.6797 6.73688 15.8047 6.86191C15.9297 6.98693 16 7.1565 16 7.33331V15.3333C16 16.2174 15.6488 17.0652 15.0237 17.6903C14.3986 18.3155 13.5507 18.6666 12.6667 18.6666Z"/>
                            <path
                                d="M16.6667 5.33332H3.33332C3.15651 5.33332 2.98694 5.26308 2.86192 5.13806C2.73689 5.01304 2.66666 4.84347 2.66666 4.66666C2.66666 4.48984 2.73689 4.32028 2.86192 4.19525C2.98694 4.07023 3.15651 3.99999 3.33332 3.99999H16.6667C16.8435 3.99999 17.013 4.07023 17.1381 4.19525C17.2631 4.32028 17.3333 4.48984 17.3333 4.66666C17.3333 4.84347 17.2631 5.01304 17.1381 5.13806C17.013 5.26308 16.8435 5.33332 16.6667 5.33332Z"/>
                            <path
                                d="M12.6666 5.33333H7.33331C7.1565 5.33333 6.98693 5.26309 6.8619 5.13807C6.73688 5.01304 6.66664 4.84347 6.66664 4.66666V3.33333C6.66664 2.8029 6.87735 2.29419 7.25243 1.91912C7.6275 1.54404 8.13621 1.33333 8.66664 1.33333H11.3333C11.8637 1.33333 12.3724 1.54404 12.7475 1.91912C13.1226 2.29419 13.3333 2.8029 13.3333 3.33333V4.66666C13.3333 4.84347 13.2631 5.01304 13.138 5.13807C13.013 5.26309 12.8435 5.33333 12.6666 5.33333ZM7.99997 4H12V3.33333C12 3.15652 11.9297 2.98695 11.8047 2.86193C11.6797 2.7369 11.5101 2.66666 11.3333 2.66666H8.66664C8.48983 2.66666 8.32026 2.7369 8.19524 2.86193C8.07021 2.98695 7.99997 3.15652 7.99997 3.33333V4Z"/>
                            <path
                                d="M8.66667 14.6667C8.48986 14.6667 8.32029 14.5964 8.19526 14.4714C8.07024 14.3464 8 14.1768 8 14V9.33334C8 9.15653 8.07024 8.98696 8.19526 8.86193C8.32029 8.73691 8.48986 8.66667 8.66667 8.66667C8.84348 8.66667 9.01305 8.73691 9.13807 8.86193C9.2631 8.98696 9.33333 9.15653 9.33333 9.33334V14C9.33333 14.1768 9.2631 14.3464 9.13807 14.4714C9.01305 14.5964 8.84348 14.6667 8.66667 14.6667Z"/>
                            <path
                                d="M11.3333 14.6667C11.1565 14.6667 10.9869 14.5964 10.8619 14.4714C10.7369 14.3464 10.6667 14.1768 10.6667 14V9.33334C10.6667 9.15653 10.7369 8.98696 10.8619 8.86193C10.9869 8.73691 11.1565 8.66667 11.3333 8.66667C11.5101 8.66667 11.6797 8.73691 11.8047 8.86193C11.9298 8.98696 12 9.15653 12 9.33334V14C12 14.1768 11.9298 14.3464 11.8047 14.4714C11.6797 14.5964 11.5101 14.6667 11.3333 14.6667Z"/>
                        </svg>
                    </button>
                </div>

            </li>
        )
    }
}


export default Task;