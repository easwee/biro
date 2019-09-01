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
          ownerData.set(result);
        });
    }, 500);
  }

  function handleUploadChange(event) {
    const file = event.target.files[0];
    if (file) {
      const fireReader = new FileReader();

      fireReader.addEventListener("load", function(e) {
        document.getElementById("signature").src = e.target.result;
        ownerData.update(object => {
          return { ...object, issuer_signature: e.target.result };
        });
        idbUpdate("biro_db", "owner", 1, $ownerData);
      });

      fireReader.readAsDataURL(file);
    }
  }

  function handleRemoveSignatureClick() {
    ownerData.update(object => {
      return { ...object, issuer_signature: "" };
    });
    idbUpdate("biro_db", "owner", 1, $ownerData);
  }
</script>

<style>
  h3,
  label {
    color: white;
    margin: 0 0 10px 0;
  }

  label {
    font-weight: 700;
    display: block;
    margin-bottom: 5px;
  }

  .button.remove {
    margin-top: 5px;
  }
</style>

<form>
  <h3>Invoice template setup</h3>

  <div class="field">
    <input
      type="text"
      bind:value={$ownerData.company_name}
      on:keyup={handleInputChange}
      on:change={handleInputChange}
      placeholder="Company name" />
  </div>
  <div class="field">
    <input
      type="text"
      bind:value={$ownerData.company_address}
      on:keyup={handleInputChange}
      on:change={handleInputChange}
      placeholder="Address" />
  </div>
  <div class="g-r">
    <div class="g-r-c g-r-c-30">
      <div class="field">
        <input
          type="text"
          bind:value={$ownerData.company_postal_number}
          on:keyup={handleInputChange}
          on:change={handleInputChange}
          placeholder="Postal number" />
      </div>
    </div>
    <div class="g-r-c g-r-c-70">
      <div class="field">
        <input
          type="text"
          bind:value={$ownerData.company_city}
          on:keyup={handleInputChange}
          on:change={handleInputChange}
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
          on:keyup={handleInputChange}
          on:change={handleInputChange}
          placeholder="Tax reg. no." />
      </div>
    </div>
    <div class="g-r-c g-r-c-50">
      <div class="field">
        <input
          type="text"
          bind:value={$ownerData.company_business_registration_number}
          on:keyup={handleInputChange}
          on:change={handleInputChange}
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
          on:keyup={handleInputChange}
          on:change={handleInputChange}
          placeholder="VAT" />
      </div>
    </div>
    <div class="g-r-c g-r-c-50">
      <div class="field">
        <input
          type="text"
          bind:value={$ownerData.terms}
          on:keyup={handleInputChange}
          on:change={handleInputChange}
          placeholder="Terms" />
      </div>
    </div>
  </div>
  <div class="field">
    <input
      type="text"
      bind:value={$ownerData.pdf_file_name_prefix}
      on:keyup={handleInputChange}
      on:change={handleInputChange}
      placeholder="PDF file name prefix" />
  </div>
  <div class="field">
    <input
      type="text"
      bind:value={$ownerData.issue_city}
      on:keyup={handleInputChange}
      on:change={handleInputChange}
      placeholder="Issue city" />
  </div>
  <div class="field">
    <input
      type="text"
      bind:value={$ownerData.base_currency}
      on:keyup={handleInputChange}
      on:change={handleInputChange}
      placeholder="USD"
      disabled />
  </div>
  <div class="field">
    <input
      type="text"
      bind:value={$ownerData.bank_account_number}
      on:keyup={handleInputChange}
      on:change={handleInputChange}
      placeholder="Bank account number" />
  </div>
  <div class="field">
    <label>Signature:</label>

    <img
      id="signature"
      src={$ownerData.issuer_signature}
      alt="Empty signature" />

    <input type="file" on:change={handleUploadChange} />
    {#if $ownerData.issuer_signature !== ''}
      <span on:click={handleRemoveSignatureClick} class="button remove">
        Remove signature
      </span>
    {/if}
  </div>
</form>
