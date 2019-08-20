<script>
  import { onMount } from "svelte";
  import { BIRO_SCHEME } from "constants";
  import { ownerData } from "store";
  import { idbCreate, idbAdd, idbRead, idbUpdate } from "utils";

  onMount(() => {
    idbCreate("biro_db", BIRO_SCHEME)
      .then(() => idbRead("biro_db", "owner", 1))
      .then(result => {
        if (result) {
          ownerData.set(result);
        } else {
          idbAdd("biro_db", "owner", $ownerData);
        }
      });
  });

  function handleSubmit() {
    idbUpdate("biro_db", "owner", 1, $ownerData)
      .then(() => idbRead("biro_db", "owner", 1))
      .then(result => {
        ownerData.update(() => result);
      });
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <h3>Invoice template setup</h3>
  <input bind:value={$ownerData.company_name} placeholder="Company name" />
  <input bind:value={$ownerData.company_address} placeholder="Address" />
  <input
    bind:value={$ownerData.company_postal_number}
    placeholder="Postal number" />
  <input bind:value={$ownerData.company_city} placeholder="City" />
  <input
    bind:value={$ownerData.company_tax_registration_number}
    placeholder="Tax reg. no." />
  <input
    bind:value={$ownerData.company_business_registration_number}
    placeholder="Business reg.no." />
  <input bind:value={$ownerData.vat} placeholder="VAT" />
  <input bind:value={$ownerData.terms} placeholder="Terms" />
  <input
    bind:value={$ownerData.pdf_file_name_prefix}
    placeholder="PDF file name prefix" />
  <input bind:value={$ownerData.issue_date} placeholder="Issue date" />
  <input bind:value={$ownerData.issue_city} placeholder="Issue city" />
  <input bind:value={$ownerData.base_currency} placeholder="USD" disabled />
  <input
    bind:value={$ownerData.bank_account_number}
    placeholder="Bank account number" />
  <button type="submit">Submit</button>
</form>
