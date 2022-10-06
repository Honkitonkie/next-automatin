import React, { useState, useEffect } from "react";
import { useUser } from "../../lib/hooks";

export default function Switch(props) {
  const user = useUser()[0];

  // Server-render loading state
  if (!user || user.isLoggedIn === false) {
    return <div>Loading...</div>;
  }

  let initialVal;
  if (user) {
    if (props.foto) {
      initialVal = user.wantedPics[props.feedType][props.index];
    } else {
      initialVal = user.linkedin.templates[props.feedType][props.index] || "";
    }
  }

  const [enabled, setEnabled] = useState(initialVal);
  const [internal, setInternal] = useState();
  const [errorMsg, setErrorMsg] = useState("");

  // LOGIN
  async function handleSubmit() {
    if (errorMsg) setErrorMsg("");
    const body = {
      email: String(user?.email),
      feedType: String(props.feedType),
      templateVal: enabled,
      index: String(props.index),
    };
    try {
      const res = await fetch("/api/linkedin/update-user-from-switch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        switch (body.feedType) {
          case "person":
            user.linkedin.templates.person[body.index] = body.templateVal;
            break;
          case "organization":
            user.linkedin.templates.organization[body.index] = body.templateVal;
            break;
          case "linksboven":
            user.wantedPics.linksboven[body.index] = body.templateVal;
            break;
          case "linksonder":
            user.wantedPics.linksonder[body.index] = body.templateVal;
            break;
          case "rechtsboven":
            user.wantedPics.rechtsboven[body.index] = body.templateVal;
            break;
          case "rechtsonder":
            user.wantedPics.rechtsonder[body.index] = body.templateVal;
            break;
          case "center":
            user.wantedPics.center[body.index] = body.templateVal;
            break;
          default:
            console.log("no match in feedtype switch");
        }
        // console.log("updated user");
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
    if (internal) {
      handleSubmit();
    }
  }, [enabled]);

  // user moet hier refreshen...
  useEffect(() => {
    setInternal(false);
    if (props.foto) {
      setEnabled(user.wantedPics[props.feedType][props.index]);
    } else {
      setEnabled(user.linkedin.templates[props.feedType][props.index]);
    }
  }, [props.feedType]);

  const handleSlide = () => {
    setInternal(true);
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
                  onClick={(e) => {
                    if (e) {
                      setInternal(true);
                    }
                    handleSlide(e);
                  }}
                  className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-automatin-blue peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-automatin-blue"
                ></div>
              </label>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
