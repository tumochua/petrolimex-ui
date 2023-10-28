import classNames from 'classnames';
import style from './MySelect.module.scss';

function MySelect({ options, onChanType, value, label, height, width, top }) {
    const selected = value;
    const handleChange = (event) => {
        onChanType(event.target.value);
    };
    const classOption = classNames({
        [style.height]: height,
        [style.baseSelects]: true,
        [style.width]: width,
        [style.mtTop]: top,
    });
    // console.log(selected);
    // console.log(options);
    return (
        <>
            <div className={style.container}>
                {label && <span> {label}</span>}
                {options && (
                    <select value={selected} onChange={handleChange} className={classOption}>
                        {options.map((option) => (
                            <option key={option.id} value={option.value}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                )}
            </div>
        </>
    );
}

export default MySelect;
