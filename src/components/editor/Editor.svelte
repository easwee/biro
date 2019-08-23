<script>
  import { onMount } from "svelte";
  import { Tabs, Tab, TabList, TabPanel } from "svelte-tabs";
  import { invoiceItems } from "store";

  import ColumnSelector from "components/editor/ColumnSelector.svelte";
  import Exporter from "components/exporter/Exporter.svelte";
  import InvoiceTemplateSetupForm from "components/forms/InvoiceTemplateSetupForm.svelte";
  import ClientEditForm from "components/forms/ClientEditForm.svelte";
  import InvoiceItemsForm from "components/forms/InvoiceItemsForm.svelte";
</script>

<style>
  section {
    overflow-y: auto;
    height: calc(100% - 31px);
    position: absolute;
    top: 31px;
    left: 0;
    margin-top: 0;
    width: 100%;
    padding-right: 20px;
  }
  :global(.svelte-tabs) {
    height: 100%;
    position: relative;
  }
  :global(.svelte-tabs div.svelte-tabs__tab-panel) {
    width: 100%;
  }
</style>

<Tabs>
  <TabList>
    <Tab>Invoice items</Tab>
    <Tab>Template setup</Tab>
  </TabList>

  <TabPanel>
    <section>
      <InvoiceItemsForm />
    </section>
  </TabPanel>

  <TabPanel>
    <section>
      <InvoiceTemplateSetupForm />
      <ClientEditForm />
      <ColumnSelector />
    </section>
  </TabPanel>

</Tabs>
<Exporter />
