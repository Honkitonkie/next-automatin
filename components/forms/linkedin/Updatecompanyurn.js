import React, { useState, useEffect, useRef } from "react";
import { useUser } from "../../../lib/hooks";
import Layout from "../../globals/Layout";

const UpdateCompanyUrn = () => {
  const user = useUser();
  const [errorMsg, setErrorMsg] = useState("");

  // Server-render loading state
  if (!user || user.isLoggedIn === false) {
    return <Layout>Loading...</Layout>;
  }

  const render = useRef(0);
  const initialValue = user ? user[0]?.linkedin?.organization_urn : "Selecteer hier";
  const companyOptions = user ? user[0]?.linkedin?.listCompanies : "";

  const [organizationUrnSelector, setOrganizationUrnSelector] = useState(initialValue);

  useEffect(() => {
    render.current++;
    if (render.current < 2) {
      setOrganizationUrnSelector(user[0]?.linkedin?.organization_urn);
      return;
    }
    updateUserCompanyUrn();
  }, [organizationUrnSelector]);

  // LOGIN
  async function updateUserCompanyUrn() {
    if (errorMsg) setErrorMsg("");
    const body = {
      email: String(user[0]?.email),
      organizationUrnSelector: String(organizationUrnSelector),
    };
    try {
      const res = await fetch("/api/linkedin/update-user-company-urn", {
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
      {companyOptions.length > 0 && (
        <form className='my-2' onSubmit={updateUserCompanyUrn}>
          <label className='pr-5' htmlFor='companyUrn'>
            Selecteer welke organisatie
          </label>
          <select
            className='rounded p-1 text-center'
            id='companyUrn'
            value={organizationUrnSelector}
            onChange={(e) => {
              setOrganizationUrnSelector(e.target.value);
            }}
          >
            {companyOptions.map((item, index) => (
              <option key={index} value={item.urn}>
                {item.name}
              </option>
            ))}
          </select>
        </form>
      )}
    </>
  );
};

export default UpdateCompanyUrn;
