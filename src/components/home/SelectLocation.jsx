import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Button } from "@nextui-org/react";

export function SelectLocation() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="bordered"
          role="combobox"
          size="lg"
          aria-expanded={open}
          className="w-full justify-between text-gray-400 py-6 hidden md:flex"
        >
          {value
            ? locations.find((framework) => framework.value === value)?.label
            : "City..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] ] p-0">
        <Command>
          <CommandInput placeholder="Search location..." className="h-9" />
          <CommandEmpty>No Location found.</CommandEmpty>
          <CommandGroup>
            {locations.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                {framework.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === framework.value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
const locations = [
  {
    value: "dhaka",
    label: "Dhaka",
  },
  {
    value: "chittagong",
    label: "Chittagong",
  },

  {
    value: "sylhet",
    label: "Sylhet",
  },

  {
    value: "mymensingh",
    label: "Mymensingh",
  },
  {
    value: "comilla",
    label: "Comilla",
  },
  {
    value: "narsingdi",
    label: "Narsingdi",
  },
  {
    value: "narayanganj",
    label: "Narayanganj",
  },
  {
    value: "gazipur",
    label: "Gazipur",
  },
  {
    value: "manikganj",
    label: "Manikganj",
  },
  {
    value: "munshiganj",
    label: "Munshiganj",
  },
  {
    value: "kishoreganj",
    label: "Kishoreganj",
  },
  {
    value: "shariatpur",
    label: "Shariatpur",
  },
  {
    value: "madaripur",
    label: "Madaripur",
  },
  {
    value: "chandpur",
    label: "Chandpur",
  },
  {
    value: "brahmanbaria",
    label: "Brahmanbaria",
  },
  {
    value: "rangamati",
    label: "Rangamati",
  },
  {
    value: "bandarban",
    label: "Bandarban",
  },
  {
    value: "coxsbazar",
    label: "Cox's Bazar",
  },
  {
    value: "feni",
    label: "Feni",
  },
  {
    value: "lakshmipur",
    label: "Lakshmipur",
  },
  {
    value: "noakhali",
    label: "Noakhali",
  },
  {
    value: "barishal",
    label: "Barishal",
  },

  {
    value: "narail",
    label: "Narail",
  },

  {
    value: "barisal",
    label: "Barisal",
  },
  {
    value: "patuakhali",
    label: "Patuakhali",
  },
  {
    value: "bhola",
    label: "Bhola",
  },
  {
    value: "pirojpur",
    label: "Pirojpur",
  },
  {
    value: "jhalokati",
    label: "Jhalokati",
  },
  {
    value: "barguna",
    label: "Barguna",
  },
  {
    value: "amtali",
    label: "Amtali",
  },
  {
    value: "bagerhat",
    label: "Bagerhat",
  },
  {
    value: "satkhira",
    label: "Satkhira",
  },
  {
    value: "khulna",
    label: "Khulna",
  },
  {
    value: "jessore",
    label: "Jessore",
  },

  {
    value: "magura",
    label: "Magura",
  },
  {
    value: "meherpur",
    label: "Meherpur",
  },

  {
    value: "jhenaidah",
    label: "Jhenaidah",
  },
  {
    value: "pabna",
    label: "Pabna",
  },
  {
    value: "natore",
    label: "Natore",
  },
  {
    value: "rajshahi",
    label: "Rajshahi",
  },
  {
    value: "bogra",
    label: "Bogra",
  },
  {
    value: "joypurhat",
    label: "Joypurhat",
  },

  {
    value: "dinajpur",
    label: "Dinajpur",
  },

  {
    value: "rangpur",
    label: "Rangpur",
  },

  {
    value: "kurigram",
    label: "Kurigram",
  },

  {
    value: "gaibandha",
    label: "Gaibandha",
  },

  {
    value: "badarganj",
    label: "Badarganj",
  },

  {
    value: "panchagarh",
    label: "Panchagarh",
  },

  {
    value: "pirganj",
    label: "Pirganj",
  },
  {
    value: "tentulia",
    label: "Tentulia",
  },
  {
    value: "kaliganj",
    label: "Kaliganj",
  },

  {
    value: "lalmonirhat",
    label: "Lalmonirhat",
  },

  {
    value: "thakurgaon",
    label: "Thakurgaon",
  },

  {
    value: "kachua",
    label: "Kachua",
  },
];
