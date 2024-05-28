/* eslint-disable react/prop-types */
import Classes from "./editInput.module.css";
export default function EditInput({ value, handleEdit, setValue }) {
  return (
    <form className={Classes.editForm} onSubmit={(e) => handleEdit(e)}>
      <textarea
        type="text"
        value={value}
        className={Classes.editInput}
        onChange={(e) => setValue(e)}
      />
      <button className={Classes.editBtn}>Edit</button>
    </form>
  );
}
