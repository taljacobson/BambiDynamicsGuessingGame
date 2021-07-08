import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectPoints, submitForm } from "../../features/pageStore";

function GameFormPage() {
    const score = useAppSelector(selectPoints);
    const dispatch = useAppDispatch();
    const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const name = (e.target as any).name.value;
        const phone = (e.target as any).phone.value
        console.log(name, phone)
        dispatch(submitForm({
            score,
            name,
            phone,
        }))
    }

    return <div>
        <h4>game over... better luck next time</h4>
        <h3 className="gameForm-score"><span>your score</span> <strong>{score}</strong> </h3>

        <form className="gameFormForm" onSubmit={onSubmit}>
            <label>
                <span>name: </span>
                <input required name="name" type="text" minLength={2} />
            </label>
            <br />
            <label>
                <span>phone: </span>
                <input name="phone" type="phone" />
            </label>
            <br />
            <button className="checkbtn playbtn">sumbit</button>
        </form>
    </div>
}

export default GameFormPage;