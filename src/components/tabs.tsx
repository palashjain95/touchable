import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { hapticTabChange } from "../lib/haptics";
import { cn } from "../lib/utils";
import { TabsActiveValueContext, TabsList, TabsTrigger } from "./tabs-list";

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
>(({ value, defaultValue, onValueChange, ...props }, ref) => {
  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue ?? "");
  const [optimisticValue, setOptimisticValue] = React.useState<string | null>(null);

  const resolvedValue = isControlled ? value : uncontrolledValue;
  const indicatorValue = optimisticValue ?? resolvedValue;

  React.useEffect(() => {
    if (optimisticValue !== null && optimisticValue === resolvedValue) {
      setOptimisticValue(null);
    }
  }, [optimisticValue, resolvedValue]);

  return (
    <TabsActiveValueContext.Provider value={indicatorValue}>
      <TabsPrimitive.Root
        ref={ref}
        value={isControlled ? value : undefined}
        defaultValue={isControlled ? undefined : defaultValue}
        onValueChange={(next) => {
          setOptimisticValue(next);
          if (!isControlled) setUncontrolledValue(next);
          hapticTabChange();
          onValueChange?.(next);
        }}
        {...props}
      />
    </TabsActiveValueContext.Provider>
  );
});
Tabs.displayName = TabsPrimitive.Root.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
