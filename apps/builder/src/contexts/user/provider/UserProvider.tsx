import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { UserContext, User } from "../UserContext";

export function UserProvider({ children, user }: { children: React.ReactNode, user: User }) {
  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
}
