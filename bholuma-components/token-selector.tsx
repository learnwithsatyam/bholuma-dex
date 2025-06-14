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

function TokenSelector({
    tokens,
    address,
    setAddress,
}: {
    tokens: SolanaTokenInterface[]
    address: string
    setAddress: (address: string) => void
}) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState(address)

    React.useEffect(() => {
        setValue(address)
    }, [address])

    const selectedToken = tokens.find(
        (token) => token.address === value
    )

    return (
        <div className="dark w-[200px]">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full max-w-[220px] justify-between text-base sm:text-lg"
                    >
                        {selectedToken?.logoURI && (
                            <img
                                src={selectedToken.logoURI}
                                alt={selectedToken.name}
                                width={24}
                                height={24}
                                className="mr-2 h-6 w-6 rounded-full"
                            />
                        )}
                        {selectedToken?.symbol || "Select token..."}
                        <ChevronsUpDown className="opacity-50 ml-auto" />
                    </Button>
                </PopoverTrigger>

                <PopoverContent
                    side="bottom"
                    align="start"
                    className="w-full max-w-[220px] p-0 z-50 dark border border-muted"
                >
                    <Command>
                        <CommandInput
                            placeholder="Search token..."
                            className="h-9 px-2 text-sm"
                        />
                        <CommandList className="max-h-[200px] overflow-auto">
                            <CommandEmpty>No token found.</CommandEmpty>
                            <CommandGroup>
                                {tokens.map((token) => (
                                    <CommandItem
                                        key={token.address}
                                        value={token.address}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue);
                                            setAddress(currentValue);
                                            setOpen(false);
                                        }}
                                    >
                                        {token.symbol}
                                        <Check
                                            className={cn(
                                                "ml-auto",
                                                value === token.address ? "opacity-100" : "opacity-0"
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
