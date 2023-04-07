import { useEffect, useState } from "react";
import Select from "react-select";
import "./Form.css";

const options = [
  { value: "HTML", label: "HTML" },
  { value: "CSS", label: "CSS" },
  { value: "JS", label: "JS" },
  { value: "NODE", label: "NODE" },
];

const Form = () => {
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [select, setSelect] = useState([]);
  const [selectPlaceholder, setSelectPlaceholder] = useState("Choose Skills");
  const [active, setActive] = useState(false);
  const [header, setHeader] = useState(
    "Try it free 7 days then ₹180/mo. thereafter"
  );
  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const handleSelect = (e) => {
    e.map((info) => {
      setSelect((prev) => [...prev, info.value]);
    });
  };
  const claimTrail = () => {
    setHeader("You have succesfully subscribed to our plan");
    setFormValue({ name: "", email: "", password: "" });
    setSelect([]);
    setSelectPlaceholder("Choose skills");
    setActive(false);
  };
  const isFormSubmit = () => {
    for (const value in formValue) {
      if (formValue[value].length === 0) {
        return false;
      }
    }
    return true;
  };
  useEffect(() => {
    if (select.length > 0 && isFormSubmit()) {
      setActive(true);
    }
  }, [select, formValue]);
  return (
    <div className="right">
      <div className="massage">{header}</div>
      <div className="form_section form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="input"
          onChange={handleChange}
          value={formValue.name}
        />
        <input
          type="email"
          name="email"
          placeholder="Email Adrress"
          className="input"
          onChange={handleChange}
          value={formValue.email}
        />
        <input
          type="password"
          name="password"
          className="input"
          placeholder="Password"
          onChange={handleChange}
          value={formValue.password}
        />
        <Select
          className="form-select"
          options={options}
          placeholder={selectPlaceholder}
          onChange={handleSelect}
          isMulti
        />
        {active ? (
          <button className="btn btn-active" onClick={claimTrail}>
            CLAIM YOUR TRAIL
          </button>
        ) : (
          <button className="btn disabled" onSubmit={isFormSubmit}>
            {" "}
            CLAIM YOUR TRAIL
          </button>
        )}
        <div className="terms">
          By clicking the button you are agreeing to our
          <p> Terms and Services</p>
        </div>
      </div>
    </div>
  );
};

export default Form;
