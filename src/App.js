import { ArrowRightIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import Select from "react-select";

const App = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nameRef.current === "") {
      alert("Please provide a name for user.");
      return;
    }

    if (
      typeof emailRef.current != "string" ||
      emailRef.current.includes("@") === false
    ) {
      alert("Please provide a valid email address");
      return;
    }

    if (contactRef.current.length !== 10) {
      alert("Please gives us a valid contact number");
      return;
    }

    if (countryPreferenceRef.current.state.selectValue.length === 0) {
      alert("Preference select box must not be empty");
      return;
    }

    const data = {
      name: nameRef.current,
      email: emailRef.current,
      contactNumber: contactRef.current,
      courseLevel:
        typeof courseLevelRef.current === "object"
          ? courseLevelRef.current.value
          : courseLevelRef.current,
      countryPreference: countryPreferenceRef.current.state.selectValue.map(
        (e) => e.label
      ),
      dob: typeof dobRef.current === "object" ? null : dobRef.current,
    };

    const response = await fetch("http://localhost:3001/create-user", {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if ((await response.json()) != null)
      alert("User account created successfully.");
  };

  const nameRef = useRef("");
  const emailRef = useRef("");
  const contactRef = useRef("");
  const courseLevelRef = useRef("");
  const countryPreferenceRef = useRef("");
  const dobRef = useRef("");

  const countries = [
    { value: "usa", label: "USA" },
    { value: "australia", label: "Australia" },
    { value: "new-zealand", label: "New-Zealand" },
    { value: "cananda", label: "Canada" },
    { value: "uk", label: "UK" },
    { value: "ireland", label: "Ireland" },
    { value: "germany", label: "Germany" },
  ];

  return (
    <div className="w-screen h-screen flex justify-around items-center flex-col">
      <div className="w-full flex justify-center items-center">
        <h1 className="text-4xl font-bold text-blue-500">Create Account</h1>
      </div>
      <div className="w-screen flex justify-center items-center">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-x-4 flex justify-between">
            <label htmlFor="name">Name : </label>
            <input
              type="text"
              name="name"
              id="name"
              className="input"
              ref={nameRef}
              onChange={(e) => (nameRef.current = e.target.value)}
            />
          </div>
          <div className="space-x-4 flex justify-between">
            <label htmlFor="email">Email : </label>
            <input
              type="text"
              name="email"
              id="email"
              className="input"
              ref={emailRef}
              onChange={(e) => (emailRef.current = e.target.value)}
            />
          </div>
          <div className="space-x-4 flex justify-between">
            <label htmlFor="contact-number">Contact Number : </label>
            <input
              type="text"
              name="contact-number"
              id="contact-number"
              className="input"
              ref={contactRef}
              onChange={(e) => (contactRef.current = e.target.value)}
            />
          </div>
          <div className="space-x-4 flex justify-between">
            <label htmlFor="course-level">Course Level : </label>
            <select
              name="course-level"
              id="course-level"
              className="outline-none w-20"
              ref={courseLevelRef}
              onChange={(e) => (courseLevelRef.current = e.target.value)}
            >
              <option value="UG">UG</option>
              <option value="PG">PG</option>
            </select>
          </div>

          <Select options={countries} ref={countryPreferenceRef} isMulti />

          <div className="space-x-4 flex justify-between">
            <label htmlFor="dob">DOB</label>
            <input
              type="date"
              name="date"
              id="date"
              className="input"
              ref={dobRef}
              onChange={(e) => (dobRef.current = e.target.value)}
            />
          </div>
          <input type="submit" value="Submit" className="btn-blue" />
        </form>
      </div>
      <div className="flex justify-center items-center space-x-4">
        <p className="text-blue-400">Check your account details</p>
        <ArrowRightIcon
          className="w-5 h-5 cursor-pointer"
          onClick={() => navigate("/user-details")}
        />
      </div>
    </div>
  );
};

export default App;
