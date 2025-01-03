"use client";

import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { MonthPicker } from "@/components/ui/monthpicker";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"; // prettier-ignore

const MonthSelector = ({
  selectedMonth,
  onMonthSelect,
}: {
  selectedMonth: Date;
  onMonthSelect: (date: Date) => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[160px] justify-start text-left font-normal",
              !selectedMonth && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedMonth ? (
              `${selectedMonth.getFullYear()}年 ${selectedMonth.getMonth() + 1}月`
            ) : (
              <span>月を選択</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <MonthPicker
            onMonthSelect={(e) => {
              onMonthSelect(e);
              setOpen(false);
            }}
            selectedMonth={selectedMonth}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MonthSelector;
