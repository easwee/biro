<script>
  import { onMount } from "svelte";
  import { invoiceItems } from "store";

  import ColumnSelector from "components/editor/ColumnSelector.svelte";
  import Exporter from "components/exporter/Exporter.svelte";
  import InvoiceTemplateSetupForm from "components/forms/InvoiceTemplateSetupForm.svelte";
  import ClientEditForm from "components/forms/ClientEditForm.svelte";

  function addRow() {
    invoiceItems.update(items => {
      return [
        ...items,
        {
          description: `Consultancy & development (1.6.2019 - 15.6.2019)`,
          units: 160,
          unitFormat: "hours",
          unitPrice: 100,
          period: "1.6.2019 - 15.6.2019"
        }
      ];
    });
  }
</script>

<ColumnSelector />
<InvoiceTemplateSetupForm />
<ClientEditForm />
<button on:click={() => addRow()}>Add one</button>
<Exporter />
