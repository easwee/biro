<script>
  import { onMount } from "svelte";
  import { BIRO_SCHEME } from "constants";
  import { clientData } from "store";
  import { idbCreate, idbAdd, idbRead, idbUpdate } from "utils";

  onMount(() => {
    idbCreate("biro_db", BIRO_SCHEME)
      .then(() => idbRead("biro_db", "clients", 1))
      .then(result => {
        if (result) {
          clientData.set(result);
        } else {
          idbAdd("biro_db", "clients", $clientData);
        }
      });
  });

  function handleSubmit() {
    idbUpdate("biro_db", "clients", 1, $clientData)
      .then(() => idbRead("biro_db", "clients", 1))
      .then(result => {
        clientData.update(() => result);
      });
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <h3>Edit client data</h3>
  <div class="field">
    <input
      type="text"
      bind:value={$clientData.client_company_name}
      placeholder="Client company name" />
  </div>
  <div class="field">
    <input
      type="text"
      bind:value={$clientData.client_company_address}
      placeholder="Client company address" />
  </div>
  <div class="field">
    <input
      type="text"
      bind:value={$clientData.client_company_city}
      placeholder="Client company city" />
  </div>
  <div class="field">
    <input
      type="text"
      bind:value={$clientData.client_company_zip}
      placeholder="Client company zip" />
  </div>
  <div class="field">
    <input
      type="text"
      bind:value={$clientData.client_company_country}
      placeholder="Client company country" />
  </div>
  <div class="actions">
    <button type="submit" class="button save">Save</button>
  </div>
</form>
