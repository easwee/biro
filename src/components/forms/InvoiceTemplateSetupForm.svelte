<script>
  import { ownerData, rates } from "store";
  import { idbRead, idbUpdate } from "utils";
  import { fetchRates } from "api";
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
  h3 {
    color: white;
    margin: 0 0 10px 0;
  }

  .button.remove {
    margin-top: 5px;
  }
</style>

<form>
  <h3>Invoice template setup</h3>
  <div class="field">
    <label for="companyName">Company name</label>
    <input
      id="companyName"
      type="text"
      bind:value={$ownerData.company_name}
      on:keyup={handleInputChange}
      on:change={handleInputChange}
      placeholder="Company name" />
  </div>
  <div class="field">
    <label for="companyAddress">Company address</label>
    <input
      id="companyAddress"
      type="text"
      bind:value={$ownerData.company_address}
      on:keyup={handleInputChange}
      on:change={handleInputChange}
      placeholder="Address" />
  </div>
  <div class="g-r">
    <div class="g-r-c g-r-c-30">
      <div class="field">
        <label for="postalNum">Postal num.</label>
        <input
          id="postalNum"
          type="text"
          bind:value={$ownerData.company_postal_number}
          on:keyup={handleInputChange}
          on:change={handleInputChange}
          placeholder="Postal number" />
      </div>
    </div>
    <div class="g-r-c g-r-c-70">
      <div class="field">
        <label for="companyCity">Company city</label>
        <input
          id="companyCity"
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
        <label for="taxRegistrationNo">Tax registration no.</label>
        <input
          id="taxRegistrationNo"
          type="text"
          bind:value={$ownerData.company_tax_registration_number}
          on:keyup={handleInputChange}
          on:change={handleInputChange}
          placeholder="Tax reg. no." />
      </div>
    </div>
    <div class="g-r-c g-r-c-50">
      <div class="field">
        <label for="businessRegistrationNo">Business registration no.</label>
        <input
          id="businessRegistrationNo"
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
        <label for="terms">Terms</label>
        <input
          id="terms"
          type="text"
          bind:value={$ownerData.terms}
          on:keyup={handleInputChange}
          on:change={handleInputChange}
          placeholder="Terms" />
      </div>
    </div>
    <div class="g-r-c g-r-c-50" />
  </div>
  <div class="g-r">
    <div class="g-r-c g-r-c-50">
      <div class="field">
        <label for="baseCurrency">Base currency</label>
        <select
          id="baseCurrency"
          bind:value={$ownerData.base_currency}
          on:blur={async () => {
            handleInputChange();
            if ($ownerData.use_conversion) {
              try{
                const response = await fetchRates($ownerData.issue_date, $ownerData.base_currency);
                const data = response.data.data;

                rates.set(data[$ownerData.issue_date]);              
              } catch (error) {
                ownerData.set({
                  ...$ownerData,
                  use_conversion: false
                });
              }
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
        <label for="conversionCurrency">Conversion currency</label>
        <select
          id="conversionCurrency"
          bind:value={$ownerData.foreign_currency}
          on:blur={async () => {
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
        <label for="bankAccountNumber">Bank account number</label>
        <input
          id="bankAccountNumber"
          type="text"
          bind:value={$ownerData.bank_account_number}
          on:keyup={handleInputChange}
          on:change={handleInputChange}
          placeholder="Bank account number" />
      </div>
    </div>
    <div class="g-r-c g-r-c-50">
      <div class="field">
        <label for="pdfFileNamePrefix">PDF file name prefix</label>
        <input
          id="pdfFileNamePrefix"
          type="text"
          bind:value={$ownerData.pdf_file_name_prefix}
          on:keyup={handleInputChange}
          on:change={handleInputChange}
          placeholder="PDF file name prefix" />
      </div>
    </div>
  </div>
  <div class="field">
    <label for="invoiceIssueCity">Invoice issue city</label>
    <input
      id="invoiceIssueCity"
      type="text"
      bind:value={$ownerData.issue_city}
      on:keyup={handleInputChange}
      on:change={handleInputChange}
      placeholder="Issue city" />
  </div>
  <div class="field">
    <label for="invoiceIssuer">Invoice issuer</label>
    <input
      id="invoiceIssuer"
      type="text"
      bind:value={$ownerData.issuer}
      on:keyup={handleInputChange}
      on:change={handleInputChange}
      placeholder="Issuer" />
  </div>
  <div class="field">
    <label for="invoiceIssuerSignature">Invoice issuer signature:</label>
    <img
      id="signature"
      src={$ownerData.issuer_signature}
      alt="Empty signature" />

    <input id="invoiceIssuerSignature" type="file" on:change={handleUploadChange} />
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
            try {
              const response = await fetchRates($ownerData.issue_date, $ownerData.base_currency);
              const data = response.data.data;

              rates.set(data[$ownerData.issue_date]);
            } catch (error) {
              ownerData.set({
                ...$ownerData,
                use_conversion: false
              });
            }
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
