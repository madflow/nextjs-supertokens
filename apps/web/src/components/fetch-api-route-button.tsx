"use client";
import { useState } from "react";

type Props = {
  children?: React.ReactNode;
  route: string;
};
export function FetchApiRouteButton(props: Props) {
  const [routeStatus, setRouteStatus] = useState("000");

  async function onClick() {
    const response = await fetch(props.route);
    setRouteStatus(JSON.stringify(response.status));
  }

  return (
    <button type="button" className="btn" onClick={onClick}>
      {props.children} <span className="status">{routeStatus}</span>
    </button>
  );
}
