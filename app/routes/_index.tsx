import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Welcome | myCy" },
    { name: "description", content: "Welcome to myCy!" },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to myCy</h1>
      <ul>
        <li>
          <a href="import/form">
            Search
          </a>
        </li>
      </ul>
    </div>
  );
}
