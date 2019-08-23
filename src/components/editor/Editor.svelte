<script>
  import { onMount } from "svelte";
  import { Tabs, Tab, TabList, TabPanel } from "svelte-tabs";
  import { invoiceItems } from "store";

  import ColumnSelector from "components/forms/ColumnSelector.svelte";
  import Exporter from "components/exporter/Exporter.svelte";
  import InvoiceTemplateSetupForm from "components/forms/InvoiceTemplateSetupForm.svelte";
  import ClientEditForm from "components/forms/ClientEditForm.svelte";
  import InvoiceItemsForm from "components/forms/InvoiceItemsForm.svelte";
</script>

<style>
  section {
    overflow-y: auto;
    height: calc(100% - 62px);
    position: absolute;
    top: 45px;
    left: 0;
    margin-top: 0;
    padding-top: 10px;
    width: 100%;
  }
  :global(.svelte-tabs) {
    height: 100%;
    position: relative;
  }
  :global(.svelte-tabs li.svelte-tabs__tab) {
    padding: 15px 10px;
    color: white;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    outline: 0;
    vertical-align: top;
  }
  :global(.svelte-tabs li.svelte-tabs__selected) {
    border-top: 2px solid white;
    border-bottom: 0;
    background-color: rgba(255, 255, 255, 0.1);
  }
  :global(.svelte-tabs ul.svelte-tabs__tab-list) {
    border-bottom: 2px solid white;
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
