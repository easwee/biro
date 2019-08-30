<script>
  import { onMount } from "svelte";
  import { BIRO_SCHEME } from "constants";
  import { clientData } from "store";
  import { idbCreate, idbAdd, idbRead, idbUpdate } from "utils";

  let typingTimeout = null;

  function handleInputChange() {
    window.clearTimeout(typingTimeout);
    $clientData = $clientData;
    typingTimeout = window.setTimeout(function() {
      idbUpdate("biro_db", "clients", 1, $clientData)
        .then(() => idbRead("biro_db", "clients", 1))
        .then(result => {
          clientData.update(() => result);
        });
    }, 500);
  }
</script>

<style>
  h3 {
    color: white;
    margin: 0 0 10px 0;
  }
</style>

<form>
  <h3>Edit client data</h3>
  <div class="field">
    <input
      type="text"
      bind:value={$clientData.client_company_name}
      on:keyup={() => handleInputChange()}
      on:change={() => handleInputChange()}
      placeholder="Client company name" />
  </div>
  <div class="field">
    <input
      type="text"
      bind:value={$clientData.client_company_address}
      on:keyup={() => handleInputChange()}
      on:change={() => handleInputChange()}
      placeholder="Client company address" />
  </div>
  <div class="field">
    <input
      type="text"
      bind:value={$clientData.client_company_city}
      on:keyup={() => handleInputChange()}
      on:change={() => handleInputChange()}
      placeholder="Client company city" />
  </div>
  <div class="g-r">
    <div class="g-r-c g-r-c-30">
      <div class="field">
        <input
          type="text"
          bind:value={$clientData.client_company_zip}
          on:keyup={() => handleInputChange()}
          on:change={() => handleInputChange()}
          placeholder="Client company zip" />
      </div>
    </div>
    <div class="g-r-c g-r-c-70">
      <div class="field">
        <input
          type="text"
          bind:value={$clientData.client_company_country}
          on:keyup={() => handleInputChange()}
          on:change={() => handleInputChange()}
          placeholder="Client company country" />
      </div>
    </div>
  </div>
</form>
