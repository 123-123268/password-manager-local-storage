import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const manager = () => {
  const [form, setform] = useState({
    site: "",
    username: "",
    password: "",
    id: "",
  });
  const [passwordArray, setpasswordArray] = useState([]);
  const ref = useRef();
  const changetype = useRef();

  useEffect(() => {
    const passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);

  const savePassword = async () => {
    form.id = uuidv4();
    setpasswordArray([...passwordArray, form]);
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]));
    setform({
      site: "",
      username: "",
      password: "",
      id: "",
    })
  };
  
  const deletePassword = async(id) => {
    let a =  passwordArray.filter(item => {
      if(item.id!==id){return item}
    })
    setpasswordArray(
      a
    );
    localStorage.setItem(
      "passwords",
      JSON.stringify(a)
      )
    
  };

  const editPassword=(id)=>{
    setform(passwordArray.filter((item)=>{
      if(item.id!==id){
        return item;
      }
    })[0]);
    console.log(form)
    // let a =  passwordArray.filter(item => {
    //   if(item.id!==id){return item}
    // })
    // setpasswordArray(
    //   a
    // );
    // localStorage.setItem(
    //   "passwords",
    //   JSON.stringify(a)
    //   )
  }
  const showPassword = () => {
    if (
      ref.current.src.includes(
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD2Kpuzv0_g0Qd6UxL0l3qlnGMfFY1qO8LHXQCNJOHhHsRFEpd2XwmAJQnaZ56KsiCT9s&usqp=CAU"
      )
    ) {
      ref.current.src = "https://www.svgrepo.com/show/352005/eye-slash.svg";
      changetype.current.type = "text";
    } else {
      ref.current.src =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD2Kpuzv0_g0Qd6UxL0l3qlnGMfFY1qO8LHXQCNJOHhHsRFEpd2XwmAJQnaZ56KsiCT9s&usqp=CAU";
      changetype.current.type = "password";
    }
  };

  
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    alert("the text is copied");
    navigator.clipboard.writeText(text);
  };
  return (
    <>
      <div className="w-full sm:w-2/3  p-8 mx-auto flex-col">
        <div className="flex flex-col text-center my-3">
          <span className="font-bold">MeowManager</span>
          <span className="italic">your password manager</span>
        </div>
        <input
          onChange={handleChange}
          name="site"
          placeholder="website url"
          className="rounded-md w-full border px-2 "
        />
        <div className="flex justify-between  my-5">
          <input
            onChange={handleChange}
            name="username"
            type="text"
            placeholder="username"
            className="rounded-md w-2/3 border px-2 mx-2"
          />
          <input
            ref={changetype}
            onChange={(e) => handleChange(e)}
            name="password"
            type="password"
            placeholder="password"
            className="rounded-md w-1/3 border px-2 mx-2"
          />
          <span
            className="relative top-[7px] right-[28px]"
            onClick={showPassword}
          >
            <img
              ref={ref}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD2Kpuzv0_g0Qd6UxL0l3qlnGMfFY1qO8LHXQCNJOHhHsRFEpd2XwmAJQnaZ56KsiCT9s&usqp=CAU"
              width="20"
            />
          </span>
        </div>
        <div className="w-full  flex">
          <button
            className="bg-green-600 px-2 py-1 rounded-md w-1/3 m-auto hover:bg-green-500 border-2 border-green-800 flex justify-center"
            onClick={savePassword}
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            ADD
          </button>
        </div>
        <table className="table-auto w-full rounded-md overflow-hidden my-3">
          <thead className="bg-green-800 text-white">
            <tr>
              <th>website</th>
              <th>username</th>
              <th>password</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {passwordArray.map((item, index) => {
              return (
                <tr key={index} className="bg-green-100 border-white border-2">
                  <td>
                    {item.site}
                    <i
                      className="fa-solid fa-copy mx-2"
                      onClick={() => {
                        copyText(item.site);
                      }}
                    ></i>
                  </td>
                  <td>
                    {item.username}
                    <i
                      className="fa-solid fa-copy mx-2"
                      onClick={() => {
                        copyText(item.username);
                      }}
                    ></i>
                  </td>
                  <td>
                    {item.password}
                    <i
                      className="fa-solid fa-copy mx-2"
                      onClick={() => {
                        copyText(item.password);
                      }}
                    ></i>
                  </td>
                  <td>
                    <i
                      className="fa-solid fa-pen-to-square mx-2"
                      style={{ color: "#54a64e" }}
                      onClick={()=>{editPassword(item.id)}}
                    ></i>
                    <i
                      className="fa-solid fa-trash mx-2"
                      style={{ color: "#54a64e" }}
                      onClick={() => {
                        deletePassword(item.id);
                      }}
                    ></i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default manager;
