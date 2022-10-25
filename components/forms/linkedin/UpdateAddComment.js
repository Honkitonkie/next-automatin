import React, { useState, useEffect, useRef } from "react";
import { useUser } from "../../../lib/hooks";
import Layout from "../../globals/Layout";
import Button from "../../Button";

const UpdateAddComment = () => {
  const user = useUser();
  const [errorMsg, setErrorMsg] = useState("");

  // Server-render loading state
  if (!user || user.isLoggedIn === false) {
    return <Layout>Loading...</Layout>;
  }

  const render = useRef(0);
  const initialValue = user ? user[0]?.linkedin?.addComment : true;
  const comment = user ? user[0]?.linkedin?.commentIntro : "";

  const [addComment, setAddComment] = useState(initialValue);
  const [commentIntro, setCommentIntro] = useState(comment);

  // LOGIN
  async function updateUserComment() {
    initialValue = commentIntro;
    if (errorMsg) setErrorMsg("");
    const body = {
      email: String(user[0]?.email),
      addComment: String(addComment),
      commentIntro: String(commentIntro),
    };
    console.log("body", body);
    try {
      const res = await fetch("/api/linkedin/update-user-post-comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        console.log("body", body);
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error("An unexpected error happened occurred:", error);
      setErrorMsg(error.message);
    }
  }
  return (
    <>
      {user && (
        <form onSubmit={updateUserComment}>
          <div className='relative flex flex-col items-left justify-center overflow-show'>
            <div className='flex flex-col md:flex-row gap-4 md:items-center'>
              <div className='flex gap-4 items-center'>
                <p>URL toevoegen als link:</p>
                <label className='inline-flex relative items-center cursor-pointer'>
                  <input type='checkbox' className='sr-only peer' checked={addComment} readOnly />
                  <div
                    onClick={(e) => {
                      if (e) {
                        setAddComment(!addComment);
                        updateUserComment();
                      }
                    }}
                    className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-automatin-blue peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-automatin-blue"
                  ></div>
                </label>
              </div>
              {addComment && (
                <>
                  <p>Met intro: </p>
                  <input
                    type='text'
                    className='py-1 rounded-md pl-2'
                    value={commentIntro}
                    onChange={(e) => {
                      setCommentIntro(e.target.value);
                    }}
                  />
                  <Button type='submit' ariaLabel='Sla comment op' cname='px-2 py-1 md:px-2 md:py-1' sort='automatin' text='Sla intro op' />
                </>
              )}
              {errorMsg && errorMsg}
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default UpdateAddComment;
