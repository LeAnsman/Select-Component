import { useState } from "react";
import styled from "styled-components";

export type SelectOption = {
  label: string;
  value: string | number;
};

type SelectProps = {
  options: SelectOption[];
} & (SingleSelectProps | MultipleSelectProps);

type SingleSelectProps = {
  multiple?: false;
  value?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
};

type MultipleSelectProps = {
  multiple: true;
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
};

export default function Select({
  multiple,
  value,
  onChange,
  options,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (
    e: React.MouseEvent<HTMLElement>,
    option: SelectOption
  ) => {
    e.stopPropagation();
    setIsOpen(false);
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter((o) => o !== option));
      } else {
        onChange([...value, option]);
      }
    } else {
      if (option !== value) onChange(option);
    }
  };

  const isOptionSelected = (option: SelectOption) => {
    return multiple ? value.includes(option) : option === value;
  };

  const handleClearBtn = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    multiple ? onChange([]) : onChange(undefined);
  };

  return (
    <Container
      tabIndex={0}
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen(!isOpen)}
    >
      <Span>
        {multiple
          ? value.map((v) => (
              <OptionBadge
                key={v.value}
                onClick={(e) => {
                  handleSelectOption(e, v);
                }}
              >
                {v.label} <RemoveBtn>&times;</RemoveBtn>
              </OptionBadge>
            ))
          : value?.label}
      </Span>
      <Button
        onClick={(e) => {
          handleClearBtn(e);
        }}
      >
        &times;
      </Button>
      <Divider></Divider>
      <Caret onClick={handleClick}></Caret>
      {isOpen && (
        <Options>
          {options.map((option) =>
            isOptionSelected(option) ? (
              <OptionSelected
                key={option.value}
                onClick={(e) => {
                  handleSelectOption(e, option);
                }}
              >
                {option.label}
              </OptionSelected>
            ) : (
              <Option
                key={option.value}
                onClick={(e) => {
                  handleSelectOption(e, option);
                }}
              >
                {option.label}
              </Option>
            )
          )}
        </Options>
      )}
    </Container>
  );
}

// styled components

const Container = styled.div`
  position: relative;
  width: 20em;
  min-height: 1.5em;
  border: 0.05em solid #777;
  display: flex;
  align-items: center;
  gap: 0.5em;
  padding: 0.5em;
  margin: 0.5em;
  border-radius: 0.25em;
  outline: none;
  &:focus {
    outline: none;
    box-shadow: 0px 0px 2px blue;
  }
`;

const Span = styled.span`
  flex-grow: 1;
  display: flex;
  gap: 0.5em;
  flex-wrap: wrap;
`;

const RemoveBtn = styled.span`
  font-size: 1.25em;
  color: #777;
`;

const Button = styled.button`
  background: none;
  color: #777;
  border: none;
  outline: none;
  padding: 0.25em;
  font-size: 1.25rem;
  transition: all 0.4s;
  &:hover {
    cursor: pointer;
    color: #5050db;
  }
`;

const OptionBadge = styled.button`
  display: flex;
  align-items: center;
  border: 0.05em solid #777;
  border-radius: 0.25em;
  padding: 0.15em 0.25em;
  gap: 0.25em;
  font-size: 0.9em;
  background: none;
  outline: none;
  cursor: pointer;
  &:hover,
  &:focus {
    background-color: hsl(0, 100%, 90%);
    border-color: hsl(0, 100%, 50%);
  }
  &:hover ${RemoveBtn}, &:focus ${RemoveBtn} {
    color: hsl(0, 100%, 50%);
  }
`;

const Divider = styled.span`
  background-color: #777;
  align-self: stretch;
  width: 0.05em;
`;

const Caret = styled.div`
  translate: 0 25%;
  border: 0.25em solid transparent;
  border-top-color: #777;
`;

const Options = styled.ul`
  position: absolute;
  margin: 0;
  padding: 0;
  list-style: none;
  display: block;
  max-height: 15em;
  overflow-y: auto;
  overflow-x: hidden;
  border: 0.05em solid #777;
  border-radius: 0.25em;
  width: 100%;
  left: 0;
  top: calc(100% + 0.5em);
  z-index: 10;
  background-color: white;
`;

const Option = styled.li`
  padding: 0.25em 0.5em;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background-color: #5050db;
    color: white;
  }
`;

const OptionSelected = styled.li`
  padding: 0.25em 0.5em;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  color: #7575e6;
  &:hover {
    background-color: #5050db;
    color: white;
  }
`;
