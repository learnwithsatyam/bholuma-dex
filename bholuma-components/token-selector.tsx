"use client"
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { SolanaTokenInterface } from "@/interfaces/solanaTokenInterface"

function TokenSelector({ tokens, address, setAddress }: { tokens: SolanaTokenInterface[], address: string, setAddress: (address: string) => void}) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("");
    return (
        <div className="dark">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between"
                    >
                        {value &&
                            <img
                                src={
                                    tokens.find((token) => token.name === value)?.logoURI ||
                                    "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png"
                                }
                                alt={tokens.find((token) => token.name === value)?.name || "Token Logo"}
                                width={24}
                                height={24}
                                className="mr-2 h-6 w-6 rounded-full"
                            />
                        }
                        {value
                            ? tokens.find((token) => token.name === value)?.symbol
                            : "Select token..."}
                        <ChevronsUpDown className="opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0 dark">
                    <Command>
                        <CommandInput placeholder="Search token..." className="h-9" />
                        <CommandList>
                            <CommandEmpty>No token found.</CommandEmpty>
                            <CommandGroup>
                                {tokens.map((token, index) => (
                                    <CommandItem
                                        key={token.address!}
                                        value={token.name}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue === value ? "" : currentValue)
                                            setAddress(token.address)
                                            setOpen(false)
                                        }}
                                    >
                                        {token.symbol}
                                        <Check
                                            className={cn(
                                                "ml-auto",
                                                value === token.name ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default TokenSelector