<script>
  import { onMount } from "svelte";
  import { BIRO_SCHEME } from "constants";
  import { ownerData } from "store";
  import { idbCreate, idbAdd, idbRead, idbUpdate } from "utils";

  let typingTimeout = null;

  function handleSubmit() {
    idbUpdate("biro_db", "owner", 1, $ownerData)
      .then(() => idbRead("biro_db", "owner", 1))
      .then(result => {
        ownerData.update(() => result);
      });
  }

  function handleUploadChange(event) {
    if (event.target.files[0]) {
      const FR = new FileReader();

      FR.addEventListener("load", function(e) {
        document.getElementById("signature").src = e.target.result;
        ownerData.update(object => {
          object.issuer_signature = e.target.result;
          return object;
        });
        idbUpdate("biro_db", "owner", 1, $ownerData);
      });

      FR.readAsDataURL(event.target.files[0]);
    }
  }

  function handleRemoveSignatureClick() {
    ownerData.update(object => {
      object.issuer_signature = "";
      return object;
    });
    idbUpdate("biro_db", "owner", 1, $ownerData);
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <h3>Invoice template setup</h3>

  <div class="field">
    <input
      type="text"
      bind:value={$ownerData.company_name}
      placeholder="Company name" />
  </div>
  <div class="field">
    <input
      type="text"
      bind:value={$ownerData.company_address}
      placeholder="Address" />
  </div>
  <div class="g-r">
    <div class="g-r-c g-r-c-30">
      <div class="field">
        <input
          type="text"
          bind:value={$ownerData.company_postal_number}
          placeholder="Postal number" />
      </div>
    </div>
    <div class="g-r-c g-r-c-70">
      <div class="field">
        <input
          type="text"
          bind:value={$ownerData.company_city}
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
          placeholder="Tax reg. no." />
      </div>
    </div>
    <div class="g-r-c g-r-c-50">
      <div class="field">
        <input
          type="text"
          bind:value={$ownerData.company_business_registration_number}
          placeholder="Business reg.no." />
      </div>
    </div>
  </div>
  <div class="g-r">
    <div class="g-r-c g-r-c-50">
      <div class="field">
        <input type="text" bind:value={$ownerData.vat} placeholder="VAT" />
      </div>
    </div>
    <div class="g-r-c g-r-c-50">
      <div class="field">
        <input type="text" bind:value={$ownerData.terms} placeholder="Terms" />
      </div>
    </div>
  </div>
  <div class="field">
    <input
      type="text"
      bind:value={$ownerData.pdf_file_name_prefix}
      placeholder="PDF file name prefix" />
  </div>
  <div class="field">
    <input
      type="text"
      bind:value={$ownerData.issue_city}
      placeholder="Issue city" />
  </div>
  <div class="field">
    <input
      type="text"
      bind:value={$ownerData.base_currency}
      placeholder="USD"
      disabled />
  </div>
  <div class="field">
    <input
      type="text"
      bind:value={$ownerData.bank_account_number}
      placeholder="Bank account number" />
  </div>
  <div class="field">
    <label>Signature:</label>
    {#if $ownerData.issuer_signature}
      <img id="signature" src={$ownerData.issuer_signature} alt="signature" />
    {/if}
    <input type="file" on:change={handleUploadChange} />
    <span on:click={handleRemoveSignatureClick} class="button remove">
      Remove signature
    </span>
  </div>
</form>
