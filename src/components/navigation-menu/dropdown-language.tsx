"use client";

import { useState, type ReactElement } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Flag } from "../flags/flag";

type Language = {
  value: string;
  label: string;
  countryCode: string;
};

const LANGUAGES: Language[] = [
  {
    value: "english",
    label: "English (UK)",
    countryCode: "us",
  },
  {
    value: "kazakh",
    label: "Қазақша (Казахстан)",
    countryCode: "kz",
  },
];

const itemClass =
  "cursor-pointer gap-2 pl-2 text-sm data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground [&>span]:hidden";

type LanguageDropdownProps = {
  trigger: ReactElement;
  defaultOpen?: boolean;
  align?: "start" | "center" | "end";
};

const LanguageDropdown = ({
  trigger,
  defaultOpen,
  align = "end",
}: LanguageDropdownProps) => {
  const [language, setLanguage] = useState(LANGUAGES[0].value);

  return (
    <DropdownMenu defaultOpen={defaultOpen}>
      <DropdownMenuTrigger render={trigger} />
      <DropdownMenuContent className="w-50" align={align}>
        <DropdownMenuRadioGroup
          value={language}
          onValueChange={setLanguage}
          className="flex flex-col gap-2"
        >
          {LANGUAGES.map(({ value, label, countryCode }) => (
            <DropdownMenuRadioItem
              key={value}
              value={value}
              className={itemClass}
            >
              <Flag
                code={countryCode}
                format="svg"
                ratio="4x3"
                alt={label}
                className="h-5 w-5"
              />

              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageDropdown;
