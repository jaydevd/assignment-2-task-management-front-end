const DropDown = ({ options, name, classes, onChange }) => {
    console.log("options: ", options);
    return (
        <select name={name} className={classes} onChange={onChange}>
            {options && options.length > 0 ? (

                options.map((option) => {
                    return <option key={option.id} value={option.id}>{option.name}</option>
                })
            ) : (
                <option value="none">none</option>
            )
            }
        </select>
    )
}
export default DropDown;