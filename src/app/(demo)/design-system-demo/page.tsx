'use client';
import ButtonExample from '@/components/buttons/ButtonExample';
import DataTableExample from '@/components/data/DataTableExample';
import ChipExample from '@/components/info/ChipExample';
import { AlertExample } from '@/components/info/AlertExample';
import SplitButtonExample from '@/components/buttons/SplitButtonExample';
import { DashboardCardExample } from '@/components/cards/dashboard/DashboardCardExample';
import { BasicDialogExample } from '@/components/dialogs/BasicDialogExample';
import TextFieldExample from '@/components/inputs/TextFieldExample';
import SwitchExample from '@/components/inputs/SwitchExample';
import TabsExample from '@/components/navigation/TabsExample';
import TooltipExample from '@/components/info/TooltipExample';
import DropdownSelectExample from '@/components/inputs/DropdownSelectExample';
import CheckboxItemExample from '@/components/inputs/CheckboxItemExample';
import RadioListExample from '@/components/inputs/RadioListExample';
import StepperExample from '@/components/navigation/StepperExample';
import AccordionExample from '@/components/content/AccordionExample';
import StateToggleExample from '@/components/navigation/StateToggleExample';
import FormattingToolbarExample from '@/components/editor/FormattingToolbarExample';
import AdvancedMenuExample from '@/components/menu/AdvancedMenuExample';
import FilterMenuExample from '@/components/menu/FilterMenuExample';

export default function Home() {
  return (
    <main className="min-h-screen p-8">

      <section className="mt-8">
        <h2 className="font-headline text-heading-sm mb-6">Accordion Component Examples</h2>
        <AccordionExample />
      </section>

      <section className="mt-8">
        <h2 className="font-headline text-heading-sm mb-6">Advanced Menu Component Example</h2>
        <AdvancedMenuExample />
      </section>

      <section className="mt-8">
        <h2 className="font-headline text-heading-sm mb-6">Alert Component Examples</h2>
        <AlertExample />
      </section>

      <section className="mt-8">
        <h2 className="font-headline text-heading-sm mb-6">Basic Dialog Component Examples</h2>
        <BasicDialogExample />
      </section>

      <section className="mt-8">
        <h2 className="font-headline text-heading-sm mb-6">Button Component Examples</h2>
        <ButtonExample />
      </section>

      <section className="mt-8">
        <h2 className="font-headline text-heading-sm mb-6">Checkbox Component Examples</h2>
        <CheckboxItemExample />
      </section>

      <section className="mt-8">
        <h2 className="font-headline text-heading-sm mb-6">Chip Component Examples</h2>
        <ChipExample />
      </section>

      <section className="mt-8">
        <h2 className="font-headline text-heading-sm mb-6">Dashboard Card Component Examples</h2>
        <DashboardCardExample />
      </section>

      <section className="mt-8">
        <h2 className="font-headline text-heading-sm mb-6">Data Table Component Examples</h2>
        <DataTableExample />
      </section>

      <section className="mt-8">
        <h2 className="font-headline text-heading-sm mb-6">Dropdown Component Examples</h2>
        <DropdownSelectExample />
      </section>

      <section className="mt-8">
        <h2 className="font-headline text-heading-sm mb-6">Filter Menu Component Example</h2>
        <FilterMenuExample />
      </section>

      <section className="mt-8">
        <h2 className="font-headline text-heading-sm mb-6">Formatting Toolbar Component Examples</h2>
        <FormattingToolbarExample />
      </section>

      <section className="mt-8">
        <h2 className="font-headline text-heading-sm mb-6">Radio List Item Component Examples</h2>
        <RadioListExample />
      </section>

      <section className="mt-8">
        <h2 className="font-headline text-heading-sm mb-6">Split Button Component Examples</h2>
        <SplitButtonExample />
      </section>

      <section className="mt-8">
        <h2 className="font-headline text-heading-sm mb-6">State Toggle Component Examples</h2>
        <StateToggleExample />
      </section>

      <section className="mt-8">
        <h2 className="font-headline text-heading-sm mb-6">Stepper Component Examples</h2>
        <StepperExample />
      </section>

      <section className="mt-8">
        <h2 className="font-headline text-heading-sm mb-6">Switch Component Examples</h2>
        <SwitchExample />
      </section>

      <section className="mt-8">
        <h2 className="font-headline text-heading-sm mb-6">Tab Component Examples</h2>
        <TabsExample />
      </section>

      <section className="mt-8">
        <h2 className="font-headline text-heading-sm mb-6">Text Field Component Examples</h2>
        <TextFieldExample />
      </section>

      <section className="mt-8">
        <h2 className="font-headline text-heading-sm mb-6">Tooltip Component Examples</h2>
        <TooltipExample />
      </section>

    </main>
  );
}
