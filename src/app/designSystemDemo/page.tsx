'use client';

import SplitButton from '../../components/buttons/SplitButton';
import { Icon, Icons } from '../../components/Icon';
import { Chip } from '../../components/info/Chip';
import ButtonExample from '../../components/buttons/ButtonExample';
import DataTableExample from '../../components/data/DataTableExample';
import ChipExample from '@/components/info/ChipExample';
import SplitButtonExample from '../../components/buttons/SplitButtonExample';
import LabProfileCardExample, { DashboardCardExample } from '../../components/cards/DashboardCardExample';

export default function Home() {
  return (
    <main className="min-h-screen p-8">

      <section className="mt-8">
        <h2 className="font-headline text-heading-sm mb-6">Button Component Examples</h2>
        <ButtonExample />
      </section>

      <section className="mt-8">
        <h2 className="font-headline text-heading-sm mb-6">Data Table Component Examples</h2>
        <DataTableExample />
      </section>

      <section className="mt-8">
        <h2 className="font-headline text-heading-sm mb-6">Chip Component Examples</h2>
        <ChipExample />
      </section>

      <section className="mt-8">
        <h2 className="font-headline text-heading-sm mb-6">Split Button Component Examples</h2>
        <SplitButtonExample />
      </section>

      <section className="mt-8">
        <h2 className="font-headline text-heading-sm mb-6">Lab Profile Card Component Examples</h2>
        <DashboardCardExample />
      </section>

      </main>
  );
}
