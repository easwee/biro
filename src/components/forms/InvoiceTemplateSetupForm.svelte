<script>
  import { onMount } from "svelte";
  import { BIRO_SCHEME } from "constants";
  import { ownerData, rates } from "store";
  import { idbRead, idbUpdate } from "utils";
  import { fetchRates } from "api";
  import { format } from "date-fns";
  import { LOCALES } from "constants";

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
    <label>Company name</label>
    <input
      type="text"
      bind:value={$ownerData.company_name}
      on:keyup={handleInputChange}
      on:change={handleInputChange}
      placeholder="Company name" />
  </div>
  <div class="field">
    <label>Company address</label>
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
        <label>Postal num.</label>
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
        <label>Company city</label>
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
        <label>Tax registration number</label>
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
        <label>Business registration number</label>
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
        <label>Terms</label>
        <input
          type="text"
          bind:value={$ownerData.terms}
          on:keyup={handleInputChange}
          on:change={handleInputChange}
          placeholder="Terms" />
      </div>
    </div>
    <div class="g-r-c g-r-c-50">
      <div class="field">
        <label>Invoice No.</label>
        <input
          type="text"
          bind:value={$ownerData.invoice_number}
          on:keyup={handleInputChange}
          on:change={handleInputChange}
          placeholder="Invoice number" />
      </div>
    </div>

  </div>
  <div class="g-r">
    <div class="g-r-c g-r-c-50">
      <div class="field">
        <label>Base currency</label>
        <select
          bind:value={$ownerData.base_currency}
          on:change={async () => {
            handleInputChange();
            if ($ownerData.use_conversion) {
              const response = await fetchRates(format($ownerData.issue_date, 'YYYY-MM-DD'), $ownerData.base_currency);
              rates.set(response.data.rates);
            }
          }}>
          {#each Object.keys(LOCALES) as currency, index}
            <option value={currency}>{currency}</option>
          {/each}
        </select>
      </div>
    </div>
    <div class="g-r-c g-r-c-50">
      <div class="field">
        <label>Conversion currency</label>
        <select
          bind:value={$ownerData.foreign_currency}
          on:change={async () => {
            handleInputChange();
          }}>
          {#each Object.keys(LOCALES) as currency, index}
            <option value={currency}>{currency}</option>
          {/each}
        </select>
      </div>
    </div>
  </div>
  <div class="g-r">
    <div class="g-r-c g-r-c-50">
      <div class="field">
        <label>Bank account number</label>
        <input
          type="text"
          bind:value={$ownerData.bank_account_number}
          on:keyup={handleInputChange}
          on:change={handleInputChange}
          placeholder="Bank account number" />
      </div>
    </div>
    <div class="g-r-c g-r-c-50">
      <div class="field">
        <label>PDF file name prefix</label>
        <input
          type="text"
          bind:value={$ownerData.pdf_file_name_prefix}
          on:keyup={handleInputChange}
          on:change={handleInputChange}
          placeholder="PDF file name prefix" />
      </div>
    </div>
  </div>
  <div class="field">
    <label>Invoice issue city</label>
    <input
      type="text"
      bind:value={$ownerData.issue_city}
      on:keyup={handleInputChange}
      on:change={handleInputChange}
      placeholder="Issue city" />
  </div>
  <div class="field">
    <label>Invoice issuer</label>
    <input
      type="text"
      bind:value={$ownerData.issuer}
      on:keyup={handleInputChange}
      on:change={handleInputChange}
      placeholder="Issuer" />
  </div>
  <div class="field">
    <label>Invoice issuer signature:</label>
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

  <div class="field">
    <label>
      <input
        type="checkbox"
        bind:checked={$ownerData.use_conversion}
        on:change={async () => {
          handleInputChange();
          if ($ownerData.use_conversion) {
            const response = await fetchRates(format($ownerData.issue_date, 'YYYY-MM-DD'), $ownerData.base_currency);
            rates.set(response.data.rates);
          }
        }} />
      Use conversion
    </label>
  </div>

  <div class="field">
    <label>
      <input
        type="checkbox"
        bind:checked={$ownerData.is_vat_free}
        on:change={handleInputChange} />
      I am VAT free
    </label>
  </div>
</form>
