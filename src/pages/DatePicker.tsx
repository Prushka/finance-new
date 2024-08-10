"use client"

import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export function DatePicker({ date, setDate, className, children }: {
    className?: string;
    date: Date|undefined; setDate: any, children: any }) {

    return (
        <Popover>
            <PopoverTrigger asChild className={`${className}`}>
                <div className={"flex flex-col gap-1"}>
                    <div className={"text-sm font-medium"}>{children}</div>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "justify-start text-left font-normal w-full",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}
