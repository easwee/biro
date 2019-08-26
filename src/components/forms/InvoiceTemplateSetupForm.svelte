<script>
  import { onMount } from "svelte";
  import { BIRO_SCHEME } from "constants";
  import { ownerData } from "store";
  import { idbRead, idbUpdate } from "utils";

  let typingTimeout = null;

  function handleInputChange() {
    window.clearTimeout(typingTimeout);
    $ownerData = $ownerData;
    typingTimeout = window.setTimeout(function() {
      idbUpdate("biro_db", "owner", 1, $ownerData)
        .then(() => idbRead("biro_db", "owner", 1))
        .then(result => {
          ownerData.update(() => result);
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
  <h3>Invoice template setup</h3>

  <div class="field">
    <input
      type="text"
      bind:value={$ownerData.company_name}
      on:keyup={() => handleInputChange()}
      on:change={() => handleInputChange()}
      placeholder="Company name" />
  </div>
  <div class="field">
    <input
      type="text"
      bind:value={$ownerData.company_address}
      on:keyup={() => handleInputChange()}
      on:change={() => handleInputChange()}
      placeholder="Address" />
  </div>
  <div class="g-r">
    <div class="g-r-c g-r-c-30">
      <div class="field">
        <input
          type="text"
          bind:value={$ownerData.company_postal_number}
          on:keyup={() => handleInputChange()}
          on:change={() => handleInputChange()}
          placeholder="Postal number" />
      </div>
    </div>
    <div class="g-r-c g-r-c-70">
      <div class="field">
        <input
          type="text"
          bind:value={$ownerData.company_city}
          on:keyup={() => handleInputChange()}
          on:change={() => handleInputChange()}
          placeholder="City" />
      </div>
    </div>
  </div>
  <div class="g-r">
    <div class="g-r-c g-r-c-50">
      <div class="field">
        <input
          type="text"
          bind:value={$ownerData.company_tax_registration_number}
          on:keyup={() => handleInputChange()}
          on:change={() => handleInputChange()}
          placeholder="Tax reg. no." />
      </div>
    </div>
    <div class="g-r-c g-r-c-50">
      <div class="field">
        <input
          type="text"
          bind:value={$ownerData.company_business_registration_number}
          on:keyup={() => handleInputChange()}
          on:change={() => handleInputChange()}
          placeholder="Business reg.no." />
      </div>
    </div>
  </div>
  <div class="g-r">
    <div class="g-r-c g-r-c-50">
      <div class="field">
        <input
          type="text"
          bind:value={$ownerData.vat}
          accept=" on:keyup={() => handleInputChange()} on:change={() => handleInputChange()}"
          placeholder="VAT" />
      </div>
    </div>
    <div class="g-r-c g-r-c-50">
      <div class="field">
        <input
          type="text"
          bind:value={$ownerData.terms}
          on:keyup={() => handleInputChange()}
          on:change={() => handleInputChange()}
          placeholder="Terms" />
      </div>
    </div>
  </div>
  <div class="field">
    <input
      type="text"
      bind:value={$ownerData.pdf_file_name_prefix}
      on:keyup={() => handleInputChange()}
      on:change={() => handleInputChange()}
      placeholder="PDF file name prefix" />
  </div>
  <div class="field">
    <input
      type="text"
      bind:value={$ownerData.issue_date}
      on:keyup={() => handleInputChange()}
      on:change={() => handleInputChange()}
      placeholder="Issue date" />
  </div>
  <div class="field">
    <input
      type="text"
      bind:value={$ownerData.issue_city}
      on:keyup={() => handleInputChange()}
      on:change={() => handleInputChange()}
      placeholder="Issue city" />
  </div>
  <div class="field">
    <input
      type="text"
      bind:value={$ownerData.base_currency}
      on:keyup={() => handleInputChange()}
      on:change={() => handleInputChange()}
      placeholder="USD"
      disabled />
  </div>
  <div class="field">
    <input
      type="text"
      bind:value={$ownerData.bank_account_number}
      on:keyup={() => handleInputChange()}
      on:change={() => handleInputChange()}
      placeholder="Bank account number" />
  </div>
</form>
