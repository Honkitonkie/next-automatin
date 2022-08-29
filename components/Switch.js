import React, { useState, useEffect, useRef } from "react";
import { useUser } from "../lib/hooks";

export default function Switch(props) {
  const user = useUser()[0];
  // Server-render loading state
  if (!user || user.isLoggedIn === false) {
    return <div>Loading...</div>;
  }
  const render = useRef(0);
  let initialVal;
  if (user) {
    if (props.pathname === "/fotos") {
      initialVal = user.wantedPics[props.feedType][props.index];
    } else {
      initialVal = user.linkedin.templates[props.feedType][props.index] || "person";
    }
  }
  const [enabled, setEnabled] = useState(initialVal);
  const [errorMsg, setErrorMsg] = useState("");

  // LOGIN
  async function handleSubmit() {
    if (errorMsg) setErrorMsg("");
    const body = {
      email: user?.email,
      feedType: props.feedType,
      templateVal: enabled,
      index: props.index,
    };
    try {
      const res = await fetch("/api/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        // console.log("body", body);
        // Router.push("/");
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error("An unexpected error happened occurred:", error);
      setErrorMsg(error.message);
    }
  }
  // END LOGINSTUFF

  useEffect(() => {
    render.current++;
    if (render.current < 2) {
      let currentValue = props.pathname === "/fotos" ? user.wantedPics[props.feedType][props.index] : user.linkedin.templates[props.feedType][props.index];
      setEnabled(currentValue);
      return;
    }
    handleSubmit();
  }, [enabled]);

  useEffect(() => {
    let currentValue = props.pathname === "/fotos" ? user.wantedPics[props.feedType][props.index] : user.linkedin.templates[props.feedType][props.index];
    setEnabled(currentValue);
  }, [props.feedType]);

  const handleSlide = () => {
    setEnabled(!enabled);
  };

  return (
    <>
      {user && (
        <form onSubmit={handleSubmit}>
          <div className='relative flex flex-col items-center justify-center overflow-show'>
            <div className='flex'>
              <label className='inline-flex relative items-center cursor-pointer'>
                <input type='checkbox' className='sr-only peer' checked={enabled} value={props.index} readOnly />
                <div
                  onClick={() => {
                    handleSlide(!enabled, props.index);
                  }}
                  className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-automatin-blue peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-automatin-blue"
                ></div>
              </label>
            </div>
          </div>
          <button id='submitButton' type='submit'></button>
        </form>
      )}
    </>
  );
}
