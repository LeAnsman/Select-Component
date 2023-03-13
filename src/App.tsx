import { useState } from "react";
import styled from "styled-components";
import Select, { SelectOption } from "./Select";

const options = [
  { label: "One", value: 1 },
  { label: "Two", value: 2 },
  { label: "Three", value: 3 },
  { label: "Four", value: 4 },
  { label: "Five", value: 5 },
  { label: "Six", value: 6 },
  { label: "Seven", value: 7 },
  { label: "Eight", value: 8 },
  { label: "Nine", value: 9 },
  { label: "Ten", value: 10 },
];

export default function App() {
  // array
  const [value1, setValue1] = useState<SelectOption[]>([options[0]]);
  // single element
  const [value2, setValue2] = useState<SelectOption | undefined>(options[0]);

  return (
    <Layout>
      <Title>Select component made with React and TypeScript</Title>

      <Select options={options} value={value2} onChange={(o) => setValue2(o)} />
      <Select
        multiple
        options={options}
        value={value1}
        onChange={(o) => setValue1(o)}
      />
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2em;
`;

const Title = styled.h1`
  margin-top: 4em;
`;
